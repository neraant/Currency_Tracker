import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { Routes } from '@constants/Routes';

export const App = () => {
  return (
    <Router>
      <Switch>
        {Routes.map((route, index) => (
          <Route key={index} path={route.link} element={<route.component />} />
        ))}
      </Switch>
    </Router>
  );
};
