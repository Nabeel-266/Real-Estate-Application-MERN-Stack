import React, { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import Flag from "react-world-flags";

import {
  propertyPurposes,
  propertyCategories,
  propertyResidentialTypes,
  propertyPlotTypes,
  propertyCommercialTypes,
  cities,
  count,
  propertyCondition,
  availabiltyDays,
} from "../constants/data";

// Import React Icons
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { FaXmark } from "react-icons/fa6";

// Import Assets
import AddPropertyBannerImage from "../assets/add-property-banner.png";

// Import Component
import AddPropertyLocationModal from "../components/AddProperty/AddPropertyLocation";
import AddPropertyFeaturesModal from "../components/AddProperty/AddPropertyFeatures";
import AddPropertyReview from "../components/AddProperty/AddPropertyReview";

const AddProperty = () => {
  const dropdownRef = useRef(null);
  const [isCitiesDropdownOpen, setIsCitiesDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [isAvailableOptionsOpen, setIsAvailableOptionsOpen] = useState(false);
  const [numericPrice, setNumericPrice] = useState("");
  const [sizeValue, setSizeValue] = useState(0);
  const [sizeUnit, setSizeUnit] = useState("Sq. Ft");
  const [contactNumInfo, setContactNumInfo] = useState({
    ISOCode: "PK",
    callingCode: "+92",
    callingNumber: "",
  });
  const { ISOCode, callingCode, callingNumber } = contactNumInfo;
  const [propertyTypeOptions, setPropertyTypeOptions] = useState(
    propertyResidentialTypes
  );
  const [propertyDetails, setPropertyDetails] = useState({});
  const {
    purpose,
    category,
    type,
    city,
    price,
    bedroom,
    bathroom,
    condition,
    features,
    images,
    contact,
    username,
    availability,
  } = propertyDetails;

  console.log(propertyDetails);

  const propertyFormDataChangeHandler = (action, key, value) => {
    if (action === "added") {
      setPropertyDetails({
        ...propertyDetails,
        [key]: value,
      });
    } else if (action === "deleted") {
      const updatedPropertyDetails = { ...propertyDetails };
      delete updatedPropertyDetails[key];
      setPropertyDetails(updatedPropertyDetails);
    }
  };

  // Set Property Form Initial Values
  useEffect(() => {
    // console.log("useEffect Run");
    if (category === "Plot") {
      setPropertyDetails({
        ...propertyDetails,
        type: "Residential Plot",
      });
      setPropertyTypeOptions(propertyPlotTypes);
      return;
    }

    if (category === "Commercial") {
      setPropertyDetails({
        ...propertyDetails,
        type: "Office",
      });
      setPropertyTypeOptions(propertyCommercialTypes);
      return;
    }

    setPropertyTypeOptions(propertyResidentialTypes);
    return setPropertyDetails({
      ...propertyDetails,
      purpose: "Sell",
      category: "Residential",
      type: "House",
    });
  }, [category]);

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCitiesDropdownOpen(false);
        setIsSizeDropdownOpen(false);
        setIsConditionDropdownOpen(false);
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownRef]);

  // City Change Handler
  const cityChangeHandler = (e) => {
    propertyFormDataChangeHandler("added", "city", e.target.innerText);
    setIsCitiesDropdownOpen(false);
  };

  // Price Input Value converted in Pakistani Rupees Conversion
  const convertPrice = (value) => {
    let number = parseFloat(value);
    if (isNaN(number)) return "";

    let formattedNumber = "";
    let unit = "";

    if (number >= 1e11) {
      formattedNumber = number / 1e11;
      unit = " Kharab";
    } else if (number >= 1e9) {
      formattedNumber = number / 1e9;
      unit = " Arab";
    } else if (number >= 1e7) {
      formattedNumber = number / 1e7;
      unit = " Crore";
    } else if (number >= 1e5) {
      formattedNumber = number / 1e5;
      unit = " Lac";
    } else {
      formattedNumber = number;
    }

    if (formattedNumber % 1 === 0) {
      return formattedNumber.toFixed(0) + unit;
    } else if ((formattedNumber * 10) % 1 === 0) {
      return formattedNumber.toFixed(1) + unit;
    } else {
      return formattedNumber.toFixed(2) + unit;
    }
  };

  // Price Change Handler
  const priceChangeHanlder = (e) => {
    let value = e.target.value;
    let number = parseFloat(value);

    if (number >= 1e15) {
      number = 1;
      value = number;
    }

    setNumericPrice(value);
    const formattedPrice = convertPrice(value);
    if (formattedPrice) {
      propertyFormDataChangeHandler("added", "price", formattedPrice);
    } else {
      propertyFormDataChangeHandler("deleted", "price");
    }
  };

  // Size Change Handler
  const sizeChangeHandler = (text, value) => {
    if (text === "sizeValue") {
      if (value >= 1e10) {
        setSizeValue(1);
        value = 1;
      } else {
        setSizeValue(value);
      }

      if (value >= 1) {
        propertyFormDataChangeHandler("added", "size", `${value} ${sizeUnit}`);
      } else {
        propertyFormDataChangeHandler("deleted", "size");
      }
    } else if (text === "sizeUnit") {
      setSizeUnit(value);

      if (sizeValue) {
        propertyFormDataChangeHandler("added", "size", `${sizeValue} ${value}`);
        setIsSizeDropdownOpen(false);
      }
    }
  };

  // Condition Change Handler
  const conditionChangeHandler = (e) => {
    propertyFormDataChangeHandler("added", "condition", e.target.innerText);
    setIsConditionDropdownOpen(false);
  };

  // Remove Property Features Handler
  const removePropertyFeaturesHandler = (el) => {
    if (features?.length > 1) {
      const updatedFeatures = features?.filter(
        (singleFeature) => singleFeature !== el
      );
      propertyFormDataChangeHandler("added", "features", updatedFeatures);
    } else {
      propertyFormDataChangeHandler("deleted", "features");
    }
  };

  // Description Change Handler
  const descriptionChangeHandler = (e) => {
    const descriptionText = e.target.value;

    if (descriptionText) {
      propertyFormDataChangeHandler("added", "description", descriptionText);
    } else {
      propertyFormDataChangeHandler("deleted", "description");
    }
  };

  // Images Change Handler
  const imagesChangeHandler = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);

      if (!propertyDetails.images) {
        propertyFormDataChangeHandler("added", "images", [imageURL]);
      } else {
        propertyFormDataChangeHandler("added", "images", [
          ...propertyDetails.images,
          imageURL,
        ]);
      }
    }
  };

  // Remove Image Handler
  const removeImageHandler = (e, imageURL) => {
    e.preventDefault();

    if (images.length > 1) {
      const updatedImages = images.filter((img) => img !== imageURL);
      propertyFormDataChangeHandler("added", "images", updatedImages);
    } else {
      propertyFormDataChangeHandler("deleted", "images");
    }
  };

  // Contact Number Change Handler
  const contactNumChangeHandler = (key, value) => {
    if (key === "code") {
      if (!callingNumber) {
        setContactNumInfo({
          ...contactNumInfo,
          ISOCode: value.ISOCode,
          callingCode: value.callingCode,
        });
        setIsCountryDropdownOpen(false);
      } else if (callingNumber) {
        propertyFormDataChangeHandler(
          "added",
          "contact",
          `${value.callingCode} ${callingNumber}`
        );
        setContactNumInfo({
          ...contactNumInfo,
          ISOCode: value.ISOCode,
          callingCode: value.callingCode,
        });
        setIsCountryDropdownOpen(false);
      }
    } else if (key === "number") {
      if (
        value.length > 10 ||
        value.length < 1 ||
        value.startsWith(0) ||
        value.includes(".")
      ) {
        setContactNumInfo({
          ...contactNumInfo,
          callingNumber: "",
        });
        propertyFormDataChangeHandler("deleted", "contact");
      } else if (value.length <= 10) {
        propertyFormDataChangeHandler(
          "added",
          "contact",
          `${callingCode} ${value}`
        );
        setContactNumInfo({
          ...contactNumInfo,
          callingNumber: value,
        });
      }
    }
  };

  // Username Change Handler
  const usernameChangeHandler = (e) => {
    const name = e.target.value.trim();
    if (name && name.includes(" ")) {
      const fullNameArray = name
        .split(" ")
        .filter((str) => str !== "")
        .map(
          (str) =>
            str.trim().charAt(0).toLocaleUpperCase() +
            str.trim().slice(1).toLocaleLowerCase()
        );

      const fullName = `${fullNameArray.join(" ")}`;
      propertyFormDataChangeHandler("added", "username", fullName.trim());
    } else {
      propertyFormDataChangeHandler("added", "username", name);
    }
  };

  // Toggle Availability Options Handler
  const toggleAvailabilityOptionsHandler = () => {
    setIsAvailableOptionsOpen(!isAvailableOptionsOpen);

    if (!isAvailableOptionsOpen) {
      propertyFormDataChangeHandler("added", "availability", ["Anyday"]);
    } else if (isAvailableOptionsOpen && propertyDetails.availability) {
      propertyFormDataChangeHandler("deleted", "availability");
    }
  };

  // Client Visit Availability Change Handler
  const availabilityChangeHandler = (e) => {
    const day = e.target.value;

    if (day === "Anyday") {
      propertyFormDataChangeHandler("added", "availability", [day]);
    } else {
      let updatedDays;
      if (availability?.includes(day)) {
        updatedDays = availability?.filter((d) => d !== day);
      } else {
        updatedDays = [...availability?.filter((d) => d !== "Anyday"), day];
      }

      if (updatedDays.length === 0) {
        updatedDays = ["Anyday"];
      }

      propertyFormDataChangeHandler("added", "availability", updatedDays);
    }
  };

  return (
    <div className="addPropertyCont w-full pt-[6rem]">
      <div className="addPropertyContWrapper mx-[3%] tabletSm:mx-[4%] py-[1rem]">
        {/* Add Property Banner Cont */}
        <section className="addPropertyBannerCont w-full h-[30rem] tabletLg:h-[33rem] laptopRg:h-[35rem] relative z-[1] pt-[5rem]">
          {/* Text Cont */}
          <div className="textCont w-full h-full flex flex-col justify-center gap-[1rem] px-[2.5rem] tabletLg:px-[3rem] laptopSm:px-[4rem] laptopRg:px-[5rem] bg-theme-blue bg-add-property-banner-image bg-cover bg-no-repeat bg-center rounded-3xl text-white">
            <h1 className="w-[65%] tabletSm:w-[70%] tabletLg:w-full text-[3.2rem] tabletLg:text-[3.5rem] leading-[4rem] font-bold ">
              Add Your Property Details
            </h1>
            <p className="w-[60%] tabletSm:w-[70%] tabletLg:w-full text-[2rem] leading-[2.5rem] font-medium">
              Get the best value for your property in a few steps.
            </p>
          </div>

          {/* Image Cont */}
          <div className="imageCont h-full absolute z-[10] right-0 bottom-0">
            <img
              src={AddPropertyBannerImage}
              alt="AddPropertyBanner"
              className="h-full object-cover"
            />
          </div>
        </section>

        {/* Add Property Content Cont */}
        <div className="addPropertyContentCont w-full px-[2%] tabletSm:px-[3%] laptopRg:px-[4%] py-[6rem] flex items-start justify-between">
          {/* Add Property Form Cont */}
          <div className="addPropertyFormCont w-[100%] laptopSm:w-[60%]">
            {/* Add Property Form */}
            <form className="addPropertyForm w-full flex flex-col gap-[5rem]">
              {/* Property Purpose */}
              <div className="purpose w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What do you want to do?
                </h4>

                {/* Inputs Cont */}
                <div className="inputsCont flex items-center gap-[2rem] select-none">
                  {propertyPurposes.map(({ value, iconImage }, index) => (
                    <div key={index} className="singleInput">
                      <label
                        htmlFor={value.toLocaleLowerCase()}
                        className={`propertyFormInputRadioLabels ${
                          purpose === value
                            ? "border-theme-yellow"
                            : "border-neutral-300"
                        }`}
                      >
                        <img src={iconImage} alt="icon" className="w-[2rem]" />
                        <span>{value}</span>
                      </label>
                      <input
                        type="radio"
                        name="purpose"
                        id={value.toLocaleLowerCase()}
                        value={value}
                        checked={value === purpose}
                        onChange={(e) =>
                          propertyFormDataChangeHandler(
                            "added",
                            e.target.name,
                            e.target.value
                          )
                        }
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Kind of Property */}
              <div className="kind w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What kind of property do you have?
                </h4>

                {/* Property Category Inputs */}
                <div className="propertyCategoryInputs max-w-fit flex items-center border-[0.2rem] border-neutral-300 rounded-lg overflow-hidden">
                  {propertyCategories.map((value, index) => (
                    <div
                      key={index}
                      className={`singleInput flex relative z-[1] cursor-pointer overflow-x-hidden before:content-[''] before:absolute before:z-[-1] before:w-full before:h-full before:bottom-0 before:left-0 before:bg-theme-blue before:transition-all before:duration-300 before:rounded-sm ${
                        category === value
                          ? "before:translate-x-[0%] text-theme-yellow"
                          : "before:translate-x-[-101%] text-neutral-700"
                      }`}
                    >
                      <label
                        htmlFor={value.toLocaleLowerCase()}
                        className="text-[1.6rem] leading-[1.6rem] font-semibold cursor-pointer px-[3rem] py-[1rem]"
                      >
                        {value}
                      </label>
                      <input
                        type="radio"
                        name="category"
                        id={value.toLocaleLowerCase()}
                        value={value}
                        checked={value === category}
                        onChange={(e) =>
                          propertyFormDataChangeHandler(
                            "added",
                            e.target.name,
                            e.target.value
                          )
                        }
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>

                {/* Property Type Inputs */}
                <div className="propertyType w-full laptopSm:w-[80%] flex flex-wrap items-center gap-[1.5rem] mt-[1rem]">
                  {propertyTypeOptions?.map(({ value, iconImage }, index) => (
                    <div key={index} className="singleInput select-none">
                      <label
                        htmlFor={value.toLocaleLowerCase()}
                        className={`propertyFormInputRadioLabels px-[1.5rem] ${
                          type === value
                            ? "border-theme-yellow"
                            : "border-neutral-300"
                        }`}
                      >
                        <img src={iconImage} alt="icon" className="w-[2rem]" />
                        <span>{value}</span>
                      </label>
                      <input
                        type="radio"
                        name="type"
                        id={value.toLocaleLowerCase()}
                        value={value}
                        checked={value === type}
                        onChange={(e) =>
                          propertyFormDataChangeHandler(
                            "added",
                            e.target.name,
                            e.target.value
                          )
                        }
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Property City */}
              <div className="city w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  Which city is your property in?
                </h4>

                {/* City Input Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] relative z-[3]">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={city}
                      readOnly={true}
                      autoComplete="off"
                      onClick={() =>
                        setIsCitiesDropdownOpen(!isCitiesDropdownOpen)
                      }
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium px-[4.5rem] py-[0.8rem] text-[1.5rem] rounded-md cursor-pointer focus:border-theme-blue peer/city"
                    />
                    <span className="text-[2rem] absolute top-0 left-0 h-full flex items-center justify-center px-[1.5rem] text-neutral-400 pointer-events-none peer-focus/city:text-theme-blue">
                      <IoSearch className="" />
                    </span>

                    {/* Cities Dropdown */}
                    {isCitiesDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="dropdownCities w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
                      >
                        <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                          <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                            Select City
                          </h6>
                          {cities.sort().map((city, index) => (
                            <li
                              key={index}
                              onClick={(e) => cityChangeHandler(e)}
                              className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[1rem] hover:bg-theme-blue hover:text-white transition-all"
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <p className="cityErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    City is required
                  </p>
                </div>
              </div>

              {/* Property Location */}
              <div className="location w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  Where is your exact property location?
                </h4>

                {/* Exact Location Button Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLocationModalOpen(true);
                    }}
                    disabled={city ? false : true}
                    className="flex items-center gap-[0.5rem] text-theme-blue border-[0.2rem] border-neutral-300 p-[1rem] rounded-lg hover:shadow-lg hover:shadow-neutral-200 hover:translate-y-[-0.1rem] disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <FaPlus className="text-[1.6rem] text-cyan-900 mb-[0.2rem]" />
                    <span className="text-[1.6rem] leading-[1.6rem] font-semibold">
                      Set Exact Location
                    </span>
                  </button>

                  <p className="areaErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    Location is required
                  </p>
                </div>
              </div>

              {/* Property Size */}
              <div className="size w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What is the size of your property?
                </h4>

                {/* Size Input Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] relative z-[2]">
                    <input
                      type="number"
                      name="size"
                      id="size"
                      value={sizeValue}
                      onChange={(e) =>
                        sizeChangeHandler("sizeValue", e.target.value)
                      }
                      placeholder="0"
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium pl-[5.5rem] pr-[11rem] py-[0.8rem] text-[1.5rem] rounded-md focus:border-theme-blue numberInput peer/size"
                    />
                    <span className="text-[2.2rem] font-semibold absolute top-0 left-0 h-full flex items-center justify-center px-[1.5rem] text-neutral-400 pointer-events-none peer-focus/size:text-theme-blue">
                      <BiArea />
                    </span>

                    <div
                      onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                      className="absolute top-0 right-0 h-full px-[2rem] flex items-center gap-[1rem] text-[1.5rem] font-medium text-neutral-700 cursor-pointer rounded-r-md select-none"
                    >
                      <span className="leading-[1.5rem]">
                        {sizeUnit || "Sq. Ft"}
                      </span>
                      <IoMdArrowDropdown
                        size={"1.8rem"}
                        className={`${
                          isSizeDropdownOpen ? "rotate-180" : "rotate-0"
                        } transition-all`}
                      />
                    </div>

                    {isSizeDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="dropdownSizeUnits py-[0.5rem] shadow-lg border-[0.2rem] bg-white  border-neutral-300 rounded-md absolute z-10 top-[110%] right-0"
                      >
                        <ul className="flex flex-col">
                          {[
                            "Sq. Ft",
                            "Sq. M",
                            "Sq. Yd",
                            "Marla",
                            "Kanal",
                            "Acre",
                          ].map((size, index) => (
                            <li
                              key={index}
                              onClick={(e) =>
                                sizeChangeHandler(
                                  "sizeUnit",
                                  e.target.innerText
                                )
                              }
                              className="min-w-[15rem] text-[1.4rem] leading-[1.4rem] font-medium text-neutral-700 px-[1rem] py-[1rem] hover:bg-theme-blue hover:text-white transition-all cursor-pointer"
                            >
                              {size}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <p className="sizeErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    Size is required
                  </p>
                </div>
              </div>

              {/* Property Price */}
              <div className="price w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What is the demanding price?
                </h4>

                {/* Price Input Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] relative z-[1]">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={numericPrice}
                      onChange={priceChangeHanlder}
                      placeholder="0"
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium pl-[6.5rem] pr-[2rem] py-[0.8rem] text-[1.5rem] rounded-md focus:border-theme-blue numberInput peer/price"
                    />
                    <span className="text-[1.5rem] font-semibold absolute top-0 left-0 h-full flex items-center justify-center px-[1.8rem] text-neutral-400 pointer-events-none peer-focus/price:text-theme-blue">
                      PKR
                    </span>
                  </div>

                  {price && (
                    <p className="cityErrorMsg text-[1.4rem] leading-[1.4rem] font-medium text-neutral-800">
                      PKR <span className="font-semibold">{price}</span>
                    </p>
                  )}

                  <p className="priceErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    Price is required
                  </p>
                </div>
              </div>

              {category === "Residential" && (
                <>
                  {/* Property Bedrooms */}
                  <div className="bedrooms w-full flex flex-col gap-[1.5rem]">
                    {/* Title */}
                    <h4 className="propertyFormInputTitles">
                      How many bedrooms does it have?
                    </h4>

                    {/* Property Bedroom Inputs */}
                    <div className="propertyBedroom w-full laptopSm:w-[80%] flex flex-wrap items-center gap-[1.5rem]">
                      {count?.map((value, index) => (
                        <div key={index} className="singleInput select-none">
                          <label
                            htmlFor={`Bedroom${value}`}
                            className={`propertyFormInputRadioLabels rounded-full px-[2rem] ${
                              bedroom === value
                                ? "border-theme-yellow"
                                : "border-neutral-300"
                            }`}
                          >
                            <span>{value}</span>
                          </label>
                          <input
                            type="radio"
                            name="bedroom"
                            id={`Bedroom${value}`}
                            value={value}
                            onChange={(e) =>
                              propertyFormDataChangeHandler(
                                "added",
                                e.target.name,
                                e.target.value
                              )
                            }
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="bedroomErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                      Bedroom count is required
                    </p>
                  </div>

                  {/* Property Bathrooms */}
                  <div className="bathrooms w-full flex flex-col gap-[1.5rem]">
                    {/* Title */}
                    <h4 className="propertyFormInputTitles">
                      How many bathrooms does it have?
                    </h4>

                    {/* Property Bathroom Inputs */}
                    <div className="propertyBatroom w-full laptopSm:w-[80%] flex flex-wrap items-center gap-[1.5rem]">
                      {count?.map((value, index) => (
                        <div key={index} className="singleInput select-none">
                          <label
                            htmlFor={`Bathroom${value}`}
                            className={`propertyFormInputRadioLabels rounded-full px-[2rem] ${
                              bathroom === value
                                ? "border-theme-yellow"
                                : "border-neutral-300"
                            }`}
                          >
                            <span>{value}</span>
                          </label>
                          <input
                            type="radio"
                            name="bathroom"
                            id={`Bathroom${value}`}
                            value={value}
                            onChange={(e) =>
                              propertyFormDataChangeHandler(
                                "added",
                                e.target.name,
                                e.target.value
                              )
                            }
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="bathroomErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                      Bathroom count is required
                    </p>
                  </div>
                </>
              )}

              {/* Property Condition */}
              <div className="condition w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What is the condition of your property?
                </h4>

                {/* Condition Input Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] relative z-[3]">
                    <input
                      type="text"
                      name="condition"
                      id="condition"
                      defaultValue={condition}
                      readOnly={true}
                      autoComplete="off"
                      placeholder="Select the condition"
                      onClick={() =>
                        setIsConditionDropdownOpen(!isConditionDropdownOpen)
                      }
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium pl-[1.5rem] pr-[4rem] py-[0.9rem] text-[1.4rem] rounded-md cursor-pointer focus:border-theme-blue"
                    />
                    <span className="text-[2rem] absolute top-0 right-0 h-full flex items-center justify-center px-[1.5rem] text-theme-blue pointer-events-none">
                      <IoMdArrowDropdown
                        className={`${
                          isConditionDropdownOpen ? "rotate-180" : "rotate-0"
                        } transition-all`}
                      />
                    </span>

                    {/* Condition Dropdown */}
                    {isConditionDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="dropdownCities w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
                      >
                        <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                          <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                            Select the condition
                          </h6>
                          {propertyCondition.map((condition, index) => (
                            <li
                              key={index}
                              onClick={conditionChangeHandler}
                              className="w-full text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[1rem] hover:bg-theme-blue hover:text-white transition-all"
                            >
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <p className="conditionErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    Condition is required
                  </p>
                </div>
              </div>

              {/* Property Features */}
              <div className="features w-full flex flex-col gap-[0.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What amenities are available?
                </h4>

                <p className="text-[1.4rem] text-neutral-600 font-medium">
                  Add additional features e.g balcony, utilities etc. (Optional)
                </p>

                {/* Add Features Button Cont */}
                <div className="w-full mt-[1rem]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFeaturesModalOpen(true);
                    }}
                    className="flex items-center gap-[0.5rem] text-theme-blue border-[0.2rem] border-neutral-300 p-[1rem] rounded-lg hover:shadow-lg hover:shadow-neutral-200 hover:translate-y-[-0.1rem] disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <FaPlus className="text-[1.6rem] text-cyan-900 mb-[0.2rem]" />
                    <span className="text-[1.6rem] leading-[1.6rem] font-semibold">
                      Add Features
                    </span>
                  </button>
                </div>

                {/* Dipslay Selected Features Cont */}
                <div
                  className={`w-full mt-[1.5rem] ${
                    features?.length ? "block" : "hidden"
                  }`}
                >
                  <ul className="w-full flex flex-wrap items-center gap-[1rem]">
                    {features?.map((el, index) => (
                      <li
                        key={index}
                        className="singleFeature text-[1.4rem] leading-[1.4rem] font-medium text-theme-blue p-[1rem] flex items-center gap-[1rem] bg-neutral-200 rounded-md whitespace-nowrap"
                      >
                        <span>{el}</span>
                        <span
                          onClick={() => removePropertyFeaturesHandler(el)}
                          className="cursor-pointer"
                        >
                          <FaXmark />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Property Description */}
              <div className="description w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  What do you like about your property?
                </h4>

                {/* Description Textarea Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <textarea
                    name="propertyDesc"
                    id="propertyDesc"
                    onChange={(e) => descriptionChangeHandler(e)}
                    placeholder="Describe your property in details"
                    className="w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] h-[11rem] max-h-[11rem] outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium px-[1rem] py-[1rem] text-[1.4rem] rounded-md scrollbar-slim-y focus:border-theme-blue"
                  ></textarea>
                </div>
              </div>

              {/* Property Images */}
              <div className="images w-full flex flex-col gap-[0.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  Upload images of your property
                </h4>

                <p className="text-[1.4rem] text-neutral-600 font-medium">
                  Properties with images of good quality
                </p>

                <p className="text-[1.4rem] text-neutral-600 font-medium">
                  Supported file formats: png, jpg, jpeg
                </p>

                {/* Upload Image Input Cont */}
                <div className="w-full space-y-[0.8rem] mt-[1.5rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem]">
                    <label
                      htmlFor="images"
                      className="w-full flex items-center justify-center gap-[0.8rem] outline-none border-[0.2rem] text-neutral-800 border-neutral-400 p-[1rem] text-[1.5rem] leading-[1.5rem] font-semibold rounded-md cursor-pointer hover:border-theme-blue"
                    >
                      <HiOutlineUpload size="2rem" />
                      <span>UPLOAD IMAGES</span>
                    </label>
                    <input
                      type="file"
                      name="images"
                      id="images"
                      accept=".jpg, .png, .jpeg"
                      // defaultValue={userImage}
                      onChange={imagesChangeHandler}
                      className="hidden"
                    />
                  </div>

                  <p className="conditionErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    Images is required
                  </p>
                </div>

                {/* Images Display Cont */}
                {images && (
                  <>
                    <div className="w-[70%] min-w-[50rem] grid grid-cols-3 gap-[1.5rem] mt-[1.5rem]">
                      {images?.map((imageURL, index) => (
                        // Each Image Cont
                        <div
                          key={index}
                          className="eachImageCont w-[100%] h-[11rem] relative rounded-xl overflow-hidden hover:shadow-lg transition-all"
                        >
                          <img
                            src={imageURL}
                            alt="PropertyPic"
                            className="object-cover size-full rounded-md"
                          />
                          <button
                            onClick={(e) => removeImageHandler(e, imageURL)}
                            className="absolute top-[0.8rem] right-[0.8rem] flex items-center justify-center p-[0.2rem] bg-white text-[1.5rem] text-neutral-800 rounded-full hover:shadow-lg hover:bg-theme-yellow transition-all"
                          >
                            <FaXmark />
                          </button>
                        </div>
                      ))}
                    </div>

                    <p className="text-[1.4rem] text-neutral-800 font-semibold mt-[1rem]">
                      Total Images : {images.length}
                    </p>
                  </>
                )}
              </div>

              {/* Property Contact Number */}
              <div className="contact w-full flex flex-col gap-[0.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  Tell us how to contact you
                </h4>

                <p className="text-[1.4rem] text-neutral-600 font-medium">
                  Select country calling code
                </p>

                <p className="text-[1.4rem] text-neutral-600 font-medium">
                  Enter 10 digit number except zero
                </p>

                {/* Contact Number Input Cont */}
                <div className="w-full space-y-[0.8rem] mt-[1.5rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] relative z-[4]">
                    <input
                      type="number"
                      name="contactNumber"
                      id="contactNumber"
                      value={callingNumber}
                      onChange={(e) =>
                        contactNumChangeHandler("number", e.target.value)
                      }
                      maxLength="10"
                      placeholder="1234567890"
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium pl-[13rem] pr-[2rem] py-[0.9rem] text-[1.6rem] tracking-wider rounded-md focus:border-theme-blue numberInput"
                    />

                    {/* Input Flag and Calling Code Display Area */}
                    <div
                      onClick={() =>
                        setIsCountryDropdownOpen(!isCountryDropdownOpen)
                      }
                      className="absolute top-[0.2rem] left-[0.2rem] bottom-[0.2rem] px-[1.4rem] flex items-center gap-[1rem] text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700 cursor-pointer select-none"
                    >
                      <span>
                        <Flag code={ISOCode} className="w-[2.5rem]" />
                      </span>
                      <IoMdArrowDropdown
                        size="1.8rem"
                        className={`${
                          isCountryDropdownOpen ? "rotate-180" : "rotate-0"
                        } transition-all`}
                      />
                      <span>{callingCode}</span>
                    </div>

                    {/* Country Dial Code Dropdown */}
                    {isCountryDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="dropdownCountry w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
                      >
                        <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                          <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                            Select Country
                          </h6>
                          {Object.entries(countries).map(
                            ([countryCode, countryData], index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  contactNumChangeHandler("code", {
                                    ISOCode: countryCode,
                                    callingCode: `+${countryData.phone[0]}`,
                                  });
                                }}
                                className="w-full flex items-center gap-[2rem] text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[1rem] hover:bg-theme-blue hover:text-white transition-all cursor-pointer"
                              >
                                <Flag
                                  code={countryCode}
                                  className="w-[2.4rem]"
                                />
                                <div className="flex-1 flex items-center justify-between">
                                  <span>{countryData.name}</span>
                                  <span className="font-semibold">
                                    +{countryData.phone[0]}
                                  </span>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <p className="contactErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    not a valid phone number
                  </p>
                </div>
              </div>

              {/* Property Owner Name */}
              <div className="name w-full flex flex-col gap-[1.5rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">What is your name?</h4>

                {/* Username Input Cont */}
                <div className="w-full space-y-[0.8rem]">
                  <div className="input w-full tabletSm:w-[70%] tabletSm:min-w-[50rem]">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={usernameChangeHandler}
                      placeholder="Enter your full name"
                      autoComplete="off"
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 font-medium px-[1.5rem] py-[1.1rem] text-[1.6rem] leading-[1.6rem] rounded-md focus:border-theme-blue"
                    />
                  </div>

                  {username && !username.includes(" ") && (
                    <p className="priceErrorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                      Please! enter your proper fullname with space separated
                    </p>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="availability w-full flex flex-col gap-[0.5rem]">
                {/* Title and Toggle */}
                <h4 className="propertyFormInputTitles w-full tabletSm:w-[70%] tabletSm:min-w-[50rem] flex items-center justify-between">
                  <span>Specify availability</span>

                  <label
                    htmlFor="AcceptConditions"
                    className="relative flex items-center h-[20px] w-[36px] cursor-pointer rounded-full bg-neutral-400 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-theme-blue"
                  >
                    <input
                      type="checkbox"
                      id="AcceptConditions"
                      onChange={toggleAvailabilityOptionsHandler}
                      className="peer sr-only"
                    />

                    <span className="absolute left-0 mx-[3px] size-[14px] rounded-full bg-white transition-all peer-checked:left-[45%]"></span>
                  </label>
                </h4>

                <p className="text-[1.4rem] text-neutral-600 font-medium">
                  Let us know when you are available for site visits (Optional)
                </p>

                {/* Availability Input Cont */}
                {isAvailableOptionsOpen && (
                  <div className="w-full flex flex-col gap-[0.5rem] py-[2.5rem]">
                    <h6 className="text-[1.6rem] text-neutral-700 font-semibold">
                      When can clients visit your property?
                    </h6>

                    <div className="input w-full laptopSm:w-[80%] flex flex-wrap items-center gap-[1.5rem] mt-[1rem]">
                      {availabiltyDays?.map((day, index) => (
                        <div key={index} className="singleInput select-none">
                          <label
                            htmlFor={day}
                            className={`propertyFormInputRadioLabels px-[1.5rem] ${
                              availability?.includes(day)
                                ? "border-theme-yellow"
                                : "border-neutral-300"
                            }`}
                          >
                            <span>{day}</span>
                          </label>
                          <input
                            type="checkbox"
                            name="day"
                            id={day}
                            value={day}
                            checked={availability?.includes(day)}
                            onChange={availabilityChangeHandler}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Action Button */}
              <div className="buttonCont w-full flex flex-wrap items-center justify-between gap-[2rem] mt-[2rem]">
                <button className="outline-none border-[0.2rem] text-theme-blue border-theme-blue p-[1.1rem] text-[1.55rem] leading-[1.5rem] font-semibold rounded-md cursor-pointer hover:bg-theme-blue hover:text-white hover:translate-y-[-0.1rem] hover:shadow-lg hover:shadow-neutral-200 transition-all">
                  SAVE AS DRAFT
                </button>

                <button className="outline-none border-[0.2rem] text-white border-theme-blue p-[1.1rem] text-[1.6rem] leading-[1.5rem] font-medium rounded-md cursor-pointer bg-theme-blue hover:translate-y-[-0.1rem] hover:shadow-lg hover:shadow-neutral-200 transition-all">
                  SUBMIT FOR REVIEW
                </button>
              </div>
            </form>
          </div>

          {/* Add Property Preview Cont */}
          <div className="addPropertyPreviewCont w-0 hidden relative laptopSm:w-[40%] laptopSm:flex flex-col items-center gap-[2rem]">
            <h3 className="w-full text-[2.2rem] leading-[2.2rem] text-neutral-800 font-semibold">
              Preview
            </h3>

            <AddPropertyReview propertyDetails={propertyDetails} />
          </div>
        </div>
      </div>

      {/* Property Location Modal */}
      {isLocationModalOpen && (
        <AddPropertyLocationModal
          setIsLocationModalOpen={setIsLocationModalOpen}
          city={city}
          propertyFormDataChangeHandler={propertyFormDataChangeHandler}
        />
      )}

      {/* Property Features Modal */}
      {isFeaturesModalOpen && (
        <AddPropertyFeaturesModal
          setIsFeaturesModalOpen={setIsFeaturesModalOpen}
          propertyFormDataChangeHandler={propertyFormDataChangeHandler}
          propertyDetails={propertyDetails}
        />
      )}
    </div>
  );
};

export default AddProperty;
