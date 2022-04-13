import { useState } from 'react';
import styled from 'styled-components';

import { Grid } from '../Grid';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { CreateEvent } from '../CreateEvent';
import type { IEvent } from '../../utils';

const DashboardContainerDiv = styled.div`
  display: flex;
  flex-direction: row;

  padding: 1rem;
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

  return (
    <DashboardContainerDiv>
      <Button
        text="CREATE EVENT"
        onClick={() => setModalState({ state: 'create-event' })}
        mode="primary"
      />
      <Grid />
      {modalState.state === 'create-event' && (
        <Modal onOutsideClick={() => setModalState({ state: 'none' })}>
          <CreateEvent onSuccess={() => setModalState({ state: 'none' })} />
        </Modal>
      )}
    </DashboardContainerDiv>
  );
};
