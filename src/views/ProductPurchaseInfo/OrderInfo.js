import React from "react";
import dayjs from "dayjs";
// MUI stuff
import { Box } from "@mui/material";

const OrderInfo = (props) => {
  return (
    <Box>
      <Box className={props.classes.PurchaseTitle}>
        <Box sx={{ color: "nemoMint.400" }}>주문</Box>이 완료되었습니다.
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "grayscale.600",
            mt: 3,
          }}
        >
          <Box sx={{ typography: "body1" }}>주문번호</Box>
          <Box sx={{ typography: "h6" }}>{props.purchasesState.id}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          color: "grayscale.600",
        }}
      >
        <Box sx={{ typography: "body1" }}>거래일자</Box>
        <Box sx={{ typography: "h6" }}>
          {dayjs(props.purchasesState.created).format("YYYY.MM.DD. hh:mm")}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderInfo;
