import moment from 'moment';
import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { EventContext, theme } from '../../utils';
import { Button } from '../Button';

const CreateContainerDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    padding: 3rem;
    background-color: ${theme.eventColors.lightBlue};
  `}
`;

interface ICreateEventProps {
  onSuccess: () => void;
}

export const CreateEvent = ({ onSuccess }: ICreateEventProps) => {
  const { setEvents } = useContext(EventContext);
  const dateNow = new Date(Date.now());

  const [formData, setFormData] = useState({
    name: '',
    date: moment(dateNow).format('YYYY-MM-DD'),
    startTime: moment(dateNow).format('HH:mm'),
    endTime: moment(dateNow.getTime() + 3600 * 1000).format('HH:mm'),
    color: 'yellow' as keyof typeof theme.eventColors,
  });

  const onSubmit = () => {
    setEvents(existing => [...existing, formData]);
    onSuccess();
  };

  return (
    <CreateContainerDiv>
      <h1>Create an event</h1>
      <FormField
        name="name"
        type="text"
        placeholder="Title"
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        value={formData.name}
      />

      <FormField
        name="date"
        type="date"
        onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
        value={formData.date}
      />
      <FormField
        name="startTime"
        type="time"
        onChange={e =>
          setFormData(prev => ({ ...prev, startTime: e.target.value }))
        }
        value={formData.startTime}
      />
      <FormField
        name="endTime"
        type="time"
        onChange={e =>
          setFormData(prev => ({ ...prev, endTime: e.target.value }))
        }
        value={formData.endTime}
      />

      <Button onClick={onSubmit} text="Create event" mode="primary" />
    </CreateContainerDiv>
  );
};

interface IFormField {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FormField = ({
  name,
  label,
  type,
  placeholder,
  onChange,
  value,
}: IFormField) => {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
};
