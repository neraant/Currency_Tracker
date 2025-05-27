import styled, { css } from 'styled-components';

interface ModalContainerProps {
  $isModal: boolean;
}
export const ModalContainer = styled.div<ModalContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 600px;
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.primary};
  z-index: 500;
  min-height: 250px;
  transform: translate(-50%, -45%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;

  ${({ $isModal }) =>
    $isModal &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%);
    `}

  @media (max-width: 620px) {
    max-width: calc(100vw - 20px);
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;
export const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  }
`;
export const ModalCloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing[8]};
  right: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    top: ${({ theme }) => theme.spacing[6]};
  }
`;
export const ModalButton = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.neutral.black};
  background-color: ${({ theme }) => theme.neutral.white};
  transition: all 0.3s ease-in-out;
  border: 1px solid ${({ theme }) => theme.neutral.white};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.neutral.white};
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
  }
`;
