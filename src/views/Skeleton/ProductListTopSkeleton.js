import React from "react";

// MUI stuff
import { Box, Skeleton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "fixed",
  },

  productListImg: {
    width: 160,
    height: 160,
    backgroundColor: theme.palette.grayscale[50],
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    "& > img": {
      width: "100%",
      height: "100%",
      padding: theme.spacing(1.5),
    },
    "@media (max-width: 1080px)": {
      width: 132,
      height: 132,
    },
    "@media (max-width: 600px)": {
      width: 76,
      height: 76,
      "& > img": {
        padding: 0,
      },
    },
  },
}));

const ProductListTopSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.productListImg}>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </Box>
      <Box>
        <Box sx={{ mb: 1 }}>
          <Skeleton variant="text" width={175} height={22} />
        </Box>
        <Box>
          <Skeleton variant="text" width={175} height={14} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListTopSkeleton;
