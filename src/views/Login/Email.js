import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import components
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import { userActions, alertActions } from "src/actions";
import Cookies from "universal-cookie";
// MUI stuff
import {
  Box,
  Container,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "calc(100vh - 72px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.grayscale[0],
    overflow: "hidden",
  },

  // loginBox
  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 504,
    width: "100vw",
    padding: "0 16px",
  },

  loginTextField: {
    marginTop: 4,
    marginBottom: theme.spacing(3),
    "& .MuiInputBase-root": {
      height: 45,
      borderRadius: theme.spacing(1),
    },

    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.5),
    },
  },
  ActivateBtn: {
    minWidth: 280,
    height: 49,
    borderRadius: theme.spacing(1.5),
    background: theme.palette.nemoMint[400],
    color: theme.palette.nemoMint[800],
    ...theme.typography.h5,
    "&:disabled": {
      background: theme.palette.nemoMint[400],
      color: theme.palette.nemoMint[800],
      opacity: 0.5,
    },
    "&:hover": {
      background: theme.palette.nemoMint[400],
      color: theme.palette.nemoMint[800],
      opacity: 0.5,
    },
  },

  appleBtn: {
    width: "100%",
    height: 45,
    backgroundColor: theme.palette.grayscale[1000],
    color: theme.palette.grayscale[0],
    borderRadius: theme.spacing(1),
    border: 0,
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    cursor: "pointer",
  },
  emailText: {
    ...theme.typography.h5,
    width: "100%",
    paddingBottom: 40,
  },
  inputClass: {
    "&.Mui-focused": {
      border: "2px solid #555",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
}));

function Email(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const params = new URLSearchParams(window.location.search);
  let from;
  const alertState = useSelector((state) => state.alert);
  const user = cookies.get("token");
  const [isPassword, setIsPassword] = useState(false);
  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);

  useEffect(() => {
    if (params.get("from") === null) {
      from = "";
    } else {
      from = params.get("from");
    }

    if (alertState.message === "로그인 성공" && user) {
      navigate(`/${from}`);
    } else if (alertState.message) {
      alert(alertState.message);
    }

    if (alertState.message === "가입된 카카오 계정이 없습니다.") {
      navigate("/sign-up");
    }
  }, [alertState]);
  return (
    <Box className={classes.root}>
      <Box className={classes.loginBox}>
        <Container maxWidth="md">
          <Box className={classes.emailText}>이메일로 계속하기</Box>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("이메일을 정확히 입력해 주세요.")
                .max(255)
                .required("이메일을 입력해주세요"),
              password: Yup.string()
                .required("비밀번호를 입력해주세요")
                .max(16, "비밀번호를 16자 이하로 입력해주세요")
                .min(8, "비밀번호를 8자 이상 입력해주세요")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "영문, 숫자, 특수문자를 조합해서 입력해 주세요. (8-16자)"
                ),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await dispatch(userActions.register(values));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              control,
            }) => (
              <form name="form" onSubmit={handleSubmit}>
                <Box sx={{ typography: "h6", color: "grayscale.600" }}>
                  이메일
                </Box>
                <TextField
                  className={classes.loginTextField}
                  error={errors.email && touched.email}
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                  fullWidth
                  margin="normal"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="test"
                  value={values.email}
                  variant="outlined"
                  placeholder="nemo@nemo.co.kr"
                  InputProps={{
                    maxLength: 40,
                    className: classes.inputClass,
                  }}
                />
                <Box sx={{ typography: "h6", color: "grayscale.600" }}>
                  비밀번호
                </Box>
                <TextField
                  className={classes.loginTextField}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : null
                  }
                  fullWidth
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={isPassword ? "text" : "password"}
                  value={values.password}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {isPassword ? (
                          <VisibilityOffOutlinedIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => setIsPassword(false)}
                          />
                        ) : (
                          <RemoveRedEyeOutlinedIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => setIsPassword(true)}
                          />
                        )}
                      </InputAdornment>
                    ),
                    maxLength: 40,
                    placeholder: "8-16 비밀번호 ",
                    className: classes.inputClass,
                  }}
                />
                <Box my={1}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    disabled={Boolean(errors.password) || Boolean(errors.email)}
                    variant="contained"
                    className={classes.ActivateBtn}
                  >
                    로그인
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    typography: "button",
                  }}
                >
                  <Box
                    onClick={() => navigate("/sign-up")}
                    sx={{ cursor: "pointer" }}
                  >
                    이메일 가입
                  </Box>
                  <Box>이메일 찾기</Box>
                  <Box>비밀번호 찾기</Box>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Box>
  );
}

export default Email;
