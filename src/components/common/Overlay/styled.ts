import styled, { css } from 'styled-components';

interface OverlayProps {
  $isOpen: boolean;
}

export const OverlayContainer = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;
  width: 100dvw;
  height: 100dvh;
  background-color: ${({ theme }) => theme.neutral.black};
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 0.3;
      visibility: visible;
    `}
`;
