import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import { HourContainerDiv } from '../Grid';
import { EventContext, hours, IEvent } from '../../utils';
import { Event } from '../Event';

const DayContainerDiv = styled.div`
  width: 100%;
  min-width: 4rem;

  &:not(:last-child) {
    border-right: solid 2px grey;
  }

  .day-heading {
    display: flex;
    flex-direction: column;

    text-align: center;
  }

  .day-hours {
    position: relative;
  }
`;

interface IDayProps {
  day: string;
  date: Date;
  onEventClick: (event: IEvent) => void;
}

export const Day = ({ day, date, onEventClick }: IDayProps) => {
  const { events } = useContext(EventContext);

  const todaysEvents = events.filter(
    event =>
      moment(event.date).format('YYYY-MM-DD') ===
      moment(date).format('YYYY-MM-DD')
  );

  //

  return (
    <DayContainerDiv>
      <HourContainerDiv className="day-heading">
        <span>{day}</span>
        <span>{date.getDate()}</span>
      </HourContainerDiv>
      <div className="day-hours">
        {todaysEvents.map((event, i) => (
          <Event
            key={`event-${event.date}-${i}`}
            onClick={() => onEventClick(event)}
            name={event.name}
            startTime={event.startTime}
            endTime={event.endTime}
            color={event.color}
          />
        ))}

        {hours.map((hour, i) => (
          <HourContainerDiv key={`hour-${i}`} />
        ))}
      </div>
    </DayContainerDiv>
  );
};
