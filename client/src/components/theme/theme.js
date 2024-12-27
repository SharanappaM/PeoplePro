import { createTheme } from '@mui/material/styles';

// Define a custom theme with your custom colors, typography, etc.
const theme = createTheme({
  palette: {
    primary: {
      main: '#138d75',  // Custom blue color
    },
    secondary: {
      main: '#333',  // Custom red color
    },
    background: {
      default: '#f4f6f8',  // Light background color
    },
    text: {
      primary: '#333',  // Custom text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',  // Custom font
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    // You can add more custom typography styles here
  },
  components: {
    // Customize specific MUI components if needed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',  // Custom button border-radius
          textTransform: 'none',  // Disable text transformation (uppercase)
        },
      },
    },
  },
});

export default theme;
