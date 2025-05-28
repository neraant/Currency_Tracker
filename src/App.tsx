import { Route, Routes as Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary';
import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { ScrollToTop } from '@components/common/ScrollToTop/ScrollToTop';
import { Layout } from '@components/Layout/Layout';
import { ROUTES } from '@constants/routes';
import { SubjectProvider } from '@context/ObserverConext';
import { GlobalStyle } from '@styles/GlobalStyle';
import { DarkTheme } from '@styles/Theme';

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider theme={DarkTheme}>
        <SubjectProvider>
          <GlobalStyle />
          <ScrollToTop />

          <Switch>
            {ROUTES.map(({ component: Component, link }, index) => (
              <Route
                key={index}
                path={link}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            ))}
          </Switch>
        </SubjectProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
