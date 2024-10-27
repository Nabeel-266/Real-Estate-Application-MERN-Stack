import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

// Import React Icons
import { FaCheck } from "react-icons/fa6";
import { FiDelete } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const SearchSelection = ({
  selectFor,
  labelText,
  placeholderText,
  noOptionMessage,
  optionsData,
  labelStyle,
  inputStyle,
  contStyle,
  bottom,
  state,
  setStateHandler,
}) => {
  const [query, setQuery] = useState("");

  // Filter the cities based on the search query
  const filteredData =
    query === ""
      ? optionsData
      : optionsData.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  // Handle select change event and update the query state
  const handleChange = (selectOption) => {
    setStateHandler(selectFor[0], selectOption || "");
  };

  return (
    <div className={contStyle}>
      <label htmlFor={selectFor[1]} className={labelStyle}>
        {labelText}
      </label>

      <Combobox
        value={state[selectFor[0]] ?? null}
        onChange={handleChange}
        onClose={() => setQuery("")}
      >
        <div className="w-full relative">
          <ComboboxInput
            name={selectFor[0]}
            id={selectFor[1]}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(value) => (value ? value : "")}
            placeholder={placeholderText}
            className={inputStyle}
          />

          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-[1rem]">
            <IoMdArrowDropdown className="text-[1.8rem] text-theme-blue" />
          </ComboboxButton>

          <ComboboxOptions
            className={`selectOptionsBox ${
              bottom ? "top-[100%]" : "bottom-[100%]"
            }`}
          >
            {filteredData.length === 0 && query !== "" ? (
              <p className="text-[1.4rem] leading-[1.6rem] font-semibold text-neutral-700 cursor-default select-none py-[0.2rem] px-[1rem]">
                {noOptionMessage}
              </p>
            ) : (
              <>
                {/* Clear Selection Option */}
                <ComboboxOption value={""} className="selectOptionClearBtn">
                  <FiDelete className="text-[1.6rem]" />
                  <span className="truncate font-semibold">
                    Clear Selection
                  </span>
                </ComboboxOption>

                {filteredData.map((option, index) => (
                  <ComboboxOption
                    key={index}
                    value={option}
                    className="selectOption"
                  >
                    <>
                      <span
                        className={`truncate ${
                          state[selectFor[0]] === option
                            ? "font-bold"
                            : "font-semibold"
                        }`}
                      >
                        {option}
                      </span>

                      <span
                        className={`absolute inset-y-0 left-0 flex items-center ml-[0.8rem] ${
                          state[selectFor[0]] === option ? "block" : "hidden"
                        }`}
                      >
                        <FaCheck />
                      </span>
                    </>
                  </ComboboxOption>
                ))}
              </>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchSelection;
