import React from "react";

import OptionChip from "./OptionChip";

// MUI stuff
import { Box } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  option: {
    display: "flex",
    position: "fixed",
    top: 138,
    left: 0,
    height: 50,
    width: "100vw",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: theme.palette.grayscale[0],
    zIndex: 1000,
    "@media (min-width:600px)": {
      top: 205,
    },
  },
  optionBtn: {
    display: "flex",
    minWidth: 76,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(1),
    backgroundColor: "#000",
    color: theme.palette.grayscale[0],
    padding: "8px 12px",
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },

  optionWidth: {
    display: "flex",
    overflow: "auto",
    width: "100%",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const MobileOptionChip = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.option}>
      {!props.mobileOption && (
        <Box className={classes.optionBtn}>
          <TuneIcon sx={{ fontSize: 14, mr: 1 }} />

          <Box
            sx={{ typography: "h6" }}
            onClick={() => props.mobileOptionClick()}
          >
            옵션
          </Box>
        </Box>
      )}
      <Box className={classes.optionWidth}>
        {props.optionChipState.map((item, index) => {
          return (
            <OptionChip
              optionValue={item}
              handleChipDelete={() => props.handleChipDelete(item)}
              key={index}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MobileOptionChip;
