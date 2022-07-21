import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { productOption } from "src/utils/utils";
// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import InventoryIcon from "@mui/icons-material/Inventory";
import PowerIcon from "@mui/icons-material/Power";
import CableIcon from "@mui/icons-material/Cable";
import ErrorIcon from "@mui/icons-material/Error";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  productListItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minWidth: 315,
    minHeight: 50,
    border: "1px solid #dedede",
    marginTop: 12,
    borderRadius: theme.spacing(1),
    padding: 12,
    cursor: "pointer",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    "@media (max-width: 600px)": {
      padding: "16px 12px",
    },
  },
  circleBorder: {
    width: 18,
    height: 18,
    borderRadius: theme.spacing(1),
    border: "1px solid #555555",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing(1.5),
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: "50%",
  },
  iconBox: {
    position: "relative",
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "space-around",
    width: 73,
    padding: "3px 5px 3px 4px",
    marginRight: 16,
    "@media (max-width: 600px)": {
      margin: 0,
    },
    "&:hover": {
      "& > div": {
        display: "flex",
      },
    },
  },
  tooltip: {
    ...theme.typography.body2,
    position: "absolute",
    top: -23,
    right: 0,
    height: 20,
    backgroundColor: theme.palette.grayscale[1000],
    color: theme.palette.grayscale[0],
    minWidth: 160,
    borderRadius: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
    display: "none",
    whiteSpace: "nowrap",
    padding: "0 8px",
    "&:after": {
      position: "absolute",
      top: 20,
      right: 57,
      content: "''",
      width: 0,
      height: 0,
      borderTop: "4px solid #000",
      borderLeft: "4px solid transparent",
      borderRight: "4px solid transparent",
    },
  },
}));

const ProductListItem = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [option, setOption] = useState({});
  const [tooltipText, setTooltipText] = useState("");
  const cookies = new Cookies();
  const user = cookies.get("token");
  useEffect(() => {
    if (props.listItem.option_groups !== null) {
      const optionObjData = productOption(props.listItem);
      setOption(optionObjData);
    }
  }, [props.listItem]);

  useEffect(() => {
    tooltipFuc();
  }, [option]);

  const tooltipFuc = () => {
    let optionGroup = [
      { title: "박스", value: option.box },
      { title: "케이블", value: option.cable },
      { title: "충전기", value: option.adapter },
    ];
    optionGroup = optionGroup.filter((item) => item.value === true);

    if (optionGroup.length === 0) {
      setTooltipText("포함된 추가 구성품이 없어요.");
    } else if (optionGroup.length === 1) {
      setTooltipText(`추가 구성품(${optionGroup[0].title}) 포함되어있어요.`);
    } else if (optionGroup.length === 2) {
      setTooltipText(
        `추가 구성품(${optionGroup[0].title}/${optionGroup[1].title}) 포함되어있어요.`
      );
    } else if (optionGroup.length === 3) {
      setTooltipText(
        `추가 구성품(${optionGroup[0].title}/${optionGroup[1].title}/${optionGroup[2].title}) 포함되어있어요.`
      );
    }
  };

  const productListClick = () => {
    if (!user) {
      const confirm = window.confirm(
        "로그인이 필요합니다.\n로그인화면으로 이동하시겠습니까?"
      );
      if (confirm) {
        navigate(`/login?from=products/${props.listItem.id}`);
      }
    } else {
      navigate(`/products/${props.listItem.id}`);
    }
  };

  return (
    <Box className={classes.productListItem} onClick={() => productListClick()}>
      <Box>
        <Box className={classes.circleBorder}>
          <Box
            className={classes.circle}
            sx={{ bgcolor: option.colorCode }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "@media (max-width:600px)": {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <Box
            sx={{
              typography: "body1",
              color: "grayscale.1000",
              width: 200,
              display: "flex",
            }}
          >
            {option.color || ""}{" "}
            <Box sx={{ color: "grayscale.200", mx: 0.5 }}>|</Box>
            {option.capacity || ""}
            <Box sx={{ color: "grayscale.200", mx: 0.5 }}>|</Box>
            {option.quality || ""}
          </Box>

          <Box sx={{ typography: "body2", color: "grayscale.700" }}>
            배터리 {props.listItem.battery}%
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          "@media (max-width:600px)": {
            flexDirection: "column",
            alignItems: "flex-end !important",
            justifyContent: "space-between",
            height: 42,
          },
        }}
      >
        <Box className={classes.iconBox}>
          <ErrorIcon sx={{ fontSize: 14, color: "#a4a4a4", mr: 0.5 }} />
          <InventoryIcon
            sx={{
              fontSize: 14,
              color: option.box ? "grayscale.700" : "#a4a4a4",
            }}
          />
          <PowerIcon
            sx={{
              fontSize: 14,
              color: option.adapter ? "grayscale.700" : "#a4a4a4",
            }}
          />
          <CableIcon
            sx={{
              fontSize: 14,
              color: option.cable ? "grayscale.700" : "#a4a4a4",
            }}
          />
          <Box className={classes.tooltip}>{tooltipText}</Box>
        </Box>
        <Box
          sx={{
            typography: "h6",
            width: 80,
            justifyContent: "flex-end",
            textAlign: "right",
          }}
        >
          {props.listItem.price
            ? props.listItem.price.toLocaleString() + "원"
            : "0원"}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListItem;
