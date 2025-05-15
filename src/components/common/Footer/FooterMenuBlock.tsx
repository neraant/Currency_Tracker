import { useState } from 'react';

import {
  FooterMenu,
  FooterMenuItem,
  FooterMenuLink,
  FooterMenuTitle,
  FooterMenuWrapper,
} from './styled';

interface FooterLink {
  label: string;
  link: string;
}

interface FooterMenuBlockProps {
  title: string;
  links: FooterLink[];
}

export const FooterMenuBlock = ({ title, links }: FooterMenuBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen((pre) => !pre);
  };

  return (
    <FooterMenuWrapper className={isOpen ? 'active' : ''}>
      <FooterMenuTitle onClick={handleOpenClick}>{title}</FooterMenuTitle>

      <FooterMenu>
        {links.map(({ label, link }) => (
          <FooterMenuItem key={label}>
            <FooterMenuLink to={link}>{label}</FooterMenuLink>
          </FooterMenuItem>
        ))}
      </FooterMenu>
    </FooterMenuWrapper>
  );
};
