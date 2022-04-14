import styled, { css } from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import { HourContainerDiv } from '../Grid';
import {
  EventContext,
  hours,
  IEvent,
  calcTimeInMinutes,
  calcStartPositionPercentage,
} from '../../utils';
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

    padding-top: 1rem;

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

  const today = new Date();
  const isToday = today.toLocaleDateString() === date.toLocaleDateString();
  const timeRightNow = moment(today).format('HH:mm');

  const todaysEvents = events
    .filter(
      event =>
        moment(event.date).format('YYYY-MM-DD') ===
        moment(date).format('YYYY-MM-DD')
    )
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const overlappedEvents = todaysEvents.map((todaysEvent, i) => {
    let overlap = 0;
    const startTimeInMinutes = calcTimeInMinutes(todaysEvent.startTime);
    // only take the events previous to this one
    todaysEvents.slice(0, i).forEach(event => {
      const prevStartTime = calcTimeInMinutes(event.startTime);
      const prevEndTime = calcTimeInMinutes(event.endTime);

      if (
        prevStartTime < startTimeInMinutes &&
        startTimeInMinutes < prevEndTime
      ) {
        overlap++;
      }
    });

    return { ...todaysEvent, overlap };
  });

  return (
    <DayContainerDiv>
      <HourContainerDiv className="day-heading" isToday={isToday}>
        <div className="day-heading-date">
          <span>{day}</span>
          <span>{date.getDate()}</span>
        </div>
      </HourContainerDiv>
      <div className="day-hours">
        {isToday ? <TodayMarker time={timeRightNow} /> : null}
        {overlappedEvents.map((event, i) => (
          <Event
            index={i}
            key={`event-${event.date}-${i}`}
            onClick={() => onEventClick(event)}
            name={event.name}
            startTime={event.startTime}
            endTime={event.endTime}
            color={event.color}
            overlap={event.overlap}
          />
        ))}

        {hours.map((hour, i) => (
          <HourContainerDiv key={`hour-${i}`} />
        ))}
      </div>
    </DayContainerDiv>
  );
};

const StyledMarkerDiv = styled.div<{ top: number }>`
  ${({ top }) => css`
    position: absolute;
    top: ${top}%;

    display: flex;
    align-items: center;

    width: 100%;

    .dot {
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background-color: red;
    }

    .line {
      width: 100%;
      height: 0.1rem;

      background-color: red;
    }
  `}
`;

interface ITodayMarkerProps {
  time: string;
}

const TodayMarker = ({ time }: ITodayMarkerProps) => {
  const timeInMinutes = calcTimeInMinutes(time);
  const position = calcStartPositionPercentage(timeInMinutes);

  return (
    <StyledMarkerDiv top={position}>
      <div className="dot" />
      <div className="line" />
    </StyledMarkerDiv>
  );
};
