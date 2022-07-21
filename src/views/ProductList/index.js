import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import Page from "src/components/Page";
import Footer from "src/layouts/DashboardLayout/Footer";
import { productActions, optionActions } from "src/actions";

import ProductListTop from "./ProductListTop";
import ProductListContent from "./ProductListContent";
import OptionContent from "./OptionContent";
import MobileOption from "./MobileOption";
import ProductListSkeleton from "../Skeleton/ProductListSkeleton";
import MobileOptionChip from "./MobileOptionChip";
import OptionSkeleton from "../Skeleton/OptionSkeleton";
import ProductListTopSkeleton from "../Skeleton/ProductListTopSkeleton";

// MUI stuff
import { Container, Hidden, Grid, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  productContent: {
    paddingTop: 172,
    "@media (max-width: 600px)": {
      paddingTop: 154,
    },
  },
  productCard: {
    minHeight: "calc(100vh - 72px)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  listHeader: {
    display: "flex",
    borderBottom: "2px solid #0d0d0d",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    marginBottom: 12,
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  optionWidth: {
    display: "flex",
    overflow: "auto",
    width: "100%",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  itemClass: {
    padding: "0 !important",
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productListState = useSelector((state) => state.products);
  const optionState = useSelector((state) => state.options);
  let { id } = useParams();
  const [options, setOptions] = useSearchParams();
  const [mobileOptionTemp, setMobileOptionTemp] = useState([]);
  const [optionFiler, setOptionFiler] = useState([]);
  const [mobileOption, setMobileOption] = useState(false);
  const [ProductIdState, setProductIdState] = useState();
  const [productList, setProductList] = useState([]);
  const { control } = useForm();
  const [optionChipState, setOptionChipState] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [page, setPage] = useState(1);
  const [listCount, setListCount] = useState();
  //TODO url 파라미터
  const params = {};
  for (let [key, value] of options.entries()) {
    params[key] = value;
  }

  //TODO 서버 데이터 불러오기(옵션, 폰 개인 정보)
  useEffect(() => {
    dispatch(optionActions.getOptionGroups(id));
    dispatch(productActions.getProductId(id));
  }, []);
  //TODO 새로고침시 제품 리스트 초기화
  useEffect(() => {
    setProductList([]);
  }, [options]);

  //TODO 옵션리스트 갱신시 옵션 필터 데이터 갱신
  useEffect(() => {
    let ids = "";
    if (params.colors) {
      ids = ids + params.colors;
    }
    if (params.colors && params.memories) {
      ids = ids + ",";
    }
    if (params.memories) {
      ids = ids + params.memories;
    }
    if (params.memories && params.qualities) {
      ids = ids + ",";
    }
    if (params.qualities) {
      ids = ids + params.qualities;
    }
    const arrIds = ids.split(",");

    optionList.map((item) => {
      item.options.map((optionItem) => {
        arrIds.map((idsItem) => {
          if (idsItem === optionItem.id) {
            const newParameter = {
              id: optionItem.id,
              label: optionItem.label,
              title: item.title,
            };

            setOptionFiler((oldArray) => [...oldArray, newParameter]);
          }
        });
      });
    });
  }, [optionList]);
  //TODO 옵션, 무한 스크롤 갱신시 서버 데이터 호출
  useEffect(() => {
    dispatch(productActions.getProductListFilter(id, options, page));
  }, [options, page]);
  //TODO 제품 상세 데이터 stata
  useEffect(() => {
    if (productListState.data !== undefined && productListState.data !== null) {
      setProductIdState(productListState.data.result);
    }
  }, [productListState.data]);
  //TODO 제품 리스트 데이터 stata
  useEffect(() => {
    if (productListState.list !== undefined && productListState.list !== null) {
      setProductList((productList) => [
        ...productList,
        ...productListState.list.result,
      ]);
      setListCount(productListState.list.count);
    }
  }, [productListState.list]);
  //TODO 옵션 리스트 stata
  useEffect(() => {
    if (optionState.option !== undefined && optionState.option !== null) {
      setOptionList([...optionState.option.result]);
    }
  }, [optionState.option]);

  //TODO 옵션 필터 갱신시 데이터 처리
  useEffect(() => {
    if (optionFiler.length > 0) {
      let colors = [];
      let memories = [];
      let qualities = [];
      let temp = {};

      setOptionChipState([]);
      optionFiler.map((item, index) => {
        if (item.title === "색상") {
          colors.push(item.id);
        } else if (item.title === "용량") {
          memories.push(item.id);
        } else if (item.title === "품질") {
          qualities.push(item.id);
        }

        setOptionChipState((oldArray) => [...oldArray, item.label]);
      });
      if (colors.length > 0) temp.colors = colors.toString();
      if (memories.length > 0) temp.memories = memories.toString();
      if (qualities.length > 0) temp.qualities = qualities.toString();
      setPage(1);
      setOptions(temp);
    } else if (
      Object.keys(params).length === 0 ||
      optionChipState.length === 1
    ) {
      setOptions("");
      setPage(1);
      setOptionChipState([]);
    }
  }, [optionFiler]);

  //TODO 옵션 체크박스
  const handleCheckBox = (e, checkboxId, label, title) => {
    e.persist();

    const newParameter = {
      id: checkboxId,
      label: label,
      title: title,
    };

    if (e.target.checked) {
      setOptionFiler((oldArray) => [...oldArray, newParameter]);
    } else {
      setOptionFiler(optionFiler.filter((value) => value.id !== checkboxId));
    }
  };

  //TODO  ChipDelete - mobile
  const handleChipDelete = (item) => {
    setOptionFiler(optionFiler.filter((value) => value.label !== item));
  };

  //TODO 모바일 옵션 화면
  const mobileOptionClick = () => {
    setMobileOption(!mobileOption);
    if (!mobileOption) setMobileOptionTemp(optionFiler);
  };
  //TODO 모바일옵션창 닫기
  const mobileOptionClose = () => {
    setOptionFiler(mobileOptionTemp);
    setMobileOption(false);
  };

  //TODO 초기화
  const resetCheckbox = () => {
    setOptionFiler([]);
    setOptions("");
  };

  return (
    <Page className={classes.root} title="내모마켓">
      <Container maxWidth="lg">
        <Grid container className={classes.productCard}>
          {!ProductIdState ? (
            <ProductListTopSkeleton />
          ) : (
            <ProductListTop ProductIdState={ProductIdState} />
          )}

          <Grid
            container
            item
            xs={12}
            spacing={3}
            className={classes.productContent}
          >
            <Hidden lgDown>
              <Grid item lg={2} xs={12}>
                {!optionList ? (
                  <OptionSkeleton />
                ) : (
                  <OptionContent
                    control={control}
                    resetCheckbox={resetCheckbox}
                    optionState={optionList}
                    handleCheckBox={handleCheckBox}
                    optionFiler={optionFiler}
                  />
                )}
              </Grid>
            </Hidden>
            <Grid item lg={10} xs={12} className={classes.itemClass}>
              <Box
                sx={{
                  pt: 3,
                  pl: 3,
                  "@media (max-width:600px)": {
                    pt: 0,
                  },
                }}
              >
                <Hidden lgUp>
                  <MobileOptionChip
                    mobileOption={mobileOption}
                    optionFiler={optionFiler}
                    optionChipState={optionChipState}
                    setMobileOption={setMobileOption}
                    mobileOptionClick={mobileOptionClick}
                    handleChipDelete={handleChipDelete}
                  />
                </Hidden>
                {!mobileOption ? (
                  <>
                    <Box
                      className={classes.listHeader}
                      sx={{
                        typography: "h5",
                        color: "grayscale.1000",
                        pt: 0,
                        "@media (max-width: 1080px)": {
                          pt: 2.5,
                        },
                      }}
                    >
                      판매중인 상품 리스트
                    </Box>

                    {productList ? (
                      <ProductListContent
                        id={id}
                        productList={productList}
                        setProductList={setProductList}
                        mobileOptionClick={mobileOptionClick}
                        setPage={setPage}
                        page={page}
                        listCount={listCount}
                      />
                    ) : (
                      <ProductListSkeleton />
                    )}
                  </>
                ) : (
                  <MobileOption
                    control={control}
                    resetCheckbox={resetCheckbox}
                    optionState={optionList}
                    handleCheckBox={handleCheckBox}
                    optionFiler={optionFiler}
                    setMobileOption={setMobileOption}
                    mobileOptionClose={mobileOptionClose}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {!mobileOption && <Footer />}
    </Page>
  );
};

export default ProductList;
