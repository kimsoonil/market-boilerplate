import React from "react";
// MUI stuff
import { Grid, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    backgroundColor: theme.palette.grayscale[0],
    zIndex: 1000,
  },
  productListImg: {
    width: 160,
    height: 160,
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    "& > img": {
      width: "100%",
      height: "100%",
      padding: theme.spacing(1.5),
    },
    "@media (max-width: 1080px)": {
      width: 132,
      height: 132,
    },
    "@media (max-width: 600px)": {
      width: 76,
      height: 76,
      "& > img": {
        padding: 0,
      },
    },
  },
}));

const ProductList = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container className={classes.root}>
      <Box className={classes.productListImg}>
        <img src="/static/images/products/products.png" alt="product" />
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            mt: 1,
          }}
        >
          <Box
            sx={{
              typography: "inherit",
              color: "grayscale.1000",
              mr: 1,
            }}
          >
            Apple
          </Box>
          <Box
            sx={{
              typography: "h4",
              color: "grayscale.1000",
            }}
          >
            {props.ProductIdState.title}
          </Box>
        </Box>
        <Box sx={{ typography: "subtitle2", color: "grayscale.600" }}>
          구매할 옵션을 선택해 주세요
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductList;
