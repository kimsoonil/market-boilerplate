import React, { useState } from "react";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const AmountPayment = (props) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Box className={props.classes.PurchaseTitle}>
        <Box sx={{ color: "nemoMint.400" }}>결제 금액</Box>을 확인해주세요.
      </Box>
      <Box sx={{ pb: 2, pt: 3, borderBottom: "1px solid #cfcfcf" }}>
        <Box className={props.classes.amount}>
          <Box sx={{ typography: "body1" }}>상품 금액</Box>
          <Box sx={{ typography: "h6" }}>
            {props.paymentState.result.price_product.toLocaleString() || 0}원
          </Box>
        </Box>
        <Box className={props.classes.amount}>
          <Box sx={{ typography: "body1" }}>검수비</Box>
          <Box sx={{ typography: "h6" }}>
            {props.paymentState.result.price_fee_inspection === 0
              ? "무료"
              : props.paymentState.result.price_fee_inspection.toLocaleString() +
                "원"}
          </Box>
        </Box>
        <Box className={props.classes.amount}>
          <Box sx={{ typography: "body1" }}>수수료</Box>
          <Box sx={{ typography: "h6" }}>
            {props.paymentState.result.price_fee_service === 0
              ? "무료"
              : props.paymentState.result.price_fee_service.toLocaleString() +
                "원"}
          </Box>
        </Box>
        <Box className={props.classes.amount}>
          <Box sx={{ typography: "body1" }}>배송비</Box>
          <Box sx={{ typography: "h6" }}>
            {props.paymentState.result.price_fee_delivery.toLocaleString() || 0}
            원
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#0d0d0d",
          mb: 1,
          mt: 2,
        }}
      >
        <Box sx={{ typography: "body1", fontSize: 16 }}>총 결제 금액</Box>
        <Box sx={{ typography: "h4" }}>
          {props.paymentState.result.price_total.toLocaleString() || 0}원
        </Box>
      </Box>
    </Box>
  );
};

export default AmountPayment;
