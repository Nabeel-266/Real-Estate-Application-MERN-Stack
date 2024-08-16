import React from "react";
import { FaRegImage } from "react-icons/fa6";

const LoadingCards = () => {
  return (
    <div className="loadingCardsCont w-full grid grid-cols-1 tabletLg:grid-cols-3 tabletSm:grid-cols-2 desktopSm:grid-cols-3 gap-[3rem_2rem] px-[1rem]">
      {/* Loading Card */}
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="propertyCard max-w-[35rem] min-w-full relative bg-neutral-100 overflow-hidden shadow-[0px_15px_20px_#e9e9e9] rounded-xl animate-pulse"
        >
          {/* Card Image */}
          <div className="imageArea relative w-full h-[22rem] tabletSm:h-[18rem] flex items-center justify-center bg-neutral-200">
            <FaRegImage className="text-[7rem] text-neutral-400 drop-shadow-2xl" />
          </div>

          {/* Card Content */}
          <div className="cardContent w-full flex flex-col gap-[1.5rem] p-[1rem] text-neutral-700">
            <div className="flex justify-between *:rounded-full *:bg-neutral-200 *:py-[0.8rem]">
              <span className="w-[50%]"></span>
              <span className="w-[20%]"></span>
            </div>

            <div className="w-[70%] select-none rounded-full bg-neutral-200 py-[0.8rem]"></div>

            <div className="w-full flex items-center gap-[1rem] *:rounded-full *:bg-neutral-200 *:py-[0.8rem]">
              <span className="w-[15%]"></span>
              <span className="w-[15%]"></span>
              <span className="w-[30%]"></span>
            </div>

            <div className="w-[60%] rounded-full bg-neutral-200 py-[0.8rem]"></div>

            {/* Controls */}
            <div className="w-full flex items-center justify-between gap-[1rem] *:rounded-full *:bg-neutral-200 *:py-[1.5rem]">
              <span className="w-[50%]"></span>
              <span className="w-[50%]"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCards;
