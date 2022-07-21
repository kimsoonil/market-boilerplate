import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import components
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, useFormikContext } from "formik";
import { userActions, alertActions } from "src/actions";

// MUI stuff
import {
  Box,
  Button,
  TextField,
  Container,
  InputAdornment,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const useStyles = makeStyles((theme) => ({
  // maxWidth 1280px, wrapper
  root: {
    width: "100vw",
    height: "calc(100vh - 72px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // about background
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
    marginTop: theme.spacing(0.5),
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
    background: theme.palette.grayscale[1000],
    color: theme.palette.grayscale[0],
    ...theme.typography.h5,
    "&:disabled": {
      background: theme.palette.grayscale[1000],
      color: theme.palette.grayscale[0],
      opacity: 0.5,
    },
    "&:hover": {
      background: theme.palette.grayscale[1000],
      color: theme.palette.grayscale[0],
      opacity: 0.5,
    },
  },

  signUpTitle: {
    ...theme.typography.h3,
    textAlign: "center",
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

function SignUp(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snsState, setSnsState] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const alertState = useSelector((state) => state.alert);
  const usersState = useSelector((state) => state.users);
  const formik = useFormikContext();

  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);
  useEffect(() => {
    if (alertState.message === "회원가입 성공") {
      navigate(`/`);
    } else if (alertState.message === "가입된 카카오 계정이 없습니다.") {
      if (usersState.items !== null && usersState.items !== undefined) {
        setSnsState(usersState.items.result);
      }
    } else if (alertState.message === "가입된 애플 계정이 없습니다.") {
      if (usersState.items !== null && usersState.items !== undefined) {
        setSnsState(usersState.items.result);
      }
    } else if (alertState.message === "등록되지 않은 이메일 주소입니다.") {
    } else if (alertState.message) {
      alert(alertState.message);
    }
  }, [alertState]);

  const Logger = (snsState) => {
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
      if (snsState.snsState !== "") {
        setFieldValue("email", snsState.snsState.email);
      }
    }, []);
    return null;
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.loginBox}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "calc(100vh - 72px)",
            }}
          >
            <Box className={classes.signUpTitle}>회원가입</Box>

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
                if (snsState !== "") {
                  if (snsState.access_token !== undefined) {
                    const response = {
                      email: values.email,
                      password: values.password,
                      access_token: snsState.access_token,
                    };
                    await dispatch(userActions.signUp(response));
                  }
                  if (snsState.id_token !== undefined) {
                    const response = {
                      email: values.email,
                      password: values.password,
                      id_token: snsState.id_token,
                    };
                    await dispatch(userActions.signUp(response));
                  }
                } else {
                  await dispatch(userActions.signUp(values));
                }
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
                  <Logger snsState={snsState} />
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
                    InputProps={{
                      maxLength: 40,
                      placeholder: "nemo@nemo.co.kr",
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
                      errors.password && touched.password
                        ? errors.password
                        : null
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
                      disabled={
                        Boolean(errors.password) || Boolean(errors.email)
                      }
                      variant="contained"
                      className={classes.ActivateBtn}
                    >
                      가입하기
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Box></Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default SignUp;
