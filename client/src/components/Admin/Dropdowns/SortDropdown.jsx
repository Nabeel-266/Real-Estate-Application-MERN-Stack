import { useEffect, useRef, useState } from "react";
import { agentsDataSortBy } from "../../../lib/dummyDataAdmin";

// Import React Icons
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FaCheck, FaArrowUp, FaArrowDown } from "react-icons/fa6";

const SortDropdown = ({ dropdownData }) => {
  const sortBtnContRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // Dropdown Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortBtnContRef.current &&
        !sortBtnContRef.current.contains(event.target)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortBtnContRef} className="space-y-[0.5rem]">
      {/* Sort Dropdown Button */}
      <button
        onClick={() => setIsOpenDropdown((prevState) => !prevState)}
        className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[1rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-md border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all"
      >
        <HiMiniArrowsUpDown size="1.8rem" />
        <span>Sort By</span>
      </button>

      {/* Sort Dropdown */}
      <div
        className="min-w-[20rem] w-fit overflow-hidden buttonDropdownCont transition-all duration-200"
        style={{
          height: isOpenDropdown
            ? `${dropdownRef.current.scrollHeight}px`
            : "0px",
        }}
      >
        <div
          ref={dropdownRef}
          className="space-y-[0.5rem] pt-[1.2rem] pb-[0.5rem]"
        >
          {/* Sort by */}
          <div className="space-y-[0.4rem]">
            <h5 className="text-[1.4rem] leading-[1.4rem] font-semibold px-[1rem]">
              Sort
            </h5>
            <ul className="text-[1.3rem] leading-[1.3rem] font-medium *:px-[1rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
              {dropdownData.map((by, index) => (
                <li
                  key={index}
                  // onClick={() => setSummarizedBy(by)}
                  className="flex items-center relative hover:bg-theme-blue hover:text-white whitespace-nowrap"
                >
                  <span>{by}</span>
                  <FaCheck className="absolute right-[1rem]" />
                </li>
              ))}
            </ul>
          </div>

          {/* Order By */}
          <div className="space-y-[0.4rem] border-t-[0.1rem] border-theme-blue pt-[1rem]">
            <h5 className="text-[1.4rem] leading-[1.4rem] font-semibold px-[1rem]">
              Order
            </h5>
            <ul className="text-[1.3rem] leading-[1.3rem] font-medium *:px-[1rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
              {["Ascending", "Descending"].map((order, index) => (
                <li
                  key={index}
                  // onClick={() => setOrder(order)}
                  className="flex items-center gap-[1rem] hover:bg-theme-blue hover:text-white whitespace-nowrap"
                >
                  {order === "Ascending" ? <FaArrowDown /> : <FaArrowUp />}
                  <span>{order}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
