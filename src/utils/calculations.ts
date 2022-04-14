import { days } from './constants';
import { ICurrentWeek } from './types';

export const getCurrentWeekDates = (date: Date) => {
  const week = [];
  // Starting Monday not Sunday
  date.setDate(date.getDate() - date.getDay() + 1);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return week.reduce((acc, day) => {
    const dayName = days[day.getDay()];
    return { ...acc, [dayName]: day };
  }, {}) as ICurrentWeek;
};

const changeWeek = (direction: 'previous' | 'next') => {
  return (week: ICurrentWeek) => {
    const change = direction === 'previous' ? -7 : 7;

    return Object.entries(week).reduce((acc, [day, date]) => {
      // make a copy of date object so as not to mutate the original
      const previousDate = new Date(date);
      const newDate = new Date(
        previousDate.setDate(previousDate.getDate() + change)
      );
      return { ...acc, [day]: newDate };
    }, {}) as ICurrentWeek;
  };
};

export const nextWeek = changeWeek('next');
export const previousWeek = changeWeek('previous');

// EVENT POSITIONING

export const calcTimeInMinutes = (time: string) => {
  const splitTime = time.split(':');
  return +splitTime[0] * 60 + +splitTime[1];
};

export const calcStartPositionPercentage = (timeInMinutes: number) => {
  const minutesInDay = 1440;
  return (timeInMinutes / minutesInDay) * 100;
};

export const calcHeight = ({
  startTimeInMinutes,
  endTimeInMinutes,
}: {
  startTimeInMinutes: number;
  endTimeInMinutes: number;
}) => {
  const minutesInDay = 1440;
  return ((endTimeInMinutes - startTimeInMinutes) / minutesInDay) * 100;
};
