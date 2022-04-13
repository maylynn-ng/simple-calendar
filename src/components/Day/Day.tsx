import styled from 'styled-components';

import { HourContainerDiv } from '../Grid';
import { hours } from '../../utils';

const DayContainerDiv = styled.div`
  width: 100%;
  min-width: 60px;

  border-right: solid 2px grey;
`;

interface DayProps {
  day: string;
}

export const Day = ({ day }: DayProps) => {
  return (
    <DayContainerDiv>
      <HourContainerDiv>{day}</HourContainerDiv>
      {hours.map(hour => (
        <HourContainerDiv />
      ))}
    </DayContainerDiv>
  );
};
