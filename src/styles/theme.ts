import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    htmlFontSize: 14,
    fontFamily: 'Inter, sans-serif',
    body1: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.6'
    },
    body2: {
      fontSize: '0.8rem',
      fontWeight: '400',
      lineHeight: '1.2'
    },
    h6: {
      fontSize: '0.9rem',
      fontWeight: '600',
      lineHeight: '1.6'
    }
  },
  palette: {
    background: {
      default: '#FAFAFA'
    },
    text: { primary: '#695F5C' },
    primary: {
      main: '#554D4D'
    },
    secondary: {
      main: '#F1F1F1'
    },
    error: {
      main: '#E74C3C'
    },
    warning: {
      main: '#F10000'
    },
    success: {
      main: '#0AE000'
    }
  }
})
