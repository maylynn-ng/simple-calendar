import styled from 'styled-components';

import { Day } from '../Day';
import { hours, days } from '../../utils';

const GridContainerDiv = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;

  border: solid 2px black;
`;

const DaysContainerDiv = styled.div`
  width: 100%;
`;

export const HourContainerDiv = styled.div`
  height: 48px;

  border-bottom: solid 1px grey;
`;

export const Grid = () => {
  return (
    <GridContainerDiv>
      <div>
        <HourContainerDiv />
        {hours.map(time => (
          <HourContainerDiv>{time}</HourContainerDiv>
        ))}
      </div>
      {days.map(day => (
        <Day day={day} />
      ))}
    </GridContainerDiv>
  );
};
