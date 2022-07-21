import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";
// MUI stuff
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  option: {
    display: "flex",
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2.5),
  },
  circleBorder: {
    width: 18,
    height: 18,
    borderRadius: theme.spacing(1),
    border: "1px solid #555555",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: "50%",
  },
  ControllerBox: {
    width: "20.5vw",
    minHeight: 64,
    marginRight: theme.spacing(1),
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
  mobileOptionItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "21.5vw",
    minHeight: 64,
    border: "1px solid #cfcfcf",
    borderRadius: theme.spacing(1),
    padding: "8px 0px",
    cursor: "pointer",
    color: theme.palette.grayscale[1000],
  },
  checked: {
    backgroundColor: theme.palette.grayscale[50],
    borderColor: theme.palette.grayscale[700],
    color: theme.palette.grayscale[1000],
  },
}));
const MobileOptionItemIocn = (props) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(
        classes.mobileOptionItem,
        props.checked && classes.checked
      )}
    >
      {props.item.title === "색상" && (
        <Box className={classes.circleBorder}>
          <Box
            className={classes.circle}
            sx={{ bgcolor: props.optionItem.value }}
          ></Box>
        </Box>
      )}
      <Box
        sx={{
          typography: "body1",
        }}
      >
        {props.optionItem.label}
      </Box>
      {props.labelContent !== "" && (
        <Box
          sx={{
            typography: "body2",
            color: "grayscale.700",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: 40,
          }}
        >
          {props.labelContent}
        </Box>
      )}
    </Box>
  );
};
const MobileOptionItem = (props) => {
  const [labelContent, setLabelContent] = useState("");
  const classes = useStyles();
  useEffect(() => {
    labelText();
  }, []);

  const labelText = () => {
    if (props.optionItem.label === "보통") setLabelContent("사용감 있어요");
    else if (props.optionItem.label === "좋음") setLabelContent("깨끗해요");
    else if (props.optionItem.label === "최상") setLabelContent("새 것 같아요");
    else if (props.optionItem.label === "미사용")
      setLabelContent("사용하지 않았어요");
  };

  return (
    <Box sx={{ mt: 1, mr: 2, minHeight: 74 }}>
      <FormControlLabel
        className={classes.ControllerBox}
        control={
          <Controller
            name={props.name}
            control={props.control}
            rules={{ required: true }}
            render={({ field: { value, ...field } }) => (
              <Checkbox
                {...field}
                icon={
                  <MobileOptionItemIocn
                    labelContent={labelContent}
                    optionItem={props.optionItem}
                    item={props.item}
                    checked={false}
                  />
                }
                checkedIcon={
                  <MobileOptionItemIocn
                    labelContent={labelContent}
                    optionItem={props.optionItem}
                    item={props.item}
                    checked={true}
                  />
                }
                sx={{
                  height: 32,
                  color: "grayscale.200",
                  "&.Mui-checked": {
                    color: "nemoMint.400",
                  },
                }}
                checked={props.optionFiler.some(
                  (e) => e.label === props.optionItem.label
                )}
                onClick={(e) =>
                  props.handleCheckBox(
                    e,
                    props.optionItem.id,
                    props.optionItem.label,
                    props.title
                  )
                }
              />
            )}
          />
        }
      />
    </Box>
  );
};

export default MobileOptionItem;
