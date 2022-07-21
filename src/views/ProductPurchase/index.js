import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { productOption } from "src/utils/utils";
import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import { productActions, deliveriesActions, userActions } from "src/actions";
import ProductInformBox from "src/components/ProductInformBox";
import PurchaseInf from "./PurchaseInfo";
import { useNavigate } from "react-router-dom";

// MUI stuff
import { Container, Grid, Snackbar, Alert } from "@mui/material";

const ProductPurchase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const productState = useSelector((state) => state.products);
  const deliveries = useSelector((state) => state.deliveries);
  const userState = useSelector((state) => state.users);
  const [deliveriesState, setDeliveriesState] = useState();
  const [deliveriesIdState, setDeliveriesIdState] = useState();
  const [deliveriesEditState, setDeliveriesEditState] = useState("create");
  const [paymentState, setPaymentState] = useState();
  const [modelState, setModelState] = useState();
  const [verificationsText, setVerificationsText] = useState("인증");
  const [deliveriesOpen, setDeliveriesOpen] = useState(false);
  const [deliveriesData, setDeliveriesData] = useState({
    name: "",
    phone_number: "",
    address_main: "",
    address_sub: "",
    zip_code: 0,
    is_default: false,
  });
  let { id, payment } = useParams();
  const [option, setOption] = useState({});
  const [popupState, setPopupState] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    massage: "",
  });
  const [selectDeliveriey, setSelectDeliveriey] = useState({
    delivery: 0,
    delivery_message: "배송 요청사항을 선택해 주세요",
  });

  //TODO 데이터 호출
  useEffect(() => {
    dispatch(productActions.getPayment(payment));
    dispatch(productActions.getModelProduct(id));
    dispatch(deliveriesActions.getDeliveries());
    dispatch(userActions.getMe());
  }, []);

  //TODO 판매 정보 state / 모델 정보 state
  useEffect(() => {
    if (productState.payment !== undefined && productState.payment !== null)
      setPaymentState(productState.payment);
    if (productState.model !== undefined && productState.model !== null)
      setModelState(productState.model);
    if (
      productState.purchases !== undefined &&
      productState.purchases !== null
    ) {
      navigate(`/purchase/${productState.purchases.result.id}`);
    }
  }, [productState]);
  //TODO 배달지 정보 state
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
  //TODO 제폼 옵션 state
  useEffect(() => {
    if (modelState && modelState.result) {
      const optionObjData = productOption(modelState.result);
      setOption(optionObjData);
    }
  }, [modelState]);
  //TODO 배송지 생성
  const handlePostDeliveries = () => {
    setDeliveriesOpen(false);
    dispatch(deliveriesActions.postDeliveries(deliveriesData));
    scrollRef.current.scrollLeft = 0;
    handleSnackbarOpen({
      massage: "배송지가 생성되었습니다.",
    });
  };

  const hanldeClickNextPage = () => {
    if (selectDeliveriey.id !== 0) {
      dispatch(productActions.postPurchases(id, selectDeliveriey));
    } else {
      alert("배송지 정보를 확인해주세요");
    }
  };
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
  // TODO 배송지 삭제
  const handleDeliveriesDelete = (id) => {
    dispatch(deliveriesActions.deleteDeliveries(id));
    setDeliveriesOpen(false);
  };
  // TODO 배송지 변경
  const handleDeliveriesEdit = (id) => {
    dispatch(deliveriesActions.patchDeliveries(id, deliveriesData));
    setDeliveriesOpen(false);
  };
  // TODO 스낵바
  const handleSnackbarOpen = (newState) => {
    setSnackbarState({ open: true, ...newState });
  };
  const handleSnackbarClose = (newState) => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  if (!modelState || !deliveriesState || !paymentState) return <></>;

  return (
    <Page title="내모마켓">
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item lg={4} xs={12}>
            <ProductInformBox modelState={modelState.result} option={option} />
          </Grid>
          <Grid item lg={8} xs={12}>
            <PurchaseInf
              deliveriesState={deliveriesState}
              deliveriesData={deliveriesData}
              deliveriesOpen={deliveriesOpen}
              paymentState={paymentState}
              deliveriesIdState={deliveriesIdState}
              scrollRef={scrollRef}
              setDeliveriesData={setDeliveriesData}
              handlePostDeliveries={handlePostDeliveries}
              handleDeliveriesOpen={handleDeliveriesOpen}
              handleDeliveriesClose={handleDeliveriesClose}
              handleDeliveriesDelete={handleDeliveriesDelete}
              handleDeliveriesEdit={handleDeliveriesEdit}
              userState={userState}
              setPopupState={setPopupState}
              popupState={popupState}
              hanldeClickNextPage={hanldeClickNextPage}
              selectDeliveriey={selectDeliveriey}
              setSelectDeliveriey={setSelectDeliveriey}
              verificationsText={verificationsText}
              setVerificationsText={setVerificationsText}
              deliveriesEditState={deliveriesEditState}
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
