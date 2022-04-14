import styled, { css } from 'styled-components';

import {
  calcHeightPercentage,
  calcStartPositionPercentage,
  calcTimeInMinutes,
} from '../../utils';
import type { IEvent } from '../../utils';

const EventContainerDiv = styled.div<{
  height: number;
  top: number;
  overlap: number;
  index: number;
}>`
  ${({ theme, height, top, overlap, index }) => css`
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
    background-color: ${theme.eventColors[0]};
    padding-top: 0.2rem;

    cursor: pointer;
  `}
`;

interface IEventProps {
  name: IEvent['name'];
  startTime: IEvent['startTime'];
  endTime: IEvent['endTime'];
  onClick: () => void;
  overlap: number;
  index: number;
}

export const Event = ({
  name,
  startTime,
  endTime,
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
      height={calcHeightPercentage({ startTimeInMinutes, endTimeInMinutes })}
      top={calcStartPositionPercentage(startTimeInMinutes)}>
      <span>{name}</span>
      <span>
        {startTime} - {endTime}
      </span>
    </EventContainerDiv>
  );
};
