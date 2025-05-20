import styled, { css } from 'styled-components';

interface ChartFormProps {
  $isModal: boolean;
}

export const ChartForm = styled.div<ChartFormProps>`
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
  z-index: 20;
  min-height: 250px;
  max-height: 80dvh;
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
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.preblack};
  z-index: 10;
`;

export const ChartInputsContainer = styled.div`
  max-height: calc(70dvh - 200px);
  overflow-y: auto;
  margin-bottom: 60px;
  padding-right: ${({ theme }) => theme.spacing[3]};
  scrollbar-width: thin;
`;

export const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.text.primary};
  width: 100%;
  flex-shrink: 0;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['md']};
  }
`;

export const ChartCloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    top: 0;
    right: ${({ theme }) => theme.spacing[6]};
  }
`;

export const ChartButton = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.neutral.black};
  background-color: ${({ theme }) => theme.neutral.white};
  transition: all 0.3s ease-in-out;
  border: 1px solid ${({ theme }) => theme.neutral.white};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.neutral.white};
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['md']};
  }
`;
