import React, { useState } from "react";

import { Box } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import DaumPostcode from "react-daum-postcode";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 660,
  },
  dialogTitle: {
    ...theme.typography.h5,
    textAlign: "center",
    paddingBottom: 40,
    "& svg": {
      position: "absolute",
      right: 8,
      top: 8,
      fontSize: 24,
    },
  },
}));

export default function AddressDialog(props) {
  const classes = useStyles();
  const onCompletePost = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setDeliveriesData((deliveries) => ({
      ...deliveries,
      address_main: fullAddress,
      zip_code: data.zonecode,
    }));
    props.handleClose();
  };

  const postCodeStyle = {
    display: "block",
    height: 660,
  };
  return (
    <Box
      className={classes.root}
      sx={{ display: props.screen === "Address" ? "block" : "none" }}
    >
      <Box className={classes.dialogTitle}>
        <CloseIcon
          onClick={() => props.handleClose()}
          sx={{ cursor: "pointer" }}
        />
      </Box>
      <DaumPostcode
        style={postCodeStyle}
        {...props}
        autoClose={false}
        onComplete={onCompletePost}
      />
    </Box>
  );
}
