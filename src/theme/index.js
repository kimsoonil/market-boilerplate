import { createTheme, colors } from "@mui/material";
import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1080,
      xl: 1536,
    },
  },
  palette: {
    nemoMint: {
      50: "#DCFDFB",
      100: "#B9FCF7",
      200: "#8AEEE7",
      300: "#5CE1D8",
      400: "#2FD3CB",
      500: "#2AB2AF",
      600: "#209091",
      700: "#146C70",
      800: "#09494F",
      900: "#02282E",
    },
    nemoGreen: {
      50: "#d4ffe1",
      100: "#aaffc9",
      200: "#71fead",
      300: "#39f69c",
      400: "#00ed96",
      500: "#0ac67d",
      600: "#0b9e65",
      700: "#08774c",
      800: "#034f33",
      900: "#01271a",
    },
    nemoMintGray: {
      50: "#e9faf8",
      100: "#d3f5f1",
      200: "#b0e4dd",
      300: "#96c9c3",
      400: "#7aaeaa",
      500: "#5d9390",
      600: "#417877",
      700: "#275c5d",
      800: "#123f43",
      900: "#052428",
    },
    grayscale: {
      0: "#ffffff",
      50: "#f3f3f3",
      100: "#e7e7e7",
      200: "#cfcfcf",
      300: "#b6b6b6",
      400: "#9e9e9e",
      500: "#868686",
      600: "#6E6E6E",
      700: "#555555",
      800: "#3d3d3d",
      900: "#252525",
      1000: "#0d0d0d",
    },
    systemRed: {
      50: "#ffeded",
      100: "#ffdada",
      200: "#ffb7b7",
      300: "#ff9090",
      400: "#ff6565",
      500: "#ff3636",
      600: "#ff0000",
      700: "#c20202",
      800: "#850101",
      900: "#470000",
    },
  },
  shadows,
  typography,
});

export default theme;
