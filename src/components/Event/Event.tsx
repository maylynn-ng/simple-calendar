import styled, { css } from 'styled-components';

import { IEvent } from '../../utils';

const EventContainerDiv = styled.div<{
  color: IEvent['color'];
  height: number;
  top: number;
}>`
  ${({ color, theme, height, top }) => css`
    display: flex;
    flex-direction: column;

    position: absolute;
    top: ${top}%;
    height: ${height}%;
    width: 100%;

    padding: 0.2rem;
    border-radius: ${theme.borderRadius.large};
    border: solid 2px white;
    background-color: ${theme.eventColors[color]};

    cursor: pointer;
  `}
`;

interface IEventProps {
  name: IEvent['name'];
  startTime: IEvent['startTime'];
  endTime: IEvent['endTime'];
  color: IEvent['color'];
  onClick: () => void;
}

export const Event = ({
  name,
  startTime,
  endTime,
  color,
  onClick,
}: IEventProps) => {
  const startTimeInMinutes = calcTimeInMinutes(startTime);
  const endTimeInMinutes = calcTimeInMinutes(endTime);

  return (
    <EventContainerDiv
      onClick={onClick}
      color={color}
      height={calcHeight({ startTimeInMinutes, endTimeInMinutes })}
      top={calcStartPositionPercentage(startTimeInMinutes)}>
      <span>{name}</span>
      <span>
        {startTime} - {endTime}
      </span>
    </EventContainerDiv>
  );
};

// EVENT PLACEMENT CALCULATIONS
const calcTimeInMinutes = (time: string) => {
  const splitTime = time.split(':');
  return +splitTime[0] * 60 + +splitTime[1];
};

const calcStartPositionPercentage = (timeInMinutes: number) => {
  const minutesInDay = 1440;
  return (timeInMinutes / minutesInDay) * 100;
};

const calcHeight = ({
  startTimeInMinutes,
  endTimeInMinutes,
}: {
  startTimeInMinutes: number;
  endTimeInMinutes: number;
}) => {
  const minutesInDay = 1440;
  return ((endTimeInMinutes - startTimeInMinutes) / minutesInDay) * 100;
};
