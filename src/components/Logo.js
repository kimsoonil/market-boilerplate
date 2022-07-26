import React from "react";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  Logo: {
    minWidth: 130,
    minHeight: 40,
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/images/products/main-logo.svg)`,
  },
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.Logo}
      {...props}
      sx={{ width: props.width, height: props.height }}
    ></Box>
  );
};

export default Logo;
