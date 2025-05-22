import styled from 'styled-components';

export const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};

  @media (max-width: 960px) {
    width: 100%;
  }
`;

export const ContactInfoWrapper = styled.div`
  border-left: 4px solid ${({ theme }) => theme.neutral.green400};
  flex: 1;
  padding-left: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};

  @media (max-width: 960px) {
    gap: ${({ theme }) => theme.spacing[14]};
    flex-direction: row;
  }
  @media (max-width: 620px) {
    gap: ${({ theme }) => theme.spacing[8]};
    flex-direction: column;
  }
`;

export const ContactTitle = styled.h1`
  color: ${({ theme }) => theme.neutral.white};
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight['none']};
  position: relative;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    right: -12px;
    bottom: 6px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.neutral.green400};
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const InfoBlockTitle = styled.h5`
  color: ${({ theme }) => theme.neutral.white};
  font-size: ${({ theme }) => theme.typography.fontSize['md']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0.5;
`;

export const InfoBlockText = styled.span`
  color: ${({ theme }) => theme.neutral.white};
  font-size: ${({ theme }) => theme.typography.fontSize['lg']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
