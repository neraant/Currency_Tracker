import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderLogo = styled.img`
  @media (max-width: 620px) {
    max-width: 22px;
  }
`;

export const HeaderContainer = styled.header`
  padding: 25px 0;
  background-color: ${({ theme }) => theme.background.primary};

  @media (max-width: 620px) {
    padding: 10px 0;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  max-width: 660px;

  @media (max-width: 620px) {
    max-width: 300px;
  }
`;

export const NavLink = styled(RouterNavLink)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  transition: all 0.3s ease-in-out;

  &.active {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    border-bottom: 1px solid ${({ theme }) => theme.text.primary};
  }

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 620px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
