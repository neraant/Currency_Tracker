import { styled } from 'styled-components';

export const UpdateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  margin: ${({ theme }) => theme.spacing[10]} 0;
  justify-content: center;

  @media (max-width: 620px) {
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

export const LargeCircle = styled.span`
  position: relative;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.status.success};
    opacity: 0.35;
    z-index: 1;
  }

  @media (max-width: 620px) {
    width: 28px;
    height: 28px;
  }
`;

export const SmallCircle = styled.span`
  content: '';
  display: block;
  z-index: 2;
  background: ${({ theme }) => theme.status.success};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 620px) {
    width: 12px;
    height: 12px;
  }
`;

export const UpdateText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  }
`;
