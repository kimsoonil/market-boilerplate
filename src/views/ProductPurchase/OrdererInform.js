import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verificationsActions } from "src/actions";
import dayjs from "dayjs";
import "dayjs/locale/ko";
// MUI stuff
import { Box, TextField, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  checkBtn: {
    ...theme.typography.h6,
    backgroundColor: theme.palette.grayscale[1000],
    color: theme.palette.grayscale[0],
    height: 45,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(0.4),
    "&:disabled": {
      backgroundColor: theme.palette.grayscale[100],
      color: theme.palette.grayscale[500],
    },
    "&:hover": {
      backgroundColor: theme.palette.grayscale[100],
      color: theme.palette.grayscale[500],
    },
  },
  certification: {
    ...theme.typography.body1,
    position: "absolute",
    right: 12,
    top: 8,
    height: 45,
    lineHeight: "45px",
    color: theme.palette.grayscale[500],
    cursor: "pointer",
  },
  TextField: {
    height: 45,
    borderRadius: theme.spacing(1),
    paddingRight: theme.spacing(3),
    "&.Mui-focused": {
      border: "2px solid #555",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
  certificationText: {
    height: 45,
    width: "100%",
    borderRadius: theme.spacing(1),
    "&.Mui-focused": {
      border: "2px solid #555",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
  verificationsTime: {
    ...theme.typography.body1,
    color: theme.palette.grayscale[500],
    position: "absolute",
    top: 20,
    right: 12,
  },
  bold: {
    color: theme.palette.grayscale[1000],
    ...theme.typography.h6,
  },
}));

const OrdererInform = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  const [isName, setIsName] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const verificationsState = useSelector((state) => state.verifications);
  const [isVerifications, setIsVerifications] = useState(false);
  const [verificationsCode, setVerificationsCode] = useState("");

  const [errorMassge, setErrorMassge] = useState("");
  const [timeData, setTimeData] = useState();
  const [user, setUser] = useState({
    user: "",
    phone_number: "",
  });

  let timeTimeout = setTimeout(() => {
    setTimeData(dayjs(timeData).subtract(1, "s"));
  }, 1000);
  clearTimeout(timeTimeout);

  useEffect(() => {
    if (props.userState.user !== undefined && props.userState.user !== null) {
      if (
        props.userState.user.result.name &&
        props.userState.user.result.phone_number
      ) {
        setUser({
          name: props.userState.user.result.name,
          phone_number: props.userState.user.result.phone_number.replace(
            /-/g,
            ""
          ),
        });
        props.setVerificationsText("변경");
      }
    }
  }, [props.userState]);

  useEffect(() => {
    if (verificationsState.data) {
      if (!verificationsState.data.is_success) {
        setIsVerifications(true);
        props.setVerificationsText("재전송");
      }
      if (verificationsState.data.result.created) {
        const diff = dayjs(verificationsState.data.result.deadline).diff(
          verificationsState.data.result.created
        );

        setIsVerifications(true);
        setTimeData(diff);
        props.setVerificationsText("재전송");
      }
      if (verificationsState.data.message === "인증이 완료 되었습니다.") {
        setIsVerifications(false);
        props.setVerificationsText("변경");
      }
    }
  }, [verificationsState.data]);

  useEffect(() => {
    if (verificationsState.error) {
      setErrorMassge(verificationsState.error);
    }
    if (verificationsState.error === "인증번호 재전송 후 입력해 주세요.") {
      props.setVerificationsText("재전송");
    }
  }, [verificationsState.error]);

  useEffect(() => {
    if (timeData && isVerifications) {
      timeTimeout = setTimeout(() => {
        setTimeData(dayjs(timeData).subtract(1, "s"));
      }, 1000);

      if (
        dayjs(timeData)
          .subtract(1, "s")
          .format("mm:ss") === "59:59"
      ) {
        clearTimeout(timeTimeout);
        props.setVerificationsText("재전송");
      }
    }
    return () => clearTimeout(timeTimeout);
  }, [timeData, isVerifications]);
  const phoneVerifications = () => {
    if (props.verificationsText === "변경") {
      const change = window.confirm(
        "새로 인증하겠습니까?\n기존 인증 정보는 삭제 됩니다."
      );
      if (change) {
        setUser({
          name: "",
          phone_number: "",
        });
        props.setVerificationsText("인증");
      }
    } else {
      setVerificationsCode("");
      dispatch(verificationsActions.postPhoneVerifications(user));
    }
  };
  const phoneVerificationsCheck = () => {
    const check = {
      phone_number: user.phone_number,
      code: verificationsCode,
    };
    dispatch(verificationsActions.postPhoneVerificationsCheck(check));
  };
  const stateValue = (e, key) => {
    e.persist();

    if (key === "name") {
      setUser((user) => ({
        ...user,
        name: e.target.value,
      }));
      setIsName(nameValidation());
    } else if (key === "phone_number") {
      setUser((user) => ({
        ...user,
        phone_number: e.target.value,
      }));
      setIsPhoneNumber(phoneNumberValidation());
    }
  };
  const nameValidation = () => {
    if (user.name !== undefined)
      return user.name.length > 20 || user.name.search(pattern) <= -1;
  };
  const phoneNumberValidation = () => {
    if (user.phone_number !== undefined)
      return (
        user.phone_number.length < 10 ||
        user.phone_number.length > 11 ||
        user.phone_number.substr(0, 2) !== "01"
      );
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Box className={props.classes.PurchaseContentTitle}>주문자 정보</Box>
      <Box className={props.classes.PurchaseContent}>
        <Box sx={{ mb: 1.5 }}>
          <Box>
            <TextField
              size="small"
              InputProps={{
                className: classes.TextField,
              }}
              fullWidth
              placeholder="이름을 입력해주세요"
              margin="dense"
              value={user.name || ""}
              onChange={(e) => stateValue(e, "name")}
              onBlur={(e) => stateValue(e, "name")}
              disabled={props.verificationsText === "변경"}
              error={isName}
              helperText={isName && "이름을 정확히 입력해주세요."}
            />
            <Box sx={{ position: "relative" }}>
              <TextField
                size="small"
                InputProps={{
                  className: classes.TextField,
                  type: "number",
                }}
                fullWidth
                placeholder="핸드폰 번호 (-없이 입력)"
                margin="dense"
                value={user.phone_number || ""}
                onChange={(e) => stateValue(e, "phone_number")}
                onBlur={(e) => stateValue(e, "phone_number")}
                disabled={props.verificationsText === "변경"}
                error={isPhoneNumber}
                helperText={isPhoneNumber && "연락처를 정확히 입력해주세요."}
              />
              <Box
                className={clsx(
                  classes.certification,
                  !isPhoneNumber &&
                    !isPhoneNumber &&
                    user.name !== "" &&
                    user.phone_number !== "" &&
                    props.verificationsText !== "변경" &&
                    classes.bold
                )}
                onClick={() => phoneVerifications()}
              >
                {props.verificationsText}
              </Box>
            </Box>
            {isVerifications && (
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 11" sx={{ position: "relative" }}>
                  <TextField
                    size="small"
                    InputProps={{
                      className: classes.certificationText,
                    }}
                    fullWidth
                    placeholder="인증 번호 6자리"
                    margin="dense"
                    value={verificationsCode}
                    onChange={(e) => setVerificationsCode(e.target.value)}
                    error={errorMassge !== ""}
                    helperText={errorMassge}
                  />
                  <Box className={classes.verificationsTime}>
                    {dayjs(timeData).format("mm:ss")}
                  </Box>
                </Box>
                <Box
                  gridColumn="span 1"
                  sx={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    className={classes.checkBtn}
                    onClick={() => phoneVerificationsCheck()}
                    disabled={
                      verificationsCode.length !== 6 ||
                      dayjs(timeData).format("mm:ss") === "00:00"
                    }
                  >
                    확인
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdererInform;
