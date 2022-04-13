import moment from 'moment';

export const hours = Array.from(
  {
    length: 24,
  },
  (_, hour) =>
    moment({
      hour: Math.floor(hour),
      minutes: 0,
    }).format('HH:mm')
);

export const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
