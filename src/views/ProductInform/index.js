import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { productOption } from "src/utils/utils";
import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import { productActions } from "src/actions";
import ProductInformBox from "../../components/ProductInformBox";
import PurchaseInf from "./PurchaseInf";

// MUI stuff
import { Container, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({}));

const ProductInform = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modelState = useSelector((state) => state.products);
  let { id } = useParams();

  const [option, setOption] = useState({});

  useEffect(() => {
    dispatch(productActions.getModelProduct(id));
  }, [dispatch]);

  useEffect(() => {
    if (modelState && modelState.model) {
      const optionObjData = productOption(modelState.model.result);
      setOption(optionObjData);
    }
    if (modelState && modelState.payment) {
      navigate(`/products/${id}/payment/${modelState.payment.result.id}`);
    }
  }, [modelState]);

  useEffect(() => {}, [modelState]);

  const hanldeClickNextPage = () => {
    dispatch(productActions.postPayment(id));
  };

  if (!modelState || !modelState.model) return <></>;

  return (
    <Page className={classes.root} title="내모마켓">
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item lg={4} xs={12}>
            <ProductInformBox
              modelState={modelState.model.result}
              option={option}
            />
          </Grid>
          <Grid item lg={8} xs={12}>
            <PurchaseInf
              option={option}
              hanldeClickNextPage={hanldeClickNextPage}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Page>
  );
};

export default ProductInform;
