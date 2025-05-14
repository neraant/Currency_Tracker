import { Container } from '@styles/GlobalStyle';
import logo from '@assets/icons/logo_icon.svg';
import { Link } from 'react-router-dom';
import { HeaderContainer, HeaderLogo, HeaderNav, HeaderWrapper, NavLink } from './styled';
import { HeaderNavLinks } from '@constants/HeaderNavLinks';
import { ToggleButton } from '../ToggleButton/ToggleButton';

export const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <HeaderWrapper>
          {/* logo */}
          <Link to="/">
            <HeaderLogo src={logo} alt="logo" />
          </Link>

          {/* menu */}
          <HeaderNav>
            {HeaderNavLinks.map((navLink, index) => (
              <NavLink to={navLink.link} key={index}>
                {navLink.label}
              </NavLink>
            ))}
          </HeaderNav>

          {/* theme */}
          <ToggleButton />
        </HeaderWrapper>
      </Container>
    </HeaderContainer>
  );
};
