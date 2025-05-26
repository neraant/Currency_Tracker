import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '@styles/GlobalStyle';
import { DarkTheme } from '@styles/Theme';

import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary';
import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { Footer } from '@components/common/Footer/Footer';
import { Header } from '@components/common/Header/Header';

import { ROUTES } from '@constants/routes';

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider theme={DarkTheme}>
        <GlobalStyle />
        <Router>
          <Header />

          <Switch>
            {ROUTES.map(({ component: Component, link }, index) => (
              <Route key={index} path={link} element={<Component />} />
            ))}
          </Switch>

          <Footer />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
