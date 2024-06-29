import React, { useEffect, useState } from "react";

// Import Assets
import AddPropertyBannerImage from "../assets/add-property-banner.png";
import RentIcon from "../assets/Property-Icons/rent.png";
import SellIcon from "../assets/Property-Icons/sell.png";
import HouseIcon from "../assets/Property-Icons/house.png";
import ApartmentIcon from "../assets/Property-Icons/apartment.png";
import PortionIcon from "../assets/Property-Icons/house-portion.png";
import RoomIcon from "../assets/Property-Icons/room.png";
import FarmHouseIcon from "../assets/Property-Icons/farm-house.png";
import GusetHouseIcon from "../assets/Property-Icons/guest-house.png";
import HostelIcon from "../assets/Property-Icons/hostel.png";
import HotelIcon from "../assets/Property-Icons/hotel.png";
import BasementIcon from "../assets/Property-Icons/basement.png";

const AddProperty = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    purpose: "",
    category: "",
    type: "",
  });
  console.log(propertyDetails);

  const propertyFormDataChangeHandler = (e) => {
    setPropertyDetails({
      ...propertyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const { purpose, category, type } = propertyDetails;

  useEffect(() => {
    if (purpose === "") {
      setPropertyDetails({
        ...propertyDetails,
        purpose: "Sell",
      });
    }

    if (category === "" || category === "Residential") {
      return setPropertyDetails({
        ...propertyDetails,
        category: "Residential",
        type: "House",
      });
    }

    if (category === "Plot") {
      return setPropertyDetails({
        ...propertyDetails,
        type: "Residential Plot",
      });
    }

    if (category === "Commercial") {
      return setPropertyDetails({
        ...propertyDetails,
        type: "Office",
      });
    }
  }, [category]);

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
          <div className="addPropertyFormCont w-[100%] tabletRg:w-[60%]">
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
                  {[
                    { value: "Sell", iconImage: SellIcon },
                    { value: "Rent", iconImage: RentIcon },
                  ].map(({ value, iconImage }, index) => (
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
                        onChange={(e) => propertyFormDataChangeHandler(e)}
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
                  {["Residential", "Plot", "Commercial"].map((value, index) => (
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
                        onChange={(e) => propertyFormDataChangeHandler(e)}
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>

                {/* Property Type Inputs */}
                <div className="propertyType w-full tabletRg:w-[90%] flex flex-wrap items-center gap-[1.5rem] mt-[1rem]">
                  {[
                    { value: "House", iconImage: HouseIcon },
                    { value: "Apartment", iconImage: ApartmentIcon },
                    { value: "Home Portion", iconImage: PortionIcon },
                    { value: "Room", iconImage: RoomIcon },
                    { value: "Farm House", iconImage: FarmHouseIcon },
                    { value: "Guest House", iconImage: GusetHouseIcon },
                    { value: "Hostel", iconImage: HostelIcon },
                    { value: "Hotel", iconImage: HotelIcon },
                    { value: "Basement", iconImage: BasementIcon },
                  ].map(({ value, iconImage }, index) => (
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
                        onChange={(e) => propertyFormDataChangeHandler(e)}
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Add Property Preview Cont */}
          <div className="addPropertyPreviewCont w-0 hidden tabletRg:w-[40%] tabletRg:block"></div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
