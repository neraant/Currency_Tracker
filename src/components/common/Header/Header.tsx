import { Link } from 'react-router-dom';
import logo from '@assets/icons/logo_icon.svg';
import { HEADER_NAVLINKS } from '@constants/headerNavLinks';
import { Container } from '@styles/GlobalStyle';
import { HeaderContainer, HeaderLogo, HeaderNav, HeaderWrapper, NavLink } from './styled';
import { ToggleButton } from '../ToggleButton/ToggleButton';

export const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <HeaderWrapper>
          <Link to="/" data-testid="link-home-logo">
            <HeaderLogo src={logo} alt="logo" />
          </Link>

          <HeaderNav>
            {HEADER_NAVLINKS.map(({ label, link, testId }, index) => (
              <NavLink data-testid={testId} to={link} key={index}>
                {label}
              </NavLink>
            ))}
          </HeaderNav>

          <ToggleButton />
        </HeaderWrapper>
      </Container>
    </HeaderContainer>
  );
};
