import React from "react";

// import components
import Page from "src/components/Page";

// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import { Container, Grid, Skeleton, Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 72px)",
  },
}));

const ProductDetailsSkeletion = () => {
  const classes = useStyles();

  return (
    <Page title="내모마켓">
      <Container maxWidth="lg" className={classes.root}>
        {
          <Grid container spacing={{ sm: 1.5, xs: 1 }}>
            <Grid item sm={6} xs={12}>
              <Stack spacing={1}>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"55vh"}
                />
              </Stack>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Stack spacing={1}>
                <Skeleton variant="text" width={"80%"} height={20} />
                <Skeleton variant="text" width={"60%"} height={36} />
              </Stack>
            </Grid>
          </Grid>
        }
      </Container>
    </Page>
  );
};
export default ProductDetailsSkeletion;
