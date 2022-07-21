// MUI stuff
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        // height: "100%",
        width: "100%",
      },
      body: {
        backgroundColor: "#f4f6f8",
        // height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      ".slick-dots": {
        padding: "0 24px",
      },
      ".slick-dots li": {
        height: 4,
        width: "20%",

        margin: 0,
      },
      ".slick-dots .slick-active div": {
        backgroundColor: "#555 !important",
      },
      "input[type='number']::-webkit-outer-spin-button, input[type='number']::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
