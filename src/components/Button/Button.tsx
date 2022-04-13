import styled, { css } from 'styled-components';

const ContainerButton = styled.button<{ mode: IButtonProps['mode'] }>`
  ${({ theme, mode }) => css`
    padding: 0.5rem;

    ${mode === 'primary' ? `border-radius: ${theme.borderRadius}` : ''};
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
