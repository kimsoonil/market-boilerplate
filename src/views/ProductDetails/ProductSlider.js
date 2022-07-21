import React from "react";

import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme) => ({
  productSlide: {
    maxWidth: 566,
    height: "28vw",
    minHeight: 515,
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    "@media (max-width: 1080px)": {
      minHeight: "53vw",
    },
    "@media (max-width: 600px)": {
      width: "100%",
      minHeight: 380,
    },
  },
  productImg: {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    outline: 0,
    "& > img": {
      maxHeight: 465,
      maxWidth: 465,
      width: "100%",
      objectFit: "cover",
    },
    "@media (max-width: 600px)": {
      width: "100%",
      height: "100%",
      "& > img": {
        maxWidth: 341,
      },
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 5000,
    customPaging: (i) => (
      <div
        style={{ height: 4, width: "100%", backgroundColor: "#cfcfcf" }}
      ></div>
    ),
  };

  return (
    <Box className={classes.productSlide}>
      <Slider {...settings}>
        <Box className={classes.productImg}>
          <img src="/static/images/products/products.png" alt="product" />
        </Box>
        <Box className={classes.productImg}>
          <img src="/static/images/products/IMG_iPhone_2.png" alt="product" />
        </Box>
        <Box className={classes.productImg}>
          <img src="/static/images/products/IMG_iPhone_3.png" alt="product" />
        </Box>
        <Box className={classes.productImg}>
          <img src="/static/images/products/IMG_iPhone_4.png" alt="product" />
        </Box>
        <Box className={classes.productImg}>
          <img src="/static/images/products/IMG_iPhone_5.png" alt="product" />
        </Box>
      </Slider>
    </Box>
  );
};

export default Dashboard;
