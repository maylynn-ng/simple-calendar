import styled, { css } from 'styled-components';

import { Day } from '../Day';
import { hours, days } from '../../utils';

const GridContainerDiv = styled.div`
  display: flex;
  flex-direction: row;

  padding: 1rem;

  height: 100%;
  width: 100%;
`;

const DaysContainerDiv = styled.div`
  width: 100%;
`;

export const HourContainerDiv = styled.div`
  ${({ theme }) => css`
    height: ${theme.heights.hour};

    border-bottom: solid 1px grey;
  `}
`;

export const Grid = () => {
  return (
    <GridContainerDiv>
      <div>
        <HourContainerDiv />
        {hours.map(time => (
          <HourContainerDiv>
            <span>{time}</span>
          </HourContainerDiv>
        ))}
      </div>
      {days.map(day => (
        <Day day={day} />
      ))}
    </GridContainerDiv>
  );
};
