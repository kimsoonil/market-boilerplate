import React from "react";
// MUI stuff
import { Box, Skeleton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({}));

const OptionSkeleton = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={140} height={22} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={140} height={22} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={140} height={22} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={140} height={22} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={140} height={22} />
      </Box>
    </Box>
  );
};

export default OptionSkeleton;
