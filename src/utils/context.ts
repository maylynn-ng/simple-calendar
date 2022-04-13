import React from 'react';
import { IEvent } from './types';

interface IEventContext {
  events: IEvent[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
}

export const EventContext = React.createContext<IEventContext | null>(null);
