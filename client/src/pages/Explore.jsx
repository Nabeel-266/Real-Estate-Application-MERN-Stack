import React from "react";

// Import Component
import FilterationDrawer from "../components/Explore/FilterationDrawer";

const Explore = () => {
  return (
    <div className="exploreCont w-full min-h-dvh pt-[6rem] flex flex-col gap-[4rem]">
      <div className="mx-[4%]">
        {/* Property Filtered Tab */}
        <FilterationDrawer />

        {/* Result Display Area */}

        {/* Property Cards Side */}

        {/* Property Map Location Side */}
      </div>
    </div>
  );
};

export default Explore;
