// Панель твиков для dev-режима: меняет CSS-переменные из global.css на живой странице.
// Подключается только при `astro dev` (см. Layout.astro), в сборку не попадает.

type BaseControl = { id: string; label: string; group: string };
type RangeControl = BaseControl & { type: 'range'; min: number; max: number; step: number; unit?: string };
type ColorControl = BaseControl & { type: 'color' };
type SelectControl = BaseControl & { type: 'select'; options: { value: string; label: string }[]; font?: boolean };
type Control = RangeControl | ColorControl | SelectControl;
type Value = number | string;

// Все шрифты проверены через Google Fonts API: кириллица есть у каждого. Inter и Playfair Display исключены по брифу.
const FONTS = [
  'Geologica', 'Onest', 'Manrope', 'Montserrat', 'Unbounded', 'Golos Text', 'Rubik', 'Nunito', 'Raleway',
  'Commissioner', 'Exo 2', 'Jost', 'Wix Madefor Display', 'Wix Madefor Text', 'Comfortaa', 'Oswald', 'Tenor Sans', 'Play',
  'Open Sans', 'Roboto', 'Fira Sans', 'IBM Plex Sans', 'Source Sans 3', 'Mulish', 'Noto Sans', 'Ubuntu', 'PT Sans',
  'Lora', 'Literata', 'PT Serif',
];
const SERIF_FONTS = new Set(['Lora', 'Literata', 'PT Serif']);
const fontStack = (name: string) =>
  SERIF_FONTS.has(name) ? `'${name}', ui-serif, Georgia, serif` : `'${name}', ui-sans-serif, system-ui, sans-serif`;
const fontHref = (name: string) => {
  const family = name.replace(/ /g, '+');
  const axes = name === 'Open Sans' ? ':wdth,wght@75..100,300..800' : ':wght@300;400;500;600;700;800';
  return `https://fonts.googleapis.com/css2?family=${family}${axes}&display=swap`;
};
const fontOptions = FONTS.map((f) => ({ value: f, label: f }));

const G = {
  display: 'Заголовки',
  text: 'Текст',
  color: 'Цвета',
  grid: 'Сетка и ритм',
  shape: 'Форма',
  hero: 'Первый экран',
  motion: 'Анимации интерфейса',
};

