import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MainAppBar } from './components/appbar/mainappbar';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/system';
import { initAuth } from './auth/config/auth';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from './auth/use-auth';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

initAuth();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <MainAppBar />
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
