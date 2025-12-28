/**
 * Tools - Offline Version
 */

(function() {
  'use strict';

  // ============================================
  // Утилиты
  // ============================================
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ============================================
  // Хранилище настроек
  // ============================================
  const Storage = {
    THEME_KEY: 'wr_theme_v1',
    PARTICLES_KEY: 'wr_particles_v1',

    getTheme() {
      return localStorage.getItem(this.THEME_KEY) || 'theme-neon';
    },
    setTheme(theme) {
      localStorage.setItem(this.THEME_KEY, theme);
    },
    getParticles() {
      try {
        return JSON.parse(localStorage.getItem(this.PARTICLES_KEY)) || null;
      } catch {
        return null;
      }
    },
    setParticles(settings) {
      localStorage.setItem(this.PARTICLES_KEY, JSON.stringify(settings));
    }
  };

  // ============================================
  // Темы
  // ============================================
  const Theme = {
    THEMES: ['theme-neon', 'theme-sunset', 'theme-emerald', 'theme-ice', 'theme-snow'],

    apply(theme) {
      document.body.classList.remove(...this.THEMES);
      if (theme) document.body.classList.add(theme);
      Storage.setTheme(theme);
      Particles.updateColors();
    },

    init() {
      this.apply(Storage.getTheme());
    }
  };

  // ============================================
  // Частицы
  // ============================================
  const Particles = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    dpr: 1,
    linksDist: 140,
    settings: { speed: 1.6, size: 2.8, shape: 'circle' },
    paint: { fill: 'rgba(255,255,255,.95)', stroke: 'rgba(255,255,255,.18)', shadow: 'rgba(255,255,255,.6)' },

    init() {
      this.canvas = $('#particles-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.settings = { ...this.settings, ...Storage.getParticles() };
      
      this.resize();
      this.updateColors();
      
      window.addEventListener('resize', () => this.resize());
      if (window.visualViewport) {
        visualViewport.addEventListener('resize', () => this.resize());
      }
      
      this.particles = Array.from({ length: 60 }, () => this.spawn());
      this.tick();
    },

    resize() {
      this.dpr = Math.max(1, Math.min(2.5, devicePixelRatio || 1));
      const w = Math.max(1, Math.floor(innerWidth));
      const h = Math.max(1, Math.floor(innerHeight));
      
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      this.canvas.width = Math.floor(w * this.dpr);
      this.canvas.height = Math.floor(h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      
      const density = Math.min(140, Math.round((w * h) / 17000));
      while (this.particles.length < density) this.particles.push(this.spawn(w, h));
      if (this.particles.length > density) this.particles.length = density;
    },

    spawn(w = innerWidth, h = innerHeight) {
      const angle = Math.random() * Math.PI * 2;
      const speed = this.settings.speed * (0.3 + Math.random() * 0.7);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        sz: this.settings.size * (0.6 + Math.random() * 0.8)
      };
    },

    updateColors() {
      const styles = getComputedStyle(document.body);
      const c = styles.getPropertyValue('--particle').trim();
      let r = 240, g = 246, b = 255;
      
      const hex = c.match(/^#([0-9a-f]{6})$/i);
      const rgb = c.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
      
      if (hex) {
        r = parseInt(hex[1].substr(0, 2), 16);
        g = parseInt(hex[1].substr(2, 2), 16);
        b = parseInt(hex[1].substr(4, 2), 16);
      } else if (rgb) {
        [, r, g, b] = rgb.map(Number);
      }
      
      const isLight = document.body.classList.contains('theme-snow');
      this.paint = {
        fill: `rgba(${r},${g},${b},${isLight ? 0.92 : 0.95})`,
        stroke: `rgba(${r},${g},${b},${isLight ? 0.28 : 0.18})`,
        shadow: `rgba(${r},${g},${b},${isLight ? 0.30 : 0.55})`
      };
    },

    drawShape(p) {
      const { ctx, paint, settings } = this;
      const s = p.sz;
      
      ctx.beginPath();
      switch (settings.shape) {
        case 'square':
          ctx.rect(p.x - s/2, p.y - s/2, s, s);
          break;
        case 'triangle':
          ctx.moveTo(p.x, p.y - s/1.1);
          ctx.lineTo(p.x - s/1.2, p.y + s/1.4);
          ctx.lineTo(p.x + s/1.2, p.y + s/1.4);
          ctx.closePath();
          break;
        case 'star':
          const spikes = 5, outer = s, inner = s/2.2;
          let rot = Math.PI/2 * 3;
          ctx.moveTo(p.x, p.y - outer);
          for (let i = 0; i < spikes; i++) {
            ctx.lineTo(p.x + Math.cos(rot) * outer, p.y + Math.sin(rot) * outer);
            rot += Math.PI / spikes;
            ctx.lineTo(p.x + Math.cos(rot) * inner, p.y + Math.sin(rot) * inner);
            rot += Math.PI / spikes;
          }
          ctx.lineTo(p.x, p.y - outer);
          ctx.closePath();
          break;
        case 'hex':
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI/3) * i;
            const xx = p.x + Math.cos(a) * s/1.1;
            const yy = p.y + Math.sin(a) * s/1.1;
            i === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy);
          }
          ctx.closePath();
          break;
        default:
          ctx.arc(p.x, p.y, s/2, 0, Math.PI * 2);
      }
      
      ctx.shadowBlur = 8;
      ctx.shadowColor = paint.shadow;
      ctx.fillStyle = paint.fill;
      ctx.fill();
      ctx.shadowBlur = 0;
    },

    tick() {
      const { ctx, canvas, dpr, particles, linksDist, paint } = this;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      
      ctx.clearRect(0, 0, w, h);
      
      // Обновляем и рисуем частицы
      for (const p of particles) {
        p.x += p.vx * 0.8;
        p.y += p.vy * 0.8;
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;
        this.drawShape(p);
      }
      
      // Рисуем связи
      ctx.lineWidth = 1;
      ctx.strokeStyle = paint.stroke;
      const dist2 = linksDist * linksDist;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (dx*dx + dy*dy < dist2) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      
      this.animationId = requestAnimationFrame(() => this.tick());
    },

    updateSettings(key, value) {
      this.settings[key] = value;
      Storage.setParticles(this.settings);
      
      if (key === 'size') {
        this.particles.forEach(p => p.sz = value * (0.6 + Math.random() * 0.8));
      }
    }
  };

  // ============================================
  // UI: Toast уведомления
  // ============================================
  const Toast = {
    show() {
      const el = $('#copyToast');
      el.classList.remove('show');
      void el.offsetWidth; // reflow
      el.classList.add('show');
    }
  };

  // ============================================
  // UI: Копирование
  // ============================================
  const Clipboard = {
    copy(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.dataset.original || btn.innerHTML;
        btn.dataset.original = original;
        btn.classList.add('success');
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        Toast.show();
        
        setTimeout(() => {
          btn.classList.remove('success');
          btn.innerHTML = btn.dataset.original;
        }, 1200);
      });
    }
  };


  // ============================================
  // Загрузка и рендеринг данных из JSON
  // ============================================
  const DataLoader = {
    data: null,

    async load() {
      try {
        // Пробуем загрузить из файла
        const response = await fetch('data/cards.json');
        if (response.ok) {
          this.data = await response.json();
        }
      } catch (e) {
        console.log('Загрузка из файла не удалась, используем встроенные данные');
      }
      
      // Если не загрузилось — используем встроенные данные
      if (!this.data) {
        this.data = window.CARDS_DATA || {};
      }
      
      this.render();
      
      // Обновляем дату
      if (this.data.settings?.updatedAt) {
        $('#updatedAt').textContent = this.data.settings.updatedAt;
      }
    },

    render() {
      this.renderCards('everything', '#cards');
      this.renderCards('journal', '#journalCards');
      this.renderCommon();
      this.renderTable();
      this.renderBanned();
    },

    renderCards(key, selector) {
      const container = $(selector);
      if (!container || !this.data[key]) return;
      
      container.innerHTML = this.data[key].map(card => `
        <div class="card" style="display: flex;">
          <h3><i class="fa-solid fa-layer-group"></i> ${this.escapeHtml(card.title)}</h3>
          <div class="meta">${this.escapeHtml(card.meta)}</div>
          <div class="code">${this.escapeHtml(card.code)}</div>
          <div class="copy">
            <button class="btn secondary copy-btn"><i class="fa-regular fa-copy"></i> Копировать</button>
            <button class="btn ghost tiny collapse-toggle" aria-expanded="false">Развернуть</button>
          </div>
        </div>
      `).join('');
    },

    renderCommon() {
      const container = $('#columnsWrap');
      if (!container || !this.data.common) return;
      
      container.innerHTML = this.data.common.map(col => `
        <div class="col" style="display: block;">
          <div class="col-head">${this.escapeHtml(col.name)}</div>
          <div class="col-body">
            ${col.strings.map(str => `
              <div class="item" style="display: grid;">
                <div>${this.escapeHtml(str)}</div>
                <button class="btn secondary"><i class="fa-regular fa-copy"></i></button>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    },

    renderTable() {
      const tbody = $('#tableWrap tbody');
      if (!tbody || !this.data.mods) return;
      
      tbody.innerHTML = this.data.mods.map(mod => `
        <tr style="display: table-row;">
          <td><strong>${this.escapeHtml(mod.name)}</strong></td>
          <td>${this.escapeHtml(mod.size)}</td>
          <td>${this.escapeHtml(mod.check)}</td>
          <td>${this.escapeHtml(mod.comment)}</td>
        </tr>
      `).join('');
    },

    renderBanned() {
      const container = $('#modsGridWrap');
      if (!container || !this.data.banned) return;
      
      container.innerHTML = this.data.banned.map(mod => `
        <div class="mod-card" style="display: flex;">
          <h4><i class="fa-solid fa-ban"></i> ${this.escapeHtml(mod.name)}</h4>
          <div class="tag">${this.escapeHtml(mod.tag)}</div>
          <div class="desc">${this.escapeHtml(mod.desc)}</div>
        </div>
      `).join('');
    },

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
  };

  // ============================================
  // Табы
  // ============================================
  const Tabs = {
    current: 'everything',
    
    TITLES: {
      everything: 'Everything 1.5 Search Patterns',
      journal: 'Journal Trace',
      common: 'Общие Strings (по клиентам)',
      mods: 'Таблица .jar/.dll',
      banned: 'Запрещённые моды'
    },
    
    CONTAINERS: {
      everything: '#cards',
      journal: '#journalCards',
      common: '#columnsWrap',
      mods: '#tableWrap',
      banned: '#modsGridWrap'
    },

    switch(tab) {
      this.current = tab;
      
      // Обновляем активную кнопку
      $$('.nav button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
      });
      
      // Обновляем заголовок
      $('#sectionTitle').textContent = this.TITLES[tab] || '';
      
      // Скрываем все контейнеры
      Object.values(this.CONTAINERS).forEach(sel => $(sel)?.classList.add('hidden'));
      
      // Показываем нужный
      const container = $(this.CONTAINERS[tab]);
      if (container) container.classList.remove('hidden');
      
      // Компактный режим только для Everything
      $('#cards').classList.toggle('compact', tab === 'everything');
      
      // Обновляем фильтр поиска
      Search.filter();
    },

    init() {
      $('#nav').addEventListener('click', e => {
        const btn = e.target.closest('button[data-tab]');
        if (btn) this.switch(btn.dataset.tab);
      });
      
      this.switch('everything');
    }
  };

  // ============================================
  // Поиск
  // ============================================
  const Search = {
    input: null,

    filter() {
      const q = (this.input?.value || '').trim().toLowerCase();
      const tab = Tabs.current;
      
      if (tab === 'everything' || tab === 'journal') {
        const container = tab === 'everything' ? '#cards' : '#journalCards';
        $$(container + ' .card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
        });
      } else if (tab === 'common') {
        $$('#columnsWrap .col').forEach(col => {
          let matches = 0;
          $$('.item', col).forEach(item => {
            const show = item.textContent.toLowerCase().includes(q);
            item.style.display = show ? 'grid' : 'none';
            if (show) matches++;
          });
          col.style.display = matches ? 'block' : 'none';
        });
      } else if (tab === 'mods') {
        $$('#tableWrap tbody tr').forEach(tr => {
          tr.style.display = tr.textContent.toLowerCase().includes(q) ? 'table-row' : 'none';
        });
      } else if (tab === 'banned') {
        $$('#modsGridWrap .mod-card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
        });
      }
    },

    init() {
      this.input = $('#searchInput');
      this.input.addEventListener('input', () => this.filter());
      
      // Ctrl/Cmd + K для фокуса
      window.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.input.focus();
        }
      });
    }
  };

  // ============================================
  // Модальное окно дизайна
  // ============================================
  const DesignModal = {
    init() {
      const modal = $('#designModal');
      
      $('#designBtn').addEventListener('click', () => modal.classList.remove('hidden'));
      $('#closeDesign').addEventListener('click', () => modal.classList.add('hidden'));
      
      // Темы
      $$('#themeOptions .theme-card').forEach(card => {
        card.classList.toggle('active', card.dataset.theme === Storage.getTheme());
        card.addEventListener('click', () => {
          $$('#themeOptions .theme-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          Theme.apply(card.dataset.theme);
        });
      });
      
      // Скорость частиц
      const speedRange = $('#speedRange');
      speedRange.value = Particles.settings.speed;
      speedRange.addEventListener('input', e => {
        Particles.updateSettings('speed', parseFloat(e.target.value));
        Particles.particles.forEach(p => { p.vx *= 0.7; p.vy *= 0.7; });
      });
      
      // Размер частиц
      const sizeRange = $('#sizeRange');
      sizeRange.value = Particles.settings.size;
      sizeRange.addEventListener('input', e => {
        Particles.updateSettings('size', parseFloat(e.target.value));
      });
      
      // Форма частиц
      $$('#shapeRow .shape-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.shape === Particles.settings.shape);
        btn.addEventListener('click', () => {
          $$('#shapeRow .shape-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          Particles.updateSettings('shape', btn.dataset.shape);
        });
      });
    }
  };

  // ============================================
  // Обработчики кликов (делегирование)
  // ============================================
  const ClickHandlers = {
    init() {
      document.addEventListener('click', e => {
        // Копирование в карточках
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
          const card = copyBtn.closest('.card');
          const code = card?.querySelector('.code');
          if (code) Clipboard.copy(code.textContent, copyBtn);
          return;
        }
        
        // Копирование в колонках
        const itemCopyBtn = e.target.closest('.item .btn.secondary');
        if (itemCopyBtn) {
          const item = itemCopyBtn.closest('.item');
          const text = item?.querySelector('div')?.textContent;
          if (text) Clipboard.copy(text, itemCopyBtn);
          return;
        }
        
        // Разворачивание кода
        const toggleBtn = e.target.closest('.collapse-toggle');
        if (toggleBtn) {
          const card = toggleBtn.closest('.card');
          const code = card?.querySelector('.code');
          if (code) {
            const expanded = code.classList.toggle('expanded');
            toggleBtn.setAttribute('aria-expanded', expanded);
            toggleBtn.textContent = expanded ? 'Свернуть' : 'Развернуть';
          }
        }
      });
    }
  };

  // ============================================
  // Инициализация
  // ============================================
  document.addEventListener('DOMContentLoaded', async () => {
    Theme.init();
    Particles.init();
    Search.init();
    Tabs.init();
    DesignModal.init();
    ClickHandlers.init();
    
    // Загружаем данные из JSON
    await DataLoader.load();
  });

})();
