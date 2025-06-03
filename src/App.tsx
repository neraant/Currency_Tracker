import { Route, Routes as Switch } from 'react-router-dom';
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary';
import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { ScrollToTop } from '@components/common/ScrollToTop/ScrollToTop';
import { Layout } from '@components/Layout/Layout';
import { ROUTES } from '@constants/routes';
import { SubjectProvider } from '@context/ObserverConext';
import { ThemeToggleProvider } from '@context/ThemeContext';
import { GlobalStyle } from '@styles/GlobalStyle';

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeToggleProvider>
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
      </ThemeToggleProvider>
    </ErrorBoundary>
  );
};
