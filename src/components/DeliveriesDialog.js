import React, { useState } from "react";

import DeliveriesDialogContent from "./DeliveriesDialogContent";
import AddressDialog from "./AddressDialog";
import useMediaQuery from "src/hooks/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    "@media (min-width: 1080px)": {
      width: 390,
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeliveriesDialog(props) {
  const classes = useStyles();
  const [screen, setScreen] = useState("Deliveries");
  const isDesktop = useMediaQuery("(max-width: 600px)");
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        onBackdropClick={() => props.handleDeliveriesOpen()}
        fullScreen={isDesktop}
        fullWidth={isDesktop}
        classes={{
          paper: classes.rootStyle,
        }}
      >
        <DeliveriesDialogContent
          {...props}
          screen={screen}
          setScreen={setScreen}
        />

        <AddressDialog
          screen={screen}
          setScreen={setScreen}
          setDeliveriesData={props.setDeliveriesData}
          handleClose={() => setScreen("Deliveries")}
        />
      </Dialog>
    </div>
  );
}
