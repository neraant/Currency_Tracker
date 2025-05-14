import { GlobalStyle } from '@styles/GlobalStyle';
import { DarkTheme } from '@styles/Theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { Routes } from '@constants/Routes';
import { Header } from '@components/common/Header/Header';

export const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <GlobalStyle />
      <Router>
        <Header />

        <Switch>
          {Routes.map((route, index) => (
            <Route key={index} path={route.link} element={<route.component />} />
          ))}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
