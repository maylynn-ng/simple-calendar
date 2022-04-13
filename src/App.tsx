import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Dashboard } from './components';
import { EventContext, theme, getCurrentWeekDates } from './utils';
import type { IEvent } from './utils';

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentWeekDates, setCurrentWeekDates] = useState(
    getCurrentWeekDates()
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <EventContext.Provider value={{ events, setEvents, currentWeekDates }}>
          <Dashboard />
        </EventContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
