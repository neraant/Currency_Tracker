import styled from 'styled-components';

export const ChartInputWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-height: 100dvh;

  @media (max-width: 620px) {
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

export const ChartLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['sm']};
  }
`;

export const ChartInput = styled.input`
  font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};
  background-color: ${({ theme }) => theme.neutral.preblack};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  outline: none;
  border: none;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

export const ChartInputError = styled.span`
  position: absolute;
  bottom: -${({ theme }) => theme.spacing[5]};
  left: 0;
  color: ${({ theme }) => theme.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize['xs']};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;
