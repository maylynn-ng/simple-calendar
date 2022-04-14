import { useContext, useState } from 'react';
import styled from 'styled-components';

import { Grid } from '../Grid';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { CreateEvent } from '../CreateEvent';
import type { IEvent } from '../../utils';
import {
  EventContext,
  nextWeek,
  previousWeek,
  getCurrentWeekDates,
  months,
} from '../../utils';

const DashboardContainerDiv = styled.div`
  padding: 1rem;

  .page-heading {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .page-contents {
    display: flex;
    flex-direction: row;
  }
`;

type ModalState =
  | { state: 'none' }
  | {
      state: 'create-event';
    }
  | {
      state: 'edit-event';
      name: IEvent['name'];
      startTime: IEvent['startTime'];
      endTime: IEvent['endTime'];
      color: IEvent['color'];
    }
  | {
      state: 'event-details';
      name: IEvent['name'];
      startTime: IEvent['startTime'];
      endTime: IEvent['endTime'];
      color: IEvent['color'];
    };

export const Dashboard = () => {
  const [modalState, setModalState] = useState<ModalState>({ state: 'none' });
  const { currentWeekDates, setCurrentWeekDates } = useContext(EventContext);

  const currentMonth = months[currentWeekDates.Monday.getMonth()];
  const currentYear = currentWeekDates.Monday.getFullYear();

  return (
    <DashboardContainerDiv>
      <div className="page-heading">
        <Button
          text="<"
          onClick={() => setCurrentWeekDates(prev => previousWeek(prev))}
          mode="primary"
        />
        <h1>
          {currentMonth}, {currentYear}
        </h1>
        <Button
          text=">"
          onClick={() => setCurrentWeekDates(prev => nextWeek(prev))}
          mode="primary"
        />
      </div>
      <div className="page-contents">
        <div>
          <Button
            text="TODAY"
            onClick={() => setCurrentWeekDates(getCurrentWeekDates(new Date()))}
            mode="primary"
          />
        </div>
        <div>
          <Button
            text="CREATE EVENT"
            onClick={() => setModalState({ state: 'create-event' })}
            mode="primary"
          />
        </div>
        <Grid />
      </div>
      {modalState.state === 'create-event' && (
        <Modal onOutsideClick={() => setModalState({ state: 'none' })}>
          <CreateEvent onSuccess={() => setModalState({ state: 'none' })} />
        </Modal>
      )}
    </DashboardContainerDiv>
  );
};
