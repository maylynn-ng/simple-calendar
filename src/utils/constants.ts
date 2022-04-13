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
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const dayDateMap = {
  Monday: '',
  Tuesday: '',
  Wednesday: '',
  Thursday: '',
  Friday: '',
  Saturday: '',
  Sunday: '',
};
