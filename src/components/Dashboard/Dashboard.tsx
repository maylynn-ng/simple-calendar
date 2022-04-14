import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { Grid } from '../Grid';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { CreateEvent } from '../CreateEvent';
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
    background-color: ${theme.colors.muted};
    padding: 1rem;

    height: 100%;
    width: 100%;

    .page-heading {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .month-year {
        width: 100%;
        text-align: center;
      }
    }

    .page-contents {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .buttons {
        padding-right: 1rem;
      }

      .button {
        padding: 1rem 0;
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
      color: IEvent['color'];
    }
  | {
      state: 'event-details';
      id: IEvent['id'];
      name: IEvent['name'];
      date: IEvent['date'];
      startTime: IEvent['startTime'];
      endTime: IEvent['endTime'];
      color: IEvent['color'];
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
        <Button
          text="<"
          onClick={() => setCurrentWeekDates(prev => previousWeek(prev))}
          mode="secondary"
        />
        <h1 className="month-year">
          {currentMonth}, {currentYear}
        </h1>
        <Button
          text=">"
          onClick={() => setCurrentWeekDates(prev => nextWeek(prev))}
          mode="secondary"
        />
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
        <Modal onOutsideClick={closeModals}>
          <CreateEvent
            onSubmit={onCreateEvent}
            title="Create an event"
            primaryButtonText="Create"
          />
        </Modal>
      )}
      {modalState.state === 'edit-event' && (
        <Modal onOutsideClick={closeModals}>
          <CreateEvent
            onSubmit={onEditEvent}
            title="Edit event"
            eventData={{
              id: modalState.id,
              name: modalState.name,
              date: modalState.date,
              startTime: modalState.startTime,
              endTime: modalState.endTime,
              color: modalState.color,
            }}
            primaryButtonText="Edit"
          />
        </Modal>
      )}
    </DashboardContainerDiv>
  );
};
