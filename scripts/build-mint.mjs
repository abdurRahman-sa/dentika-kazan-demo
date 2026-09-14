// Собирает мятную версию концепта v3 для деплоя в папку site/:
// одна палитра, без панели обзора мокапа и переключателя палитр.
// Исходник design/concept-v3-standard.html с четырьмя палитрами не меняется.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const out = join(root, 'site');
let html = readFileSync(join(root, 'design/concept-v3-standard.html'), 'utf8');

// Каждая замена обязана сработать нужное число раз, иначе сборка падает: исходник мог измениться
const replace = (label, pattern, replacement, expected = 1) => {
  const found = html.match(pattern.global ? pattern : new RegExp(pattern.source, pattern.flags + 'g'))?.length ?? 0;
  if (found !== expected) throw new Error(`«${label}»: найдено ${found}, ожидалось ${expected}`);
  html = html.replace(pattern, replacement);
};

replace('заголовок страницы', /<title>[^<]*<\/title>/, '<title>Dentika — стоматология в Казани · концепт v3</title>');
replace('альтернативные палитры', /\[data-palette="(?:ultramarine|pine|plum)"\]\{[^}]*\}\n/g, '', 3);
replace('панель обзора мокапа', /<!-- ════ Панель обзора мокапа[\s\S]*?(?=<!-- ════ Шапка)/, '');
replace('переключение палитры в скрипте', /\/\* ── Переключение палитры[\s\S]*?(?=\/\* ── Календарь записи)/, '');
replace('пути к фото', /\.\.\/photos\//g, 'photos/', 5);
// Шапка и карточка записи прилипали под панелью обзора; без панели отступ сверху не нужен
replace('высота панели обзора', /<\/style>/, ':root{--bar-h:0px}\n</style>');
// Демо-сайт не должен попадать в поиск, как и версия 5
replace('noindex', /<meta name="viewport"[^>]*>/, (m) => `${m}\n<meta name="robots" content="noindex">`);

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'fonts'), { recursive: true });
mkdirSync(join(out, 'photos'), { recursive: true });
writeFileSync(join(out, 'index.html'), html);
for (const font of ['onest-cyrillic.woff2', 'onest-latin.woff2']) {
  cpSync(join(root, 'design/fonts', font), join(out, 'fonts', font));
}
for (const photo of ['kabinet-4.png', 'kabinet-4-hall.png', 'reception-desk.png', 'reception-logo.png', 'map-location.png']) {
  cpSync(join(root, 'photos', photo), join(out, 'photos', photo));
}

console.log('Мятная версия концепта v3 собрана в site/');