const CONTROLS: Control[] = [
  { group: G.display, id: 'font-display', label: 'Шрифт заголовков', type: 'select', options: fontOptions, font: true },
  { group: G.display, id: 'display-weight', label: 'Начертание заголовков', type: 'range', min: 300, max: 800, step: 100 },
  { group: G.display, id: 'h1', label: 'Размер главного заголовка', type: 'range', min: 28, max: 96, step: 1, unit: 'px' },
  { group: G.display, id: 'h1-lh', label: 'Межстрочный главного заголовка', type: 'range', min: 0.8, max: 1.5, step: 0.01 },
  { group: G.display, id: 'h1-track', label: 'Трекинг главного заголовка', type: 'range', min: -0.08, max: 0.08, step: 0.005, unit: 'em' },
  { group: G.display, id: 'h2', label: 'Размер заголовков секций', type: 'range', min: 20, max: 72, step: 1, unit: 'px' },
  { group: G.display, id: 'h2-lh', label: 'Межстрочный заголовков секций', type: 'range', min: 0.8, max: 1.5, step: 0.01 },
  { group: G.display, id: 'h2-track', label: 'Трекинг заголовков секций', type: 'range', min: -0.08, max: 0.08, step: 0.005, unit: 'em' },
  { group: G.display, id: 'card-title', label: 'Заголовки карточек и плашек', type: 'range', min: 12, max: 28, step: 1, unit: 'px' },

  { group: G.text, id: 'font-sans', label: 'Шрифт текста', type: 'select', options: fontOptions, font: true },
  { group: G.text, id: 'body', label: 'Размер текста', type: 'range', min: 13, max: 24, step: 0.5, unit: 'px' },
  { group: G.text, id: 'body-lh', label: 'Межстрочный текста', type: 'range', min: 1.1, max: 2.2, step: 0.05 },
  { group: G.text, id: 'body-wdth', label: 'Ширина букв (у шрифтов с осью ширины)', type: 'range', min: 75, max: 100, step: 2.5, unit: '%' },
  { group: G.text, id: 'lead', label: 'Подзаголовок первого экрана', type: 'range', min: 14, max: 32, step: 1, unit: 'px' },
  { group: G.text, id: 'lead-lh', label: 'Межстрочный подзаголовка', type: 'range', min: 1.1, max: 2, step: 0.05 },

  { group: G.color, id: 'color-ink', label: 'Основной: заголовки, кнопки', type: 'color' },
  { group: G.color, id: 'color-ink-2', label: 'Второстепенный текст', type: 'color' },
  { group: G.color, id: 'color-light', label: 'Холодный свет', type: 'color' },
  { group: G.color, id: 'color-light-b', label: 'Кольцо и выделение', type: 'color' },
  { group: G.color, id: 'color-flat', label: 'Фон светлых секций', type: 'color' },
  { group: G.color, id: 'field-top', label: 'Студийный свет: верх', type: 'color' },
  { group: G.color, id: 'field-mid', label: 'Студийный свет: середина', type: 'color' },
  { group: G.color, id: 'field-bottom', label: 'Студийный свет: низ', type: 'color' },
  { group: G.color, id: 'color-line', label: 'Рамки кнопок выбора', type: 'color' },
  { group: G.color, id: 'color-mist-2', label: 'Фон полосы с предупреждением', type: 'color' },

  { group: G.grid, id: 'content', label: 'Максимальная ширина контента', type: 'range', min: 960, max: 1920, step: 20, unit: 'px' },
  { group: G.grid, id: 'gutter', label: 'Поля по бокам', type: 'range', min: 12, max: 160, step: 2, unit: 'px' },
  { group: G.grid, id: 'sec', label: 'Отступы между блоками', type: 'range', min: 0, max: 160, step: 2, unit: 'px' },
  { group: G.grid, id: 'step-base', label: 'Первый визит: высота первой ступени', type: 'range', min: 60, max: 240, step: 5, unit: 'px' },
  { group: G.grid, id: 'step-inc', label: 'Первый визит: шаг ступеней', type: 'range', min: 0, max: 140, step: 5, unit: 'px' },

  { group: G.shape, id: 'radius', label: 'Скругление фото и карты', type: 'range', min: 0, max: 64, step: 1, unit: 'px' },
  { group: G.shape, id: 'round-k', label: 'Скругление плашек и панелей', type: 'range', min: 0, max: 2.5, step: 0.05, unit: '×' },
  { group: G.shape, id: 'btn-h', label: 'Высота кнопок', type: 'range', min: 36, max: 80, step: 1, unit: 'px' },
  { group: G.shape, id: 'btn-radius', label: 'Скругление кнопок', type: 'range', min: 0, max: 40, step: 1, unit: 'px' },
  { group: G.shape, id: 'btn-size', label: 'Текст кнопок', type: 'range', min: 12, max: 22, step: 0.5, unit: 'px' },
  { group: G.shape, id: 'shadow-k', label: 'Сила теней', type: 'range', min: 0, max: 3, step: 0.05, unit: '×' },
  { group: G.shape, id: 'glow', label: 'Сила свечения', type: 'range', min: 0, max: 2.5, step: 0.05, unit: '×' },

  {
    group: G.hero, id: 'hero-anim', label: 'Анимация при прокрутке', type: 'select',
    options: [
      { value: 'ease-out', label: 'Быстрый старт' },
      { value: 'staged', label: 'Поэтапная' },
      { value: 'smooth', label: 'Плавная' },
      { value: 'linear', label: 'Равномерная' },
      { value: 'off', label: 'Без анимации' },
    ],
  },
  { group: G.hero, id: 'pin', label: 'Длина закрепления, % высоты экрана', type: 'range', min: 0, max: 200, step: 5, unit: '%' },
  { group: G.hero, id: 'rise-k', label: 'Подъём постамента', type: 'range', min: 0, max: 2.5, step: 0.05, unit: '×' },
  { group: G.hero, id: 'zoom-k', label: 'Приближение постамента', type: 'range', min: 0, max: 3, step: 0.05, unit: '×' },
  { group: G.hero, id: 'chip-title', label: 'Плашки: заголовок', type: 'range', min: 12, max: 28, step: 1, unit: 'px' },
  { group: G.hero, id: 'chip-note', label: 'Плашки: подпись', type: 'range', min: 10, max: 22, step: 1, unit: 'px' },

  { group: G.motion, id: 'dur', label: 'Длительность переходов', type: 'range', min: 0, max: 4, step: 0.05, unit: '×' },
  {
    group: G.motion, id: 'ease-ui', label: 'Кривая переходов', type: 'select',
    options: [
      { value: 'ease', label: 'Стандартная' },
      { value: 'ease-out', label: 'Замедление в конце' },
      { value: 'ease-in-out', label: 'Плавная в обе стороны' },
      { value: 'linear', label: 'Линейная' },
      { value: 'cubic-bezier(0.16, 1, 0.3, 1)', label: 'Экспоненциальная' },
    ],
  },
];

