import styled from 'styled-components';

interface ToggleWrapperProps {
  $toggled?: boolean;
}

interface CircleProps {
  $toggled?: boolean;
}

export const ToggleWrapper = styled.button<ToggleWrapperProps>`
  width: ${({ theme }) => theme.spacing[12]};
  height: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ $toggled, theme }) =>
    !$toggled ? theme.background.primary : theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.neutral.white};
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  flex-shrink: 0;

  @media (max-width: 620px) {
    width: ${({ theme }) => theme.spacing[8]};
    height: ${({ theme }) => theme.spacing[4]};
  }
`;

export const Circle = styled.div<CircleProps>`
  width: ${({ theme }) => theme.spacing[6]};
  height: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ $toggled, theme }) =>
    !$toggled ? theme.background.primary : theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.neutral.white};
  border-radius: 50%;
  position: absolute;
  top: -1px;
  left: ${({ $toggled }) => ($toggled ? '23px' : '-1px')};
  transition: all 0.3s ease-in-out;
  flex-shrink: 0;

  @media (max-width: 620px) {
    width: ${({ theme }) => theme.spacing[4]};
    height: ${({ theme }) => theme.spacing[4]};
    left: ${({ $toggled }) => ($toggled ? '15px' : '-1px')};
  }
`;
