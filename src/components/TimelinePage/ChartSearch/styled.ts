import styled from 'styled-components';

export const CurrencyDropDownInput = styled.input`
  position: relative;
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[12]};
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
