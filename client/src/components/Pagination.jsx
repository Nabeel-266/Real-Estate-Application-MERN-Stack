import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Pagination = ({ propertyDataInfo }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    pageLimit,
    currentPage,
    totalPages,
    skipProperties,
    totalProperties,
  } = propertyDataInfo;
  const [pageNum, setPageNum] = useState(currentPage);

  useEffect(() => {
    const queryObject = Object.fromEntries([...searchParams]);

    if (pageNum > 1) {
      setSearchParams({ ...queryObject, page: pageNum });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page");
      setSearchParams(newParams);
    }
  }, [pageNum]);

  // Prev One Page Handler
  const handlePrevPage = (prev) => {
    if (pageNum > prev) setPageNum((prvNum) => prvNum - prev);
  };

  // Next One Page Handler
  const handleNextPage = (next) => {
    if (pageNum + next <= totalPages) setPageNum((prv) => prv + next);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[2rem] pt-[2rem] pb-[1rem] border-t-[0.2rem] border-neutral-300 select-none">
      {/* Showing Page Result Status */}
      <p className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700">
        Showing{" "}
        {skipProperties + 1 !== totalProperties && `${skipProperties + 1} to`}{" "}
        {skipProperties + pageLimit > totalProperties
          ? totalProperties
          : skipProperties + pageLimit}{" "}
        of {totalProperties} results
      </p>

      <div className="w-full flex justify-between items-center space-x-2">
        {/* For Previous Pages */}
        <div className="prevBtnCont flex items-center text-[1.6rem] leading-[1.5rem] font-semibold space-x-2 *:p-[0.8rem] *:bg-neutral-300 *:text-neutral-700 *:rounded-md">
          <button
            disabled={pageNum > 5 ? false : true}
            onClick={() => handlePrevPage(5)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            5
          </button>
          <button
            disabled={pageNum > 3 ? false : true}
            onClick={() => handlePrevPage(3)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            3
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
            disabled={pageNum + 1 <= totalPages ? false : true}
            onClick={() => handleNextPage(1)}
            className="flex items-center gap-[0.4rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>NEXT</span> <FaChevronRight />
          </button>
          <button
            disabled={pageNum + 3 <= totalPages ? false : true}
            onClick={() => handleNextPage(3)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            3
          </button>
          <button
            disabled={pageNum + 5 <= totalPages ? false : true}
            onClick={() => handleNextPage(5)}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            5
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
