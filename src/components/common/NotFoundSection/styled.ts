import styled from 'styled-components';

export const NotFoundTitle = styled.h1`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.neutral.green200},
    ${({ theme }) => theme.neutral.green100},
    ${({ theme }) => theme.neutral.green50}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize['7xl']};
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 1;
  padding: ${({ theme }) => theme.spacing[10]} 0;

  span {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    text-transform: uppercase;
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};

    span {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
      text-transform: uppercase;
    }
  }
`;
