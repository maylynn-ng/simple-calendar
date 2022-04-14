import React from 'react';
import { getCurrentWeekDates } from './utils';
import type { ICurrentWeek, IEvent } from './types';

interface IEventContext {
  events: IEvent[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  setCurrentWeekDates: React.Dispatch<React.SetStateAction<ICurrentWeek>>;
  currentWeekDates: ICurrentWeek;
}

export const EventContext = React.createContext<IEventContext>({
  events: [],
  setEvents: () => {
    console.log('context not found');
  },
  currentWeekDates: getCurrentWeekDates(new Date()),
  setCurrentWeekDates: () => {
    console.log('context not found');
  },
});
