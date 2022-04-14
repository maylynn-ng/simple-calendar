import moment from 'moment';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import { IEvent, theme } from '../../utils';
import { Button } from '../Button';

const CreateContainerDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    border-radius: ${theme.borderRadius.large};
    padding: 3rem;
    background-color: ${theme.colors.secondary};
  `}
`;

interface ICreateEventProps {
  onSubmit: (event: IEvent) => void;
  title: string;
  onCancel?: () => void;
  eventData?: IEvent;
  primaryButtonText: string;
}

export const CreateEvent = ({
  onSubmit,
  title,
  onCancel,
  eventData,
  primaryButtonText,
}: ICreateEventProps) => {
  const dateNow = new Date(Date.now());

  const [formData, setFormData] = useState(
    eventData || {
      name: '',
      date: moment(dateNow).format('YYYY-MM-DD'),
      startTime: moment(dateNow).format('HH:mm'),
      endTime: moment(dateNow.getTime() + 3600 * 1000).format('HH:mm'),
      color: '0' as keyof typeof theme.eventColors,
    }
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <CreateContainerDiv>
      <h1>{title}</h1>
      <FormField
        name="name"
        type="text"
        placeholder="Title"
        onChange={handleChange}
        value={formData.name}
      />

      <FormField
        name="date"
        type="date"
        onChange={handleChange}
        value={formData.date}
      />
      <FormField
        name="startTime"
        type="time"
        onChange={handleChange}
        value={formData.startTime}
      />
      <FormField
        name="endTime"
        type="time"
        onChange={handleChange}
        value={formData.endTime}
      />

      <Button
        onClick={() => onSubmit({ id: Symbol(), ...formData })}
        text={primaryButtonText}
        mode="primary"
      />
    </CreateContainerDiv>
  );
};

const FormFieldContainerDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-gap: 0.2rem;
    justify-content: space-between;
  `}
`;

const StyledInput = styled.input`
  ${({ theme }) => css`
    width: 100%;

    padding: 0.25rem;
    border-radius: ${theme.borderRadius.small};
  `}
`;

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
    <FormFieldContainerDiv>
      {label && <label>{label}</label>}
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </FormFieldContainerDiv>
  );
};
