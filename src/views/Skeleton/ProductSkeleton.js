import React from "react";
// import components
import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import useMediaQuery from "src/hooks/useMediaQuery";
// MUI stuff
import { Container, Grid, Stack, Skeleton } from "@mui/material";
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
  const isDesktop = useMediaQuery("(max-width: 600px)");

  return (
    <Page className={classes.root} title="내모마켓">
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.productCard}
          spacing={{ sm: 1.5, xs: 1 }}
        >
          {[...Array(8)].map((n, index) => {
            return (
              <Grid item sm={4} md={3} xs={6} key={index}>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={"100%"} height={250} />
                  <Skeleton variant="text" width={"80%"} height={21} />
                  <Skeleton variant="text" width={"60%"} height={21} />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </Page>
  );
};

export default Product;
