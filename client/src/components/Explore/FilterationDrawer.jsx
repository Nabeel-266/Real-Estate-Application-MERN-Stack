import { useEffect, useRef, useState } from "react";
import {
  cities,
  priceRanges,
  propertyCategories,
  propertyCommercialTypes,
  propertyPlotTypes,
  propertyResidentialTypes,
} from "../../lib/dummyData";

const FilterationDrawer = () => {
  const dropdownRef = useRef(null);
  const [isCitiesDropdownOpen, setIsCitiesDropdownOpen] = useState(false);
  const [isPurposeDropdownOpen, setIsPurposeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState(null);
  const [propertyPriceLabel, setPropertyPriceLabel] = useState("Any");
  const [filterQuery, setFilterQuery] = useState({
    city: "All",
    purpose: "Any",
    category: "Residential",
    type: "All",
    minPrice: "",
    maxPrice: "",
  });

  const { city, purpose, category, type } = filterQuery;

  console.log(filterQuery);

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCitiesDropdownOpen(false);
        setIsPurposeDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
        setIsTypeDropdownOpen(false);
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownRef]);

  // Set Select Property Type Options based on Property Category
  useEffect(() => {
    if (category === "Residential") {
      setPropertyTypes(propertyResidentialTypes.map((obj) => obj.value));
      setFilterQuery({ ...filterQuery, type: "All" });
    } else if (category === "Commercial") {
      setPropertyTypes(propertyCommercialTypes.map((obj) => obj.value));
      setFilterQuery({ ...filterQuery, type: "All" });
    } else {
      setPropertyTypes(propertyPlotTypes.map((obj) => obj.value));
      setFilterQuery({ ...filterQuery, type: "All" });
    }
  }, [category]);

  const selectCityHandler = (selectedCity) => {
    setFilterQuery({ ...filterQuery, city: selectedCity });
    setIsCitiesDropdownOpen(false);
  };

  const selectPurposeHandler = (selectedPurpose) => {
    setFilterQuery({ ...filterQuery, purpose: selectedPurpose });
    setIsPurposeDropdownOpen(false);
  };

  const selectCategoryHandler = (selectedCategory) => {
    setFilterQuery({ ...filterQuery, category: selectedCategory });
    setIsCategoryDropdownOpen(false);
  };

  const selectTypeHandler = (selectedType) => {
    setFilterQuery({ ...filterQuery, type: selectedType });
    setIsTypeDropdownOpen(false);
  };

  const selectPriceHandler = (value, label) => {
    setPropertyPriceLabel(label);

    if (label !== "Any") {
      const minPrice = +value.split("-")[0];
      const maxPrice = +value.split("-")[1];
      setFilterQuery({ ...filterQuery, minPrice, maxPrice });
    } else {
      setFilterQuery({ ...filterQuery, minPrice: "", maxPrice: "" });
    }
    setIsPriceDropdownOpen(false);
  };

  return (
    <aside className=" w-[35rem] min-w-[30rem] h-[calc(100dvh-6rem)] fixed z-[999] bottom-0 right-0 px-[1rem] shadow-neutral-300 shadow-xl border-l-[0.2rem] border-neutral-100">
      {/* Filteration Drawer Header */}
      <div className="px-[0.5rem] pt-[2rem] pb-[1rem] border-b-[0.1rem] border-neutral-200 text-theme-blue">
        <h2 className="text-[2.2rem] leading-[2.2rem] font-semibold">
          Filter Results
        </h2>
      </div>

      {/* Filteration Drawer Body */}
      <div className="w-full flex flex-col gap-[1.5rem] py-[1.5rem]">
        {/* For City */}
        <div className="cityField relative z-[5]">
          <input
            type="text"
            name="city"
            id="city"
            readOnly={true}
            value={city}
            onClick={() => setIsCitiesDropdownOpen(true)}
            className="w-full border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[7.5rem] py-[0.8rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/city"
          />

          <label
            htmlFor="city"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/city:text-white peer-focus/city:bg-theme-blue"
          >
            City
          </label>

          {/* Cities Dropdown */}
          {isCitiesDropdownOpen && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select City
                </h6>
                {["All", ...cities.sort()].map((city, index) => (
                  <li
                    key={index}
                    onClick={() => selectCityHandler(city)}
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Purpose */}
        <div className="purposeField relative z-[4]">
          <input
            type="text"
            name="purpose"
            id="purpose"
            readOnly={true}
            value={purpose}
            onClick={() => setIsPurposeDropdownOpen(true)}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[11rem] py-[0.8rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/purpose"
          />

          <label
            htmlFor="purpose"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/purpose:text-white peer-focus/purpose:bg-theme-blue"
          >
            Purpose
          </label>

          {/* Property Purpose Dropdown */}
          {isPurposeDropdownOpen && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select Purpose
                </h6>
                {["Any", "For Sale", "For Rental"].map((value, index) => (
                  <li
                    key={index}
                    onClick={() => selectPurposeHandler(value)}
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Category */}
        <div className="categoryField relative z-[3]">
          <input
            type="text"
            name="category"
            id="category"
            readOnly={true}
            value={category}
            onClick={() => setIsCategoryDropdownOpen(true)}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[12rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/category"
          />

          <label
            htmlFor="category"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/category:text-white peer-focus/category:bg-theme-blue"
          >
            Category
          </label>

          {/* Property Category Dropdown */}
          {isCategoryDropdownOpen && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select Category
                </h6>
                {propertyCategories.map((value, index) => (
                  <li
                    key={index}
                    onClick={() => selectCategoryHandler(value)}
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Type */}
        <div className="typeField relative z-[2]">
          <input
            type="text"
            name="type"
            id="type"
            readOnly={true}
            value={type}
            onClick={() => setIsTypeDropdownOpen(true)}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[8.2rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/Type"
          />

          <label
            htmlFor="type"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/Type:text-white peer-focus/Type:bg-theme-blue"
          >
            Type
          </label>

          {/* Property Types Dropdown */}
          {isTypeDropdownOpen && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[19rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select Type
                </h6>
                {["All", ...propertyTypes].map((value, index) => (
                  <li
                    key={index}
                    onClick={() => selectTypeHandler(value)}
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Price */}
        <div className="priceField relative z-[1]">
          <input
            type="text"
            name="price"
            id="price"
            readOnly={true}
            value={propertyPriceLabel}
            onClick={() => setIsPriceDropdownOpen(true)}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[8.2rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/price"
          />

          <label
            htmlFor="price"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/price:text-white peer-focus/price:bg-theme-blue"
          >
            Price
          </label>

          {/* Property Price Dropdown */}
          {isPriceDropdownOpen && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[19rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select Price
                </h6>
                {priceRanges?.map(({ value, label }, index) => (
                  <li
                    key={index}
                    onClick={() => selectPriceHandler(value, label)}
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterationDrawer;
