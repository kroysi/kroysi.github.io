import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';
import { JSDOM, VirtualConsole, requestInterceptor } from 'jsdom';

const dist = new URL('../dist/', import.meta.url);
const read = path => readFile(new URL(path, dist), 'utf8');

async function openPage(t, playback) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error));
  const dom = new JSDOM(await read('index.html'), {
    url: 'https://kroysi.ru/',
    runScripts: 'dangerously',
    resources: {
      interceptors: [requestInterceptor(async request => {
        const parsed = new URL(request.url);
        if (parsed.origin !== 'https://kroysi.ru') return new Response('');
        const body = await readFile(new URL(parsed.pathname.slice(1), dist));
        return new Response(body, {
          headers: { 'Content-Type': parsed.pathname.endsWith('.css') ? 'text/css' : 'application/javascript' },
        });
      })],
    },
    virtualConsole,
    beforeParse(window) {
      window.HTMLMediaElement.prototype.play = function () {
        return playback.call(this, window);
      };
    },
  });
  t.after(() => dom.window.close());
  await new Promise(resolve => dom.window.addEventListener('load', resolve, { once: true }));
  assert.deepEqual(errors, []);
  return { window: dom.window, document: dom.window.document, errors };
}

test('publication contains only production scripts and no source maps', async () => {
  const html = await read('index.html');
  assert.deepEqual((await readdir(new URL('js/', dist))).sort(), [
    'guard.js', 'promise-polyfill.js', 'site.js', 'vue.js',
  ]);
  assert(!/js\/(?:config|common|devtools-detector)\.js/.test(html));
  assert(html.includes('playsinline'));
  for (const match of html.matchAll(/<script src="([^"]+)"/g)) {
    new vm.Script(await read(match[1]));
  }
  async function checkDirectory(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await checkDirectory(path);
      else {
        assert(!entry.name.endsWith('.map'), path);
        if (/\.(?:js|css|html)$/.test(entry.name)) {
          assert(!(await readFile(path, 'utf8')).includes('sourceMappingURL'), path);
        }
      }
    }
  }
  await checkDirectory(fileURLToPath(dist));
  const bundle = await read('js/site.js');
  assert(!bundle.includes('const awesomeEffect'));
  assert(!bundle.includes('let config ='));
  assert.equal(await read('CNAME'), await readFile(new URL('../CNAME', import.meta.url), 'utf8'));
});

test('protected page starts inline video and displays the configured profile', async t => {
  let calls = 0;
  const page = await openPage(t, function (window) {
    calls++;
    assert.equal(this.muted, false);
    assert.equal(this.volume, 0.3);
    return window.Promise.resolve();
  });
  const button = page.document.querySelector('button');
  assert(button);
  button.click();
  await new Promise(resolve => setTimeout(resolve, 1700));
  assert.equal(calls, 1);
  assert(button.classList.contains('is-playing'));
  assert(page.document.querySelector('.asif-page-info-title').classList.contains('title-visible'));
  assert.equal(page.document.querySelector('.asif-page-info-social a').href, 'https://t.me/kroysi');
  assert(page.document.querySelector('.asif-page-copyright').textContent.trim());
  assert.equal(page.window.getComputedStyle(page.document.querySelector('.asif-page-copyright')).zIndex, '0');
  assert.equal(page.window.location.pathname, '/');
  assert.equal(page.window.config, undefined);
  assert.equal(page.window.init, undefined);
  assert.deepEqual(page.errors, []);
});

test('protected page preserves retry after rejected video playback', async t => {
  let calls = 0;
  const page = await openPage(t, window => {
    calls++;
    return calls === 1 ? window.Promise.reject(new Error('Playback blocked')) : window.Promise.resolve();
  });
  const button = page.document.querySelector('button');
  button.click();
  await new Promise(resolve => setTimeout(resolve, 20));
  assert(page.document.querySelector('[role="alert"]').textContent.includes('Tap Start'));
  assert(!button.disabled);
  assert(!button.classList.contains('is-playing'));
  button.click();
  await new Promise(resolve => setTimeout(resolve, 20));
  assert.equal(calls, 2);
  assert(button.classList.contains('is-playing'));
  assert.equal(page.document.querySelector('[role="alert"]'), null);
  assert.deepEqual(page.errors, []);
});

test('protected guard redirects immediately on detection and keeps input restrictions', async () => {
  const events = new Map();
  const source = await read('js/guard.js');
  const window = { location: { href: '/' } };
  const context = vm.createContext({
    window,
    document: { addEventListener(name, listener) { events.set(name, listener); } },
    setTimeout() { throw new Error('Unexpected redirect timer'); },
    devtoolsDetector: {
      addListener(listener) { this.listener = listener; },
      launch() { this.launched = true; },
    },
  });
  const bootstrap = source.slice(source.indexOf(';\n') + 2);
  assert(source.includes(';\n'));
  vm.runInContext(bootstrap, context);
  assert(context.devtoolsDetector.launched);
  context.devtoolsDetector.listener(false);
  assert.equal(window.location.href, '/');
  context.devtoolsDetector.listener(true);
  assert.equal(window.location.href, 'videos/Righthere.mp4');

  const dom = new JSDOM('<!doctype html>', { runScripts: 'outside-only', virtualConsole: new VirtualConsole() });
  try {
    dom.window.eval(source);
    dom.window.devtoolsDetector.stop();
    for (const type of ['contextmenu', 'dragstart']) {
      const event = new dom.window.Event(type, { cancelable: true });
      dom.window.document.dispatchEvent(event);
      assert(event.defaultPrevented, type);
    }
    const key = new dom.window.KeyboardEvent('keydown', { code: 'F12', cancelable: true });
    dom.window.document.dispatchEvent(key);
    assert(key.defaultPrevented);
  } finally {
    dom.window.close();
  }
});

test('desktop timing checks run on Mac while mobile browsers skip them', async () => {
  const source = await read('js/guard.js');
  const library = source.slice(0, source.indexOf(';\n'));
  const devices = [
    { name: 'Mac Safari', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15', touch: 0, desktop: true },
    { name: 'iPhone Safari', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1', touch: 5, desktop: false },
    { name: 'iPad desktop mode', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15', touch: 5, desktop: false },
    { name: 'Android Chrome', userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36', touch: 5, desktop: false },
  ];
  for (const device of devices) {
    for (const trigger of ['performance', 'debugger-checker']) {
      const dom = new JSDOM('<!doctype html>', { runScripts: 'outside-only' });
      try {
        Object.defineProperty(dom.window.navigator, 'userAgent', { value: device.userAgent });
        Object.defineProperty(dom.window.navigator, 'maxTouchPoints', { value: device.touch });
        dom.window.eval(library);
        const detector = dom.window.devtoolsDetector;
        const invoked = [];
        const detected = [];
        for (const checker of Object.values(detector.checkers)) {
          checker.isEnable = async () => true;
          checker.isOpen = async () => {
            invoked.push(checker.name);
            return checker.name === trigger;
          };
        }
        detector.addListener(isOpen => detected.push(isOpen));
        detector.launch();
        await new Promise(resolve => setTimeout(resolve, 20));
        detector.stop();
        assert.equal(invoked.includes(trigger), device.desktop, `${device.name}: ${trigger}`);
        assert.deepEqual(detected, device.desktop ? [true] : [], device.name);
      } finally {
        dom.window.close();
      }
    }
  }
});
