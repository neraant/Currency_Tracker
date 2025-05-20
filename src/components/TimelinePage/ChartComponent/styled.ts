import styled from 'styled-components';

export const CurrencyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[10]};

  @media (max-width: 920px) {
    gap: ${({ theme }) => theme.spacing[2]};
  }
  @media (max-width: 620px) {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

export const CurrencyImage = styled.img`
  width: 100%;
  max-width: 80px;

  @media (max-width: 920px) {
    max-width: 60px;
  }
  @media (max-width: 620px) {
    max-width: 50px;
  }
`;

export const CurrencyInfoTexts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CurrencyTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 920px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
  }
`;

export const CurrencyText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  font-size: ${({ theme }) => theme.typography.fontSize['md']};
  color: ${({ theme }) => theme.neutral.white};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['sm']};
  }
`;
