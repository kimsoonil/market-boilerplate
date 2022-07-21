import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "src/actions";
import { useParams } from "react-router";
// import components
import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import ProductDilalog from "src/components/ProductDilalog";
import ProductSlider from "./ProductSlider";
import ProductInf from "./ProductInf";
import ProductDetailsSkeletion from "../Skeleton/ProductDetailsSkeleton";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import { Container, Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 72px)",
  },
}));

const ProductDetails = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const productIdState = useSelector((state) => state.products);
  let { id } = useParams();

  useEffect(() => {
    dispatch(productActions.getProductId(id));
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!productIdState || !productIdState.data)
    return <ProductDetailsSkeletion />;

  return (
    <Page title="내모마켓">
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={{ sm: 1.5, xs: 1 }}>
          <Grid item sm={6} xs={12}>
            <ProductSlider />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ProductInf
              productIdState={productIdState.data}
              handleClickOpen={handleClickOpen}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <ProductDilalog
        open={open}
        handleClose={handleClose}
        product={productIdState.data.result.option_groups}
      />
    </Page>
  );
};
export default ProductDetails;
