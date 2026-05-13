import React, { memo } from "react";
import MyImage from "../MyImage";
import loading_plane from "../../assets/icons/loading_plane.svg";
import delivered_plane from "../../assets/icons/delivered_plane.svg";
import sent_plane from "../../assets/icons/sent_plane.svg";

const AppConstants = {
  greenColor: "#00C853",
  whiteColor: "#FFFFFF",
  black: "#000000",
};

const DeliveryStatusIcon = ({ status }) => {
  const label =
    status === "seen"
      ? delivered_plane
      : status === "delivered"
        ? delivered_plane
        : status === "sent"
          ? sent_plane
          : loading_plane;


  const color =
    status === "seen"
      ? AppConstants.greenColor
      : status === "delivered"
        ? AppConstants.whiteColor
        : status === "sent"
          ? AppConstants.whiteColor
          : AppConstants.black;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color, fontSize: "10px", fontWeight: "600" }}>
        {/* <MyImage className={"w-[15px] h-[15px] rotate-45"} src={label} /> */}
        <img className={"w-[15px] h-[15px] rotate-45"} src={label} />
      </span>
    </div>
  );
};

export default memo(DeliveryStatusIcon);
