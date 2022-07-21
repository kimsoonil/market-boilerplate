import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import components

import { useNavigate } from "react-router-dom";
import Logo from "src/components/Logo";
import { userActions, alertActions } from "src/actions";
import Cookies from "universal-cookie";

import Apple from "./Apple";
import Kakao from "./Kakao";

// MUI stuff
import { Box, Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import EmailIcon from "@mui/icons-material/Email";

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

  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 504,
    width: "100vw",
    padding: "0 16px",
  },

  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logoText: {
    ...theme.typography.h6,
    color: theme.palette.grayscale[1000],
    textAlign: "center",
    marginTop: theme.spacing(2.5),
  },
  emailBtn: {
    ...theme.typography.h6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.nemoMint[400],
    color: theme.palette.grayscale[1000],
    padding: "0 16px",
    height: 45,
    cursor: "pointer",
    borderRadius: 8,
  },
}));

function Login(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const params = new URLSearchParams(window.location.search);
  let from;
  const alertState = useSelector((state) => state.alert);
  const user = cookies.get("token");

  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);

  useEffect(() => {
    if (params.get("from") === null) {
      from = "";
    } else {
      from = params.get("from");
    }
  }, [params]);

  useEffect(() => {
    if (alertState.message === "로그인 성공" && user) {
      navigate(`/${from}`);
    } else if (alertState.message) {
      alert(alertState.message);
    }

    if (
      alertState.message === "가입된 카카오 계정이 없습니다." ||
      alertState.message === "가입된 애플 계정이 없습니다."
    ) {
      navigate("/sign-up");
    }
  }, [alertState]);

  const handleKakao = (e) => {
    const accessToken = {
      access_token: e.response.access_token,
    };
    dispatch(userActions.KaKaoLogin(accessToken));
  };
  const handleApple = (e) => {
    const code = {
      code: e.authorization.code,
    };
    dispatch(userActions.AppleLogin(code));
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
            <Box className={classes.logo}>
              <Logo width={200} height={57} />
              <Box className={classes.logoText}>
                중고폰 구매부터 판매까지
                <br />
                꼼꼼한 검수로 더 안전하게!
              </Box>
            </Box>
            <Box>
              <Kakao handleKakao={handleKakao} />
              <Apple handleApple={handleApple} />
              <Box
                className={classes.emailBtn}
                onClick={() => navigate(`/Email/${from}`)}
              >
                <EmailIcon sx={{ color: "#fff" }} />
                <Box> 이메일로 계속하기</Box>
                <Box />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Login;
