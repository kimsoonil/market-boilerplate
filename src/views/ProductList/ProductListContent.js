import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import ProductListItem from "./ProductListItem";

// MUI stuff
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductListSkeleton from "../Skeleton/ProductListSkeleton";

const useStyles = makeStyles((theme) => ({
  listHeader: {
    display: "flex",
    borderBottom: "2px solid #0d0d0d",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    marginBottom: theme.spacing(1.5),
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  optionScroll: {
    overflowY: "auto",
    maxHeight: "68vh",
    "@media (max-width: 600px)": {
      height: "100%",
      paddingTop: theme.spacing(3),
    },
  },
  productLength: {
    ...theme.typography.body2,
    color: theme.palette.grayscale[600],
    marginRight: 20,
    "@media (max-width: 600px)": {
      position: "fixed",
      backgroundColor: "#fff",
      width: "calc(100vw - 24px)",
      zIndex: 1000,
      paddingTop: theme.spacing(1),
    },
  },
  optionBtn: {
    ...theme.typography.h6,
    color: theme.palette.grayscale[0],
    backgroundColor: theme.palette.grayscale[1000],
    padding: "12px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(5),
  },
  noDataView: {
    display: "flex",
    width: "100%",
    height: "50vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ProductListContent = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const infiniteScroll = () => {
    if (props.listCount / 20 > props.page) {
      props.setPage(props.page + 1);
    }
  };

  return (
    <>
      {props.listCount === 0 ? (
        <Box className={classes.noDataView}>
          <Box
            sx={{
              typography: "h1",
              color: "grayscale.200",
            }}
          >
            이런,
          </Box>
          <Box
            sx={{
              mt: 2,
              typography: "body1",
              color: "grayscale.600",
              textAlign: "center",
            }}
          >
            필터링에 맞는 조건의 상품이 없어요. <br /> 다른 옵션의 상품을
            찾아보는 건 어때요?
          </Box>
          {!isDesktop && (
            <Box
              className={classes.optionBtn}
              onClick={() => props.mobileOptionClick()}
            >
              옵션을 재조정해 볼게요
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box className={classes.productLength}>
            {props.listCount}개 상품을 찾았어요
          </Box>
          <Box className={classes.optionScroll}>
            <InfiniteScroll
              pageStart={0}
              loadMore={() => infiniteScroll()}
              hasMore={true || false}
              useWindow={false}
              loader={
                props.productList.length !== props.listCount && (
                  <ProductListSkeleton key={1} />
                )
              }
            >
              {props.productList.map((item, index) => {
                return (
                  <ProductListItem id={props.id} listItem={item} key={index} />
                );
              })}
            </InfiniteScroll>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductListContent;
