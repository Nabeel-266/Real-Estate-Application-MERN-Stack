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
  inputFor,
  labelText,
  placeholderText,
  noOptionMessage,
  optionsData,
  selectedValue,
  setSelectedValue,
  labelStyle,
  inputStyle,
  spaceBetween,
}) => {
  const [query, setQuery] = useState("");

  // Filter the cities based on the search query
  const filteredData =
    query === ""
      ? optionsData
      : optionsData.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={spaceBetween}>
      <label htmlFor={inputFor} className={labelStyle}>
        {labelText}
      </label>

      <Combobox
        value={selectedValue}
        onChange={setSelectedValue}
        onClose={() => setQuery("")}
      >
        <div className="w-full relative">
          <ComboboxInput
            name={inputFor}
            id={inputFor}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(city) => (city ? city : "")}
            placeholder={placeholderText}
            className={inputStyle}
          />

          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-[1rem]">
            <IoMdArrowDropdown className="text-[1.8rem] text-theme-blue" />
          </ComboboxButton>

          <ComboboxOptions className="selectOptionsBox">
            {filteredData.length === 0 && query !== "" ? (
              <p className="text-[1.4rem] leading-[1.6rem] font-semibold text-neutral-700 cursor-default select-none py-[0.2rem] px-[1rem]">
                {noOptionMessage}
              </p>
            ) : (
              <>
                {/* Clear Selection Option */}
                <ComboboxOption value={null} className="selectOptionClearBtn">
                  <FiDelete className="rotate-180 text-[1.6rem]" />
                  <span className="truncate font-semibold">
                    Clear Selection
                  </span>
                </ComboboxOption>

                {filteredData.map((city, index) => (
                  <ComboboxOption
                    key={index}
                    value={city}
                    className="selectOption"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`truncate ${
                            selected ? "font-bold" : "font-semibold"
                          }`}
                        >
                          {city}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center ml-[0.8rem]`}
                          >
                            <FaCheck />
                          </span>
                        ) : null}
                      </>
                    )}
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
