import logo from '@assets/icons/logo_icon.svg';
import { Container } from '@styles/GlobalStyle';
import {
  BannerContent,
  BannerImage,
  BannerSection,
  BannerText,
  BannerTitle,
  BannerWrapper,
} from './styled';

export const Banner = () => {
  return (
    <BannerSection>
      <Container>
        <BannerWrapper>
          <BannerContent>
            <BannerTitle>
              Modsen Currency
              <span>Tracker</span>
            </BannerTitle>

            <BannerText>Quotes for the dollar and other international currencies.</BannerText>
          </BannerContent>

          <BannerImage src={logo} alt="logo" />
        </BannerWrapper>
      </Container>
    </BannerSection>
  );
};
