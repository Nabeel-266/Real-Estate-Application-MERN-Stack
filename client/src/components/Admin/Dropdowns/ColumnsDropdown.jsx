import { useEffect, useRef, useState } from "react";

// Import React Icons
import { PiColumnsBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";

const ColumnsDropdown = ({
  dropdownData,
  selectedColumns,
  toggleDataColumns,
}) => {
  const dropdownRef = useRef(null);
  const columnsBtnContRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // Dropdown Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        columnsBtnContRef.current &&
        !columnsBtnContRef.current.contains(event.target)
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
    <div ref={columnsBtnContRef} className="space-y-[0.6rem]">
      {/* Column Dropdown Button */}
      <button
        onClick={() => setIsOpenDropdown((prevState) => !prevState)}
        className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[1rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-lg border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all"
      >
        <PiColumnsBold size="1.8rem" />
        <span>Columns</span>
      </button>

      {/* Column Dropdown */}
      <div
        className="buttonDropdownCont"
        style={{
          height: isOpenDropdown
            ? `${dropdownRef.current.scrollHeight}px`
            : "0px",
        }}
      >
        <div
          ref={dropdownRef}
          className="space-y-[0.6rem] pt-[1.2rem] pb-[0.8rem]"
        >
          <h5 className="text-[1.4rem] leading-[1.4rem] font-semibold px-[1rem]">
            Select Columns
          </h5>

          <div className="text-[1.3rem] leading-[1.3rem] font-medium *:px-[1rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
            {dropdownData.map((column, index) => (
              <label
                key={index}
                className="flex items-center relative hover:text-[1.35rem] hover:bg-cyan-950 whitespace-nowrap"
              >
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => toggleDataColumns(column)}
                  className="hidden peer/input"
                />
                <span>{column}</span>
                <FaCheck className="absolute right-[1rem] hidden peer-checked/input:block" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnsDropdown;
