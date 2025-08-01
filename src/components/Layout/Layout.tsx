import { ReactNode } from 'react';
import { Banner } from '@components/common/Banner/Banner';
import { Footer } from '@components/common/Footer/Footer';
import { Header } from '@components/common/Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        {children}
      </main>
      <Footer />
    </>
  );
};
