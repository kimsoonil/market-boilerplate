import React, { useState } from "react";
import DeliveriesDialog from "src/components/DeliveriesDialog";

import PurchaseContent from "src/components/PurchaseContent";
import Deliveries from "../../components/Deliveries";
import Payment from "./Payment";
import OrdererInform from "./OrdererInform";
import Quailed from "./Quailed";
import AmountPayment from "./AmountPayment";
// MUI stuff
import { Box, Button, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  PurchaseTitle: {
    ...theme.typography.h4,
    display: "flex",
    flexDirection: "row",
    paddingBottom: theme.spacing(1),
    borderBottom: "2px solid #0D0D0D",
  },
  PurchaseContentTitle: {
    ...theme.typography.h5,
    color: theme.palette.grayscale[600],
  },
  PurchaseContent: {
    border: "1px solid #cfcfcf",
    marginTop: theme.spacing(1),
    minHeight: 100,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  PurchaseBtn: {
    ...theme.typography.h5,
    width: "100%",
    height: 55,
    fontSize: "18px",
    margin: "32px 0",
    backgroundColor: theme.palette.nemoMint[400],
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grayscale[1000],
    "&:hover": {
      backgroundColor: theme.palette.nemoMint[400],
    },
  },
  amount: {
    display: "flex",
    justifyContent: "space-between",
    color: "#6e6e6e",
    marginBottom: theme.spacing(1),
  },
}));

const ProductInform = (props) => {
  const classes = useStyles();
  const [pgState, setPgState] = useState("uplus");

  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp64898987");

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: pgState, // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: props.paymentState.result.price_total, // 결제금액
      name: "내모마켓", // 주문명
      buyer_name: props.userState.user.result.name, // 구매자 이름
      buyer_tel: props.userState.user.result.phone_number, // 구매자 전화번호
      buyer_email: props.userState.user.result.email, // 구매자 이메일
      // buyer_addr: "", // 구매자 주소
      // buyer_postcode: "", // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  function callback(response) {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      props.hanldeClickNextPage();
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  const [termsConditions, setTermsConditions] = useState([
    {
      isCheck: false,
      title:
        "검수 통과된 상품의 교환이나 환불은 불가능하고, 단순 변심이나 실수에 의한 취소도 불가능해요.",
      content:
        "본 거래는 개인 간 거래로 전자상거래 법(제17조)에 따른 청약철회(환불, 교환) 규정이 적용되지 않아요!",
    },
    {
      isCheck: false,
      title:
        "판매자의 판매거부, 배송지연, 미입고, 품질 미달 등의 사유가 발생할 경우, 거래가 취소될 수 있어요.",
      content:
        "본 거래는 개인 간 거래로 구매자가 정상적인 제품을 받아볼 수 있도록 하기 위함이에요. 이 경우 특정 상황에서 거래를 취소시킬 수 있어요!",
    },
  ]);

  const hanleClickPurchase = (e, index) => {
    let newArr = [...termsConditions]; // copying the old datas array
    newArr[index].isCheck = e;

    setTermsConditions(newArr);
  };

  return (
    <Box
      sx={{
        ml: 3,
        "@media (max-width: 1080px)": {
          ml: 0,
          mt: 11,
        },
      }}
    >
      <Box className={classes.PurchaseTitle}>
        <Box sx={{ color: "nemoMint.400" }}>구매 정보</Box>를 입력해주세요.
      </Box>
      <Grid>
        <Grid item>
          <OrdererInform {...props} classes={classes} />
        </Grid>
        <Grid item>
          <Box sx={{ mt: 4 }}>
            <Box className={classes.PurchaseContentTitle}>배송지 정보</Box>
            <Deliveries {...props} classes={classes} />
          </Box>
        </Grid>
        <Grid item>
          <Payment
            pgState={pgState}
            setPgState={setPgState}
            classes={classes}
          />
        </Grid>
        <Grid item>
          <AmountPayment paymentState={props.paymentState} classes={classes} />
        </Grid>
        <Grid item>
          <Quailed />
        </Grid>
        <Grid item>
          <PurchaseContent
            DataList={termsConditions}
            hanleClickPurchase={hanleClickPurchase}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        className={classes.PurchaseBtn}
        disabled={
          !(
            termsConditions[0].isCheck &
            termsConditions[1].isCheck &
            (props.verificationsText === "변경") &
            (props.selectDeliveriey.id !== 0)
          )
        }
        onClick={() => onClickPayment()}
        // onClick={() => props.hanldeClickNextPage()}
      >
        {props.paymentState.result.price_total.toLocaleString()}원 결제하기
      </Button>
      <DeliveriesDialog
        open={props.deliveriesOpen}
        handleClose={props.handleDeliveriesClose}
        {...props}
      />
    </Box>
  );
};

export default ProductInform;