const STORE = 'dentika-tweaks-v1';
const UI_STORE = 'dentika-tweaks-ui-v1';
const root = document.documentElement;

const decimals = (step: number) => (String(step).split('.')[1] ?? '').length;
const toHex = (value: string) => {
  const probe = document.createElement('span');
  probe.style.color = value;
  document.body.append(probe);
  const rgb = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
  probe.remove();
  return `#${rgb.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, '0')).join('')}`;
};
const firstFamily = (stack: string) => stack.split(',')[0].trim().replace(/^['"]|['"]$/g, '');

// Значения по умолчанию читаются из стилей до применения сохранённых твиков
const defaults = new Map<string, Value>();
for (const c of CONTROLS) {
  const raw = getComputedStyle(root).getPropertyValue(`--${c.id}`).trim();
  if (c.type === 'range') defaults.set(c.id, Number.parseFloat(raw));
  else if (c.type === 'color') defaults.set(c.id, toHex(raw));
  else if (c.font) defaults.set(c.id, firstFamily(raw));
  else defaults.set(c.id, raw.replace(/\s+/g, ' '));
}

const values = new Map<string, Value>(defaults);
const isChanged = (c: Control) => {
  const a = values.get(c.id);
  const b = defaults.get(c.id);
  if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) > 1e-9;
  return String(a).toLowerCase() !== String(b).toLowerCase();
};
const cssValue = (c: Control): string => {
  const v = values.get(c.id)!;
  if (c.type === 'range') return String(Number((v as number).toFixed(decimals(c.step))));
  if (c.type === 'select' && c.font) return fontStack(String(v));
  return String(v);
};

const loadedFonts = new Set<string>();
const ensureFont = (name: string) => {
  if (loadedFonts.has(name)) return;
  loadedFonts.add(name);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontHref(name);
  link.dataset.tweakFont = name;
  document.head.append(link);
};

const apply = (c: Control) => {
  if (isChanged(c)) root.style.setProperty(`--${c.id}`, cssValue(c));
  else root.style.removeProperty(`--${c.id}`);
  if (c.type === 'select' && c.font) ensureFont(String(values.get(c.id)));
  if (c.id === 'display-weight' && isChanged(c)) ensureFont(String(values.get('font-display')));
};

const persist = () => {
  const changed: Record<string, Value> = {};
  for (const c of CONTROLS) if (isChanged(c)) changed[c.id] = values.get(c.id)!;
  try {
    localStorage.setItem(STORE, JSON.stringify(changed));
  } catch {}
};

const changedControls = () => CONTROLS.filter(isChanged);

const buildCss = () => {
  const changed = changedControls();
  if (!changed.length) return '';
  const fonts = new Set<string>();
  for (const c of changed) {
    if (c.type === 'select' && c.font) fonts.add(String(values.get(c.id)));
    if (c.id === 'display-weight') fonts.add(String(values.get('font-display')));
    if (c.id === 'body-wdth') fonts.add(String(values.get('font-sans')));
  }
  const lines = [`/* Dentika: изменения из панели твиков (${changed.length}) */`];
  for (const f of fonts) lines.push(`@import url('${fontHref(f)}');`);
  if (fonts.size) lines.push('');
  lines.push(':root {');
  for (const c of changed) lines.push(`  --${c.id}: ${cssValue(c)};`);
  lines.push('}');
  return lines.join('\n');
};

// Сохранённые твики применяются сразу, до построения интерфейса
try {
  const saved = JSON.parse(localStorage.getItem(STORE) ?? '{}') as Record<string, Value>;
  for (const c of CONTROLS) {
    if (c.id in saved) {
      values.set(c.id, saved[c.id]);
      apply(c);
    }
  }
} catch {}
window.dispatchEvent(new Event('tweaks:change'));

// ─── Интерфейс ───

const ICON_RESET = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6.5A5 5 0 1 1 3 9.5"/><path d="M3 3v3.5h3.5"/></svg>';
const ICON_CLOSE = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>';

const STYLE = `
  :host { all: initial; }
  * { box-sizing: border-box; }
  .launch, .panel { font: 13px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; color: #1b2c34; }
  .launch {
    position: fixed; right: 16px; bottom: 16px; z-index: 2147483600;
    display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px;
    border: 0; border-radius: 999px; background: #1b2c34; color: #f7fafb; font-weight: 600; cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,0,0,.18);
  }
  .launch[hidden] { display: none; }
  .badge { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: #d9f6ff; color: #1b2c34; font-size: 12px; line-height: 20px; text-align: center; }
  .badge:empty { display: none; }
  .panel {
    position: fixed; top: 12px; bottom: 12px; right: 12px; z-index: 2147483600;
    width: min(360px, calc(100vw - 24px)); display: flex; flex-direction: column;
    background: #ffffff; border: 1px solid #dce5e9; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.18); overflow: hidden;
  }
  .panel[hidden] { display: none; }
  .panel.left { right: auto; left: 12px; }
  .top { display: flex; align-items: center; gap: 8px; padding: 12px 12px 10px 16px; border-bottom: 1px solid #edf2f4; }
  .title { font-size: 15px; font-weight: 700; }
  .count { color: #5b6d74; margin-right: auto; }
  .icon-btn { display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 8px; background: transparent; color: #44565e; cursor: pointer; }
  .icon-btn:hover { background: #eef3f5; color: #1b2c34; }
  .text-btn { height: 30px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #44565e; cursor: pointer; font: inherit; }
  .text-btn:hover { background: #eef3f5; color: #1b2c34; }
  .actions { display: grid; grid-template-columns: 1fr auto; gap: 8px; padding: 10px 12px; border-bottom: 1px solid #edf2f4; }
  .primary, .ghost { height: 36px; padding: 0 12px; border-radius: 10px; font: inherit; font-weight: 600; cursor: pointer; }
  .primary { border: 0; background: #1b2c34; color: #f7fafb; }
  .primary:disabled { background: #c9d7dd; color: #ffffff; cursor: default; }
  .ghost { border: 1px solid #cbd8de; background: #fff; color: #1b2c34; }
  .ghost:disabled { color: #9db2bb; cursor: default; }
  .search { padding: 10px 12px 4px; }
  .search input { width: 100%; height: 34px; padding: 0 10px; border: 1px solid #cbd8de; border-radius: 10px; font: inherit; color: inherit; }
  .search input:focus { outline: 2px solid #1b2c34; outline-offset: 1px; }
  .groups { flex: 1; overflow-y: auto; padding: 4px 0 16px; overscroll-behavior: contain; }
  details { border-bottom: 1px solid #edf2f4; }
  summary { display: flex; align-items: center; gap: 8px; padding: 12px 16px; font-weight: 700; cursor: pointer; list-style: none; }
  summary::-webkit-details-marker { display: none; }
  summary::before { content: ''; width: 6px; height: 6px; border-right: 1.6px solid #5b6d74; border-bottom: 1.6px solid #5b6d74; transform: rotate(-45deg); transition: transform .15s; }
  details[open] summary::before { transform: rotate(45deg); }
  .group-count { margin-left: auto; font-weight: 600; color: #2e7c82; }
  .row { padding: 8px 16px 10px; }
  .row[hidden] { display: none; }
  .row-head { display: flex; align-items: center; gap: 6px; min-height: 24px; }
  .row-head label { flex: 1; color: #1b2c34; }
  .row.changed .row-head label::before { content: ''; display: inline-block; width: 6px; height: 6px; margin: 0 6px 1px 0; border-radius: 50%; background: #2e7c82; }
  output { font-variant-numeric: tabular-nums; color: #44565e; }
  .reset { visibility: hidden; width: 24px; height: 24px; }
  .row.changed .reset { visibility: visible; }
  input[type=range] { width: 100%; margin: 6px 0 0; accent-color: #1b2c34; }
  select { width: 100%; height: 32px; margin-top: 6px; padding: 0 8px; border: 1px solid #cbd8de; border-radius: 8px; background: #fff; font: inherit; color: inherit; }
  .color { display: flex; gap: 8px; margin-top: 6px; }
  .color input[type=color] { width: 44px; height: 32px; padding: 2px; border: 1px solid #cbd8de; border-radius: 8px; background: #fff; }
  .color input[type=text] { flex: 1; height: 32px; padding: 0 8px; border: 1px solid #cbd8de; border-radius: 8px; font: 12px ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: lowercase; color: inherit; }
  .toast { position: absolute; left: 12px; right: 12px; bottom: 12px; padding: 10px 12px; border-radius: 10px; background: #1b2c34; color: #f7fafb; opacity: 0; transform: translateY(8px); transition: opacity .2s, transform .2s; pointer-events: none; }
  .toast.show { opacity: 1; transform: none; }
  .fallback { display: none; margin: 10px 12px 0; }
  .fallback.show { display: block; }
  .fallback textarea { width: 100%; height: 160px; padding: 8px; border: 1px solid #cbd8de; border-radius: 8px; font: 12px ui-monospace, SFMono-Regular, Menlo, monospace; }
  :focus-visible { outline: 2px solid #1b2c34; outline-offset: 2px; }
`;

const host = document.createElement('dentika-tweaks');
const shadow = host.attachShadow({ mode: 'open' });
document.body.append(host);

let ui: { open: boolean; left: boolean; closedGroups: string[] } = { open: false, left: false, closedGroups: [] };
try {
  ui = { ...ui, ...JSON.parse(localStorage.getItem(UI_STORE) ?? '{}') };
} catch {}
const saveUi = () => {
  try {
    localStorage.setItem(UI_STORE, JSON.stringify(ui));
  } catch {}
};

const formatValue = (c: Control) => {
  const v = values.get(c.id)!;
  if (c.type === 'range') {
    const n = (v as number).toFixed(decimals(c.step));
    if (c.unit === '×') return `×${n}`;
    return c.unit ? `${n} ${c.unit}` : n;
  }
  return '';
};

const groups = [...new Set(CONTROLS.map((c) => c.group))];
shadow.innerHTML = `
  <style>${STYLE}</style>
  <button class="launch" type="button" aria-expanded="false" aria-controls="panel">Твики <span class="badge"></span></button>
  <aside class="panel" id="panel" role="dialog" aria-label="Панель твиков" hidden>
    <div class="top">
      <span class="title">Твики</span>
      <span class="count" data-count></span>
      <button class="text-btn" type="button" data-side>Перенести влево</button>
      <button class="icon-btn" type="button" data-close aria-label="Закрыть панель">${ICON_CLOSE}</button>
    </div>
    <div class="actions">
      <button class="primary" type="button" data-copy>Скопировать CSS</button>
      <button class="ghost" type="button" data-reset-all>Сбросить всё</button>
    </div>
    <div class="fallback" data-fallback><textarea readonly aria-label="CSS для копирования"></textarea></div>
    <div class="search"><input type="search" placeholder="Найти настройку" aria-label="Найти настройку" data-search /></div>
    <div class="groups">
      ${groups
        .map(
          (g) => `
        <details ${ui.closedGroups.includes(g) ? '' : 'open'} data-group="${g}">
          <summary>${g}<span class="group-count"></span></summary>
          ${CONTROLS.filter((c) => c.group === g)
            .map((c) => {
              const inputId = `tw-${c.id}`;
              let field = '';
              if (c.type === 'range') {
                field = `<input id="${inputId}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" data-input="${c.id}" />`;
              } else if (c.type === 'color') {
                field = `<div class="color"><input id="${inputId}" type="color" data-input="${c.id}" /><input type="text" maxlength="7" spellcheck="false" aria-label="${c.label}, код цвета" data-hex="${c.id}" /></div>`;
              } else {
                field = `<select id="${inputId}" data-input="${c.id}">${c.options.map((o) => `<option value="${o.value}">${o.label}</option>`).join('')}</select>`;
              }
              return `
                <div class="row" data-row="${c.id}" data-label="${c.label.toLowerCase()}">
                  <div class="row-head">
                    <label for="${inputId}">${c.label}</label>
                    <output data-out="${c.id}"></output>
                    <button class="icon-btn reset" type="button" data-reset="${c.id}" aria-label="Сбросить: ${c.label}" title="Сбросить">${ICON_RESET}</button>
                  </div>
                  ${field}
                </div>`;
            })
            .join('')}
        </details>`,
        )
        .join('')}
    </div>
    <div class="toast" role="status" aria-live="polite" data-toast></div>
  </aside>
`;

const $ = <T extends Element>(sel: string) => shadow.querySelector<T>(sel)!;
const launch = $<HTMLButtonElement>('.launch');
const panel = $<HTMLElement>('.panel');
const toast = $<HTMLElement>('[data-toast]');
const byId = new Map(CONTROLS.map((c) => [c.id, c]));

const syncRow = (c: Control) => {
  const row = $<HTMLElement>(`[data-row="${c.id}"]`);
  row.classList.toggle('changed', isChanged(c));
  const input = $<HTMLInputElement | HTMLSelectElement>(`[data-input="${c.id}"]`);
  const v = values.get(c.id)!;
  if (String(input.value) !== String(v)) input.value = String(v);
  if (c.type === 'color') {
    const hex = $<HTMLInputElement>(`[data-hex="${c.id}"]`);
    if (shadow.activeElement !== hex) hex.value = String(v);
  }
  $<HTMLOutputElement>(`[data-out="${c.id}"]`).textContent = formatValue(c);
};

const syncSummary = () => {
  const n = changedControls().length;
  $<HTMLElement>('[data-count]').textContent = n ? `Изменено: ${n}` : 'Без изменений';
  $<HTMLElement>('.badge').textContent = n ? String(n) : '';
  $<HTMLButtonElement>('[data-copy]').disabled = n === 0;
  $<HTMLButtonElement>('[data-reset-all]').disabled = n === 0;
  $<HTMLButtonElement>('[data-copy]').textContent = n ? `Скопировать CSS (${n})` : 'Скопировать CSS';
  shadow.querySelectorAll<HTMLElement>('details').forEach((d) => {
    const k = CONTROLS.filter((c) => c.group === d.dataset.group && isChanged(c)).length;
    d.querySelector('.group-count')!.textContent = k ? String(k) : '';
  });
};

const setValue = (c: Control, v: Value) => {
  values.set(c.id, v);
  apply(c);
  syncRow(c);
  syncSummary();
  persist();
  window.dispatchEvent(new Event('tweaks:change'));
};

const setOpen = (open: boolean) => {
  ui.open = open;
  panel.hidden = !open;
  launch.hidden = open;
  launch.setAttribute('aria-expanded', String(open));
  saveUi();
  if (open) $<HTMLInputElement>('[data-search]').focus({ preventScroll: true });
  else launch.focus({ preventScroll: true });
};

const setSide = (left: boolean) => {
  ui.left = left;
  panel.classList.toggle('left', left);
  $<HTMLButtonElement>('[data-side]').textContent = left ? 'Перенести вправо' : 'Перенести влево';
  saveUi();
};

let toastTimer = 0;
const showToast = (text: string) => {
  toast.textContent = text;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1800);
};

