import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Pagination = () => {
  const [pageNum, setPageNum] = useState(1);
  const pageLength = 90;

  // Prev One Page Handler
  const handlePrevPage = (prev) => {
    if (pageNum > prev) setPageNum((prv) => prv - prev);
  };

  // Next One Page Handler
  const handleNextPage = (next) => {
    if (pageNum + next <= pageLength) setPageNum((prv) => prv + next);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[2rem] pt-[2rem] pb-[1rem] border-t-[0.2rem] border-neutral-300">
      {/* Showing Page Result Status */}
      <p className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700">
        Showing 1 to 10 of {pageLength} results
      </p>
      <div className="w-full flex justify-between items-center space-x-2">
        <div className="prevBtnCont flex items-center text-[1.6rem] leading-[1.5rem] font-semibold space-x-2 *:p-[0.8rem] *:bg-neutral-300 *:text-neutral-700 *:rounded-md *:opacity-50">
          <button onClick={() => handlePrevPage(10)}>10</button>
          <button onClick={() => handlePrevPage(5)}>5</button>
          <button
            onClick={() => handlePrevPage(1)}
            className="flex items-center gap-[0.4rem]"
          >
            <FaChevronLeft /> <span>PREV</span>
          </button>
        </div>

        <p className="text-[1.8rem] leading-[1.6rem] font-semibold text-neutral-700 whitespace-nowrap">
          Page {pageNum}
        </p>

        <div className="nextBtnCont flex items-center text-[1.6rem] leading-[1.5rem] font-semibold space-x-2 *:p-[0.8rem] *:bg-neutral-300 *:text-neutral-700 *:rounded-md">
          <button
            onClick={() => handleNextPage(1)}
            className="flex items-center gap-[0.4rem]"
          >
            <span>NEXT</span> <FaChevronRight />
          </button>
          <button onClick={() => handleNextPage(5)}>5</button>
          <button onClick={() => handleNextPage(10)}>10</button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
