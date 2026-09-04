import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { SessionProvider } from './app/SessionContext';
import App from './app/App';
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <SessionProvider><App /></SessionProvider>
    </HashRouter>
  </React.StrictMode>
);
