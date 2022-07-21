import React, { useState } from "react";

// MUI stuff
import { Box, Button } from "@mui/material";

const AmountPaymentInfo = (props) => {
  return (
    <Box>
      <Box className={props.classes.PurchaseContentTitle}>결제 정보</Box>
      <Box className={props.classes.PurchaseContent}>
        <Box sx={{ borderBottom: "1px solid #cfcfcf" }}>
          <Box className={props.classes.amount}>
            <Box sx={{ typography: "body1" }}>상품 금액</Box>
            <Box sx={{ typography: "h6" }}>
              {props.purchasesState.payment.price_product
                ? props.purchasesState.payment.price_product.toLocaleString()
                : 0}
              원
            </Box>
          </Box>
          <Box className={props.classes.amount}>
            <Box sx={{ typography: "body1" }}>검수비</Box>
            <Box sx={{ typography: "h6" }}>
              {props.purchasesState.payment.price_fee_inspection
                ? props.purchasesState.payment.price_fee_inspection.toLocaleString() +
                  "원"
                : "무료"}
            </Box>
          </Box>
          <Box className={props.classes.amount}>
            <Box sx={{ typography: "body1" }}>수수료</Box>
            <Box sx={{ typography: "h6" }}>
              {props.purchasesState.payment.price_fee_service
                ? props.purchasesState.payment.price_fee_service.toLocaleString() +
                  "원"
                : "무료"}
            </Box>
          </Box>
          <Box className={props.classes.amount}>
            <Box sx={{ typography: "body1" }}>배송비</Box>
            <Box sx={{ typography: "h6" }}>
              {props.purchasesState.payment.price_fee_delivery
                ? props.purchasesState.payment.price_fee_delivery.toLocaleString() +
                  "원"
                : "무료"}
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
            {props.purchasesState.payment.price_total
              ? props.purchasesState.payment.price_total.toLocaleString() + "원"
              : "0원"}
          </Box>
        </Box>
        <Box className={props.classes.paymentExplanation}>
          <Box sx={{ typography: "body2" }}>결제정보</Box>
          <Box sx={{ typography: "button" }}>신한카드 1234-12**-****-**49</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AmountPaymentInfo;
