import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cities } from "../../../lib/dummyData";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

// Import Component
import RangeInput from "../Inputs/RangeInput";
import TypeInput from "../Inputs/TypeInput";
import DateInput from "../Inputs/DateInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import MinMaxInput from "../Inputs/MinMaxInput";

const ButtonDropdown = ({}) => {
  const filterBtnContRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const citiesName = [...cities.map((city) => city.name).sort()];
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    setFilterQuery({
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      mobileNumber: searchParams.get("mobileNumber") || "",
      cnicNumber: searchParams.get("cnicNumber") || "",
      minAge: searchParams.get("minAge") || "",
      maxAge: searchParams.get("maxAge") || "",
      joiningDate: searchParams.get("joiningDate") || "",
      operatingCity: searchParams.get("operatingCity") || "",
      experienceBadge: searchParams.get("experienceBadge") || "",
      status: searchParams.get("status") || "",
      minSuccessDeals: searchParams.get("minSuccessDeals") || "",
      maxSuccessDeals: searchParams.get("maxSuccessDeals") || "",
      minTotalEarn: searchParams.get("minTotalEarn") || "",
      maxTotalEarn: searchParams.get("maxTotalEarn") || "",
      minHighestEarn: searchParams.get("minHighestEarn") || "",
      maxHighestEarn: searchParams.get("maxHighestEarn") || "",
    });
  }, [searchParams]);

  const setAgentsFilterQueryHandler = (key, value) => {
    if (value) {
      setFilterQuery({ ...filterQuery, [key]: value });
    } else {
      setFilterQuery((prvQue) => {
        const newQue = { ...prvQue };
        delete newQue[key];
        return newQue;
      });
    }
  };

  // Apply Agents Filter Queries in Search Params
  const applyAgentsFilterQueryHandler = () => {
    const filterValues = Object.entries(filterQuery)
      .filter((objProps) => objProps[1] !== "")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    setSearchParams(filterValues);
    setIsOpenDropdown(false);
  };

  // Clear Agents Filter Queries in Search Params
  const clearAgentsFilterQueryHandler = () => {
    setSearchParams({});
    setIsOpenDropdown(false);
  };

  return (
    <div ref={filterBtnContRef} className="space-y-[0.5rem]">
      {/* Filter Dropdown Button */}
      <button
        onClick={() => setIsOpenDropdown((prevState) => !prevState)}
        className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[1rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-lg border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all"
      >
        <HiMiniAdjustmentsHorizontal size="1.8rem" />
        <span>Filter By</span>
      </button>

      {/* Filter Dropdown */}
      <div
        className={`min-w-[42rem] w-full bg-neutral-50 text-theme-blue absolute top-0 right-0 rounded-l-lg shadow-xl shadow-[#00000040] ring-2 ring-black ring-opacity-5 transition-all duration-300 ${
          isOpenDropdown
            ? "translate-y-[-1.5%] opacity-100"
            : "translate-y-[-115%] opacity-0"
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
              inputFor={["name", "byName"]}
              inputType="text"
              labelText="By Name"
              autoComplete="off"
              placeholder="eg. Ahmed Bilal"
              labelStyle="inputLabels"
              inputStyle="inputFields"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* Filter by Email Address */}
            <TypeInput
              inputFor={["email", "byEmail"]}
              inputType="text"
              labelText="By Email Address"
              autoComplete="off"
              placeholder="eg. abc@example.com"
              labelStyle="inputLabels"
              inputStyle="inputFields"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* Filter by Phone Number */}
            <TypeInput
              inputFor={["mobileNumber", "byMobileNumber"]}
              inputType="number"
              labelText="By Mobile Number"
              autoComplete="off"
              placeholder="eg. 03xxxxxxxxx"
              labelStyle="inputLabels"
              inputStyle="inputFields numberInput"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* Filter by CNIC Number */}
            <TypeInput
              inputFor={["cnicNumber", "byCNICNumber"]}
              inputType="number"
              labelText="By CNIC Number"
              autoComplete="off"
              placeholder="eg. 42101xxxxxxxx"
              labelStyle="inputLabels"
              inputStyle="inputFields numberInput"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* Filter by Age */}
            <RangeInput
              inputFor="Age"
              minValue={20}
              maxValue={60}
              labelText="By Age"
              contStyle="space-y-[0.3rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* Filter by Joining Date */}
            <DateInput
              inputFor={["joiningDate", "byJoiningDate"]}
              inputType="month"
              labelText="By Joining Month"
              labelStyle="inputLabels"
              inputStyle="inputFields"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* Filter by Operting City */}
            <SearchSelection
              selectFor={["operatingCity", "byOperatingCity"]}
              labelText="By Operating City"
              placeholderText="Select a City"
              noOptionMessage="No City Found."
              optionsData={citiesName}
              labelStyle="inputLabels"
              inputStyle="inputFields"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHandler={setAgentsFilterQueryHandler}
            />

            {/* By Experience Badge */}
            <SimpleSelection
              selectFor="experienceBadge"
              labelText="By Experience Badge"
              placeholderText="Select a Badge"
              optionsData={["Junior", "Mid-Level", "Senior", "Expert"]}
              labelStyle="inputLabels"
              inputStyle="inputFields"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHanlder={setAgentsFilterQueryHandler}
            />

            {/* By Status */}
            <SimpleSelection
              selectFor="status"
              labelText="By Status"
              placeholderText="Select a Status"
              optionsData={["Active", "Not Active"]}
              labelStyle="inputLabels"
              inputStyle="inputFields"
              contStyle="space-y-[0.6rem]"
              state={filterQuery}
              setStateHanlder={setAgentsFilterQueryHandler}
            />

            {/* By Success Deals */}
            <MinMaxInput
              inputFor="SuccessDeals"
              inputTag="Deal"
              labelText="By Success Deals"
              labelStyle="inputLabels"
              inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
              padMinMax={["10rem", "10.4rem"]}
              contStyle="space-y-[0.6rem]"
              filterQuery={filterQuery}
              setQueryHanlder={setAgentsFilterQueryHandler}
            />

            {/* By Total Earned */}
            <MinMaxInput
              inputFor="TotalEarn"
              inputTag="PKR"
              labelText="By Total Earned"
              labelStyle="inputLabels"
              inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
              padMinMax={["9.6rem", "10rem"]}
              contStyle="space-y-[0.6rem]"
              filterQuery={filterQuery}
              setQueryHanlder={setAgentsFilterQueryHandler}
            />

            {/* By Highest Earned */}
            <MinMaxInput
              inputFor="HighestEarn"
              inputTag="PKR"
              labelText="By Highest Earned"
              labelStyle="inputLabels"
              inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
              padMinMax={["9.6rem", "10rem"]}
              contStyle="space-y-[0.6rem]"
              filterQuery={filterQuery}
              setQueryHanlder={setAgentsFilterQueryHandler}
            />
          </div>

          {/* Dropdown Action Button */}
          <div className="flex items-center justify-end gap-[1.2rem] mx-[1rem] px-[0.6rem] pt-[1.2rem] pb-[0.6rem] border-t-[0.2rem] border-neutral-200">
            <button
              onClick={() => setIsOpenDropdown(false)}
              className="text-[1.6rem] leading-[1.6rem] font-bold text-neutral-800 text-center px-[1.5rem] py-[0.6rem] rounded-full border-[0.2rem] border-neutral-800 whitespace-nowrap hover:bg-neutral-800 hover:text-white transition-all"
            >
              Close
            </button>

            <button
              onClick={() => applyAgentsFilterQueryHandler()}
              className="text-[1.6rem] leading-[1.6rem] font-semibold bg-theme-blue text-white text-center px-[1.5rem] py-[0.6rem] rounded-full border-[0.2rem] border-theme-blue whitespace-nowrap active:scale-[0.98] transition-all"
            >
              Apply Filter
            </button>

            <button
              onClick={() => clearAgentsFilterQueryHandler()}
              className="text-[1.6rem] leading-[1.6rem] font-semibold bg-transparent text-theme-blue text-center px-[1.5rem] py-[0.6rem] rounded-full border-[0.2rem] border-theme-blue whitespace-nowrap active:scale-[0.98] transition-all"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDropdown;
