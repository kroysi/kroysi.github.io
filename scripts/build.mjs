import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify } from 'terser';
import JavaScriptObfuscator from 'javascript-obfuscator';

const root = fileURLToPath(new URL('../', import.meta.url));
const staging = await mkdtemp(join(root, '.build-'));
const read = path => readFile(join(root, path), 'utf8');
const stripMaps = source => source
  .replace(/\/\/[#@]\s*sourceMappingURL=[^\r\n]*/g, '')
  .replace(/\/\*[#@]\s*sourceMappingURL=[\s\S]*?\*\//g, '');

async function compact(source) {
  const result = await minify(stripMaps(source), {
    compress: { passes: 2 },
    mangle: true,
    sourceMap: false,
    format: { comments: /^!/ },
  });
  if (!result.code) throw new Error('Empty JavaScript output');
  return result.code;
}

async function protect(source) {
  return JavaScriptObfuscator.obfuscate(await compact(source), {
    compact: true,
    target: 'browser',
    seed: 314159,
    renameGlobals: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    selfDefending: false,
    sourceMap: false,
  }).getObfuscatedCode();
}

async function removeMaps(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await removeMaps(path);
    else if (entry.name.endsWith('.map')) await rm(path);
    else if (/\.(?:js|css|html)$/.test(entry.name)) {
      await writeFile(path, stripMaps(await readFile(path, 'utf8')));
    }
  }
}

try {
  for (const path of ['assets', 'check', 'css', 'img', 'videos', '404.html', 'CNAME']) {
    await cp(join(root, path), join(staging, path), { recursive: true });
  }
  await mkdir(join(staging, 'js'));
  for (const path of ['promise-polyfill.js', 'vue.js']) {
    await writeFile(join(staging, 'js', path), await compact(await read(`js/${path}`)));
  }

  let html = await read('index.html');
  const guardPattern = /<script src="js\/devtools-detector\.js"><\/script>\s*<script>([\s\S]*?)<\/script>/;
  const guard = html.match(guardPattern);
  if (!guard) throw new Error('DevTools initialization script not found');
  const library = await compact(await read('js/devtools-detector.js'));
  await writeFile(join(staging, 'js/guard.js'), `${library};\n${await protect(guard[1])}`);
  html = html.replace(guardPattern, '<script src="js/guard.js"></script>');

  const sitePattern = /<script src="js\/config\.js"><\/script>\s*<script src="js\/common\.js"><\/script>/;
  if (!sitePattern.test(html)) throw new Error('Site initialization scripts not found');
  const site = `(function () {\n${await read('js/config.js')}\n;\n${await read('js/common.js')}\n})();`;
  await writeFile(join(staging, 'js/site.js'), await protect(site));
  html = html.replace(sitePattern, '<script src="js/site.js"></script>');
  await writeFile(join(staging, 'index.html'), html);
  await writeFile(join(staging, '.nojekyll'), '');
  await removeMaps(staging);
  await rm(join(root, 'dist'), { recursive: true, force: true });
  await rename(staging, join(root, 'dist'));
  console.log('Built dist/ with protected homepage JavaScript and no source maps.');
} finally {
  await rm(staging, { recursive: true, force: true });
}
