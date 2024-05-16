import React from "react";

const Overlay = ({ isOpenSidebar, setIsOpenSidebar }) => {
  return (
    <div
      onClick={() => setIsOpenSidebar(false)}
      className={`${
        isOpenSidebar ? "block" : "hidden"
      } sidebarCont w-full h-dvh fixed z-[990] top-0 left-0 backdrop-blur-[10px] bg-[#40404090] overflow-hidden tabletLg:hidden`}
    ></div>
  );
};

export default Overlay;
