import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { productOption } from "src/utils/utils";
import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import { productActions, deliveriesActions } from "src/actions";
import ProductInformBox from "src/components/ProductInformBox";
import PurchaseInfo from "./PurchaseInfo";

// MUI stuff
import { Container, Grid, Snackbar, Alert } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({}));

const ProductPurchase = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const productState = useSelector((state) => state.products);
  const deliveries = useSelector((state) => state.deliveries);
  const [purchasesState, setPurchasesState] = useState();
  const [deliveriesState, setDeliveriesState] = useState();
  const [deliveriesIdState, setDeliveriesIdState] = useState();
  const [deliveriesOpen, setDeliveriesOpen] = useState(false);
  const [popupState, setPopupState] = useState("");
  const [deliveriesEditState, setDeliveriesEditState] = useState("edit");
  const [deliveriesData, setDeliveriesData] = useState({
    name: "",
    phone_number: "",
    address_main: "",
    address_sub: "",
    zip_code: 0,
    is_default: false,
  });
  let { id } = useParams();
  const [option, setOption] = useState({});
  const [selectDeliveriey, setSelectDeliveriey] = useState({
    delivery: 0,
    delivery_message: "배송 요청사항을 선택해 주세요",
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    massage: "",
  });

  useEffect(() => {
    dispatch(deliveriesActions.getDeliveries());
    dispatch(productActions.getPurchases(id));
  }, []);

  useEffect(() => {
    if (deliveries.deliveries !== undefined && deliveries.deliveries !== null)
      setDeliveriesState(deliveries.deliveries);
    if (
      deliveries.deliveriesId !== undefined &&
      deliveries.deliveriesId !== null
    ) {
      setDeliveriesIdState(deliveries.deliveriesId);
      setDeliveriesData({
        name: deliveries.deliveriesId.result.name,
        phone_number: deliveries.deliveriesId.result.phone_number,
        address_main: deliveries.deliveriesId.result.address_main,
        address_sub: deliveries.deliveriesId.result.address_sub,
        zip_code: deliveries.deliveriesId.result.zip_code,
        is_default: deliveries.deliveriesId.result.is_default,
      });
    }
  }, [deliveries]);

  useEffect(() => {
    if (productState && productState.purchases) {
      setPurchasesState(productState.purchases.result);
      const optionObjData = productOption(
        productState.purchases.result.product
      );
      setOption(optionObjData);
    }
  }, [productState]);
  // TODO 배송지 생성 팝업 오픈
  const handleDeliveriesOpen = (state, id) => {
    if (state === "create") {
      setDeliveriesData({
        name: "",
        phone_number: "",
        address_main: "",
        address_sub: "",
        zip_code: "",
        is_default: false,
      });
      if (deliveriesState.result.length === 0) {
        setDeliveriesData({
          ...deliveriesData,
          is_default: true,
        });
      }
    } else if (state === "edit") {
      dispatch(deliveriesActions.getDeliveriesId(id));
    }

    setDeliveriesOpen(true);
  };
  // TODO 배송지 생성 팝업 닫기
  const handleDeliveriesClose = () => {
    setDeliveriesOpen(false);
  };
  //TODO 배송지 생성
  const handlePostDeliveries = () => {
    setDeliveriesOpen(false);
    dispatch(deliveriesActions.postDeliveries(deliveriesData));
    scrollRef.current.scrollLeft = 0;
  };
  // TODO 배송지 삭제
  const handleDeliveriesDelete = (id) => {
    dispatch(deliveriesActions.deleteDeliveries(id));
  };
  // TODO 배송지 변경
  const handleDeliveriesEdit = (id) => {
    dispatch(deliveriesActions.patchDeliveries(id, deliveriesData));
    setDeliveriesOpen(false);
  };
  const handleSnackbarClose = (newState) => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };
  const changeDeliveries = () => {
    dispatch(productActions.patchPurchases(id, selectDeliveriey));
    setDeliveriesEditState("edit");
    dispatch(productActions.getPurchases(id));
  };
  const editDeliveries = () => {
    setSelectDeliveriey({
      ...selectDeliveriey,
      delivery_message: purchasesState.purchase_delivery.delivery_message,
    });
    dispatch(productActions.patchPurchases(id, selectDeliveriey));
    setDeliveriesEditState("create");
  };
  if (!purchasesState) return <></>;

  return (
    <Page className={classes.root} title="내모마켓">
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item lg={4} xs={12}>
            <ProductInformBox
              modelState={purchasesState.product}
              option={option}
            />
          </Grid>
          <Grid item lg={8} xs={12}>
            <PurchaseInfo
              scrollRef={scrollRef}
              purchasesState={purchasesState}
              deliveriesOpen={deliveriesOpen}
              deliveriesState={deliveriesState}
              deliveriesData={deliveriesData}
              deliveriesIdState={deliveriesIdState}
              deliveriesEditState={deliveriesEditState}
              setDeliveriesEditState={setDeliveriesEditState}
              handleDeliveriesOpen={handleDeliveriesOpen}
              handleDeliveriesClose={handleDeliveriesClose}
              handlePostDeliveries={handlePostDeliveries}
              handleDeliveriesDelete={handleDeliveriesDelete}
              handleDeliveriesEdit={handleDeliveriesEdit}
              setDeliveriesData={setDeliveriesData}
              setPopupState={setPopupState}
              popupState={popupState}
              selectDeliveriey={selectDeliveriey}
              setSelectDeliveriey={setSelectDeliveriey}
              changeDeliveries={changeDeliveries}
              editDeliveries={editDeliveries}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarState.open}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success" sx={{ width: "100%" }} color="info">
          {snackbarState.massage}
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default ProductPurchase;
