import { ReactChild } from 'react';
import styled from 'styled-components';

const ModalContainerDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5rem;
`;

interface IModalProps {
  children: ReactChild;
}

export const Modal = ({ children }: IModalProps) => {
  return <ModalContainerDiv>{children}</ModalContainerDiv>;
};
