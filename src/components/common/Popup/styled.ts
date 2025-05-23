import styled, { css } from 'styled-components';

interface PopupWrapperProps {
  $isError: boolean;
  $isVisible: boolean;
}

export const PopupWrapper = styled.div<PopupWrapperProps>`
  position: fixed;
  top: -100%;
  left: 50%;
  width: 100%;
  max-width: 400px;
  transform: translateX(-50%);
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.status.success};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  transition: all 0.8s ease-in-out;
  z-index: 600;

  ${({ $isError }) =>
    $isError &&
    css`
      background-color: ${({ theme }) => theme.status.error};
    `}

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      top: 44px;
    `}

	@media (max-width: 620px) {
    max-width: calc(100% - 20px);
  }
`;

export const PopupMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['lg']};
  color: ${({ theme }) => theme.neutral.white};
  text-align: center;
  margin: 0 auto;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['sm']};
    max-width: calc(100% - 20px);
  }
`;

export const PopupCloseIcon = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize['sm']};
  color: ${({ theme }) => theme.neutral.white};
  cursor: pointer;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['sm']};
    top: ${({ theme }) => theme.spacing[1]};
    right: ${({ theme }) => theme.spacing[1]};
  }
`;
