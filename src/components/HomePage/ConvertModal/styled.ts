import styled, { css } from 'styled-components';

import arrowIcon from '@assets/icons/arrow_icon.svg';

interface ConverterDropDownListProps {
  $isDropped: boolean;
}

interface ConverterContainerProps {
  $isModal: boolean;
}

interface ConverterInputProps {
  $isValid: boolean;
}

export const ConverterContainer = styled.div<ConverterContainerProps>`
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

export const ConverterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  background-color: ${({ theme }) => theme.neutral.preblack};
  z-index: 10;
`;

export const ConverterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  }
`;

export const ConverterCloseButton = styled.button`
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

export const ConverterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`;

export const ConverterDropDown = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spacing[4]};
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${arrowIcon});
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
  }
`;

export const ConverterDropDownInput = styled.input`
  position: relative;
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: 1px solid ${({ theme }) => theme.border.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

export const ConverterDropDownLabel = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: 1px solid ${({ theme }) => theme.border.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

export const ConverterDropDownList = styled.ul<ConverterDropDownListProps>`
  position: absolute;
  left: 0;
  top: 64px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transform-origin: top center;
  background-color: ${({ theme }) => theme.neutral.preblack};
  width: 100%;
  border-radius: 8px;
  box-shadow: 4px 0px 10px 1px rgba(0, 0, 0, 0.3);
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease,
    transform 0.3s ease;

  ${({ $isDropped }) =>
    $isDropped &&
    css`
      max-height: 200px;
      overflow-y: auto;
      opacity: 1;
      transform: scaleY(1);
    `}

  @media (max-width: 620px) {
    top: 44px;
  }
`;

export const ConverterDropDownItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSize['sm']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  border: none;
  transition: all 0.3s ease-in-out;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.border.primary};
  }
`;

export const ConverterInput = styled.input<ConverterInputProps>`
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: 1px solid ${({ theme }) => theme.border.primary};

  ${({ $isValid }) =>
    !$isValid &&
    css`
      outline: 1px solid ${({ theme }) => theme.status.error};
    `}

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

export const ConverterOutput = styled.input`
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: 1px solid ${({ theme }) => theme.border.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

export const ConverterButton = styled.button`
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