shadow.addEventListener('input', (event) => {
  const el = event.target as HTMLInputElement | HTMLSelectElement;
  if (el.dataset.input) {
    const c = byId.get(el.dataset.input)!;
    const next = c.type === 'range' ? Number(el.value) : c.type === 'color' ? el.value.toLowerCase() : el.value;
    setValue(c, next);
  } else if (el.dataset.hex) {
    const c = byId.get(el.dataset.hex)!;
    const v = el.value.trim().toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(v)) setValue(c, v);
  } else if (el.dataset.search !== undefined) {
    const q = el.value.trim().toLowerCase();
    shadow.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
      row.hidden = q !== '' && !row.dataset.label!.includes(q);
    });
    if (q) shadow.querySelectorAll('details').forEach((d) => d.setAttribute('open', ''));
  }
});

shadow.addEventListener('click', async (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('button');
  if (!target) return;
  if (target === launch) setOpen(true);
  else if (target.dataset.close !== undefined) setOpen(false);
  else if (target.dataset.side !== undefined) setSide(!ui.left);
  else if (target.dataset.reset) {
    const c = byId.get(target.dataset.reset)!;
    setValue(c, defaults.get(c.id)!);
  } else if (target.dataset.resetAll !== undefined) {
    for (const c of CONTROLS) {
      values.set(c.id, defaults.get(c.id)!);
      apply(c);
      syncRow(c);
    }
    syncSummary();
    persist();
    window.dispatchEvent(new Event('tweaks:change'));
    showToast('Все настройки сброшены');
  } else if (target.dataset.copy !== undefined) {
    const css = buildCss();
    const fallback = $<HTMLElement>('[data-fallback]');
    try {
      await navigator.clipboard.writeText(css);
      fallback.classList.remove('show');
      showToast(`Скопировано изменений: ${changedControls().length}`);
    } catch {
      const area = fallback.querySelector('textarea')!;
      area.value = css;
      fallback.classList.add('show');
      area.select();
      showToast('Буфер обмена недоступен: скопируйте CSS из поля');
    }
  }
});

shadow.addEventListener('toggle', (event) => {
  const d = event.target as HTMLDetailsElement;
  if (!d.dataset?.group) return;
  const g = d.dataset.group;
  ui.closedGroups = d.open ? ui.closedGroups.filter((x) => x !== g) : [...new Set([...ui.closedGroups, g])];
  saveUi();
}, true);

shadow.addEventListener('keydown', (event) => {
  if ((event as KeyboardEvent).key === 'Escape' && ui.open) setOpen(false);
});

for (const c of CONTROLS) syncRow(c);
syncSummary();
setSide(ui.left);
panel.hidden = !ui.open;
launch.hidden = ui.open;

// Для проверок из консоли в dev-режиме
Object.assign(window, {
  __dentikaTweaks: {
    set: (id: string, v: Value) => setValue(byId.get(id)!, v),
    css: buildCss,
    changed: () => changedControls().map((c) => c.id),
    defaults: () => Object.fromEntries(defaults),
  },
});
