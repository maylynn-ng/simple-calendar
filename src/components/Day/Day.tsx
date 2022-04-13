import styled from 'styled-components';

import { HourContainerDiv } from '../Grid';
import { Event } from '../Event';
import { hours } from '../../utils';

const DayContainerDiv = styled.div`
  position: relative;

  width: 100%;
  min-width: 4rem;

  border-right: solid 2px grey;
`;

interface DayProps {
  day: string;
}

export const Day = ({ day }: DayProps) => {
  return (
    <DayContainerDiv>
      <HourContainerDiv>{day}</HourContainerDiv>

      <Event
        name={'May Day'}
        startTime={'13:00'}
        endTime={'15:00'}
        color={'yellow'}
      />
      {hours.map((hour, i) => (
        <HourContainerDiv key={`hour-${i}`} />
      ))}
    </DayContainerDiv>
  );
};
