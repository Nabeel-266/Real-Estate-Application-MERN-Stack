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
  labelText,
  placeholderText,
  optionsData,
  selectedValue,
  setSelectedValue,
  labelStyle,
  inputStyle,
  spaceBetween,
}) => {
  return (
    <div className={spaceBetween}>
      <label className={labelStyle}>{labelText}</label>

      <Listbox value={selectedValue} onChange={setSelectedValue}>
        <div className="w-full relative">
          <ListboxButton
            className={`${inputStyle} flex items-center justify-between cursor-pointer`}
          >
            <span>{selectedValue || placeholderText}</span>
            <IoMdArrowDropdown className="text-[1.8rem] text-theme-blue" />
          </ListboxButton>

          <ListboxOptions className="selectOptionsBox">
            {/* Clear Selection Option */}
            <ListboxOption value={null} className="selectOptionClearBtn">
              <FiDelete className="rotate-180 text-[1.6rem]" />
              <span className="truncate font-semibold">Clear Selection</span>
            </ListboxOption>

            {optionsData.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="selectOption"
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`truncate ${
                        selected ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center ml-[0.8rem]">
                        <FaCheck />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SimpleSelection;
