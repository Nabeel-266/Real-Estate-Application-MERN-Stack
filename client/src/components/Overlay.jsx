import React from "react";

const Overlay = ({ isOpenSidebar }) => {
  return (
    <div
      className={`${
        isOpenSidebar ? "block" : "hidden"
      } sidebarCont w-full h-dvh fixed z-[990] top-0 left-0 backdrop-blur-[10px] bg-[#404040d0] overflow-hidden tabletLg:hidden`}
    ></div>
  );
};

export default Overlay;
