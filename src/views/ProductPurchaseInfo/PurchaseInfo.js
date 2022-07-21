import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveriesAddress from "./DeliveriesAddress";
import AmountPaymentInfo from "./AmountPaymentInfo";
import TransactionProgress from "./TransactionProgress";
import OrderInfo from "./OrderInfo";
import Deliveries from "../../components/Deliveries";
import DeliveriesDialog from "src/components/DeliveriesDialog";
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
  PurchaseContent: {
    border: "1px solid #cfcfcf",
    marginTop: theme.spacing(1),
    minHeight: 100,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  PurchaseContentTitle: {
    ...theme.typography.h5,
    color: theme.palette.grayscale[600],
  },
  PurchaseBtn: {
    ...theme.typography.h5,
    width: "100%",
    height: 55,
    fontSize: "18px",
    margin: "32px 0",
    backgroundColor: theme.palette.nemoMint[400],
    borderRadius: theme.spacing(2),
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
    alignItems: "center",
    color: theme.palette.grayscale[600],
    marginBottom: theme.spacing(1),
  },
  deliveries: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  explanation: {
    ...theme.typography.body2,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grayscale[600],
    background: theme.palette.nemoMintGray[100],
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    "@media (max-width: 1080px)": {
      padding: "12px 8px",
    },
  },
  progressbar: {
    background: "rgba(150, 201, 195, 0.5)",
    height: theme.spacing(1),
    "& .MuiLinearProgress-bar": {
      backgroundColor: theme.palette.nemoMint[800],
    },
  },
  paymentExplanation: {
    ...theme.typography.body2,
    color: theme.palette.grayscale[600],
    display: "flex",
    alignItems: "center",
    background: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    justifyContent: "space-between",
  },
  deliveriesExplanation: {
    ...theme.typography.body2,
    color: theme.palette.grayscale[600],
    display: "flex",
    alignItems: "center",
    background: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
  deliveriesEdit: {
    ...theme.typography.body2,
    color: theme.palette.grayscale[0],
    backgroundColor: theme.palette.grayscale[700],
    borderRadius: theme.spacing(2.5),
    padding: "2px 8px",
    cursor: "pointer",
  },
  deliveriesClose: {
    ...theme.typography.body2,
    color: theme.palette.grayscale[600],
    backgroundColor: theme.palette.grayscale[0],
    border: "1px solid #555",
    borderRadius: theme.spacing(2.5),
    padding: "2px 8px",
    cursor: "pointer",
  },
  adrressTitle: {
    ...theme.typography.body1,
    minWidth: 76,
    color: theme.palette.grayscale[600],
  },
}));

const ProductInform = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid>
      <Box
        sx={{
          ml: 3,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          "@media (max-width: 1080px)": {
            ml: 0,
            mt: 11,
          },
        }}
      >
        <Grid item>
          <OrderInfo classes={classes} {...props} />
        </Grid>
        <Grid item>
          <TransactionProgress classes={classes} {...props} />
        </Grid>
        <Grid item>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box className={classes.PurchaseContentTitle}>배송 주소</Box>
              <Box
                className={
                  props.deliveriesEditState === "edit"
                    ? classes.deliveriesEdit
                    : classes.deliveriesClose
                }
                onClick={
                  () =>
                    props.deliveriesEditState === "edit"
                      ? props.editDeliveries()
                      : props.setDeliveriesEditState("edit")
                  // : props.changeDeliveries()
                }
              >
                {props.deliveriesEditState === "edit"
                  ? "배송지 변경"
                  : "변경 취소"}
              </Box>
            </Box>
            <DeliveriesAddress {...props} classes={classes} />
            <Deliveries {...props} classes={classes} />
          </Box>
        </Grid>
        <Grid item>
          <AmountPaymentInfo {...props} classes={classes} />
        </Grid>
        <Button
          variant="contained"
          className={classes.PurchaseBtn}
          onClick={() => navigate("/")}
        >
          홈으로 가기
        </Button>
      </Box>
      <DeliveriesDialog
        {...props}
        open={props.deliveriesOpen}
        handleClose={props.handleDeliveriesClose}
      />
    </Grid>
  );
};

export default ProductInform;
