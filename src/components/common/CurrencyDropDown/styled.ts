import styled, { css } from 'styled-components';

import arrowIcon from '@assets/icons/arrow_icon.svg';

interface ConverterDropDownListProps {
  $isDropped: boolean;
}

interface CurrencyDropDownItemProps {
  $isActive: boolean;
}

export const CurrencyDropDownWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: ${({ theme }) => theme.spacing[14]} 0;
  max-width: 250px;

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

  @media (max-width: 620px) {
    margin: ${({ theme }) => theme.spacing[8]} 0;
    max-width: 180px;
  }
`;

export const CurrencyDropDownInput = styled.input`
  position: relative;
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  border-radius: 4px;
  border: none;
  border: none;
  outline: none;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

export const CurrencyDropDownList = styled.ul<ConverterDropDownListProps>`
  position: absolute;
  left: 0;
  top: calc(100% + 2px);
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
`;

export const CurrencyDropDownItem = styled.li<CurrencyDropDownItemProps>`
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

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${({ theme }) => theme.border.primary};
    `}
`;
