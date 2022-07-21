import React, { useState } from "react";

import DeliveriesChange from "./DeliveriesChange";
import DeliveriesDialogContent from "./DeliveriesDialogContent";
import AddressDialog from "./AddressDialog";

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

export default function DeliveriesChangeDialog(props) {
  const classes = useStyles();
  const [screen, setScreen] = useState("DeliveriesChange");
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        onBackdropClick={() => props.handleDeliveriesOpen()}
        fullScreen={false}
        classes={{
          paper: classes.rootStyle,
        }}
      >
        <DeliveriesChange
          {...props}
          screen={screen}
          setScreen={setScreen}
          // handleClose={() => }
        />
        <DeliveriesDialogContent
          {...props}
          screen={screen}
          setScreen={setScreen}
          handleClose={() => setScreen("DeliveriesChange")}
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
