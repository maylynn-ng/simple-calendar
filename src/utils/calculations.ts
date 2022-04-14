import moment from 'moment';
import { IEvent } from '.';
import { days } from './constants';
import { ICurrentWeek } from './types';

// CALCULATING WEEKS --------------------------

export const getCurrentWeekDates = (date: Date) => {
  const week = [];
  // Set date to Monday of `date` week
  // plus 1 to account for no 0th index of `getDay`
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

// DATE TIME FORMATTING

export const formatDate = (date: Date | number | string) =>
  moment(date).format('YYYY-MM-DD');
export const formatTime = (time: Date | number) => moment(time).format('HH:mm');

// EVENT POSITIONING ---------------------------

// time comes in as "13:21"
export const calcTimeInMinutes = (time: string) => {
  const splitTime = time.split(':');
  return +splitTime[0] * 60 + +splitTime[1];
};

export const calcStartPositionPercentage = (timeInMinutes: number) => {
  const minutesInDay = 1440;
  return (timeInMinutes / minutesInDay) * 100;
};

export const calcHeightPercentage = ({
  startTimeInMinutes,
  endTimeInMinutes,
}: {
  startTimeInMinutes: number;
  endTimeInMinutes: number;
}) => {
  const minutesInDay = 1440;
  return ((endTimeInMinutes - startTimeInMinutes) / minutesInDay) * 100;
};

export const calcEventOverlap = (todaysEvents: IEvent[]) => {
  return todaysEvents.map((todaysEvent, i) => {
    let overlap = 0;
    const startTimeInMinutes = calcTimeInMinutes(todaysEvent.startTime);

    // only take the events previous to this one
    todaysEvents.slice(0, i).forEach(event => {
      const prevStartTime = calcTimeInMinutes(event.startTime);
      const prevEndTime = calcTimeInMinutes(event.endTime);

      // as they are sorted, we can just check if the startTime is within any of the previous event times
      if (
        prevStartTime < startTimeInMinutes &&
        startTimeInMinutes < prevEndTime
      ) {
        overlap++;
      }
    });

    return { ...todaysEvent, overlap };
  });
};
