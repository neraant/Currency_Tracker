import { Container } from '@styles/GlobalStyle';

import logo from '@assets/icons/logo_icon.svg';

import { FOOTER_MENUS } from '@constants/FooterMenus';

import { FooterMenuBlock } from './FooterMenuBlock';
import {
  FooterBottomText,
  FooterContainer,
  FooterInfoBlock,
  FooterInfoText,
  FooterInfoTitle,
  FooterInfoTitleWrapper,
  FooterMenu,
  FooterMenuItem,
  FooterMenuLink,
  FooterMenusWrapper,
  FooterMenuTitle,
  FooterMenuWrapper,
  FooterTop,
  FooterWrapper,
} from './styled';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <FooterWrapper>
          <FooterTop>
            <FooterInfoBlock>
              <FooterInfoTitleWrapper>
                <img src={logo} alt="logo" />

                <FooterInfoTitle>Modsen Currency Tracker</FooterInfoTitle>
              </FooterInfoTitleWrapper>

              <FooterInfoText>
                Since then, the company has grown organically to. Starsup is the world's largest
                trading platform, with $12 billion worth of currency trading and 500,000 tickets
                sold daily to tens of thousands of traders worldwide.
              </FooterInfoText>
            </FooterInfoBlock>

            <FooterMenusWrapper>
              {FOOTER_MENUS.map(({ title, links }, index) => {
                return <FooterMenuBlock key={index} title={title} links={links} />;
              })}
            </FooterMenusWrapper>
          </FooterTop>

          <FooterBottomText>
            Startsup &copy; 2024-{currentYear}, All Rights Reserved
          </FooterBottomText>
        </FooterWrapper>
      </Container>
    </FooterContainer>
  );
};
