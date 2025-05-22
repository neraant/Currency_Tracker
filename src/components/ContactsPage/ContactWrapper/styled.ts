import styled from 'styled-components';

export const ContactContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[5]};
  justify-content: space-between;
  align-items: center;
  padding: 80px 60px 80px 20px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[10]};
    padding: 40px 0;
    width: 100%;
  }
`;
