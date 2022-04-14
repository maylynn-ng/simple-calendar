import styled, { css } from 'styled-components';

import {
  calcHeight,
  calcStartPositionPercentage,
  calcTimeInMinutes,
} from '../../utils';
import type { IEvent } from '../../utils';

const EventContainerDiv = styled.div<{
  color: IEvent['color'];
  height: number;
  top: number;
  overlap: number;
  index: number;
}>`
  ${({ color, theme, height, top, overlap, index }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: ${top}%;
    left: ${overlap * 10}%;
    height: ${height}%;
    width: ${100 - overlap * 10}%;
    z-index: ${index};

    border-radius: ${theme.borderRadius.large};
    border: solid 2px white;
    background-color: ${theme.eventColors[color]};
    padding-top: 0.2rem;

    cursor: pointer;
  `}
`;

interface IEventProps {
  name: IEvent['name'];
  startTime: IEvent['startTime'];
  endTime: IEvent['endTime'];
  color: IEvent['color'];
  onClick: () => void;
  overlap: number;
  index: number;
}

export const Event = ({
  name,
  startTime,
  endTime,
  color,
  onClick,
  overlap,
  index,
}: IEventProps) => {
  const startTimeInMinutes = calcTimeInMinutes(startTime);
  const endTimeInMinutes = calcTimeInMinutes(endTime);

  return (
    <EventContainerDiv
      index={index}
      overlap={overlap}
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
