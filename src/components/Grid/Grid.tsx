import styled, { css } from 'styled-components';

import { Day } from '../Day';
import { hours, EventContext } from '../../utils';
import { useContext } from 'react';

const GridContainerDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    padding: 2rem;
    border-radius: ${theme.borderRadius};
    height: 100%;
    width: 100%;

    background-color: ${theme.colors.white};
  `}
`;

export const HourContainerDiv = styled.div`
  ${({ theme }) => css`
    height: ${theme.heights.hour};

    border-bottom: solid 1px grey;
  `}
`;

interface IGridProps {
  onEventClick: React.ComponentProps<typeof Day>['onEventClick'];
}

export const Grid = ({ onEventClick }: IGridProps) => {
  const { currentWeekDates } = useContext(EventContext);

  return (
    <GridContainerDiv>
      <div>
        <HourContainerDiv />
        {hours.map((time, i) => (
          <HourContainerDiv key={`time-${i}`}>
            <span>{time}</span>
          </HourContainerDiv>
        ))}
      </div>
      {Object.entries(currentWeekDates).map(([day, date]) => (
        <Day key={day} day={day} date={date} onEventClick={onEventClick} />
      ))}
    </GridContainerDiv>
  );
};
