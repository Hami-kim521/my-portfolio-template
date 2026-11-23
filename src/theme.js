import { createTheme } from '@mui/material/styles';

/** 색상은 index.css 의 CSS 변수(컬러 팔레트 디자인 시스템)를 참조합니다. */
const theme = createTheme({
  palette: {
    primary: { main: '#FC6112', light: '#FF8A4D', dark: '#D94E08' },
    secondary: { main: '#1E1E3F' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'var(--color-button-primary)',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: 'var(--color-button-hover)' },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'var(--color-link)',
          '&:hover': { color: 'var(--color-link-hover)' },
        },
      },
    },
  },
});

export default theme;
