import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import { productActions } from "src/actions";
import ProductItem from "./ProductItem";
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

const ProductModel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const productsState = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(productActions.getProducts());
  // }, [dispatch]);

  // if (!productsState || !productsState.product) return <ProductSkeleton />;
  const productsState = {
    product:{
      result:[
        {
        id:1,
        title:"iPhone13 pro max",
        prices:200000,
        image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone13proMax.png`,
        },
        {
        id:2,
        title:"iPhone13 pro",
        prices:"200000",
        image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone13pro.png`,
        },
        {
        id:3,
        title:"iPhone13",
        prices:"200000",
        image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone13.png`,
        },
        {
        id:4,
        title:"iPhone12 pro max",
        prices:"200000",
        image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone12proMax.png`,
        },
        {
          id:5,
          title:"iPhone12 pro",
          prices:"200000",
          image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone12pro.png`,
          },
          {
            id:6,
            title:"iPhone12",
            prices:"200000",
            image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone12.png`,
            },
            {
              id:7,
              title:"iPhone11 pro max",
              prices:"200000",
              image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone11proMax.png`,
              },
              {
                id:8,
                title:"iPhone11 pro",
                prices:"200000",
                image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone11pro.png`,
                },
                {
                  id:9,
                  title:"iPhone11",
                  prices:"200000",
                  image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone11.png`,
                  },
                  {
                    id:10,
                    title:"iPhone2SE",
                    prices:"200000",
                    image_banner:`${process.env.PUBLIC_URL}/static/images/products/iPhone2SE.png`,
                    }
      ]
    }
  }
  return (
    <Page className={classes.root} title="내모마켓">
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.productCard}
          spacing={{ sm: 1.5, xs: 1 }}
        >
          {productsState.product.result.map((item, index) => {
            return (
              <ProductItem
                producId={item.id}
                producName={item.title}
                producPay={item.prices}
                imageBanner={item.image_banner}
                key={index}
              />
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </Page>
  );
};

export default ProductModel;
