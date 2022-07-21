import React, { useState } from "react";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  quailedBox: {
    padding: "16px 16px 20px",
    background: "#B9FCF7",
    borderRadius: theme.spacing(1),
    color: "#09494F",
    marginTop: theme.spacing(3),
  },
  quailed: {
    fontFamily: "Pretendard Bold",
    fontSize: theme.spacing(1),
    transform: "translate(-12%, -50%) scale(0.8)",
    color: "#00ED96",
    background: "#09494F",
    width: 112,
    borderRadius: theme.spacing(1.5),
    padding: "2px 4px",
  },
}));

const ProductInform = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.quailedBox}>
      <Box className={classes.quailed}>★ ONLY QUALIFIED ★</Box>
      <Box sx={{ typography: "h5" }}>
        전문가의 검수에 합격한 상품만 발송해 드려요!
      </Box>
      <Box sx={{ typography: "body1", mt: 2 }}>
        판매자 상품 입고 완료 후 3영업일 이내 검수를 완료해요. 결제 완료
        시점으로 5-7일내 상품을 받아볼 수 있어요.
      </Box>
    </Box>
  );
};

export default ProductInform;
