import { useEffect, useRef, useState } from "react";

// Import React Icon
import { IoMdArrowDropdown } from "react-icons/io";

const PeriodSelection = ({
  width,
  drpdBgColor,
  inputColor,
  dataTitle,
  to,
  options,
  selectedYear,
  onSelect,
}) => {
  const dropdownRef = useRef(null);
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
    <div ref={dropdownRef} className="relative group/dropdown">
      {/* Input Area */}
      <div
        onClick={() => toggleDropdown()}
        className={`px-[1rem] flex items-center justify-between border-[2px] rounded-full overflow-hidden cursor-pointer select-none`}
        style={{
          width,
          borderColor: inputColor ? inputColor : "white",
          color: inputColor ? inputColor : "white",
          fontWeight: inputColor ? 700 : 600,
        }}
      >
        <input
          type="text"
          name={to}
          value={selectedYear}
          readOnly
          className={`w-full p-[0.2rem] text-[1.4rem] leading-[1.4rem] outline-none pointer-events-none bg-transparent`}
        />
        <IoMdArrowDropdown
          className={`text-[2.4rem] ${
            isOpenDropdown ? "rotate-180" : "rotate-0"
          } transition-all`}
        />
      </div>

      {/* Dropdown */}
      {isOpenDropdown && (
        <div
          className={`w-full max-h-[9rem] backdrop-blur-[50px] border-[2px]  absolute top-[100%] left-0 rounded-md shadow-lg shadow-[#082835d0] py-[0.5rem] overflow-auto scrollbar-slim-y ${
            drpdBgColor ? "border-neutral-500" : "border-theme-blue"
          }`}
          style={
            drpdBgColor
              ? { backgroundColor: drpdBgColor }
              : { backgroundColor: "#082835e0" }
          }
        >
          <ul className="text-[1.4rem] leading-[1.4rem] font-semibold *:px-[1.2rem] *:py-[0.6rem]">
            {options?.map((year, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(dataTitle, to, year);
                  setIsOpenDropdown(false);
                }}
                className={` cursor-pointer ${
                  drpdBgColor
                    ? "hover:bg-neutral-300 text-neutral-700"
                    : "hover:bg-theme-blue text-white"
                }`}
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PeriodSelection;
