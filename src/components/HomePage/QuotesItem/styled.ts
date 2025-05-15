import styled from 'styled-components';

export const QuotesCard = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.border.primary};
  background: 1px solid ${({ theme }) => theme.background.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.neutral.preblack};
  }

  @media (max-width: 620px) {
    gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const QuotesCardIcon = styled.img`
  width: 100%;
  max-width: 80px;
  flex-shrink: 0;

  @media (max-width: 620px) {
    max-width: 50px;
  }
`;

export const QuotesCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const QuotesCardTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['md']};
  }
`;

export const QuotesCardText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.neutral.gray300};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['sm']};
  }
`;
