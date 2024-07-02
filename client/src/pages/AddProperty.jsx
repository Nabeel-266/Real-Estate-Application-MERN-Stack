import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import OpenCageApiClient from "opencage-api-client";
import axios from "axios";

import {
  propertyPurposes,
  propertyCategories,
  propertyResidentialTypes,
  propertyPlotTypes,
  propertyCommercialTypes,
  cities,
} from "../constants/propertyFormData";

// Import React Icons
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

// Import Assets
import AddPropertyBannerImage from "../assets/add-property-banner.png";

const AddProperty = () => {
  const [isCitiesDropdownOpen, setIsCitiesDropdownOpen] = useState(false);
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: null,
    lng: null,
  });
  console.log(cityCoordinates);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState(
    propertyResidentialTypes
  );
  const [propertyDetails, setPropertyDetails] = useState({
    purpose: "",
    category: "",
    type: "",
    city: "",
  });
  console.log(propertyDetails);

  const propertyFormDataChangeHandler = (key, value) => {
    setPropertyDetails({
      ...propertyDetails,
      [key]: value,
    });
    setIsCitiesDropdownOpen(false);
  };

  const { purpose, category, type, city } = propertyDetails;

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

  const getCityLoactionCoordinates = async (city) => {
    try {
      if (city) {
        const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API key
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
        );

        const location = response.data.results[0].geometry.location;
        setCityCoordinates({ lat: location.lat, lng: location.lng });
      }
    } catch (error) {}
  };

  return (
    <div className="addPropertyCont w-full pt-[6rem]">
      <div className="addPropertyContWrapper mx-[3%] tabletSm:mx-[4%] py-[1rem]">
        {/* Add Property Banner Cont */}
        <section className="addPropertyBannerCont w-full h-[28rem] tabletSm:h-[30rem] tabletLg:h-[33rem] laptopRg:h-[35rem] relative z-[1] pt-[5rem]">
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
        <div className="addPropertyContentCont w-full px-[4%] py-[6rem] flex items-start">
          {/* Add Property Form Cont */}
          <div className="addPropertyFormCont w-[100%] tabletLg:w-[60%]">
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
                <div className="propertyType w-full tabletLg:w-[80%] flex flex-wrap items-center gap-[1.5rem] mt-[1rem]">
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
              <div className="city w-full flex flex-col gap-[1.5rem] pb-[0rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  Which city is your property in?
                </h4>

                {/* City Input Cont */}
                <div className="w-full space-y-2">
                  <div className="input w-[70%] min-w-[50rem] relative z-[1]">
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
                      className="w-full outline-none border-[0.2rem] text-neutral-800 border-neutral-300 px-[4.5rem] py-[0.7rem] text-[1.5rem] rounded-md cursor-pointer focus:border-theme-blue peer/city"
                    />
                    <span className="text-[2rem] absolute top-0 left-0 h-full flex items-center justify-center px-[1.5rem] text-neutral-400 pointer-events-none peer-focus/city:text-theme-blue">
                      <IoSearch className="" />
                    </span>

                    {/* Cities Dropdown */}
                    {isCitiesDropdownOpen && (
                      <div className="dropdownCities w-full flex flex-col py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0">
                        <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim">
                          <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                            Select City
                          </h6>
                          {cities.sort().map((city, index) => (
                            <li
                              key={index}
                              onClick={(e) => {
                                getCityLoactionCoordinates(e.target.innerText);
                                propertyFormDataChangeHandler(
                                  "city",
                                  e.target.innerText
                                );
                              }}
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

              {/* Property Area */}
              <div className="city w-full flex flex-col gap-[1.5rem] pb-[0rem]">
                {/* Title */}
                <h4 className="propertyFormInputTitles">
                  Which city is your property in?
                </h4>

                {/* Area Input Cont */}
                <div className="w-full space-y-2">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-[0.5rem] text-theme-blue border-[0.2rem] border-neutral-300 p-[1rem] rounded-lg hover:shadow-lg hover:shadow-neutral-200 hover:translate-y-[-0.1rem]"
                  >
                    <FaPlus className="text-[1.6rem] text-cyan-900 mb-[0.2rem]" />
                    <span className="text-[1.6rem] leading-[1.6rem] font-semibold">
                      Set Exact Property Location
                    </span>
                  </button>

                  <SetPropertyLocation
                    setCityCoordinates={setCityCoordinates}
                  />

                  <p className="areaErrorMsg hidden text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    Area is required
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Add Property Preview Cont */}
          <div className="addPropertyPreviewCont w-0 hidden tabletLg:w-[40%] tabletRg:block"></div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

// AIzaSyCRYGFPG_pwucTj_PHPnNjRVQxofOeJxKs

const SetPropertyLocation = () => {
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const [locationDetails, setLocationDetails] = useState(null);
  const [marker, setMarker] = useState([25.1072, 67.2371]);
  console.log(marker);
  console.log(locationDetails);

  const handleMapClick = async ({ latLng }) => {
    setMarker(latLng);
    try {
      const response = await OpenCageApiClient.geocode({
        key: "df4960c5c9f24a8ba5dd3e3c5316539c",
        q: `${latLng[0]}, ${latLng[1]}`,
        language: "en",
      });
      if (response.results.length > 0) {
        setLocationDetails(response.results[0]);
      } else {
        setLocationDetails("Location details not found");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <div className="map">
      <Map
        height={300}
        defaultCenter={marker}
        defaultZoom={10}
        onClick={handleMapClick}
      >
        <Marker
          width={50}
          anchor={marker}
          color={color}
          onClick={() => setHue(hue + 20)}
        />
        <ZoomControl />
      </Map>
    </div>
  );
};
