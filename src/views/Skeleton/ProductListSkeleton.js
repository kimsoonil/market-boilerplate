import React from "react";

import { Box, Skeleton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {},

  productListItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 50,
    border: "1px solid #dedede",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1.5),
    cursor: "pointer",
    marginTop: theme.spacing(1.5),
    "& div": {
      display: "flex",
      alignItems: "center",
    },
    "@media (max-width: 600px)": {
      padding: "16px 12px",
    },
  },
}));

const ProductListSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      {[...Array(8)].map((n, index) => {
        return (
          <Box className={classes.productListItem} key={index}>
            <Box>
              <Skeleton variant="circular" width={18} height={18} />
              <Box
                ml={2}
                sx={{
                  "@media (max-width:600px)": {
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start !important",
                    height: 42,
                  },
                }}
              >
                <Skeleton variant="rectangular" width={"20vh"} height={16} />

                <Box
                  sx={{
                    ml: 2,
                    "@media (max-width:600px)": {
                      m: 0,
                    },
                  }}
                >
                  <Skeleton variant="rectangular" width={"12vh"} height={16} />
                </Box>
              </Box>
            </Box>
            <Box>
              <Skeleton variant="rectangular" width={"8vh"} height={16} />
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ProductListSkeleton;
