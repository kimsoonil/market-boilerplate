import React, { useState } from "react";

import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
    padding: theme.spacing(2),
    "@media (min-width: 1080px)": {
      width: 390,
    },
  },
  dialogTitle: {
    ...theme.typography.h5,
    textAlign: "center",
    paddingTop: 16,
    "& svg": {
      position: "absolute",
      right: 20,
      top: 16,
      fontSize: 24,
    },
  },
  deliveriesBtn: {
    ...theme.typography.h6,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.grayscale[50],
    cursor: "pointer",
    minHeight: 100,
  },
  resetBtn: {
    ...theme.typography.caption,
    backgroundColor: theme.palette.grayscale[700],
    color: theme.palette.grayscale[0],
    borderRadius: theme.spacing(1.5),
    padding: "2px 8px",
    marginLeft: theme.spacing(1),
    lineHeight: "130%",
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
}));

export default function DeliveriesChange(props) {
  const classes = useStyles();
  const handleEditPopupOpen = (id) => {
    props.setPopupState("edit");
    props.handleDeliveriesOpen("edit", id);
    props.setScreen("Deliveries");
  };
  const handlePopupOpen = () => {
    props.setPopupState("create");
    props.handleDeliveriesOpen("create", "");
    props.setScreen("Deliveries");
  };
  return (
    <Box
      className={classes.root}
      sx={{ display: props.screen === "DeliveriesChange" ? "block" : "none" }}
    >
      <Box className={classes.dialogTitle}>
        <Box>배송지 변경</Box>
        <CloseIcon onClick={props.handleClose} sx={{ cursor: "pointer" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          {props.deliveriesState.result.map((item, index) => {
            return (
              <Box
                className={classes.deliveriesBtn}
                // sx={{
                //   border: props.isDefault === props.item.id && "1px solid #555",
                // }}
                // onClick={() => handleClickDefault(props.item.id)}
                key={index}
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
                      {item.name}
                    </Box>
                    <Box
                      sx={{
                        typography: "body2",
                      }}
                    >
                      {item.phone_number}
                    </Box>
                  </Box>
                  <Box
                    className={classes.resetBtn}
                    onClick={() => handleEditPopupOpen(item.id)}
                  >
                    수정
                  </Box>
                </Box>
                <Box className={classes.address}>
                  {item.address_main} {item.address_sub}
                </Box>
                {item.is_default && (
                  <Box sx={{ width: "100%", mt: 1 }}>
                    <Box
                      sx={{
                        color: "grayscale.500",
                        typography: "caption",
                        fontSize: 10,
                        border: "1px solid #cfcfcf",
                        borderRadius: 10,
                        padding: "0 6px",
                        width: 64,
                      }}
                    >
                      기본 배송지
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}

          <Box
            className={classes.deliveriesBtn}
            onClick={() => handlePopupOpen()}
          >
            <AddOutlinedIcon sx={{ fontSize: 28, mb: 1 }} />
            배송지 추가
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
