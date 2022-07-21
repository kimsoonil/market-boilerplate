import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import { productActions } from "src/actions";

import ProductSkeleton from "../Skeleton/ProductSkeleton";

import { Container, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {},
  productCard: {
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    minHeight: "calc(100vh - 72px)",
  },
}));

const Product = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [dispatch]);

  if (!productsState || !productsState.product) return <ProductSkeleton />;

  return (
    <Page className={classes.root} title="내모마켓">
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.productCard}
          spacing={{ sm: 1.5, xs: 1 }}
        ></Grid>
      </Container>
      <Footer />
    </Page>
  );
};

export default Product;
