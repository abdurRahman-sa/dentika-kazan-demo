export type Aud = 'adult' | 'child';

export const clinic = {
  name: 'Дентика',
  city: 'Казань',
  district: 'Салават Купере, Кировский район',
  address: 'ул. Генерала Махмута Гареева, 9/1, офис 1102',
  phoneDisplay: '+7 (910) 286-67-67',
  phoneHref: 'tel:+79102866767',
  ratingsDate: 'сентябрь 2026',
  ratings: [
    {
      source: '2ГИС',
      score: '4,9',
      count: '81 оценка',
      href: 'https://2gis.ru/kazan/search/%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%20dentica/firm/70000001112382517',
    },
    {
      source: 'Яндекс Карты',
      score: '5,0',
      count: '45 оценок',
      href: 'https://yandex.ru/maps/org/dentika/146051744492/',
    },
  ],
};

export interface Position {
  label: string;
  aud: Aud[];
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  positions: Position[];
  pending?: Position;
}

// Позиции — дословно из открытой карточки клиники на 2ГИС; `pending` — то, чего в карточке нет.
export const services: Service[] = [
  {
    id: 'therapy',
    title: 'Терапия',
    desc: 'Лечение кариеса и его осложнений',
    positions: [{ label: 'Детский стоматолог-терапевт', aud: ['child'] }],
    pending: { label: 'Взрослый терапевт — уточняется', aud: ['adult'] },
  },
  {
    id: 'surgery',
    title: 'Хирургия',
    desc: 'Удаление зубов и другие вмешательства в полости рта',
    positions: [
      { label: 'Взрослый стоматолог-хирург', aud: ['adult'] },
      { label: 'Детский стоматолог-хирург', aud: ['child'] },
    ],
  },
  {
    id: 'implants',
    title: 'Имплантация',
    desc: 'Восстановление отсутствующих зубов на имплантатах',
    positions: [{ label: 'Имплантация', aud: ['adult'] }],
  },
  {
    id: 'prosthetics',
    title: 'Ортопедия',
    desc: 'Протезирование зубов',
    positions: [{ label: 'Взрослый стоматолог-ортопед', aud: ['adult'] }],
  },
  {
    id: 'orthodontics',
    title: 'Ортодонтия',
    desc: 'Исправление прикуса и положения зубов',
    positions: [
      { label: 'Взрослый ортодонт', aud: ['adult'] },
      { label: 'Детский ортодонт', aud: ['child'] },
    ],
  },
  {
    id: 'periodontics',
    title: 'Пародонтология',
    desc: 'Лечение дёсен и тканей вокруг зуба',
    positions: [{ label: 'Взрослый пародонтолог', aud: ['adult'] }],
  },
  {
    id: 'xray',
    title: 'Диагностика',
    desc: 'Рентгеновский снимок отдельного зуба',
    positions: [{ label: 'Прицельный снимок зуба', aud: ['adult', 'child'] }],
  },
  {
    id: 'urgent',
    title: 'Неотложная помощь',
    desc: 'Приём при острой зубной боли',
    positions: [{ label: 'Неотложка для взрослых', aud: ['adult'] }],
  },
  {
    id: 'hygiene',
    title: 'Гигиена и отбеливание',
    desc: 'Профессиональная чистка зубов и осветление эмали',
    positions: [],
    pending: { label: 'В открытой карточке не указано — уточняется', aud: ['adult', 'child'] },
  },
];

export const specialists = [
  { role: 'Стоматолог-хирург', aud: 'взрослые и дети' },
  { role: 'Ортодонт', aud: 'взрослые и дети' },
  { role: 'Стоматолог-ортопед', aud: 'взрослые' },
  { role: 'Пародонтолог', aud: 'взрослые' },
  { role: 'Детский стоматолог-терапевт', aud: 'дети' },
];
