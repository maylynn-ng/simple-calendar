import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import { HourContainerDiv } from '../Grid';
import { EventContext, hours } from '../../utils';
import { Event } from '../Event';

const DayContainerDiv = styled.div`
  position: relative;

  width: 100%;
  min-width: 4rem;

  border-right: solid 2px grey;

  .day-heading {
    display: flex;
    flex-direction: column;

    text-align: center;
  }
`;

interface IDayProps {
  day: string;
  date: Date;
}

export const Day = ({ day, date }: IDayProps) => {
  const { events } = useContext(EventContext);

  const todaysEvents = events.filter(
    event =>
      moment(event.date).format('YYYY-MM-DD') ===
      moment(date).format('YYYY-MM-DD')
  );

  return (
    <DayContainerDiv>
      {todaysEvents.map((event, i) => (
        <Event
          key={`event-${event.date}-${i}`}
          name={event.name}
          startTime={event.startTime}
          endTime={event.endTime}
          color={event.color}
        />
      ))}

      <HourContainerDiv className="day-heading">
        <span>{day}</span>
        <span>{date.getDate()}</span>
      </HourContainerDiv>

      {hours.map((hour, i) => (
        <HourContainerDiv key={`hour-${i}`} />
      ))}
    </DayContainerDiv>
  );
};
