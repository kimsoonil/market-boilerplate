import * as React from "react";
import PropTypes from "prop-types";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
  },
  content: {
    padding: "16px 16px 32px",
  },
  specification: {
    overflow: "auto",
    marginTop: 32,
    height: 246,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

function ProductDilalog({ open, handleClose, product }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          classes: {
            root: classes.root,
          },
        }}
      >
        <DialogContent className={classes.content}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ typography: "h5", color: "grayscale.1000" }}>
              제품사양
            </Box>
            <Box onClick={handleClose}>
              <CloseIcon />
            </Box>
          </Box>
          <Box className={classes.specification}>
            {product.map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      typography: "subtitle2",
                      color: "grayscale.600",
                    }}
                  >
                    {item.title}
                  </Box>
                  <Box sx={{ typography: "body1", color: "grayscale.800" }}>
                    {item.property}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
ProductDilalog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default ProductDilalog;
