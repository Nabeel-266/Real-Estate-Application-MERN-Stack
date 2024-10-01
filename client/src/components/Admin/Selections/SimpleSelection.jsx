import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

// Import React Icons
import { FaCheck } from "react-icons/fa6";
import { FiDelete } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const SimpleSelection = ({
  selectFor,
  labelText,
  placeholderText,
  optionsData,
  labelStyle,
  inputStyle,
  spaceBetween,
  filterQuery,
  setQueryHanlder,
}) => {
  // Handle select change event and update the query state
  const handleChange = (selectOption) => {
    setQueryHanlder(selectFor, selectOption || null);
  };

  return (
    <div className={spaceBetween}>
      <label className={labelStyle}>{labelText}</label>

      <Listbox value={filterQuery[selectFor] ?? null} onChange={handleChange}>
        <div className="w-full relative">
          <ListboxButton
            className={`${inputStyle} flex items-center justify-between cursor-pointer`}
          >
            <span>{filterQuery[selectFor] || placeholderText}</span>
            <IoMdArrowDropdown className="text-[1.8rem] text-theme-blue" />
          </ListboxButton>

          <ListboxOptions className="selectOptionsBox">
            {/* Clear Selection Option */}
            <ListboxOption value={null} className="selectOptionClearBtn">
              <FiDelete className="text-[1.6rem]" />
              <span className="truncate font-semibold">Clear Selection</span>
            </ListboxOption>

            {optionsData.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="selectOption"
              >
                <>
                  <span
                    className={`truncate ${
                      filterQuery[selectFor] === option
                        ? "font-bold"
                        : "font-semibold"
                    }`}
                  >
                    {option}
                  </span>

                  <span
                    className={`absolute inset-y-0 left-0 flex items-center ml-[0.8rem] ${
                      filterQuery[selectFor] === option ? "block" : "hidden"
                    }`}
                  >
                    <FaCheck />
                  </span>
                </>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SimpleSelection;
