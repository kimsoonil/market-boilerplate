import React from "react";

// import components

import AppleLogin from "react-apple-login";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import AppleIcon from "@mui/icons-material/Apple";

const useStyles = makeStyles((theme) => ({
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
}));

function Apple(props) {
  const classes = useStyles();
  const CLIENT_ID = "kr.nemomarket";
  const SCOPES = "email name";
  const REDIRECT_URI = window.location.origin + "/login";
  const STATE =
    "b043eafa1d28eef050d1d05eea0cb0d52f236b362a762a54a3c5e4b730304611";

  return (
    <AppleLogin
      clientId={"kr.nemomarket"}
      redirectURI={"https://nemomarket.kr/login"}
      usePopup={true}
      callback={props.handleApple}
      {...{
        responseType: "code",
        responseMode: "form_post",
        clientId: CLIENT_ID,
        redirectURI: REDIRECT_URI,
        scope: SCOPES,
        state: STATE,
      }}
      render={({ onClick }) => {
        return (
          <button
            className={classes.appleBtn}
            onClick={(e) => {
              e.preventDefault();

              onClick();
            }}
          >
            <AppleIcon sx={{ fontSize: 24 }} />
            <Box sx={{ typography: "h6" }}>Apple로 계속하기</Box>
            <Box></Box>
          </button>
        );
      }}
    />
  );
}

export default Apple;
