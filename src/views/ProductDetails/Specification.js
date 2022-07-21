import React from "react";

import { Box } from "@mui/material";

const Dashboard = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 0.5,
      }}
    >
      <Box
        sx={{
          typography: "subtitle2",
          color: "grayscale.600",
        }}
      >
        {props.title}
      </Box>
      <Box
        sx={{
          typography: "body1",
          color: "grayscale.800",
        }}
      >
        {props.property}
      </Box>
    </Box>
  );
};

export default Dashboard;
