import styled, { css } from 'styled-components';

import { IEvent } from '../../utils';

const EventContainerDiv = styled.div<{
  color: IEvent['color'];
  height: number;
  top: number;
}>`
  ${({ color, theme, height, top }) => css`
    position: absolute;
    top: ${top}%;

    height: ${height}%;
    border-radius: ${theme.borderRadius};

    background-color: ${theme.eventColors[color]};
  `}
`;

interface IEventProps {
  name: IEvent['name'];
  startTime: IEvent['startTime'];
  endTime: IEvent['endTime'];
  color: IEvent['color'];
}

export const Event = ({ name, startTime, endTime, color }: IEventProps) => {
  const startTimeInMinutes = calcTimeInMinutes(startTime);
  const endTimeInMinutes = calcTimeInMinutes(endTime);

  return (
    <EventContainerDiv
      color={color}
      height={calcHeight({ startTimeInMinutes, endTimeInMinutes })}
      top={calcStartPositionPercentage(startTimeInMinutes)}>
      <p>{name}</p>
      <p>
        {startTime} - {endTime}
      </p>
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
