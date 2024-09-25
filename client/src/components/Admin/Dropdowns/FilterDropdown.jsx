import { useRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { cities } from "../../../lib/dummyData";

// Import Component
import RangeSlider from "./rangeInput";

// Import React Icons
import { FaCheck, FaXmark } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";

const ButtonDropdown = ({}) => {
  const filterBtnContRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [ageRange, setAgeRange] = useState([20, 60]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [query, setQuery] = useState("");
  const citiesName = [...cities.map((city) => city.name).sort()];

  // Filter the cities based on the search query
  const filteredCities =
    query === ""
      ? citiesName
      : citiesName.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div ref={filterBtnContRef} className="space-y-[0.5rem]">
      {/* Filter Dropdown Button */}
      <button
        onClick={() => setIsOpenDropdown((prevState) => !prevState)}
        className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[1rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-md border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all"
      >
        <HiMiniAdjustmentsHorizontal size="1.8rem" />
        <span>Filter By</span>
      </button>

      {/* Filter Dropdown */}
      <div
        className={`min-w-[42rem] w-full bg-neutral-50 text-theme-blue absolute top-0 right-0 rounded-l-lg shadow-xl shadow-[#00000040] ring-2 ring-black ring-opacity-5 transition-all duration-300 ${
          isOpenDropdown ? "translate-y-[-1.5%]" : "translate-y-[-115%]"
        }`}
      >
        <div className="flex flex-col gap-[1.5rem] pt-[1.6rem] pb-[1rem]">
          {/* Filter Header */}
          <div className="w-full flex items-center justify-between px-[1.5rem]">
            <h5 className="text-[2rem] leading-[2rem] font-bold">
              Filter Agent's
            </h5>

            <button
              onClick={() => setIsOpenDropdown(false)}
              className="text-[2rem] text-theme-blue bg-white ring-2 shadow-md ring-black ring-opacity-5 rounded-md p-[0.1rem]"
            >
              <FaXmark />
            </button>
          </div>

          {/* Filter Inputs */}
          <div className="w-full max-h-[30rem] grid grid-cols-2 gap-[1.5rem] px-[1.2rem] py-[1rem] border-t-[0.2rem] border-neutral-100 overflow-auto scrollbar-slim-y">
            {/* Filter by Name */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="name"
                className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="eg. Ahmed Bilal"
                className="w-full text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 px-[1rem] py-[0.6rem] rounded-full outline-none bg-transparent border-2 border-neutral-400 focus:border-theme-blue placeholder:text-neutral-700"
              />
            </div>

            {/* Filter by Email Address */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="email"
                className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By Email Address
              </label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="eg. abc@example.com"
                className="w-full text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 px-[1rem] py-[0.6rem] rounded-full outline-none bg-transparent border-2 border-neutral-400 focus:border-theme-blue placeholder:text-neutral-700"
              />
            </div>

            {/* Filter by Phone Number */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="mobileNumber"
                className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By Mobile Number
              </label>
              <input
                type="number"
                name="mobileNumber"
                id="mobileNumber"
                autoComplete="off"
                placeholder="eg. 03xxxxxxxxx"
                className="w-full text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 px-[1rem] py-[0.6rem] rounded-full outline-none bg-transparent border-2 border-neutral-400 focus:border-theme-blue placeholder:text-neutral-700 numberInput"
              />
            </div>

            {/* Filter by CNIC Number */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="cnicNumber"
                className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By CNIC Number
              </label>
              <input
                type="text"
                name="cnicNumber"
                id="cnicNumber"
                autoComplete="off"
                placeholder="eg. 42101xxxxxxxx"
                className="w-full text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 px-[1rem] py-[0.6rem] rounded-full outline-none bg-transparent border-2 border-neutral-400 focus:border-theme-blue placeholder:text-neutral-700 numberInput"
              />
            </div>

            {/* Filter by Age */}
            <div className="space-y-[0.3rem]">
              <label className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]">
                By Age: {ageRange[0]} - {ageRange[1]}
              </label>

              <div className="px-[1rem]">
                <RangeSlider
                  minAge={20}
                  maxAge={60}
                  range={ageRange}
                  setRange={setAgeRange}
                />
              </div>
            </div>

            {/* Filter by Joining Date */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="joiningDate"
                className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By Joining Date
              </label>
              <input
                type="month"
                name="joiningDate"
                id="joiningDate"
                className="w-full text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 px-[1rem] py-[0.6rem] rounded-full outline-none bg-transparent border-2 border-neutral-400 focus:border-theme-blue placeholder:text-neutral-700"
              />
            </div>

            {/* Filter by Operting City */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="operatingCity"
                className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By Operating City
              </label>

              <Combobox
                value={selectedCity}
                onChange={setSelectedCity}
                onClose={() => setQuery("")}
              >
                <div className="w-full relative">
                  <ComboboxInput
                    name="operatingCity"
                    id="operatingCity"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(city) => (city ? city : "")}
                    placeholder="Select a City"
                    className="w-full text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 px-[1rem] py-[0.6rem] rounded-full outline-none bg-transparent border-2 border-neutral-400 focus:border-theme-blue placeholder:text-neutral-700"
                  />

                  <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-[1rem]">
                    <IoMdArrowDropdown className="text-[1.8rem] text-theme-blue" />
                  </ComboboxButton>

                  <ComboboxOptions className="w-full max-h-[17rem] absolute bottom-[100%] z-[10] bg-white rounded-2xl py-[0.6rem] shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto scrollbar-panel border-[0.2rem] border-neutral-400">
                    {filteredCities.length === 0 && query !== "" ? (
                      <div className="cursor-default select-none py-2 px-4 text-gray-700">
                        No City Found.
                      </div>
                    ) : (
                      filteredCities.map((city, index) => (
                        <ComboboxOption
                          key={index}
                          value={city}
                          className={`cursor-default select-none relative py-[0.5rem] pl-[3rem] pr-[1rem] text-[1.4rem] text-theme-blue bg-white hover:text-white hover:bg-[#082835d0]`}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
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
                      ))
                    )}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>

            {/* By Experience Badge */}
            <div className="space-y-[0.6rem]">
              <label
                htmlFor="experienceBadge"
                className="block text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]"
              >
                By Experience Badge
              </label>

              <Listbox value={selectedBadge} onChange={setSelectedBadge}>
                <div className="w-full relative">
                  <ListboxButton className="w-full flex items-center justify-between py-[0.6rem] px-[1rem] outline-none bg-transparent text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-800 border-2 border-neutral-400 rounded-full cursor-pointer focus:border-theme-blue transition-all ">
                    <span>{selectedBadge || "Select a Badge"}</span>
                    <IoMdArrowDropdown className="text-[1.8rem] text-theme-blue" />
                  </ListboxButton>

                  <ListboxOptions className="w-full max-h-[17rem] absolute z-10 bottom-[100%] overflow-auto bg-white shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5 py-[0.6rem] scrollbar-panel border-[0.2rem] border-neutral-400">
                    {["Junior", "Mid-Level", "Senior", "Expert"].map(
                      (badge, index) => (
                        <ListboxOption
                          key={index}
                          value={badge}
                          className="cursor-default select-none relative py-[0.5rem] pl-[3rem] pr-[1rem] text-[1.4rem] text-theme-blue bg-white hover:text-white hover:bg-[#082835d0]"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-bold" : "font-semibold"
                                }`}
                              >
                                {badge}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center ml-[0.8rem]">
                                  <FaCheck />
                                </span>
                              ) : null}
                            </>
                          )}
                        </ListboxOption>
                      )
                    )}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Filter Button */}
          <div className="w-full px-[1.2rem]">
            <button className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue text-center px-[1rem] py-[0.8rem] rounded-full border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDropdown;
