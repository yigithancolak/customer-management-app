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
      default: '#F5F5F5'
    },
    text: { primary: '#333333' },
    primary: {
      main: '#A08B9C'
    },
    error: {
      main: '#E74C3C'
    },
    warning: {
      main: '#FFA500'
    },
    success: {
      main: '#2ECC71'
    }
  }
})
