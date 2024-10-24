import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

// Import Component
import AgentFilterFields from "../Fieldsets/AgentFilterFields";
import PropertyFilterFields from "../Fieldsets/PropertyFilterFields";
import ClientFilterFields from "../Fieldsets/ClientFilterFields";
import UserFilterFields from "../Fieldsets/UserFilterFields";

const FilterDropdown = ({ to }) => {
  const routeLocation = useLocation().pathname.split("/")[2];
  const filterBtnContRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    if (routeLocation === "agents") {
      setFilterQuery({
        idCode: searchParams.get("idCode") || "",
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
    } else if (routeLocation === "properties") {
      setFilterQuery({
        idCode: searchParams.get("idCode") || "",
        purpose: searchParams.get("purpose") || "",
        category: searchParams.get("category") || "",
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        status: searchParams.get("status") || "",
      });
    }
  }, [searchParams, routeLocation]);

  const setFilterQueryHandler = (key, value) => {
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

  // Apply Filter Queries in Search Params
  const applyFilterQueryHandler = () => {
    const filterValues = Object.entries(filterQuery)
      .filter((objProps) => objProps[1] !== "")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    setSearchParams(filterValues);
    setIsOpenDropdown(false);
  };

  // Clear Filter Queries in Search Params
  const clearFilterQueryHandler = () => {
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
        <HiMiniAdjustmentsHorizontal size="1.6rem" />
        <span>Filter By</span>
      </button>

      {/* Filter Dropdown */}
      <div
        className={`min-w-[42rem] w-full bg-neutral-50 text-theme-blue absolute top-[-0.5rem] right-0 rounded-xl shadow-lg shadow-[#00000040] border-neutral-300 border-[0.2rem] transition-all duration-300 ${
          isOpenDropdown ? "translate-x-[0%]" : "translate-x-[115%]"
        }`}
      >
        <div className="w-full flex flex-col">
          {/* Dropdown Header */}
          <div className="h-[5rem] flex items-center justify-between mx-[1rem] px-[0.6rem] border-b-[0.2rem] border-neutral-200">
            <h5 className="text-[2rem] leading-[2rem] font-bold">
              Filter {to}
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
            {to === "Agents" ? (
              <AgentFilterFields
                state={filterQuery}
                setStateHandler={setFilterQueryHandler}
              />
            ) : to === "Properties" ? (
              <PropertyFilterFields
                state={filterQuery}
                setStateHandler={setFilterQueryHandler}
              />
            ) : to === "Clients" ? (
              <ClientFilterFields
                state={filterQuery}
                setStateHandler={setFilterQueryHandler}
              />
            ) : to === "Users" ? (
              <UserFilterFields
                state={filterQuery}
                setStateHandler={setFilterQueryHandler}
              />
            ) : (
              ""
            )}
          </div>

          {/* Dropdown Action Button */}
          <div className="h-[5.4rem] flex items-center justify-end gap-[1.2rem] mx-[1rem] px-[0.6rem] border-t-[0.2rem] border-neutral-200">
            <button
              onClick={() => setIsOpenDropdown(false)}
              className="text-[1.6rem] leading-[1.6rem] font-bold text-neutral-800 text-center px-[1.5rem] py-[0.6rem] rounded-full border-[0.2rem] border-neutral-800 whitespace-nowrap hover:bg-neutral-800 hover:text-white transition-all"
            >
              Close
            </button>

            <button
              onClick={() => applyFilterQueryHandler()}
              className="text-[1.6rem] leading-[1.6rem] font-semibold bg-theme-blue text-white text-center px-[1.5rem] py-[0.6rem] rounded-full border-[0.2rem] border-theme-blue whitespace-nowrap active:scale-[0.98] transition-all"
            >
              Apply Filter
            </button>

            <button
              onClick={() => clearFilterQueryHandler()}
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

export default FilterDropdown;
