import { ReactChild } from 'react';
import styled, { css } from 'styled-components';

const ModalContainerDiv = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5rem;
  `}
`;

interface IModalProps {
  onOutsideClick: () => void;
  children: ReactChild;
}

export const Modal = ({ children, onOutsideClick }: IModalProps) => {
  return <ModalContainerDiv>{children}</ModalContainerDiv>;
};
