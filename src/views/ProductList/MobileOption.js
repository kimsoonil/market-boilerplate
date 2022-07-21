import React from "react";

import MobileOptionItem from "./MobileOptionItem";
// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";

const useStyles = makeStyles((theme) => ({
  optionIconBtn: {
    width: 48,
    height: 48,
    border: "1px solid #cfcfcf",
    borderRadius: theme.spacing(1),
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
  optionBtnGroup: {
    position: "fixed",
    width: "100vw",
    left: 0,
    bottom: 0,
    padding: "16px 16px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.grayscale[0],
    zIndex: 1000,
  },
  filterBtn: {
    ...theme.typography.h5,
    color: theme.palette.nemoMint[800],
    backgroundColor: theme.palette.nemoMint[400],
    width: "calc(100vw - 145px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 8px",
    borderRadius: theme.spacing(1),
  },
  mobleOptionExplan: {
    ...theme.typography.body2,
    color: theme.palette.grayscale[600],
    marginTop: theme.spacing(1.5),
    textDecoration: "underline",
    display: "flex",
    alignItems: "center",
  },
}));

const MobileOption = (props) => {
  const classes = useStyles();
  return (
    <Box sx={{ pb: 12, pt: 1 }}>
      {props.optionState.map((item, index) => {
        return (
          <Box sx={{ mb: 4 }} key={index}>
            <Box
              sx={{
                typography: "h5",
                color: "grayscale.1000",
                mb: 1.5,
              }}
            >
              {item.title}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {item.options.map((optionItem, optionIndex) => {
                return (
                  <MobileOptionItem
                    {...props}
                    item={item}
                    optionItem={optionItem}
                    key={optionIndex}
                    label={optionItem.label}
                    title={item.title}
                    name={"someCheckbox" + index + optionIndex}
                  />
                );
              })}
            </Box>
            {item.title === "품질" && (
              <Box className={classes.mobleOptionExplan}>
                <ErrorIcon
                  sx={{ fontSize: 14, color: "grayscale.200", mr: 0.5 }}
                />
                품질 기준을 더 자세히 알고 싶어요!
              </Box>
            )}
          </Box>
        );
      })}
      <Box className={classes.optionBtnGroup}>
        <Box
          className={classes.optionIconBtn}
          onClick={() => props.resetCheckbox()}
        >
          <RefreshIcon sx={{ fontSize: 24 }} />
        </Box>
        <Box
          className={classes.filterBtn}
          onClick={() => props.setMobileOption(false)}
        >
          필터된 상품 볼래요
        </Box>
        <Box
          className={classes.optionIconBtn}
          onClick={() => props.mobileOptionClose()}
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileOption;
