// Только проверенные факты о клинике: адрес, телефон и оценки с открытых карточек.
export const clinic = {
  name: 'Dentika',
  address: 'ул. Генерала Махмута Гареева, 9/1, офис 1102',
  district: 'Салават Купере, Кировский район, Казань',
  phoneDisplay: '+7 (910) 286-67-67',
  phoneHref: 'tel:+79102866767',
  mapHref: 'https://yandex.ru/maps/org/dentika/146051744492/',
  // Встраиваемая карта Яндекса с карточкой клиники; грузится только по нажатию
  mapWidget: 'https://yandex.ru/map-widget/v1/org/dentika/146051744492/',
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
export type DirectionId = 'therapy' | 'surgery' | 'implant' | 'prosthetics' | 'orthodontics' | 'periodontics';

// Единственный список направлений: из него строятся схема «Что лечим», плашки первого экрана и запись.
// Состав по открытой карточке 2ГИС: детям терапевт, хирург, ортодонт;
// взрослым хирург, имплантация, ортопед, ортодонт, пародонтолог.
// Взрослый терапевт в карточке не указан, поэтому терапия помечена как детская.
export const directions: { id: DirectionId; label: string; note: string; aud: Audience[] }[] = [
  { id: 'therapy', label: 'Детская терапия', note: 'лечение кариеса', aud: ['child'] },
  { id: 'surgery', label: 'Хирургия', note: 'удаление зубов', aud: ['adult', 'child'] },
  { id: 'implant', label: 'Имплантация', note: 'восстановление зубов', aud: ['adult'] },
  { id: 'prosthetics', label: 'Ортопедия', note: 'протезирование зубов', aud: ['adult'] },
  { id: 'orthodontics', label: 'Ортодонтия', note: 'исправление прикуса', aud: ['adult', 'child'] },
  { id: 'periodontics', label: 'Пародонтология', note: 'лечение дёсен', aud: ['adult'] },
];

export const direction = (id: DirectionId) => directions.find((item) => item.id === id)!;
export const audienceText = (aud: Audience[]) =>
  aud.length > 1 ? 'для детей и взрослых' : aud[0] === 'adult' ? 'для взрослых' : 'для детей';

// Где направление стоит на схеме зубного ряда: сторона плашки, высота и зуб, к которому идёт выноска.
// Каждое направление из списка выше есть на схеме у всех своих аудиторий.
export const treatments: {
  dir: DirectionId;
  aud: Audience;
  side: 'l' | 'r';
  y: number;
  tooth: [arch: 'u' | 'l' | 'mu' | 'ml', index: number];
  ring?: boolean;
}[] = [
  { dir: 'orthodontics', aud: 'adult', side: 'l', y: 165, tooth: ['u', 7] },
  { dir: 'periodontics', aud: 'adult', side: 'l', y: 320, tooth: ['l', 0] },
  { dir: 'surgery', aud: 'adult', side: 'l', y: 475, tooth: ['l', 2] },
  { dir: 'prosthetics', aud: 'adult', side: 'r', y: 190, tooth: ['u', 11] },
  { dir: 'implant', aud: 'adult', side: 'r', y: 470, tooth: ['l', 13], ring: true },
  { dir: 'therapy', aud: 'child', side: 'l', y: 200, tooth: ['mu', 1] },
  { dir: 'surgery', aud: 'child', side: 'l', y: 450, tooth: ['ml', 1] },
  { dir: 'orthodontics', aud: 'child', side: 'r', y: 300, tooth: ['mu', 8] },
];

// Демо-расписание: время и занятость условные, пока клиника не даст реальные слоты.
export const bookingTimes = ['09:00', '09:30', '10:30', '11:30', '12:00', '13:30', '15:00', '16:00', '17:30', '18:30', '19:00', '19:30'];
export const isBusy = (day: number, index: number) => (day * 7 + index * 5) % 4 === 1;
