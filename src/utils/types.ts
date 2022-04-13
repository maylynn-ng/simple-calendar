import { theme } from './theme';
import { dayDateMap } from './constants';

export interface IEvent {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  color: keyof typeof theme.eventColors;
}

export type ICurrentWeek = Record<keyof typeof dayDateMap, Date>;
