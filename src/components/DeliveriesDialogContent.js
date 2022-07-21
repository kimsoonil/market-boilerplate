import React, { useState } from "react";

import { Box, TextField, Button, FormControlLabel } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import { IOSSwitch } from "src/components/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 700,
  },
  dialogTitle: {
    ...theme.typography.h5,
    textAlign: "center",
    "& svg": {
      position: "absolute",
      right: 20,
      top: 16,
      fontSize: 24,
    },
  },
  deliveriesForm: {
    marginBottom: theme.spacing(4),
  },
  deliveriesTitle: {
    ...theme.typography.h6,
    marginBottom: theme.spacing(1),
  },
  deliveriesInput: {
    borderRadius: theme.spacing(1),
    borderColor: theme.palette.nemoMint[200],
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    "&.Mui-focused": {
      border: "2px solid #555",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
  deliveriesBtn: {
    ...theme.typography.h5,
    backgroundColor: theme.palette.nemoMint[400],
    color: theme.palette.nemoMint[800],
    height: 50,
    fontSize: 18,
    borderRadius: theme.spacing(1),
    "&:disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
    },
  },
  deliveriesDeleteBtn: {
    ...theme.typography.h5,
    backgroundColor: theme.palette.grayscale[0],
    color: theme.palette.systemRed[600],
    border: "1px solid #ff0000",
    height: 50,
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function DeliveriesDialogContent(props) {
  const classes = useStyles();

  const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  const [isName, setIsName] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);

  const stateValue = (e, key) => {
    e.persist();
    if (key === "name") {
      props.setDeliveriesData((deliveries) => ({
        ...deliveries,
        name: e.target.value,
      }));
      setIsName(nameValidation());
    } else if (key === "phone_number") {
      props.setDeliveriesData((deliveries) => ({
        ...deliveries,
        phone_number: e.target.value,
      }));
      setIsPhoneNumber(phoneNumberValidation());
    } else if (key === "address_sub") {
      props.setDeliveriesData((deliveries) => ({
        ...deliveries,
        address_sub: e.target.value,
      }));
    } else if (key === "is_default") {
      props.setDeliveriesData((deliveries) => ({
        ...deliveries,
        is_default: e.target.checked,
      }));
    }
  };
  const nameValidation = () => {
    return (
      props.deliveriesData.name.length > 20 ||
      props.deliveriesData.name.search(pattern) <= -1
    );
  };
  const phoneNumberValidation = () => {
    return (
      props.deliveriesData.phone_number.length < 10 ||
      props.deliveriesData.phone_number.length > 11 ||
      props.deliveriesData.phone_number.substr(0, 2) !== "01"
    );
  };

  const saveDeliveriesDialog = () => {
    if (
      props.deliveriesState.result.length === 0 &&
      !props.deliveriesData.is_default
    ) {
      alert("적어도 한 개의 기본 배송지는 존재해야 합니다.");
    } else {
      props.handlePostDeliveries();
    }
  };

  const saveEditDeliveriesDialog = () => {
    if (props.deliveriesIdState.result.is_default) {
      if (!props.deliveriesData.is_default) {
        alert("다른 배송지를 기본 배송지로 설정해주세요");
      } else {
        props.handleDeliveriesEdit(props.deliveriesIdState.result.id);
      }
    } else {
      props.handleDeliveriesEdit(props.deliveriesIdState.result.id);
    }
  };
  return (
    <Box
      className={classes.root}
      sx={{ display: props.screen === "Deliveries" ? "block" : "none" }}
    >
      <Box className={classes.dialogTitle}>
        {props.popupState === "edit" ? "배송지 주소 변경" : "새주소 추가하기"}
        <CloseIcon onClick={props.handleClose} sx={{ cursor: "pointer" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 650,
          pt: 3,
          flexDirection: "column",
        }}
      >
        <Box>
          <Box className={classes.deliveriesForm}>
            <Box className={classes.deliveriesTitle}>이름</Box>
            <TextField
              InputProps={{
                classes: {
                  root: classes.deliveriesInput,
                },
              }}
              variant="outlined"
              fullWidth
              size="small"
              placeholder="받는 분의 이름"
              value={props?.deliveriesData.name}
              onChange={(e) => stateValue(e, "name")}
              onBlur={(e) => stateValue(e, "name")}
              error={isName}
              helperText={isName && "이름을 정확히 입력해주세요."}
            />
          </Box>
          <Box className={classes.deliveriesForm}>
            <Box className={classes.deliveriesTitle}>연락처</Box>
            <TextField
              InputProps={{
                classes: {
                  root: classes.deliveriesInput,
                },
              }}
              type="number"
              variant="outlined"
              placeholder="-없이 입력"
              fullWidth
              size="small"
              value={props?.deliveriesData.phone_number.replace(/-/g, "")}
              onChange={(e) => stateValue(e, "phone_number")}
              onBlur={(e) => stateValue(e, "phone_number")}
              error={isPhoneNumber}
              helperText={isPhoneNumber ? "연락처를 정확히 입력해주세요." : ""}
            />
          </Box>
          <Box className={classes.deliveriesForm}>
            <Box className={classes.deliveriesTitle}>주소</Box>
            <TextField
              InputProps={{
                classes: {
                  root: classes.deliveriesInput,
                },
              }}
              variant="outlined"
              placeholder="주소검색"
              fullWidth
              size="small"
              value={props?.deliveriesData.address_main}
              onClick={() => props.setScreen("Address")}
            />
          </Box>
          <Box className={classes.deliveriesForm}>
            <Box className={classes.deliveriesTitle}>상세주소</Box>
            <TextField
              InputProps={{
                classes: {
                  root: classes.deliveriesInput,
                },
              }}
              variant="outlined"
              placeholder="건물, 아파트 동/호수 입력"
              fullWidth
              size="small"
              value={props?.deliveriesData.address_sub}
              onChange={(e) => stateValue(e, "address_sub")}
              onBlur={(e) => stateValue(e, "address_sub")}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={props?.deliveriesData.is_default}
                  onClick={(e) => stateValue(e, "is_default")}
                />
              }
              label="기본 배송지로 등록"
            />
          </Box>
        </Box>
        <Box sx={{ display: "none" }}>
          <input id="addressInputField" type="text" />
        </Box>
        <Box>
          {props.popupState === "edit" && (
            <Button
              fullWidth
              className={classes.deliveriesDeleteBtn}
              onClick={() =>
                props.handleDeliveriesDelete(props?.deliveriesIdState.result.id)
              }
            >
              배송지 삭제
            </Button>
          )}
          <Button
            fullWidth
            className={classes.deliveriesBtn}
            onClick={
              props?.popupState === "edit"
                ? saveEditDeliveriesDialog
                : saveDeliveriesDialog
            }
            disabled={isName || isPhoneNumber}
          >
            {props?.popupState === "edit" ? "주소 변경 완료" : "주소 저장하기"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
