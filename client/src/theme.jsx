import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#31363F"
    },
    text: {
      primary: "#E76948",
      secondary: "#58ACA0",
      // color1: "#fff",
      // color2: "#505256"
    }
  }
  // Define custom color tokens for your theme
  // You can then use these colors in your components with the `useColorModeValue` hook or directly as prop values
  // Example: color={useColorModeValue('highlight1', 'highlight2')}
});

export default theme;
