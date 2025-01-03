import React from "react";

const LoaderCircle = ({ size = 30, outerC = "#fff", innerC = "#082835" }) => {
  return (
    <div className="w-fit p-[1rem] drop-shadow-lg rounded-full">
      <span className="loader"></span>
      <style jsx>
        {`
          .loader {
            width: ${size}px;
            height: ${size}px;
            border: 3px dotted ${outerC};
            border-style: solid solid dotted dotted;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            animation: rotation 2s linear infinite;
          }
          .loader::after {
            content: "";
            box-sizing: border-box;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 3px dotted ${innerC};
            border-style: solid solid dotted;
            width: ${size - 12}px;
            height: ${size - 12}px;
            border-radius: 50%;
            animation: rotationBack 1s linear infinite;
            transform-origin: center center;
          }

          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes rotationBack {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoaderCircle;
