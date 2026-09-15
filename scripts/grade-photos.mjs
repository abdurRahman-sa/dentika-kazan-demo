// Подгоняет тёплые фото клиники под холодную палитру сайта.
// Исходные снимки берутся из истории git (коммит, где фото впервые попали на сайт),
// результат записывается в src/assets/clinic/ поверх используемых файлов.
//
//   node scripts/grade-photos.mjs strong   — убрать желтизну, холодный белый
//   node scripts/grade-photos.mjs mint     — strong + мятный оттенок фона сайта + светлее
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';

const PHOTOS = ['reception-desk', 'reception-logo', 'kabinet-4'];
const ROOT = new URL('..', import.meta.url).pathname;
const SOURCE_COMMIT = '3d30b36';

// ratio: к какому соотношению каналов R:G:B привести светлые участки (зелёный принят за 1)
// strength: насколько сильно двигать к этому соотношению (1 — ровно до него)
// lift: насколько поднять средние тона (1 — не трогать; белое и чёрное не меняются при любом значении)
const COOL_WHITE = [234 / 240, 1, 242 / 240]; // холодный белый: синего больше, чем зелёного
const SITE_MINT = [235 / 245, 1, 244 / 245]; // фон секций #EBF5F4: зелёный и синий почти поровну

const PRESETS = {
  strong: [{ ratio: COOL_WHITE, strength: 1.25, lift: 1.22 }],
  mint: [
    { ratio: COOL_WHITE, strength: 1.25, lift: 1.22 },
    { ratio: SITE_MINT, strength: 1, lift: 1.2 },
  ],
};

const mode = process.argv[2];
if (!PRESETS[mode]) {
  console.error(`Укажите вариант: ${Object.keys(PRESETS).join(', ')}`);
  process.exit(1);
}

// Опорный «белый» фото: 85-й перцентиль каждого канала (светлые стены, без засвеченных ламп)
function referenceWhite(data) {
  return [0, 1, 2].map((c) => {
    const values = [];
    for (let i = c; i < data.length; i += 3) values.push(data[i]);
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length * 0.85)];
  });
}

function grade(data, { ratio, strength, lift }) {
  const ref = referenceWhite(data);
  const gain = [0, 1, 2].map((c) => 1 + ((ratio[c] * ref[1]) / ref[c] - 1) * strength);
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    for (let c = 0; c < 3; c++) {
      const x = Math.min(1, (data[i + c] * gain[c]) / 255);
      out[i + c] = Math.round((1 - Math.pow(1 - x, lift)) * 255);
    }
  }
  return { out, gain };
}

for (const name of PHOTOS) {
  const path = `src/assets/clinic/${name}.png`;
  const original = execFileSync('git', ['show', `${SOURCE_COMMIT}:${path}`], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 });
  let { data, info } = await sharp(original).toColourspace('srgb').removeAlpha().raw().toBuffer({ resolveWithObject: true });

  const steps = [];
  for (const step of PRESETS[mode]) {
    const { out, gain } = grade(data, step);
    data = out;
    steps.push(gain.map((g) => g.toFixed(3)).join(' '));
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
    .withIccProfile('srgb')
    .png()
    .toFile(`${ROOT}${path}`);
  console.log(`${name}: ${mode}, каналы R G B × ${steps.join(' → ')}`);
}
