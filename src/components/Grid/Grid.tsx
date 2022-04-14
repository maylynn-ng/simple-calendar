import styled, { css } from 'styled-components';

import { Day } from '../Day';
import { hours, EventContext } from '../../utils';
import { useContext } from 'react';

const GridContainerDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;

    padding: 2rem;
    border-radius: ${theme.borderRadius.large};
    border: solid 0.1rem ${theme.colors.secondary};
    height: 100%;
    width: 100%;

    background-color: ${theme.colors.white};

    .day-grid {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .day-heading-date {
      display: flex;
      flex-direction: column;
      position: sticky;

      width: 100%;

      text-align: center;
    }
  `}
`;

export const HourContainerDiv = styled.div<{
  isToday?: boolean;
  isPlaceholder?: boolean;
}>`
  ${({ theme, isToday, isPlaceholder }) => css`
    height: ${theme.heights.hour};

    border-bottom: solid 1px grey;

    ${isToday
      ? `
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.white};
    `
      : ''}

    ${isPlaceholder
      ? ` 
        margin-top: 1rem;
      `
      : ''}
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
        <HourContainerDiv isPlaceholder />
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
