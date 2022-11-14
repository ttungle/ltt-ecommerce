import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Sans-serif',
  },
  palette: {
    primary: {
      main: '#cb8161',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#222',
      secondary: '#868686',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        fixed: true,
        maxWidth: 'xl',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.active div': {
            left: 0,
            right: 0,
            opacity: 1,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            borderRadius: '2px',
            boxShadow: 'none',
            backgroundColor: '#fff',
            color: '#222',
            fontSize: '0.75rem',
            fontWeight: '400',
            transition: 'all 0.15s ease',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#cb8161',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderRadius: '2px',
            boxShadow: 'none',
            letterSpacing: '0.16rem',
            transition: 'all 0.15s ease',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      ],
    },
  },
});

export default theme;
