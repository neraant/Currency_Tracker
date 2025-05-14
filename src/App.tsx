import { GlobalStyle } from '@styles/GlobalStyle';
import { DarkTheme } from '@styles/Theme';

import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Header } from '@components/common/Header/Header';

import { ROUTES } from '@constants/Routes';

export const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <GlobalStyle />
      <Router>
        <Header />

        <Switch>
          {ROUTES.map(({ component: Component, link }, index) => (
            <Route key={index} path={link} element={<Component />} />
          ))}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
