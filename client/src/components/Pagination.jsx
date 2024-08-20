import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Pagination = () => {
  const [pageNum, setPageNum] = useState(1);
  const pageLength = 15;

  // Prev One Page Handler
  const handlePrevPage = (prev) => {
    if (pageNum > prev) setPageNum((prv) => prv - prev);
  };

  // Next One Page Handler
  const handleNextPage = (next) => {
    if (pageNum + next <= pageLength) setPageNum((prv) => prv + next);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[2rem] pt-[2rem] pb-[1rem] border-t-[0.2rem] border-neutral-300 select-none">
      {/* Showing Page Result Status */}
      <p className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700">
        Showing {pageNum - 1 + "1"} to {144 > pageNum * 10 ? pageNum * 10 : 144}{" "}
        of 144 results
      </p>

      <div className="w-full flex justify-between items-center space-x-2">
        {/* For Previous Pages */}
        <div className="prevBtnCont flex items-center text-[1.6rem] leading-[1.5rem] font-semibold space-x-2 *:p-[0.8rem] *:bg-neutral-300 *:text-neutral-700 *:rounded-md">
          <button
            disabled={pageNum > 10 ? false : true}
            onClick={() => handlePrevPage(10)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            10
          </button>
          <button
            disabled={pageNum > 5 ? false : true}
            onClick={() => handlePrevPage(5)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            5
          </button>
          <button
            disabled={pageNum > 1 ? false : true}
            onClick={() => handlePrevPage(1)}
            className="flex items-center gap-[0.4rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FaChevronLeft /> <span>PREV</span>
          </button>
        </div>

        <p className="text-[1.8rem] leading-[1.6rem] font-semibold text-neutral-700 whitespace-nowrap">
          Page {pageNum}
        </p>

        {/* For Next Pages */}
        <div className="nextBtnCont flex items-center text-[1.6rem] leading-[1.5rem] font-semibold space-x-2 *:p-[0.8rem] *:bg-neutral-300 *:text-neutral-700 *:rounded-md">
          <button
            disabled={pageNum + 1 <= pageLength ? false : true}
            onClick={() => handleNextPage(1)}
            className="flex items-center gap-[0.4rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>NEXT</span> <FaChevronRight />
          </button>
          <button
            disabled={pageNum + 5 <= pageLength ? false : true}
            onClick={() => handleNextPage(5)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            5
          </button>
          <button
            disabled={pageNum + 10 <= pageLength ? false : true}
            onClick={() => handleNextPage(10)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            10
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
