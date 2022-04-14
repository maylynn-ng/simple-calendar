import styled, { css } from 'styled-components';

const ContainerButton = styled.button<{ mode: IButtonProps['mode'] }>`
  ${({ theme, mode }) => css`
    padding: 1rem 0.5rem;
    height: 100%;
    width: 100%;

    font-weight: bold;

    border: none;

    cursor: pointer;

    ${mode === 'primary'
      ? `
      border: solid 0.1rem ${theme.colors.primary};
      border-radius: ${theme.borderRadius.large};
      background-color: ${theme.colors.white};

      `
      : `
      background-color: transparent;

      font-size: 1.5rem;

      `}
  `}
`;

interface IButtonProps {
  text: string;
  onClick: () => void;
  mode: 'primary' | 'secondary';
}

export const Button = ({ text, onClick, mode }: IButtonProps) => {
  return (
    <ContainerButton mode={mode} onClick={onClick}>
      <span>{text}</span>
    </ContainerButton>
  );
};
