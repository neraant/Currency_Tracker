import styled, { css } from 'styled-components';

interface ContactInputProps {
  $isActive: boolean;
}

interface ContactLabelProps {
  $isActive: boolean;
}

export const ContactInput = styled.input<ContactInputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.neutral.white};
  border-bottom: 1px solid transparent;

  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px transparent inset;
    -webkit-text-fill-color: ${({ theme }) => theme.neutral.white};
    transition: background-color 5000s ease-in-out 0s;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.border.primary};
    `}
`;

export const ContactLabel = styled.label<ContactLabelProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.typography.fontSize['sm']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: -8px;
      transform: translateY(0);
    `}
`;

export const ContactInputContainer = styled.div`
  position: relative;
  width: 100%;
`;
