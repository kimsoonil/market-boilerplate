import React from "react";
import { useNavigate } from "react-router-dom";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import { Divider, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: 57,
    backgroundColor: theme.palette.nemoGreen[400],
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    padding: 12,
    marginLeft: 8,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.nemoGreen[200],
    },
    "&:active": {
      backgroundColor: theme.palette.nemoGreen[500],
    },
    "@media (max-width: 1080px)": {
      width: "47vw",
      padding: 6,
    },
  },
}));

const SellBtn = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickBtn = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === "" || user === null) {
      navigate(`/login`);
    }
  };

  return (
    <Box className={classes.root} onClick={handleClickBtn}>
      <Box sx={{ typography: "h5", color: "grayscale.1000" }}>판매</Box>
      <Divider
        orientation="vertical"
        sx={{
          height: 33,
          bgcolor: "grayscale.400",
          mx: 1.5,
          "@media (max-width: 400px)": {
            mx: 0.5,
          },
        }}
      />
      <Box>
        <Box sx={{ typography: "caption", color: "grayscale.800" }}>
          현재 최고가
        </Box>
        <Box sx={{ typography: "h6", color: "grayscale.800" }}>
          {props.price ? props.price.toLocaleString() + "원" : "0원"}
        </Box>
      </Box>
    </Box>
  );
};

export default SellBtn;
