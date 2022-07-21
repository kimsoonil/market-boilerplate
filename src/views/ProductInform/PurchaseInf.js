import React, { useState } from "react";

import PurchaseContent from "../../components/PurchaseContent";
// MUI stuff
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import InventoryIcon from "@mui/icons-material/Inventory";
import PowerIcon from "@mui/icons-material/Power";
import CableIcon from "@mui/icons-material/Cable";
import SimCardOutlinedIcon from "@mui/icons-material/SimCardOutlined";
import BlockIcon from "@mui/icons-material/Block";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  PurchaseTitle: {
    ...theme.typography.h4,
    display: "flex",
    flexDirection: "row",
    paddingBottom: theme.spacing(1),
    borderBottom: "2px solid #0D0D0D",
  },
  PurchaseContentTitle: {
    ...theme.typography.h5,
    color: theme.palette.grayscale[600],
  },
  PurchaseContent: {
    border: "1px solid #cfcfcf",
    marginTop: theme.spacing(1),
    minHeight: 357,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  PurchaseContentItem: {
    width: "25%",
    display: "flex",
    justifyContent: "center",
  },
  PurchaseBtn: {
    ...theme.typography.h5,
    width: "100%",
    height: 55,
    fontSize: "18px",
    margin: "32px 0",
    backgroundColor: theme.palette.nemoMint[400],
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grayscale[1000],
    "&:hover": {
      backgroundColor: theme.palette.nemoMint[400],
    },
  },
  PurchaseIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: theme.palette.grayscale[50],
    width: 52,
    height: 52,
    marginBottom: theme.spacing(1),
  },
  PurchaseContentText: {
    ...theme.typography.h6,
    textAlign: "center",
    wordBreak: "keep-all",
    width: 70,
    lineHeight: "21px",
  },
  iconStyle: {
    fontSize: theme.spacing(4),
    color: theme.palette.grayscale[600],
  },
  accordionBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
  },
  accordionSummaryStyle: {
    ...theme.typography.h6,
    color: theme.palette.grayscale[1000],
    display: "flex",
    alignItems: "center",
  },
  accordionStyle: {
    boxShadow: "none",
    backgroundColor: theme.palette.grayscale[50],
    paddingBottom: theme.spacing(0.5),
    // margin: 0 !imp,
    "& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .Mui-expanded > .MuiSvgIcon-root": {
      transform: "rotate(135deg)",
    },

    "& .MuiAccordion-region": {
      marginBottom: theme.spacing(1),
    },
    "&:before": {
      backgroundColor: theme.palette.grayscale[0],
      position: "static",
    },
    "& .MuiAccordionSummary-contentGutters": {
      margin: 0,
    },
    "& .MuiAccordionSummary-gutters.Mui-expanded": {
      minHeight: 48,
    },
    "&.MuiPaper-elevation.MuiAccordion-rounded.Mui-expanded": {
      margin: 0,
    },
  },
  Condition: {
    paddingBottom: theme.spacing(2),
    display: "flex",
  },
  ConditionTitle: {
    ...theme.typography.h5,
    marginBottom: theme.spacing(1.5),
  },
  ConditionContent: {
    ...theme.typography.body1,
    color: theme.palette.grayscale[600],
  },
  ConditionCheckBox: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },
  ConditionTin: {
    color: theme.palette.nemoMint[400],
    ...theme.typography.button,
  },
  PurchaseItemRelative: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&:hover": {
      "& > div": {
        display: "flex",
      },
    },
  },
  tooltipIcon: {
    fontSize: theme.spacing(2),
    color: "#cfcfcf",
    position: "absolute",
    top: 0,
    left: 10,
  },
  tooltip: {
    ...theme.typography.body2,
    position: "absolute",
    top: -25,
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
      content: "''",
      width: 0,
      height: 0,
      borderTop: "4px solid #000",
      borderLeft: "4px solid transparent",
      borderRight: "4px solid transparent",
    },
  },
  tooltipLeft: {
    left: 0,
    "&:after": {
      left: 12,
    },
  },
  tooltipRight: {
    right: 0,
    "&:after": {
      right: 57,
    },
  },
}));

