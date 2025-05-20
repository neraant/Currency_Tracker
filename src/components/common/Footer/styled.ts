import { Link } from 'react-router-dom';
import styled from 'styled-components';

import arrowIcon from '@assets/icons/arrow_icon.svg';

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing[14]} 0 ${({ theme }) => theme.spacing[10]} 0;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};

  @media (max-width: 920px) {
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[10]};

  @media (max-width: 920px) {
    flex-direction: column;
    width: 100%;
  }
  @media (max-width: 620px) {
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export const FooterInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  width: 100%;
  max-width: 500px;

  @media (max-width: 920px) {
    max-width: none;
  }
`;

export const FooterInfoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: 620px) {
    img {
      max-width: 35px;
    }
  }
`;

export const FooterInfoTitle = styled.h2`
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
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['xl']};
  }
`;

export const FooterInfoText = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.neutral.white};

  @media (max-width: 620px) {
    display: none;
  }
`;

export const FooterMenusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;

  @media (max-width: 620px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const FooterMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  @media (max-width: 620px) {
    gap: ${({ theme }) => theme.spacing[2]};
    max-height: 0px;
  }
`;

export const FooterMenuTitle = styled.h3`
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: ${({ theme }) => theme.neutral.white};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['md']};
    padding: ${({ theme }) => theme.spacing[4]} 0;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    &::after {
      content: '';
      background-image: url(${arrowIcon});
      background-repeat: no-repeat;
      background-position: center;
      width: 20px;
      height: 20px;
      transition: all 0.3s ease-in-out;
    }
  }
`;

export const FooterMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};

  &.active {
    ${FooterMenu} {
      max-height: 100px;
      padding-bottom: ${({ theme }) => theme.spacing[3]};
    }

    ${FooterMenuTitle} {
      &::after {
        transform: rotate(-180deg);
      }
    }
  }

  @media (max-width: 620px) {
    border-bottom: 1px solid #607d94;
    gap: 0;
  }
`;

export const FooterMenuItem = styled.li`
  width: 100%;
`;

export const FooterMenuLink = styled(Link)`
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.text.tertiary};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.neutral.white};
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['md']};
    width: 100%;
  }
`;

export const FooterBottomText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.inter};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.text.tertiary};
  text-align: center;

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize['md']};
  }
`;
