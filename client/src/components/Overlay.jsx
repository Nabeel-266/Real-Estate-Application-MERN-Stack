import React from "react";

const Overlay = ({ isOpenOverlay }) => {
  return (
    <div
      className={`${
        isOpenOverlay ? "block" : "hidden"
      } sidebarCont w-full h-dvh fixed z-[990] top-0 left-0 backdrop-blur-[2px] bg-[#40404090] overflow-hidden`}
    ></div>
  );
};

export default Overlay;
