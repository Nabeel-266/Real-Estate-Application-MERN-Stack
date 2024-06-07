import React from "react";

const Loader = ({ value, color }) => {
  return (
    <div className="flex items-center gap-[0.5rem]">
      <p>{value}</p>
      <div className="flex flex-row gap-2">
        <div
          className={`w-[0.5rem] h-[0.5rem] rounded-full bg-${color} animate-bounce`}
        ></div>
        <div
          className={`w-[0.5rem] h-[0.5rem] rounded-full bg-${color} animate-bounce [animation-delay:-.3s]`}
        ></div>
        <div
          className={`w-[0.5rem] h-[0.5rem] rounded-full bg-${color} animate-bounce [animation-delay:-.5s]`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
