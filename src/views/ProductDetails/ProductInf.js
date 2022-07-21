import React from "react";

import SellBtn from "src/components/SellBtn";
import BuyBtn from "src/components/BuyBtn";
import Specification from "./Specification";

import makeStyles from "@mui/styles/makeStyles";
import { Hidden, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  specification: {
    height: 183,
    width: 403,
    overflow: "auto",
    marginTop: theme.spacing(4),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  specificationBtn: {
    width: 76,
    height: 42,
    fontWeight: 500,
    fontSize: 14,
    fontFamily: "Pretendard-Bold",
    color: theme.palette.grayscale[700],
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grayscale[50],
    },
    "&:active": {
      backgroundColor: theme.palette.grayscale[300],
    },
  },
  positionbtn: {
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    width: "100%",
    padding: "8px 24px",
    backgroundColor: theme.palette.grayscale[0],
    "@media (max-width: 400px)": {
      padding: "8px 8px",
      marginBottom: theme.spacing(0.5),
    },
  },
}));

const ProductInf = (props) => {
  const classes = useStyles();

  return (
    <Box py={1.5} ml={{ lg: 12, sm: 4, xs: 1 }}>
      <Box
        sx={{
          display: "flex",
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
            mb: 2,
          }}
        >
          {props.productIdState.result.title}
        </Box>
      </Box>
      <Box
        sx={{
          typography: "h3",
          color: "grayscale.1000",
          mb: 0.5,
        }}
      >
        {props.productIdState.result.prices
          ? props.productIdState.result.prices.min.toLocaleString() + "원"
          : "0원"}
      </Box>
      <Box
        sx={{
          typography: "subtitle2",
          color: "grayscale.500",
        }}
      >
        최저 판매가
      </Box>
      <Hidden lgUp>
        <Box
          className={classes.specificationBtn}
          onClick={() => props.handleClickOpen()}
        >
          제품 사양
        </Box>
        <Box className={classes.positionbtn}>
          <BuyBtn
            price={
              props.productIdState.result.prices
                ? props.productIdState.result.prices.min
                : "0"
            }
            id={props.productIdState.result.id}
          />
          <SellBtn
            price={
              props.productIdState.result.prices
                ? props.productIdState.result.prices.max
                : "0"
            }
          />
        </Box>
      </Hidden>
      <Hidden lgDown>
        <Box
          sx={{
            display: "flex",
            mt: 2.5,
            py: 1.5,
            justifyContent: "space-between",
          }}
        >
          <BuyBtn
            price={
              props.productIdState.result.prices
                ? props.productIdState.result.prices.min
                : "0"
            }
            id={props.productIdState.result.id}
          />
          <SellBtn
            price={
              props.productIdState.result.prices
                ? props.productIdState.result.prices.max
                : "0"
            }
          />
        </Box>
        <Box mt={5}>
          <Box
            sx={{
              typography: "h5",
              color: "grayscale.1000",
              display: "flex",
              alignItems: "center",
            }}
          >
            제품사양
          </Box>
          <Box className={classes.specification}>
            {props.productIdState.result.option_groups.map((item, index) => {
              return (
                <Specification
                  title={item.title}
                  property={item.property}
                  key={index}
                />
              );
            })}
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default ProductInf;
