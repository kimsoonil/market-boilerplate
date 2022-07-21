import React, { useState } from "react";

// MUI stuff
import { Box, Select, MenuItem, FormControl } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeliveriesItem from "./DeliveriesItem";
import typography from "src/theme/typography";

const useStyles = makeStyles((theme) => ({
  deliveriesBtn: {
    ...theme.typography.h6,
    padding: theme.spacing(1.5),
    width: 230,
    minHeight: 110,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
  PurchaseScroll: {
    marginBottom: theme.spacing(1.5),
    overflowX: "auto",
    overflowY: "hidden",
    "&::-webkit-scrollbar": {
      display: "flex",
      height: 3,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#000",
    },
  },
  purchaseChangeBtn: {
    ...theme.typography.h6,
    maxWidth: 326,
    color: theme.palette.grayscale[0],
    backgroundColor: theme.palette.grayscale[600],
    marginTop: "24px",
    borderRadius: "12px",
    textAlign: "center",
    padding: "12px 0",
    cursor: "pointer",
  },
}));

const Deliveries = (props) => {
  const classes = useStyles();
  const handleChange = (event) => {
    props.setSelectDeliveriey({
      ...props.selectDeliveriey,
      delivery_message: event.target.value,
    });
  };
  const handlePopupOpen = () => {
    props.setPopupState("create");
    props.handleDeliveriesOpen("create", "");
  };
  return (
    <Box
      className={props.classes.PurchaseContent}
      sx={{
        display: props.deliveriesEditState === "create" ? "block" : "none",
      }}
    >
      <Box
        className={classes.PurchaseScroll}
        ref={(element) => {
          if (props.scrollRef) {
            props.scrollRef.current = element;
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: 230 * props.deliveriesState.result.length + 230,
            pb: 1.5,
            minWidth: "100%",
            justifyContent:
              props.deliveriesState.result.length > 0 ? "flex-start" : "center",
            gap: 1,
          }}
        >
          {props.deliveriesState.result.map((item, index) => {
            return <DeliveriesItem key={index} item={item} {...props} />;
          })}
          <Box className={classes.deliveriesBtn} onClick={handlePopupOpen}>
            <AddOutlinedIcon sx={{ fontSize: 28, mb: 1 }} />
            배송지 추가
          </Box>
        </Box>
      </Box>
      <FormControl size="small" fullWidth>
        <Select
          onChange={handleChange}
          value={props.selectDeliveriey.delivery_message}
        >
          <MenuItem value={"배송 요청사항을 선택해 주세요"}>
            배송 요청사항을 선택해 주세요
          </MenuItem>
          <MenuItem value={"직접 받고 부재시 문 앞에 놓아주세요!"}>
            직접 받고 부재시 문 앞에 놓아주세요!
          </MenuItem>
          <MenuItem value={"문 앞에 놓고 가주세요!"}>
            문 앞에 놓고 가주세요!
          </MenuItem>
          <MenuItem value={"경비실에 맡겨주세요!"}>
            경비실에 맡겨주세요!
          </MenuItem>
          <MenuItem value={"택배함에 넣어주세요!"}>
            택배함에 넣어주세요!
          </MenuItem>
          <MenuItem value={"부재시 연락주세요!"}>부재시 연락주세요!</MenuItem>
        </Select>
      </FormControl>
      {props.changeDeliveries !== undefined && (
        <Box sx={{ textAlign: "-webkit-right" }}>
          <Box
            className={classes.purchaseChangeBtn}
            onClick={() => props.changeDeliveries()}
          >
            배송지 변경 완료
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Deliveries;
