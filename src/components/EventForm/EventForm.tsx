import { useState } from 'react';
import styled, { css } from 'styled-components';

import { theme, formatDate, formatTime } from '../../utils';
import type { IEvent } from '../../utils';
import { Button } from '../Button';

const CreateContainerDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    border-radius: ${theme.borderRadius.large};
    border: solid 0.2rem ${theme.colors.secondary};
    padding: 3rem;
    background-color: ${theme.colors.offWhite};

    .title {
      color: ${theme.colors.primary};
    }

    .buttons {
      display: flex;
      flex-direction: row;
    }
  `}
`;

interface IEventFormProps {
  onSubmit: (event: IEvent) => void;
  title: string;
  onCancel?: () => void;
  eventData?: IEvent;
  primaryButtonText: string;
}

export const EventForm = ({
  onSubmit,
  title,
  onCancel,
  eventData,
  primaryButtonText,
}: IEventFormProps) => {
  const dateNow = new Date(Date.now());

  // if no event data is passed then let the form default to right now
  const [formData, setFormData] = useState(
    eventData || {
      name: '',
      date: formatDate(dateNow),
      startTime: formatTime(dateNow),
      endTime: formatTime(dateNow.getTime() + 3600 * 1000),
      color: '0' as keyof typeof theme.eventColors,
    }
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <CreateContainerDiv>
      <h1 className="title">{title}</h1>
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

      <div className="buttons">
        <Button onClick={() => onCancel?.()} text="Cancel" mode="primary" />

        <Button
          onClick={() => onSubmit({ id: Symbol(), ...formData })}
          text={primaryButtonText}
          mode="primary"
        />
      </div>
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

    padding: 0.5rem;
    border-radius: ${theme.borderRadius.small};
    margin: 1rem 0rem;
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
