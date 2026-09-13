// Только проверенные факты о клинике: адрес, телефон и оценки с открытых карточек.
export const clinic = {
  name: 'Dentika',
  address: 'ул. Генерала Махмута Гареева, 9/1, офис 1102',
  district: 'Салават Купере, Кировский район, Казань',
  phoneDisplay: '+7 (910) 286-67-67',
  phoneHref: 'tel:+79102866767',
  mapHref: 'https://yandex.ru/maps/org/dentika/146051744492/',
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

export type Audience = 'adult' | 'child';

// Направления по открытой карточке 2ГИС: детям терапевт, хирург, ортодонт;
// взрослым хирург, имплантация, ортопед, ортодонт, пародонтолог.
// Взрослый терапевт в карточке не указан, поэтому терапия помечена как детская.
export const treatments: {
  aud: Audience;
  title: string;
  note: string;
  side: 'l' | 'r';
  y: number;
  tooth: [arch: 'u' | 'l' | 'mu' | 'ml', index: number];
  ring?: boolean;
}[] = [
  { aud: 'adult', title: 'Ортодонтия', note: 'исправление прикуса', side: 'l', y: 170, tooth: ['u', 7] },
  { aud: 'adult', title: 'Хирургия', note: 'удаление зубов', side: 'l', y: 470, tooth: ['l', 2] },
  { aud: 'adult', title: 'Ортопедия', note: 'протезирование зубов', side: 'r', y: 190, tooth: ['u', 11] },
  { aud: 'adult', title: 'Имплантация', note: 'восстановление зубов', side: 'r', y: 470, tooth: ['l', 13], ring: true },
  { aud: 'child', title: 'Терапия', note: 'лечение кариеса', side: 'l', y: 200, tooth: ['mu', 1] },
  { aud: 'child', title: 'Хирургия', note: 'удаление зубов', side: 'l', y: 450, tooth: ['ml', 1] },
  { aud: 'child', title: 'Ортодонтия', note: 'исправление прикуса', side: 'r', y: 300, tooth: ['mu', 8] },
];

export const bookingDirections = ['Детская терапия', 'Хирургия', 'Имплантация', 'Ортопедия', 'Ортодонтия', 'Пародонтология'];

// Демо-расписание: время и занятость условные, пока клиника не даст реальные слоты.
export const bookingTimes = ['09:00', '09:30', '10:30', '11:30', '12:00', '13:30', '15:00', '16:00', '17:30', '18:30', '19:00', '19:30'];
export const isBusy = (day: number, index: number) => (day * 7 + index * 5) % 4 === 1;
