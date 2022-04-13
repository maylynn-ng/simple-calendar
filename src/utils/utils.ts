import { days, dayDateMap } from './constants';
import { ICurrentWeek } from './types';

export const getCurrentWeekDates = () => {
  const now = new Date();
  const currentWeek: Partial<ICurrentWeek> = {};

  const week = [];
  // Starting Monday not Sunday
  now.setDate(now.getDate() - now.getDay() + 1);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(now));
    now.setDate(now.getDate() + 1);
  }

  week.forEach(day => {
    const dayName = days[day.getDay()];
    currentWeek[dayName as keyof typeof dayDateMap] = day;
  });

  return currentWeek as ICurrentWeek;
};
