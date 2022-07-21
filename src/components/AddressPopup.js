import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export default function AddressDialog(props) {
  const onCompletePost = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    window.opener.document.getElementById("addressInputField").value =
      data.zonecode + "/" + fullAddress;

    window.close();
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "0",
    left: 0,
    width: "100vw",
    height: "100vh",
    padding: "7px",
    zIndex: 1000,
  };
  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        {...props}
        autoClose={false}
        onComplete={onCompletePost}
      />
    </div>
  );
}
