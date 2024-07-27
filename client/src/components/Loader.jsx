import React from "react";

const Loader = ({
  value,
  color,
  size = "0.5rem",
  gap = "0.5rem",
  ballGaps = "0.5rem",
}) => {
  return (
    <div className={`flex items-center`} style={{ gap: gap }}>
      <p>{value}</p>
      <div className={`flex flex-row`} style={{ gap: ballGaps }}>
        <div
          style={{ backgroundColor: color, width: size, height: size }}
          className={`rounded-full animate-bounce`}
        ></div>
        <div
          style={{ backgroundColor: color, width: size, height: size }}
          className={`rounded-full animate-bounce [animation-delay:-.3s]`}
        ></div>
        <div
          style={{ backgroundColor: color, width: size, height: size }}
          className={`rounded-full animate-bounce [animation-delay:-.5s]`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
