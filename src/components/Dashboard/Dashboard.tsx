import { Grid } from '../Grid';
import { Button } from '../Button';
import styled from 'styled-components';
import { IEvent } from '../../utils';
import { Modal } from '../Modal';
import { useState } from 'react';

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
          I'M A MODAL
        </Modal>
      )}
    </DashboardContainerDiv>
  );
};
