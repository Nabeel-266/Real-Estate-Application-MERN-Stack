import { useEffect, useRef, useState } from "react";
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
import RangeInput from "../Inputs/RangeInput";
import TypeInput from "../Inputs/TypeInput";
import DateInput from "../Inputs/DateInput";

// Import React Icons
import { FaCheck, FaXmark } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiDelete } from "react-icons/fi";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import MinMaxInput from "../Inputs/MinMaxInput";
import { useSearchParams } from "react-router-dom";

const ButtonDropdown = ({}) => {
  const filterBtnContRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [ageRange, setAgeRange] = useState([20, 60]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const citiesName = [...cities.map((city) => city.name).sort()];
  const [filterQuery, setFilterQuery] = useState({});

  // console.log(filterQuery);

  const setAgentsFilterQueryHandler = (key, value) => {
    if (value.length > 0) {
      setFilterQuery({ ...filterQuery, [key]: value });
    } else {
      setFilterQuery((prvQue) => {
        const newQue = { ...prvQue };
        delete newQue[key];
        return newQue;
      });
    }
  };

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
        <div className="flex flex-col pt-[1.6rem] pb-[1rem]">
          {/* Dropdown Header */}
          <div className="flex items-center justify-between mx-[1rem] px-[0.6rem] pb-[1.2rem] border-b-[0.2rem] border-neutral-200">
            <h5 className="text-[2rem] leading-[2rem] font-bold">
              Filter Agent's
            </h5>

            <button
              onClick={() => setIsOpenDropdown(false)}
              className="px-[0.1rem] text-[1.8rem] text-white bg-theme-blue shadow-md rounded-md border-[0.2rem] border-theme-blue"
            >
              <FaXmark />
            </button>
          </div>

          {/* Dropdown Inputs */}
          <div className="w-full max-h-[30rem] grid grid-cols-2 gap-[1.5rem] px-[1.2rem] py-[1.2rem] overflow-auto scrollbar-dropdown-dark">
            {/* Filter by Name */}
            <TypeInput
              inputFor="name"
              inputType="text"
              labelText="By Name"
              autoComplete="off"
              placeholder="eg. Ahmed Bilal"
              labelStyle="inputLabels"
              inputStyle="inputFields"
              spaceBetween="space-y-[0.6rem]"
              setQueryHanlder={setAgentsFilterQueryHandler}
            />

            {/* Filter by Email Address */}
            <TypeInput
              inputFor="email"
              inputType="text"
              labelText="By Email Address"
              autoComplete="off"
              placeholder="eg. abc@example.com"
              labelStyle="inputLabels"
              inputStyle="inputFields"
              spaceBetween="space-y-[0.6rem]"
              setQueryHanlder={setAgentsFilterQueryHandler}
            />

            {/* Filter by Phone Number */}
            <TypeInput
              inputFor="mobileNumber"
              inputType="number"
              labelText="By Mobile Number"
              autoComplete="off"
              placeholder="eg. 03xxxxxxxxx"
              labelStyle="inputLabels"
              inputStyle="inputFields numberInput"
              spaceBetween="space-y-[0.6rem]"
              setQueryHanlder={setAgentsFilterQueryHandler}
            />

            {/* Filter by CNIC Number */}
            <TypeInput
              inputFor="cnicNumber"
              inputType="number"
              labelText="By CNIC Number"
              autoComplete="off"
              placeholder="eg. 42101xxxxxxxx"
              labelStyle="inputLabels"
              inputStyle="inputFields numberInput"
              spaceBetween="space-y-[0.6rem]"
              setQueryHanlder={setAgentsFilterQueryHandler}
            />

            {/* Filter by Age */}
            <RangeInput
              minValue={20}
              maxValue={60}
              range={ageRange}
              setRange={setAgeRange}
              labelText="By Age"
              spaceBetween="space-y-[0.3rem]"
            />

            {/* Filter by Joining Date */}
            <DateInput
              inputFor="joiningDate"
              inputType="month"
              labelText="By Joining Date"
              labelStyle="inputLabels"
              inputStyle="inputFields"
              spaceBetween="space-y-[0.6rem]"
            />

            {/* Filter by Operting City */}
            <SearchSelection
              inputFor="operatingCity"
              labelText="By Operating City"
              placeholderText="Select a City"
              noOptionMessage="No City Found."
              optionsData={citiesName}
              selectedValue={selectedCity}
              setSelectedValue={setSelectedCity}
              labelStyle="inputLabels"
              inputStyle="inputFields"
              spaceBetween="space-y-[0.6rem]"
            />

            {/* By Experience Badge */}
            <SimpleSelection
              labelText="By Experience Badge"
              placeholderText="Select a Badge"
              optionsData={["Junior", "Mid-Level", "Senior", "Expert"]}
              selectedValue={selectedBadge}
              setSelectedValue={setSelectedBadge}
              labelStyle="inputLabels"
              inputStyle="inputFields"
              spaceBetween="space-y-[0.6rem]"
            />

            {/* By Status */}
            <SimpleSelection
              labelText="By Status"
              placeholderText="Select a Status"
              optionsData={["Active", "Not Active"]}
              selectedValue={selectedStatus}
              setSelectedValue={setSelectedStatus}
              labelStyle="inputLabels"
              inputStyle="inputFields"
              spaceBetween="space-y-[0.6rem]"
            />

            {/* By Success Deals */}
            <MinMaxInput
              inputFor="SuccessDeals"
              inputTag="Deal"
              labelText="By Success Deals"
              labelStyle="inputLabels"
              inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
              padMinMax={["10rem", "10.4rem"]}
              spaceBetween="space-y-[0.6rem]"
            />

            {/* By Total Earned */}
            <MinMaxInput
              inputFor="TotalEarn"
              inputTag="PKR"
              labelText="By Total Earned"
              labelStyle="inputLabels"
              inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
              padMinMax={["9.6rem", "10rem"]}
              spaceBetween="space-y-[0.6rem]"
            />

            {/* By Highest Earned */}
            <MinMaxInput
              inputFor="HighestEarn"
              inputTag="PKR"
              labelText="By Highest Earned"
              labelStyle="inputLabels"
              inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
              padMinMax={["9.6rem", "10rem"]}
              spaceBetween="space-y-[0.6rem]"
            />
          </div>

          {/* Dropdown Action Button */}
          <div className="flex items-center justify-end gap-[1.5rem] mx-[1rem] px-[0.6rem] pt-[1.2rem] pb-[0.6rem] border-t-[0.2rem] border-neutral-200">
            <button
              onClick={() => setIsOpenDropdown(false)}
              className="text-[1.6rem] leading-[1.6rem] font-bold text-neutral-800 text-center px-[1rem] py-[0.8rem] rounded-full border-[0.2rem] border-neutral-800 whitespace-nowrap hover:bg-neutral-800 hover:text-white transition-all"
            >
              Cancel
            </button>

            <button className="text-[1.6rem] leading-[1.6rem] font-semibold bg-theme-blue text-white text-center px-[1.5rem] py-[0.8rem] rounded-full border-[0.2rem] border-theme-blue whitespace-nowrap active:scale-[0.98] transition-all">
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDropdown;
