import React from "react";

// MUI stuff
import { Box, Checkbox } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  PurchaseContent: {
    border: "1px solid #cfcfcf",
    marginTop: 8,

    borderRadius: 8,
    padding: 16,
  },

  Condition: {
    justifyContent: "space-between",
    display: "flex",
  },
  ConditionTitle: {
    ...theme.typography.h5,
    marginBottom: 12,
    cursor: "pointer",
  },
  ConditionContent: {
    ...theme.typography.body1,
    color: theme.palette.grayscale[600],
    cursor: "pointer",
  },
  ConditionCheckBox: {
    display: "flex",
    alignItems: "center",
    marginLeft: 16,
  },
  ConditionTin: {
    color: theme.palette.nemoMint[400],
    ...theme.typography.button,
    cursor: "pointer",
  },
}));

const ProductInform = (props) => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.PurchaseContent}>
        {props.DataList.map((item, index) => {
          return (
            <Box
              className={classes.Condition}
              sx={{
                borderBottom:
                  index === props.DataList.length - 1 ? 0 : "1px solid #cfcfcf",
                mb: index === props.DataList.length - 1 ? 0 : 2,
                pb: index === props.DataList.length - 1 ? 0 : 1,
              }}
              key={index}
            >
              <Box>
                <Box
                  className={classes.ConditionTitle}
                  onClick={() => props.hanleClickPurchase(!item.isCheck, index)}
                >
                  {item.title}
                </Box>
                <Box
                  className={classes.ConditionContent}
                  onClick={() => props.hanleClickPurchase(!item.isCheck, index)}
                >
                  {item.content}
                </Box>
                <Box className={classes.ConditionTin}>
                  {item.tin} {item.tin && ">"}
                </Box>
              </Box>
              <Box className={classes.ConditionCheckBox}>
                <Checkbox
                  checkedIcon={
                    <img
                      src="/static/images/products/checkBox.png"
                      alt="checkBox"
                    />
                  }
                  icon={
                    <img
                      src="/static/images/products/checkBoxRound.png"
                      alt="checkBoxRound"
                    />
                  }
                  checked={item.isCheck}
                  onClick={(e) =>
                    props.hanleClickPurchase(e.target.checked, index)
                  }
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductInform;
