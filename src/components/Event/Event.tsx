import styled, { css } from 'styled-components';

import { IEvent } from '../../utils';

const EventContainerDiv = styled.div<{ color: IEvent['color'] }>`
  ${({ color, theme }) => css`
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
  return (
    <EventContainerDiv color={color}>
      <p>{name}</p>
      <p>
        {startTime} - {endTime}
      </p>
    </EventContainerDiv>
  );
};
