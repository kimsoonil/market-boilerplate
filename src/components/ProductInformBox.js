import React from "react";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import InventoryIcon from "@mui/icons-material/Inventory";
import PowerIcon from "@mui/icons-material/Power";
import CableIcon from "@mui/icons-material/Cable";

const useStyles = makeStyles((theme) => ({
  ProductInformBox: {
    position: "fixed",
    "@media (max-width: 1080px)": {
      // position: "sticky",
      display: "flex",
      marginBottom: 24,
      backgroundColor: theme.palette.grayscale[0],
      width: "100%",
      paddingBottom: 16,
      zIndex: 1000,
    },
  },
  ProductImg: {
    width: 332,
    height: 332,
    background: theme.palette.grayscale[50],
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > img": {
      maxHeight: 465,
      maxWidth: 465,
      width: "100%",
      objectFit: "cover",
    },
    "@media (max-width: 1080px)": {
      width: 76,
      height: 76,
    },
  },
  ProductInform: {
    marginTop: 20,
    "@media (max-width: 1080px)": {
      marginTop: 4,
      marginLeft: 12,
    },
  },
  iconBox: {
    position: "relative",
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: 9,
    display: "flex",
    justifyContent: "space-around",
    width: 54,
    padding: "3px 5px 3px 4px",
    marginLeft: 8,
  },
}));

const ProductInformBox = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.ProductInformBox}>
      <Box className={classes.ProductImg}>
        <img src="/static/images/products/products.png" alt="product" />
      </Box>
      <Box className={classes.ProductInform}>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Box sx={{ typography: "inherit" }}>Apple</Box>
          <Box sx={{ typography: "h4", ml: 1 }}>
            {props.modelState.version_model.title}
          </Box>
        </Box>
        <Box
          sx={{
            typography: "body1",
            color: "grayscale.1000",
            width: 180,
            display: "flex",
          }}
        >
          {props.option.color}
          <Box sx={{ color: "grayscale.200", mx: 0.5 }}>|</Box>
          {props.option.capacity}
          <Box sx={{ color: "grayscale.200", mx: 0.5 }}>|</Box>
          {props.option.quality}
        </Box>
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Box sx={{ typography: "body2", color: "grayscale.700" }}>
            배터리 수명 {props.modelState.battery}%
          </Box>
          <Box className={classes.iconBox}>
            <InventoryIcon
              sx={{
                fontSize: 12,
                color: props.option.box ? "grayscale.700" : "#a4a4a4",
              }}
            />
            <PowerIcon
              sx={{
                fontSize: 12,
                color: props.option.adapter ? "grayscale.700" : "#a4a4a4",
              }}
            />
            <CableIcon
              sx={{
                fontSize: 12,
                color: props.option.cable ? "grayscale.700" : "#a4a4a4",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInformBox;
