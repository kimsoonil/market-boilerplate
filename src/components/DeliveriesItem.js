import React, { useState, useEffect } from "react";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  deliveriesBtn: {
    ...theme.typography.h6,
    padding: theme.spacing(1.5),
    width: 230,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.grayscale[50],
    cursor: "pointer",
  },
  resetBtn: {
    ...theme.typography.caption,
    backgroundColor: theme.palette.grayscale[700],
    color: theme.palette.grayscale[0],
    borderRadius: theme.spacing(1.5),
    padding: "2px 8px",
    marginLeft: theme.spacing(1),
  },

  address: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    wordBreak: "break-word",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    // width: "12rem",
    height: 36,
    overflow: "hidden",
  },
  defaultClass: {
    ...theme.typography.caption,
    color: theme.palette.grayscale[500],
    fontSize: 10,
    border: "1px solid #cfcfcf",
    borderRadius: 10,
    padding: "0 6px",
    width: 64,
  },
}));

const DeliveriesItem = (props) => {
  const classes = useStyles();

  const handleEditPopupOpen = () => {
    props.setPopupState("edit");
    props.handleDeliveriesOpen("edit", props.item.id);
  };
  useEffect(() => {
    if (props.item.is_default)
      props.setSelectDeliveriey({
        ...props.selectDeliveriey,
        delivery: props.item.id,
      });
  }, []);

  return (
    <Box
      className={classes.deliveriesBtn}
      sx={{
        border:
          props.selectDeliveriey.delivery === props.item.id && "1px solid #555",
      }}
      onClick={() =>
        props.setSelectDeliveriey({
          ...props.selectDeliveriey,
          delivery: props.item.id,
        })
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              typography: "button",
              mr: 1,
            }}
          >
            {props.item.name}
          </Box>
          <Box
            sx={{
              typography: "body2",
            }}
          >
            {props.item.phone_number}
          </Box>
        </Box>
        <Box className={classes.resetBtn} onClick={handleEditPopupOpen}>
          수정
        </Box>
      </Box>
      <Box className={classes.address}>
        {props.item.address_main} {props.item.address_sub}
      </Box>
      {props.item.is_default && (
        <Box sx={{ width: "100%", mt: 1 }}>
          <Box className={classes.defaultClass}>기본 배송지</Box>
        </Box>
      )}
    </Box>
  );
};

export default DeliveriesItem;