const ProductInform = (props) => {
  const classes = useStyles();

  const iconList = [
    {
      icon: <SimCardOutlinedIcon className={classes.iconStyle} />,
      content: "모든 유심 사용 가능",
      tooltip: "SKT, KT, LG U+, 알뜰폰 모든 유심 사용 가능해요.",
    },
    {
      icon: <PercentIcon className={classes.iconStyle} />,
      content: "선택 약정 할인 가능",
      tooltip: "상품 구매 후 선택 약정 할인 가능해요.",
    },
    {
      icon: <BlockIcon className={classes.iconStyle} />,
      content: "미안가 제품 미취급",
      tooltip: "내모마켓은 국외/도난/분실 제품을 취급하지 않아요.",
    },
    {
      icon: <MoveToInboxOutlinedIcon className={classes.iconStyle} />,
      content: "내모마켓 박스 포장",
      tooltip: "박스가 없는 상품은 내모마켓 박스에 담아 드려요.",
    },
  ];
  const AccordionList = [
    {
      icon: <InventoryIcon sx={{ fontSize: 18, mr: 1 }} />,
      title: "정품 박스 포함",
      content:
        "판매 상품의 오리지널 박스가 옵션에 없는 경우, 내모마켓에서 만든 스마트폰 박스에 담아서 배송해 드려요!",
      activate: props.option.box,
    },
    {
      icon: <PowerIcon sx={{ fontSize: 18, mr: 1 }} />,
      title: "충전 어댑터 포함",
      content:
        "충전용 어뎁터는 비정품 혹은 판매자가 직접 사용하던 제품일 수 있지만, 검수센터에서 구성품의 작동 여부를 확인하고 소독해서 배송해 드려요!",
      activate: props.option.adapter,
    },
    {
      icon: <CableIcon sx={{ fontSize: 18, mr: 1 }} />,
      title: "충전 케이블 미포함",
      content:
        "충전용 케이블은 비정품 혹은 판매자가 직접 사용하던 제품일 수 있지만, 검수센터에서 구성품의 작동 여부를 확인하고 소독해서 배송해 드려요!",
      activate: props.option.cable,
    },
  ];
  const [purchaseList, setPurchaseList] = useState([
    {
      isCheck: false,
      title: "구매하려는 상품 정보를 꼼꼼히 확인했어요.",
      content:
        "구매하려는 상품의 모델, 색상, 용량, 품질, 구성품을 한 번 더 확인해 주세요. 내모마켓 검수센터에서도 판매자가 등록한 상품과 판매 정보가 일치하는지 한 번 더 확인해 드릴게요!",
      tin: "",
    },
    {
      isCheck: false,
      title:
        "구매하려는 상품이 중고 기기임을 인지했고 본 제품의 품질 상태 역시 꼼꼼히 확인했어요.",
      content:
        "판매되는 상품은 모두 단일 재고로 결제순으로 판매돼요. 모든 상품마다 품질 상태가 다르기 때문에 구매하려는 상품의 품질 기준을 반드시 확인해 주세요!",
      tin: "품질 구분 기준을 자세히 알고 싶어요",
    },
    {
      isCheck: false,
      title:
        "전담 검수팀이 판매자의 상품을 직접 검수하여 합격 상품만을 구매자에게 배송해 드려요.",
      content:
        "내모마켓 검수센터에 도착한 상품은 입고 완료 후 3영업일 이내에 검수를 진행해요! 기본 검사, 성능 검사, 외관 검사를 통해 판매 가능한 상품만을 출고하니 자세한 검수 기준을 꼭 확인해 주세요!",
      tin: "검수 기준을 자세히 알고 싶어요",
    },
    {
      isCheck: false,
      title: "내모마켓의 최신 이용정책을 모두 확인했고 구매를 계속할게요.",
      content:
        "건전하고 안전한 거래를 위해 반드시 숙지해야 할 검수 및 품질 보증 관련 주의사항, 거래 취소 사유 등의 이용정책을 확인했어요!",
      tin: "검수 기준을 자세히 알고 싶어요",
    },
  ]);

  const hanleClickPurchase = (e, index) => {
    let newArr = [...purchaseList]; // copying the old datas array
    newArr[index].isCheck = e;

    setPurchaseList(newArr);
  };

  return (
    <Box
      sx={{
        ml: 3,
        "@media (max-width: 1080px)": {
          ml: 0,
          mt: 11,
        },
      }}
    >
      <Box className={classes.PurchaseTitle}>
        <Box sx={{ color: "nemoMint.400" }}>잠깐</Box>, 구매하시기 전에 꼭
        확인해 주세요.
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box className={classes.PurchaseContentTitle}>상품 상세 정보</Box>
        <Box className={classes.PurchaseContent}>
          <Box sx={{ display: "flex", mb: 3 }}>
            {iconList.map((item, index) => {
              return (
                <Box className={classes.PurchaseContentItem} key={index}>
                  <Box className={classes.PurchaseItemRelative}>
                    <Box
                      className={clsx(
                        classes.tooltip,
                        index > 1 ? classes.tooltipRight : classes.tooltipLeft
                      )}
                    >
                      {item.tooltip}
                    </Box>
                    <Box className={classes.PurchaseIcon}>
                      {item.icon}
                      <ErrorIcon className={classes.tooltipIcon} />
                    </Box>
                    <Box className={classes.PurchaseContentText}>
                      {item.content}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className={classes.accordionBox}>
            {AccordionList.map((AccordionItem, AccordionIndex) => {
              return (
                <Accordion
                  className={classes.accordionStyle}
                  key={AccordionIndex}
                >
                  <AccordionSummary
                    expandIcon={
                      <AddOutlinedIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Box
                      className={classes.accordionSummaryStyle}
                      sx={{ opacity: AccordionItem.activate ? 1 : 0.5 }}
                    >
                      {AccordionItem.icon} {AccordionItem.title}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        typography: "caption",
                        opacity: AccordionItem.activate ? 1 : 0.5,
                      }}
                    >
                      {AccordionItem.content}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box className={classes.PurchaseContentTitle}>구매 동의</Box>
        <PurchaseContent
          DataList={purchaseList}
          hanleClickPurchase={hanleClickPurchase}
        />
      </Box>
      <Button
        variant="contained"
        onClick={props.hanldeClickNextPage}
        className={classes.PurchaseBtn}
        disabled={
          !(
            purchaseList[0].isCheck &
            purchaseList[1].isCheck &
            purchaseList[2].isCheck &
            purchaseList[3].isCheck
          )
        }
      >
        구매 계속하기
      </Button>
    </Box>
  );
};

export default ProductInform;
