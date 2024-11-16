import { Fragment } from "react";
import {
  Transition,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

// Import React Icons
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const PreSelectedSelection = ({ value, setValue, options, width }) => {
  const handleChange = (selectOption) => {
    setValue(selectOption.toLowerCase());
  };

  return (
    <div style={{ width: `${width}` }}>
      <Listbox value={value} onChange={handleChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-[0.7rem] pl-[0.8rem] pr-[1.4rem] text-left focus:outline-none text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-700 border-neutral-300 border-[0.1rem]">
            <span className="truncate">
              {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[0.5rem]">
              <IoMdArrowDropdown
                className="text-[1.5rem] text-neutral-700 mb-[0.1rem]"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="w-full max-h-[15.4rem] absolute z-[10] bg-white rounded-lg mt-[0.2rem] py-[0.4rem] shadow-lg ring-1 ring-black/5 overflow-auto scrollbar-dropdown-dark *:cursor-pointer">
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option}
                  className="select-none relative py-[0.5rem] pl-[2.8rem] pr-[0.8rem] text-[1.35rem] leading-[1.6rem] text-neutral-700 hover:text-white hover:bg-[#082835e0] transition-all"
                >
                  <>
                    <span
                      className={`truncate ${
                        value === option.toLowerCase()
                          ? "font-semibold"
                          : "font-medium"
                      }`}
                    >
                      {option}
                    </span>

                    <span
                      className={`absolute inset-y-0 left-0 flex items-center ml-[0.8rem] ${
                        value === option.toLowerCase() ? "block" : "hidden"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default PreSelectedSelection;
