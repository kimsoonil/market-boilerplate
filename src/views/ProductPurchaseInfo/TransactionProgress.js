import React from "react";
import clsx from "clsx";

// MUI stuff
import { Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import LinearProgress from "@mui/material/LinearProgress";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  progressLable: {
    ...theme.typography.caption,
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    padding: "0 4px",
  },
  dealDataActive: {
    backgroundColor: theme.palette.nemoMintGray[100],
    borderRadius: 10,
  },
  dealData: {
    width: 41,
    padding: "0 4px",
  },
}));
const ProductInform = (props) => {
  const classes = useStyles();
  const dealId = 0;
  const dealState = [
    {
      step: 1,
      title: "거래체결",
      content:
        "거래가 정상적으로 체결되었으며, 판매자는 검수센터에 48시간 내로 상품을 발송할 예정이에요!",
    },
    {
      step: 2,
      title: "발송완료",
      content:
        "발송된 상품이 검수센터로 배송 중이며, 일요일 및 공휴일을 제외하고 3일 내 도착 예정이에요!",
    },
    {
      step: 3,
      title: "입고완료",
      content:
        "상품이 검수센터에 도착했으며, 입고된 상품은 곧 검수를 시작할 예정이에요!",
    },
    {
      step: 4,
      title: "검수완료",
      content:
        "성능/외관/IMEI 검수 결과, ‘합격’으로 판정됐어요! 검수를 마친 상품은 곧 포장 작업이 진행될 예정이에요!",
    },
    {
      step: 5,
      title: "배송 중",
      content: "배송조회",
    },
    {
      step: 6,
      title: "배송완료",
      content: "",
    },
  ];
  return (
    <Box>
      <Box className={props.classes.PurchaseContentTitle}>거래 진행 상황</Box>
      <Box
        sx={{
          bgcolor: "#DCFDFB",
          borderRadius: 2,
          mt: 1,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 0.5 }}>
          <Box sx={{ color: "#96C9C3", typography: "h5" }}>
            STEP {dealState[dealId].step}.
          </Box>
          <Box sx={{ color: "#09494F", typography: "h5" }}>
            {dealState[dealId].title}
          </Box>
        </Box>
        <Box
          sx={{
            color: "#09494F",
            typography: "body1",
            mb: 4,
            lineHeight: "150%",
          }}
        >
          {dealState[dealId].content}
        </Box>
        <Box>
          <Box>
            <LinearProgress
              variant="determinate"
              className={props.classes.progressbar}
              value={dealId !== 5 ? 20 * (dealId + 1) : 100}
            />
            <Box
              className={classes.progressLable}
              sx={{
                mt: 1,
              }}
            >
              <Box sx={{ typography: dealId === 0 ? "button" : "caption" }}>
                {dealId === 0 ? dealState[dealId].title : "거래체결"}
              </Box>
              <Box sx={{ typography: dealId === 1 ? "button" : "caption" }}>
                {dealId === 1 ? dealState[dealId].title : "발송대기"}
              </Box>
              <Box sx={{ typography: dealId === 2 ? "button" : "caption" }}>
                {dealId === 2 ? dealState[dealId].title : "입고대기"}
              </Box>
              <Box sx={{ typography: dealId === 3 ? "button" : "caption" }}>
                {dealId === 3 ? dealState[dealId].title : "검수대기"}
              </Box>
              <Box sx={{ typography: dealId >= 4 ? "button" : "caption" }}>
                {dealId === 4
                  ? dealState[dealId].title
                  : dealId === 5
                  ? dealState[dealId].title
                  : "배송대기"}
              </Box>
            </Box>
            <Box className={classes.progressLable}>
              <Box
                className={clsx(
                  dealId >= 0 && classes.dealDataActive,
                  classes.dealData
                )}
                sx={{ opacity: dealId === 0 ? "1" : "0.5" }}
              >
                {dealId >= 0 ? "05.25" : ""}
              </Box>
              <Box
                className={clsx(
                  dealId >= 1 && classes.dealDataActive,
                  classes.dealData
                )}
                sx={{ opacity: dealId === 1 ? "1" : "0.5" }}
              >
                {dealId >= 1 ? "05.25" : ""}
              </Box>
              <Box
                className={clsx(
                  dealId >= 2 && classes.dealDataActive,
                  classes.dealData
                )}
                sx={{ opacity: dealId === 2 ? "1" : "0.5" }}
              >
                {dealId >= 2 ? "05.25" : ""}
              </Box>
              <Box
                className={clsx(
                  dealId >= 3 && classes.dealDataActive,
                  classes.dealData
                )}
                sx={{ opacity: dealId === 3 ? "1" : "0.5" }}
              >
                {dealId >= 3 ? "05.25" : ""}
              </Box>
              <Box
                className={clsx(
                  dealId >= 4 && classes.dealDataActive,
                  classes.dealData
                )}
                sx={{ opacity: dealId >= 4 ? "1" : "0.5" }}
              >
                {dealId >= 4 ? "05.25" : ""}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={props.classes.explanation}>
          <ErrorIcon sx={{ fontSize: 12, mr: 0.5 }} />
          <Box>결제 완료 시점으로부터 5-7일 내에 상품을 받아볼 수 있어요!</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInform;
