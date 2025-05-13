import ReactDOM from 'react-dom/client';
import React from 'react';

const App = () => <h1>Work!</h1>;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
