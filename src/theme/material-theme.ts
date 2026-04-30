import {createTheme} from '@mui/material/styles'

export const materialTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4c644b',
      dark: '#405840',
      light: '#ceeaca',
      contrastText: '#e5ffe0',
    },
    secondary: {
      main: '#6a5d51',
      light: '#f2dfd0',
      contrastText: '#fff7f4',
    },
    background: {
      default: '#fafaf5',
      paper: '#ffffff',
    },
    text: {
      primary: '#2e342d',
      secondary: '#5b6159',
    },
    divider: '#aeb4aa',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
    h1: {
      fontFamily: 'Noto Serif, serif',
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Noto Serif, serif',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'antialiased',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          transition: 'all 300ms ease-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
      },
    },
  },
})

