import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  bedrooms,
  cities,
  propertyCategories,
  propertyCommercialTypes,
  propertyPlotTypes,
  propertyResidentialTypes,
} from "../../lib/dummyData";

// Import React Icons
import { IoSearch } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const FilterationDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const dropdownRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState({
    cities: false,
    purposes: false,
    categories: false,
    types: false,
    bedrooms: false,
    sortOrders: false,
  });
  const [propertyTypes, setPropertyTypes] = useState(null);
  const [filterQuery, setFilterQuery] = useState({
    city: searchParams.get("city") || "All",
    purpose: searchParams.get("purpose") || "Any",
    category: searchParams.get("category") || "All",
    type: searchParams.get("type") || "All",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "Any",
    orderBy: searchParams.get("orderBy") || "1",
  });
  const {
    city,
    purpose,
    category,
    type,
    minPrice,
    maxPrice,
    bedroom,
    orderBy,
  } = filterQuery;

  // console.log(filterQuery);

  // Change Property Type Options based on Property Category
  useEffect(() => {
    let propertyType;

    if (category === searchParams.get("category")) {
      propertyType = searchParams.get("type");
    } else {
      propertyType = "All";
    }

    if (category === "Residential") {
      setPropertyTypes(propertyResidentialTypes.map((obj) => obj.value));
      setFilterQuery({
        ...filterQuery,
        type: propertyType,
        bedroom: searchParams.get("bedroom") || "Any",
      });
    } else if (category === "Commercial") {
      setPropertyTypes(propertyCommercialTypes.map((obj) => obj.value));
      setFilterQuery({ ...filterQuery, type: propertyType, bedroom: "" });
    } else if (category === "Plot") {
      setPropertyTypes(propertyPlotTypes.map((obj) => obj.value));
      setFilterQuery({ ...filterQuery, type: propertyType, bedroom: "" });
    } else {
      setFilterQuery({ ...filterQuery, type: "", bedroom: "" });
    }
  }, [category]);

  // Dropdowns Toggle Handler
  const toggleDropdown = (dropdownName) => {
    if (typeof dropdownName === "string") {
      setDropdownOpen((prevState) => ({
        ...prevState,
        [dropdownName]: !prevState[dropdownName],
      }));
    } else {
      dropdownName.forEach((name) => {
        setDropdownOpen((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      });
    }
  };

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(Object.keys(dropdownOpen));
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownRef]);

  // Select Filter Options Handler
  const selectHandler = (selectedKey, selectedValue, closeDropdownValue) => {
    setFilterQuery({ ...filterQuery, [selectedKey]: selectedValue });
    toggleDropdown(closeDropdownValue);
  };

  // Change Price Handler
  const changePriceHandler = (priceProp, value) => {
    if (priceProp === "minPrice") {
      value < "1"
        ? setFilterQuery({ ...filterQuery, minPrice: "" })
        : setFilterQuery({ ...filterQuery, minPrice: +value });
    } else {
      value < "1"
        ? setFilterQuery({ ...filterQuery, maxPrice: "" })
        : setFilterQuery({ ...filterQuery, maxPrice: +value });
    }
  };

  // Set Filter Queries in Search Params
  const setSearchFilterQueryHandler = () => {
    const filterResultValues = Object.entries(filterQuery)
      .filter(
        (objProps) =>
          objProps[1] !== "" && objProps[1] !== "Any" && objProps[1] !== "All"
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    setSearchParams(filterResultValues);
    setIsDrawerOpen(false);
  };

  return (
    <aside
      className={`w-[20%] min-w-[33rem] h-[calc(100dvh-6rem)] fixed z-[99] bottom-0 right-0 px-[1rem] bg-neutral-50 shadow-xl shadow-[#00000080] ring-2 ring-black ring-opacity-5 border-l-[0.2rem] border-neutral-100 ${
        isDrawerOpen ? "translate-x-[0%]" : "translate-x-[105%]"
      } transition-all duration-200`}
    >
      {/* Filteration Drawer Header */}
      <div className="flex items-center justify-between px-[0.5rem] pt-[2rem] pb-[0.6rem] border-b-[0.1rem] border-neutral-200 text-theme-blue">
        <h2 className="text-[2.2rem] leading-[2.2rem] font-semibold">
          Filter Results
        </h2>
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="text-[2.55rem] mb-[0.4rem]"
        >
          <MdCancel />
        </button>
      </div>

      {/* Filteration Drawer Body */}
      <div className="w-full flex flex-col gap-[1.5rem] py-[1.5rem]">
        {/* For City */}
        <div className="cityField relative">
          <input
            type="text"
            name="city"
            id="city"
            readOnly={true}
            value={city}
            onClick={() => toggleDropdown("cities")}
            className="w-full border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[7.5rem] py-[0.8rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/city"
          />

          <label
            htmlFor="city"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/city:text-white peer-focus/city:bg-theme-blue"
          >
            City
          </label>

          {/* Cities Dropdown */}
          {dropdownOpen.cities && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select City
                </h6>
                {["All", ...cities.map((city) => city.name).sort()].map(
                  (city, index) => (
                    <li
                      key={index}
                      onClick={() => selectHandler("city", city, "cities")}
                      className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] cursor-pointer hover:bg-theme-blue hover:text-white transition-all"
                    >
                      {city}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        {/* For Purpose */}
        <div className="purposeField relative">
          <input
            type="text"
            name="purpose"
            id="purpose"
            readOnly={true}
            value={
              purpose === "Sell"
                ? "For Sale"
                : purpose === "Rent"
                ? "For Rental"
                : purpose
            }
            onClick={() => toggleDropdown("purposes")}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[11rem] py-[0.8rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/purpose"
          />

          <label
            htmlFor="purpose"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/purpose:text-white peer-focus/purpose:bg-theme-blue"
          >
            Purpose
          </label>

          {/* Property Purpose Dropdown */}
          {dropdownOpen.purposes && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select Purpose
                </h6>
                {["Any", "Sell", "Rent"].map((value, index) => (
                  <li
                    key={index}
                    onClick={() => selectHandler("purpose", value, "purposes")}
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] cursor-pointer hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {value === "Sell"
                      ? "For Sale"
                      : value === "Rent"
                      ? "For Rental"
                      : value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Category */}
        <div className="categoryField relative">
          <input
            type="text"
            name="category"
            id="category"
            readOnly={true}
            value={category}
            onClick={() => toggleDropdown("categories")}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[12rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/category"
          />

          <label
            htmlFor="category"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/category:text-white peer-focus/category:bg-theme-blue"
          >
            Category
          </label>

          {/* Property Category Dropdown */}
          {dropdownOpen.categories && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
            >
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                  Select Category
                </h6>
                {["All", ...propertyCategories].map((value, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      selectHandler("category", value, "categories")
                    }
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] cursor-pointer hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Type */}
        {category !== "All" && (
          <div className="typeField relative">
            <input
              type="text"
              name="type"
              id="type"
              readOnly={true}
              value={type || "All"}
              onClick={() => toggleDropdown("types")}
              className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[8.2rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/Type"
            />

            <label
              htmlFor="type"
              className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/Type:text-white peer-focus/Type:bg-theme-blue"
            >
              Type
            </label>

            {/* Property Types Dropdown */}
            {dropdownOpen.types && (
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
                      onClick={() => selectHandler("type", value, "types")}
                      className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] cursor-pointer hover:bg-theme-blue hover:text-white transition-all"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* For Min Price */}
        <div className="minPriceField relative">
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={minPrice}
            onChange={(e) => changePriceHandler("minPrice", e.target.value)}
            placeholder="Lowest Price"
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[12.5rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/price numberInput placeholder:text-neutral-800 focus:placeholder-transparent"
          />

          <label
            htmlFor="minPrice"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/price:text-white peer-focus/price:bg-theme-blue"
          >
            Min Price
          </label>

          {/* Property Price Dropdown */}
          {/* {dropdownOpen.prices && (
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
          )} */}
        </div>

        {/* For Max Price */}
        <div className="maxPriceField relative">
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => changePriceHandler("maxPrice", e.target.value)}
            placeholder="Highest Price"
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[13rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/price numberInput placeholder:text-neutral-800 focus:placeholder-transparent"
          />

          <label
            htmlFor="maxPrice"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/price:text-white peer-focus/price:bg-theme-blue"
          >
            Max Price
          </label>
        </div>

        {/* For Bedroom */}
        {category === "Residential" && (
          <div className="bedroomField relative">
            <input
              type="text"
              name="bedroom"
              id="bedroom"
              readOnly={true}
              value={bedroom}
              onClick={() => toggleDropdown("bedrooms")}
              className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[12rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/bedroom"
            />

            <label
              htmlFor="bedroom"
              className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/bedroom:text-white peer-focus/bedroom:bg-theme-blue"
            >
              Bedroom
            </label>

            {/* Property Bedrooms Dropdown */}
            {dropdownOpen.bedrooms && (
              <div
                ref={dropdownRef}
                className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 bottom-[100%] left-0"
              >
                <ul className="w-full max-h-[16rem] overflow-auto scrollbar-slim-y ">
                  {["Any", ...bedrooms]?.map((value, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        selectHandler(
                          "bedroom",
                          value.split(" ")[0],
                          "bedrooms"
                        )
                      }
                      className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] cursor-pointer hover:bg-theme-blue hover:text-white transition-all"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* For Sort Orders */}
        <div className="sortOrderField relative">
          <input
            type="text"
            name="sortOrder"
            id="sortOrder"
            readOnly={true}
            value={
              orderBy === "2"
                ? "Price - Low to High"
                : orderBy === "3"
                ? "Price - High to Low"
                : "New Listing"
            }
            onClick={() => toggleDropdown("sortOrders")}
            className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-200 font-medium pl-[9rem] py-[1rem] text-[1.5rem] leading-[1.8rem] rounded-md cursor-pointer focus:border-theme-blue peer/orderBy"
          />

          <label
            htmlFor="sortOrder"
            className="absolute top-0 left-0 h-full flex items-center justify-center pl-[1.2rem] pr-[1.5rem] text-[1.6rem] font-medium tracking-wide text-neutral-700 bg-neutral-200 rounded-l-md rounded-r-full pointer-events-none peer-focus/orderBy:text-white peer-focus/orderBy:bg-theme-blue"
          >
            Order
          </label>

          {/* Property Sort Orders Dropdown */}
          {dropdownOpen.sortOrders && (
            <div
              ref={dropdownRef}
              className="w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 bottom-[100%] left-0"
            >
              <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[0.6rem]">
                Select Order
              </h6>
              <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                {["1", "2", "3"].map((value, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      selectHandler("orderBy", value, "sortOrders")
                    }
                    className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[0.8rem] cursor-pointer hover:bg-theme-blue hover:text-white transition-all"
                  >
                    {value === "2"
                      ? "Price - Low to High"
                      : value === "3"
                      ? "Price - High to Low"
                      : "New Listing"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* For Search Button */}
        <button
          onClick={setSearchFilterQueryHandler}
          className="w-full flex justify-center items-center gap-[0.6rem] py-[0.8rem] text-[1.8rem] leading-[1.8rem] font-semibold border-theme-blue border-[0.2rem] text-theme-blue rounded-full hover:bg-theme-blue hover:text-white transition-all active:scale-[0.98] mt-[0.5rem]"
        >
          <IoSearch className="text-[2.2rem]" />
          <span>Search Results</span>
        </button>
      </div>
    </aside>
  );
};

export default FilterationDrawer;
