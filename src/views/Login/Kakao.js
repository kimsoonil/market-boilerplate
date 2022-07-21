import React, { useEffect, useState } from "react";

// import components

import KakaoLogin from "react-kakao-login";
import { Icon } from "@iconify/react";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  kakaoBtn: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFEB00",
    borderRadius: theme.spacing(1),
    border: 0,
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    color: theme.palette.grayscale[1000],
    cursor: "pointer",
  },
}));

function Kakao(props) {
  const classes = useStyles();
  const kakaoToken = "9fab8de63bd7ea75cbff37a8cdd8662a";

  return (
    <KakaoLogin
      token={kakaoToken}
      onSuccess={props.handleKakao}
      onFail={console.error}
      onLogout={console.info}
      render={({ onClick }) => {
        return (
          <button
            className={classes.kakaoBtn}
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            <Icon icon="bi:chat-fill" width="20" height="18" />
            <Box sx={{ typography: "h6" }}>카카오로 계속하기</Box>
            <Box></Box>
          </button>
        );
      }}
    />
  );
}

export default Kakao;
