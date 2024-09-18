import { useEffect, useRef, useState } from "react";

// Import React Icons
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FaCheck, FaXmark, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { PiColumnsBold } from "react-icons/pi";

const ButtonDropdown = ({ to }) => {
  const dropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, []);

  // Toggle dropdown open/close on input click
  const toggleDropdown = () => {
    setIsOpenDropdown((prevState) => !prevState);
  };

  return (
    <div ref={dropdownRef} className="space-y-[0.5rem]">
      {/* Button */}
      <button
        onClick={() => toggleDropdown()}
        className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[1rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-md border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all"
      >
        {to === "Sort By" ? (
          <HiMiniArrowsUpDown size="1.8rem" />
        ) : to === "Filter By" ? (
          <HiMiniAdjustmentsHorizontal size="1.8rem" />
        ) : (
          <PiColumnsBold size="1.8rem" />
        )}
        <span>{to}</span>
      </button>

      {/* Dropdown */}
      {to === "Sort By" ? (
        <div
          className="min-w-[18rem] w-fit overflow-hidden buttonDropdownCont transition-all duration-200"
          style={{
            height: isOpenDropdown
              ? `${filterDropdownRef.current.scrollHeight}px`
              : "0px",
          }}
        >
          <div
            ref={filterDropdownRef}
            className="space-y-[0.5rem] pt-[1.2rem] pb-[0.5rem]"
          >
            {/* Sort by Area */}
            <div className="space-y-[0.4rem]">
              <h5 className="text-[1.4rem] leading-[1.4rem] font-semibold px-[1rem]">
                Sort
              </h5>
              <ul className="text-[1.3rem] leading-[1.3rem] font-medium *:px-[1rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
                {["Agents Name", "Operating City", "Commission"].map(
                  (by, index) => (
                    <li
                      key={index}
                      // onClick={() => setSummarizedBy(by)}
                      className="flex items-center relative hover:bg-theme-blue hover:text-white whitespace-nowrap"
                    >
                      <span>{by}</span>
                      <FaCheck className="absolute right-[1rem]" />
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Order By Area */}
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
      ) : to === "Columns" ? (
        <div
          className="min-w-[18rem] w-fit overflow-hidden buttonDropdownCont transition-all duration-200"
          style={{
            height: isOpenDropdown
              ? `${filterDropdownRef.current.scrollHeight}px`
              : "0px",
          }}
        >
          <div
            ref={filterDropdownRef}
            className="space-y-[0.5rem] pt-[1.2rem] pb-[0.5rem]"
          >
            <h5 className="text-[1.4rem] leading-[1.4rem] font-semibold px-[1rem]">
              Select Columns
            </h5>
            <ul className="text-[1.3rem] leading-[1.3rem] font-medium *:px-[1rem] *:pr-[1rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
              {["Agents Name", "Operating City", "Commission"].map(
                (by, index) => (
                  <li
                    key={index}
                    // onClick={() => setSummarizedBy(by)}
                    className="flex items-center relative hover:bg-theme-blue hover:text-white whitespace-nowrap"
                  >
                    <span>{by}</span>
                    <FaCheck className="absolute right-[1rem]" />
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ) : (
        to === "Filter By" && (
          <div
            className={`min-w-[20rem] w-full overflow-hidden buttonDropdownCont transition-all duration-200`}
            style={{
              height: isOpenDropdown
                ? `${filterDropdownRef.current.scrollHeight}px`
                : "0px",
            }}
          >
            <div
              ref={filterDropdownRef}
              className="space-y-[0.5rem] px-[0.5rem] pt-[1.5rem] pb-[0.8rem]"
            >
              <h5 className="text-[1.4rem] leading-[1.4rem] font-semibold px-[1rem]">
                Select Columns
              </h5>
              <ul className="text-[1.3rem] leading-[1.3rem] font-medium *:px-[1rem] *:pr-[1rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
                {["Agents Name", "Operating City", "Commission"].map(
                  (by, index) => (
                    <li
                      key={index}
                      // onClick={() => setSummarizedBy(by)}
                      className="flex items-center relative hover:bg-theme-blue hover:text-white whitespace-nowrap"
                    >
                      <span>{by}</span>
                      <FaCheck className="absolute right-[1rem]" />
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ButtonDropdown;
