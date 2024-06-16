import React from "react";

const Loader = ({ value, color }) => {
  return (
    <div className="flex items-center gap-[0.5rem]">
      <p>{value}</p>
      <div className="flex flex-row gap-2">
        <div
          style={{ backgroundColor: color }}
          className={`w-[0.5rem] h-[0.5rem] rounded-full animate-bounce`}
        ></div>
        <div
          style={{ backgroundColor: color }}
          className={`w-[0.5rem] h-[0.5rem] rounded-full animate-bounce [animation-delay:-.3s]`}
        ></div>
        <div
          style={{ backgroundColor: color }}
          className={`w-[0.5rem] h-[0.5rem] rounded-full animate-bounce [animation-delay:-.5s]`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
