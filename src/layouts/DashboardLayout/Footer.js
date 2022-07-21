import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "src/hooks/useMediaQuery";
// MUI stuff
import { Box, Container, Divider } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "32px 24px",
    "@media (max-width: 600px)": {
      padding: "16px",
    },
  },
  footerLogo: {
    width: 97,
    height: 30,
    cursor: "pointer",
    backgroundImage: 'url("/static/images/products/footer-logo.svg")',
  },
}));

const company = [
  { title: "상호명", value: "(주)내모마켓 | 대표 김진수" },
  { title: "사업자등록번호", value: "588-86-02443" },
  {
    title: "주소",
    value: "서울 강남구 강남대로94길 28 유니언타운 4층 414호",
  },
  { title: "호스팅 서비스", value: "Amazon Web Service (AWS)" },
  { title: "고객센터", value: "CS@nemomarket.kr" },
];
const loadmap = ["회사소개", "제휴문의", "이용약관", "개인정보처리방침"];

const Footer = ({ className, ...rest }) => {
  const classes = useStyles();
  const [hidden, isHidden] = useState(false);
  const pathname = window.location.pathname;
  const isDesktop = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (pathname !== "/" && isDesktop) {
      isHidden(true);
    } else {
      isHidden(false);
    }
  }, [isDesktop, pathname]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box mb={2.5}>
        <Divider sx={{ borderColor: "grayscale.200" }} />
      </Box>
      <Box mb={1.5} className={classes.footerLogo}></Box>
      <Box sx={{ display: hidden ? "none" : "block" }}>
        <Box sx={{ display: "flex", mb: 3, mt: 1.5 }}>
          {loadmap.map((item, index) => {
            return (
              <Box
                sx={{
                  typography: "button",
                  color: "grayscale.700",
                  textDecoration: "underline",
                  mr: 2,
                  cursor: "pointer",
                  "&:hover": {
                    color: "grayscale.400",
                  },
                }}
                key={index}
              >
                {item}
              </Box>
            );
          })}
        </Box>

        <Box>
          {company.map((item, index) => {
            return (
              <Box display="flex" mb={0.25} key={index}>
                <Box
                  sx={{
                    typography: "body2",
                    color: "grayscale.600",
                    width: 80,
                  }}
                >
                  {item.title}
                </Box>
                <Box
                  sx={{
                    typography: "caption",
                    color: "grayscale.600",
                    ml: 1.5,
                  }}
                >
                  {item.value}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Box
            sx={{ typography: "subtitle1", color: "grayscale.600", mr: 0.5 }}
          >
            © Copyright 내모마켓.
          </Box>
          <Box sx={{ typography: "body2", color: "grayscale.600" }}>
            All Rights Reserved
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          typography: "caption",
          color: "grayscale.600",
          mt: 1.5,
          mb: hidden ? 10 : 0,
        }}
      >
        (주)내모마켓은 전자결제서비스 제공자 및 통신판매 중개자이며 통신 판매의
        당사자가 아닙니다. 모든 상품은 개별판매자가 등록한 상품으로 상품,
        상품정보, 거래에 관한 의무와 책임은 각 판매자에게 있습니다. 단,
        거래과정에서 검수하고 보증하는 내용에 대한 책임은 (주)내모마켓에
        있습니다.
      </Box>
    </Container>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
