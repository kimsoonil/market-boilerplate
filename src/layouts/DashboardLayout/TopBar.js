import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { userActions, alertActions } from "src/actions";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import useMediaQuery from "src/hooks/useMediaQuery";
import Cookies from "universal-cookie";
// MUI stuff
import { AppBar, Container, Grid, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Logo from "src/components/Logo";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grayscale[0],
    height: theme.spacing(9),
    justifyContent: "center",
    "@media (max-width: 1080px)": {
      height: 54,
    },
  },
  avatar: {
    width: 60,
    height: 60,
  },
  myPage: {
    cursor: "pointer",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    "&:hover": {
      boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
    },
    "&:active": {
      backgroundColor: theme.palette.grayscale[50],
      boxShadow: "none",
    },
  },
}));

const TopBar = ({ className, ...rest }) => {
  const cookies = new Cookies();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hidden, isHidden] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(max-width: 1080px)");
  const pathname = window.location.pathname;
  let { id } = useParams();

  const handleClickLoign = () => {
    const user = cookies.get("token");

    if (user === "" || user === null || user === undefined) {
      navigate(`/login`);
    } else {
      dispatch(alertActions.clear());
      const logout = window.confirm("로그아웃을 하시겠습니까?");
      if (logout) {
        dispatch(userActions.logout());
        // navigate(`/login`);
      }
    }
  };
  useEffect(() => {
    if (pathname !== "/models" && isDesktop) {
      isHidden(true);
    } else {
      isHidden(false);
    }
  }, [isDesktop, pathname]);

  const goBack = () => {
    if (pathname.indexOf("/products/") !== -1) {
      navigate(-1);
    } else if (pathname.indexOf("/products") !== -1) {
      navigate(`/model/${id}`);
    } else if (pathname.indexOf("/model/") !== -1) {
      navigate(`/`);
    } else {
      navigate(-1);
    }
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Container maxWidth="lg">
        {!hidden ? (
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item>
              <RouterLink to="/">
                <Logo />
              </RouterLink>
            </Grid>
            <Grid item>
              <Box className={classes.myPage} onClick={handleClickLoign}>
                <AccountCircleTwoToneIcon
                  sx={{ color: "#000", fontSize: 24 }}
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box
            onClick={() => {
              goBack();
            }}
          >
            <ArrowBackIcon sx={{ color: "grayscale.1000" }} />
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
