import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Lato, Sans-serif',
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
    },
  },
});

export default theme;
