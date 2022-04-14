import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { Grid } from '../Grid';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { EventForm } from '../EventForm';
import { IEvent } from '../../utils';
import {
  EventContext,
  nextWeek,
  previousWeek,
  getCurrentWeekDates,
  months,
} from '../../utils';

const DashboardContainerDiv = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};

    height: 100%;
    width: 100%;

    .page-heading {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .page-contents {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .button {
        padding: 1rem;
      }
    }
  `}
`;

type IModalState =
  | { state: 'none' }
  | {
      state: 'create-event';
    }
  | {
      state: 'edit-event';
      id: IEvent['id'];
      name: IEvent['name'];
      date: IEvent['date'];
      startTime: IEvent['startTime'];
      endTime: IEvent['endTime'];
    }
  | {
      state: 'event-details';
      id: IEvent['id'];
      name: IEvent['name'];
      date: IEvent['date'];
      startTime: IEvent['startTime'];
      endTime: IEvent['endTime'];
    };

export const Dashboard = () => {
  const { currentWeekDates, setCurrentWeekDates, setEvents } =
    useContext(EventContext);
  const [modalState, setModalState] = useState<IModalState>({ state: 'none' });

  const closeModals = () => setModalState({ state: 'none' });

  const currentMonth = months[currentWeekDates.Monday.getMonth()];
  const currentYear = currentWeekDates.Monday.getFullYear();

  const onCreateEvent = (newEvent: IEvent) => {
    setEvents(existing => [...existing, newEvent]);
    closeModals();
  };

  const onEditEvent = (updatedEvent: IEvent) => {
    setEvents(existing => {
      const removedEvent = existing.filter(
        event => event.id !== updatedEvent.id
      );
      return [...removedEvent, updatedEvent];
    });
    closeModals();
  };

  return (
    <DashboardContainerDiv>
      <div className="page-heading">
        <div className="button-navigation">
          <Button
            text="<"
            onClick={() => setCurrentWeekDates(prev => previousWeek(prev))}
            mode="secondary"
          />
        </div>
        <h1 className="month-year">
          {currentMonth}, {currentYear}
        </h1>
        <div className="button-navigation">
          <Button
            text=">"
            onClick={() => setCurrentWeekDates(prev => nextWeek(prev))}
            mode="secondary"
          />
        </div>
      </div>
      <div className="page-contents">
        <div className="buttons">
          <div className="button today">
            <Button
              text="TODAY"
              onClick={() =>
                setCurrentWeekDates(getCurrentWeekDates(new Date()))
              }
              mode="primary"
            />
          </div>
          <div className="button create">
            <Button
              text="CREATE EVENT"
              onClick={() => setModalState({ state: 'create-event' })}
              mode="primary"
            />
          </div>
        </div>
        <Grid
          onEventClick={event =>
            setModalState({
              state: 'edit-event',
              ...event,
            })
          }
        />
      </div>
      {modalState.state === 'create-event' && (
        <Modal>
          <EventForm
            onSubmit={onCreateEvent}
            onCancel={closeModals}
            title="Create an event"
            primaryButtonText="Create"
          />
        </Modal>
      )}
      {modalState.state === 'edit-event' && (
        <Modal>
          <EventForm
            onSubmit={onEditEvent}
            onCancel={closeModals}
            title="Edit event"
            eventData={{
              id: modalState.id,
              name: modalState.name,
              date: modalState.date,
              startTime: modalState.startTime,
              endTime: modalState.endTime,
            }}
            primaryButtonText="Edit"
          />
        </Modal>
      )}
    </DashboardContainerDiv>
  );
};
