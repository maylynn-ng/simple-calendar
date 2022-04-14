export interface IEvent {
  id: symbol;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

type Days =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type ICurrentWeek = Record<Days, Date>;
