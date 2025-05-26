import styled from 'styled-components';

export const QuotesListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuotesListWrapper = styled.ul`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[14]};
  flex-wrap: wrap;

  @media (max-width: 920px) {
    gap: ${({ theme }) => theme.spacing[4]};
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const QuotesListTitle = styled.h4`
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: ${({ theme }) => theme.neutral.white};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  width: 100%;
  max-width: 520px;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['xl']};
    padding-bottom: ${({ theme }) => theme.spacing[3]};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;
