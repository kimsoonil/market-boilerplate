import React from "react";
import { useNavigate } from "react-router-dom";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import { Divider, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: 57,
    backgroundColor: theme.palette.nemoMint[400],
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    padding: 12,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.nemoMint[200],
    },
    "&:active": {
      backgroundColor: theme.palette.nemoMint[500],
    },
    "@media (max-width: 1080px)": {
      width: "47vw",
      padding: 8,
    },
  },
}));

const BuyBtn = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickBtn = () => {
    navigate(`/model/${props.id}/products`);
  };

  return (
    <Box className={classes.root} onClick={handleClickBtn}>
      {/* product-list?id=${props.id} */}
      <Box sx={{ typography: "h5", color: "grayscale.1000" }}>구매</Box>
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
          현재 최저가
        </Box>
        <Box sx={{ typography: "h6", color: "grayscale.800" }}>
          {props.price ? props.price.toLocaleString() + "원" : "0원"}
        </Box>
      </Box>
    </Box>
  );
};

export default BuyBtn;
