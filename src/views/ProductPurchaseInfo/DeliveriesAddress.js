import React, { useState } from "react";

// MUI stuff
import { Box } from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";

const DeliveriesAddress = (props) => {
  return (
    <Box
      className={props.classes.PurchaseContent}
      sx={{
        display: props.deliveriesEditState === "edit" ? "block" : "none",
      }}
    >
      <Box className={props.classes.deliveries}>
        <Box className={props.classes.adrressTitle}>받는분</Box>
        <Box sx={{ typography: "h6" }}>
          {props.purchasesState.purchase_delivery.name}
        </Box>
      </Box>
      <Box className={props.classes.deliveries}>
        <Box className={props.classes.adrressTitle}>연락처</Box>
        <Box sx={{ typography: "h6" }}>
          {props.purchasesState.purchase_delivery.phone_number}
        </Box>
      </Box>
      <Box className={props.classes.deliveries}>
        <Box className={props.classes.adrressTitle}>주소</Box>
        <Box sx={{ typography: "h6" }}>
          {props.purchasesState.purchase_delivery.address_main}{" "}
          {props.purchasesState.purchase_delivery.address_sub}
        </Box>
      </Box>
      <Box className={props.classes.deliveries}>
        <Box className={props.classes.adrressTitle}>요청사항</Box>
        <Box sx={{ typography: "h6" }}>
          {props.purchasesState.purchase_delivery.delivery_message}
        </Box>
      </Box>
      <Box className={props.classes.deliveriesExplanation}>
        <ErrorIcon sx={{ fontSize: 12, mr: 0.5 }} />
        <Box>배송지 변경은 검수 이전 단계에서만 가능해요!</Box>
      </Box>
    </Box>
  );
};

export default DeliveriesAddress;
