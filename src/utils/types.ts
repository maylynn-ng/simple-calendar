import { theme } from './theme';

export interface IEvent {
  name: string;
  startTime: string;
  endTime: string;
  color: keyof typeof theme.eventColors;
}
