import React from "react";

import { Box } from "@mui/material";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  optionChip: {
    height: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grayscale[50],
    color: theme.palette.grayscale[700],
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(1),
    maxWidth: 108,
    whiteSpace: "nowrap",
  },
}));

const OptionChip = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.optionChip}>
      <Box sx={{ typography: "body1" }}>{props.optionValue}</Box>
      <CloseIcon
        sx={{ fontSize: 16, ml: 1, cursor: "pointer" }}
        onClick={() => props.handleChipDelete()}
      />
    </Box>
  );
};

export default OptionChip;
