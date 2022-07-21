import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
// MUI stuff
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grayscale[0],
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundColor: theme.palette.grayscale[0],
    paddingTop: 72,
    "@media (max-width: 1080px)": {
      paddingTop: 53,
    },
  },
  contentContainer: {
    flex: "1 1 auto",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
