import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.jsx';
import theme from './theme.js';
import './index.css';

// GitHub Pages 는 서버 라우팅이 없으므로 HashRouter 를 사용합니다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
);
