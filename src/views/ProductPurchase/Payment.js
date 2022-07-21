import React, { useState } from "react";

// MUI stuff
import { Box, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const useStyles = makeStyles((theme) => ({
  paymentBtn: {
    ...theme.typography.body1,
    backgroundColor: theme.palette.grayscale[50],
    height: 78,
    width: "33.3%",
    borderRadius: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    cursor: "pointer",
  },
  actionBtn: {
    border: "1px solid #555",
  },
}));

const Payment = (props) => {
  const classes = useStyles();

  return (
    <Box sx={{ mt: 4 }}>
      <Box className={props.classes.PurchaseContentTitle}>결제 수단</Box>
      <Box className={props.classes.PurchaseContent}>
        <RadioGroup value={"payment"}>
          <FormControlLabel
            value="payment"
            control={<Radio />}
            label="일반 결제"
          />
        </RadioGroup>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            className={clsx(
              classes.paymentBtn,
              props.pgState === "uplus" && classes.actionBtn
            )}
            onClick={() => props.setPgState("uplus")}
          >
            <CreditCardIcon sx={{ fontSize: 32, mb: 1 }} />
            신용/체크카드
          </Box>
          <Box
            className={clsx(
              classes.paymentBtn,
              props.pgState === "naverpay" && classes.actionBtn
            )}
            onClick={() => props.setPgState("naverpay")}
          >
            <Box sx={{ mb: 1, mt: 0.5 }}>
              <img
                src="/static/images/products/naver-pay.svg"
                alt="naver-pay"
              />
            </Box>
            네이버페이
          </Box>
          <Box
            className={clsx(
              classes.paymentBtn,
              props.pgState === "kakaopay" && classes.actionBtn
            )}
            onClick={() => props.setPgState("kakaopay")}
          >
            <Box sx={{ mb: 1, mt: 0.5 }}>
              <img
                src="/static/images/products/kakao-pay.svg"
                alt="kakao-pay"
              />
            </Box>
            카카오페이
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
