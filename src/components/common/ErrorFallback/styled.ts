import styled from 'styled-components';

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.inter};
  font-size: ${({ theme }) => theme.typography.fontSize['lg']};
  color: ${({ theme }) => theme.status.error};
  font-weight: 700;
  text-align: center;
  max-width: 620px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;

  span {
    color: ${({ theme }) => theme.text.primary};
  }
`;
