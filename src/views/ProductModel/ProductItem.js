import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import { Grid, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {},
  product: {
    borderRadius: theme.spacing(1),
    paddingBottom: 12,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgb(0 0 0 / 25%) 0 0 4px 0",
    },
  },
  productImg: {
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    overflow: "hidden",

    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
}));

const ProductItem = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  let price = "0원";
  let productImg = "/static/images/products/products.png";

  if (props.producPay !== null) {
    price = props.producPay.toLocaleString() + "원";
  }

  if (props.imageBanner !== null) {
    productImg = props.imageBanner;
  }
  return (
    <Grid item md={3} sm={4} xs={6} className={classes.root}>
      <Box
        className={classes.product}
        onClick={() => navigate(`/model/${props.producId}`)}
      >
        <Box className={classes.productImg}>
          <img src={productImg} alt="product" />
        </Box>
        <Box
          sx={{
            typography: "body1",
            color: "grayscale.1000",
            mt: 1,
            pl: 0.5,
          }}
        >
          {props.producName}
        </Box>
        <Box sx={{ typography: "h5", color: "grayscale.1000", pl: 0.5 }}>
          {price}
        </Box>
        <Box sx={{ typography: "caption", color: "grayscale.1000", pl: 0.5 }}>
          최저 판매가
        </Box>
      </Box>
    </Grid>
  );
};

ProductItem.propTypes = {
  props: PropTypes.object,
};
export default ProductItem;
