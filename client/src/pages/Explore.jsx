import React, { useState } from "react";

// Import Component
import FilterationDrawer from "../components/Explore/FilterationDrawer";

// Import React Icons
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

const Explore = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="exploreCont w-full min-h-dvh pt-[6rem] flex flex-col gap-[4rem]">
      <div className="mx-[4%]">
        {/* Property Filtered Tab */}
        <FilterationDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        {/* Showing Result Text Topbar */}
        <div className="w-full flex items-start justify-between gap-[3rem] py-[1rem]">
          <p className="text-[1.6rem] leading-[2.2rem] font-medium text-neutral-700">
            Showing Results for{" "}
            <span className="font-semibold">Commercial Properties</span>
            <br />
            in
            <span className="font-semibold"> ALL CITIES</span>
          </p>

          {/* Filter Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex justify-center items-center gap-[0.6rem] p-[0.4rem] tabletSm:px-[1rem] tabletSm:py-[0.6rem] text-[1.6rem] leading-[1.6rem] font-semibold bg-white border-theme-blue border-[0.2rem] text-theme-blue rounded-md whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all active:scale-[0.98]"
          >
            <HiMiniAdjustmentsHorizontal className="text-[2.5rem] tabletSm:text-[2rem]" />
            <span className="hidden tabletSm:inline">Filter Results</span>
          </button>
        </div>

        {/* Result Display Area */}

        {/* Property Cards Side */}

        {/* Property Map Location Side */}
      </div>
    </div>
  );
};

export default Explore;
