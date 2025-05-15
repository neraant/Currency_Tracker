import styled from 'styled-components';

export const BannerSection = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.neutral.preblack} 0%,
    ${({ theme }) => theme.neutral.preblack} 20%,
    ${({ theme }) => theme.neutral.green500} 40%,
    ${({ theme }) => theme.neutral.preblack} 100%
  );
  margin-bottom: auto;
`;

export const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  max-width: 760px;

  @media (max-width: 780px) {
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  max-width: 300px;

  @media (max-width: 1140px) {
    max-width: 180px;
  }
  @media (max-width: 780px) {
    display: none;
  }
`;

export const BannerTitle = styled.h1`
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
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-right: ${({ theme }) => theme.spacing[16]};
  font-size: ${({ theme }) => theme.typography.fontSize['7xl']};

  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.typography.fontSize['8xl']};
  }

  @media (max-width: 1140px) {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};

    span {
      display: inline-block;
      font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
    }
  }
  @media (max-width: 780px) {
    text-align: center;
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin: 0;

    span {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
  }
`;

export const BannerText = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.neutral.white};
  line-height: 46px;
  text-align: center;
  max-width: 400px;
  margin-left: auto;

  @media (max-width: 780px) {
    text-align: center;
    font-size: ${({ theme }) => theme.typography.fontSize['lg']};
    margin-left: 0;
    line-height: 22px;
    max-width: 320px;
    margin: 0 auto;
  }
  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2sx']};
  }
`;
