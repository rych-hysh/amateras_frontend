import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MainAppBar } from './components/appbar/mainappbar';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/system';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainAppBar />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
