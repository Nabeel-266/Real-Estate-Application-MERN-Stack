import { useEffect, useState } from "react";
import {
  propertyFeaturesCategory,
  primaryFeatures,
  secondaryFeatures,
} from "../constants/propertyFormData";

// Import React Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";

const AddPropertyFeaturesModal = ({ setIsFeaturesModalOpen }) => {
  const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState([]);
  const [whichFeaturesDropdownOpen, setWhichFeaturesDropdownOpen] = useState(
    new Array(propertyFeaturesCategory.length).fill(false)
  );

  const featuresDropdownsHandler = (index) => {
    setWhichFeaturesDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const propertyFeatureDataChangeHandler = (feature, condition) => {
    if (condition) {
      const isGivenFeaturePresent = selectedPropertyFeatures.find((featureEl) =>
        featureEl.includes(feature)
      );

      if (isGivenFeaturePresent) {
        let featureCount;

        if (condition === "adding") {
          featureCount = +isGivenFeaturePresent.split(" ")[0] + 1;
        } else if (condition === "removing") {
          if (isGivenFeaturePresent.split(" ")[0] > 1) {
            featureCount = +isGivenFeaturePresent.split(" ")[0] - 1;
          } else {
            setSelectedPropertyFeatures((prvFeatures) =>
              prvFeatures?.filter(
                (singleFeature) => singleFeature !== isGivenFeaturePresent
              )
            );
          }
        }

        const updateSelectedFeature = `${featureCount} ${feature}`;
        setSelectedPropertyFeatures((prvFeatures) =>
          prvFeatures?.map((singleFeature) =>
            singleFeature === isGivenFeaturePresent
              ? updateSelectedFeature
              : singleFeature
          )
        );
      } else {
        if (condition === "adding") {
          setSelectedPropertyFeatures([
            ...selectedPropertyFeatures,
            `1 ${feature}`,
          ]);
        }
      }
    }

    // if (!propertyFeatures.includes(feature)) {
    //   setPropertyFeatures([...propertyFeatures, `1 ${feature}`]);
    // }
  };

  return (
    <div className="editProfileModalCont w-full h-dvh flex items-center justify-center fixed z-[990] top-0 left-0">
      {/* Add Property Features Modal Overlay */}
      <div
        onClick={() => setIsFeaturesModalOpen(false)}
        className={`w-full h-full absolute z-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden`}
      ></div>

      {/* Add Property Features Modal Cont */}
      <div className="w-[80rem] min-h-[30rem] relative z-20 bg-white rounded-md px-[1rem] py-[1rem] shadow-2xl select-none">
        {/* Add Property Features Modal Header */}
        <header className="w-full px-[1rem] py-[1rem] border-b-[0.2rem] border-neutral-300 text-theme-blue">
          <h2 className="text-[2.4rem] leading-[2.4rem] font-bold">
            Set Features and Amenities
          </h2>
        </header>

        {/* Add Property Features Modal Body  */}
        <section className="w-full p-[2rem] flex flex-col gap-[2rem]">
          {/* Selected Features Display Cont */}
          <div
            className={`w-full max-h-[12.5rem] ${
              selectedPropertyFeatures.length ? "block" : "hidden"
            } overflow-auto scrollbar-slim`}
          >
            <ul className="w-full flex flex-wrap items-center gap-[1rem]">
              {selectedPropertyFeatures?.map((el, index) => (
                <li
                  key={index}
                  className="singleFeature text-[1.4rem] leading-[1.4rem] font-medium text-theme-blue p-[1rem] flex items-center gap-[1rem] bg-theme-yellow rounded-md whitespace-nowrap"
                >
                  <span>{el}</span>
                  <span className="cursor-pointer">
                    <FaXmark />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Cont */}
          <div className="h-[27rem] w-full flex flex-col justify-between gap-[2rem] overflow-auto scrollbar-slim ">
            {propertyFeaturesCategory.map((category, index) => (
              // Single Feature Category Cont
              <div
                key={index}
                className="singleFeatureCategoryCont w-full flex flex-col rounded-lg border-[0.2rem] border-neutral-200"
              >
                {/* Single Feature Category Header */}
                <div
                  onClick={() => featuresDropdownsHandler(index)}
                  className={`w-full text-[1.7rem] leading-[1.7rem] font-semibold flex items-center justify-between px-[1.5rem] py-[1.2rem] rounded-t-lg cursor-pointer ${
                    whichFeaturesDropdownOpen[index]
                      ? "text-white bg-theme-blue"
                      : "text-neutral-700 bg-transparent"
                  } transition-all`}
                >
                  <h4 className="categoryTitle">{category}</h4>
                  <IoMdArrowDropdown
                    className={`pointer-events-none text-[2.3rem] ${
                      whichFeaturesDropdownOpen[index]
                        ? "rotate-[180deg]"
                        : "rotate-[360deg]"
                    } transition-all duration-500`}
                  />
                </div>

                {/* Single Feature Category Body */}
                <div className="w-full overflow-hidden">
                  {/* For Primary Features */}
                  {category === "Primary Features" && (
                    <div
                      className={`primaryFeaturesCont ${
                        whichFeaturesDropdownOpen[index]
                          ? "max-h-[100rem]"
                          : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {primaryFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className="text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[0.8rem] rounded-md cursor-default"
                          >
                            <span>{feature}</span>

                            <div className="flex items-center gap-[0.2rem]">
                              <button
                                onClick={() =>
                                  propertyFeatureDataChangeHandler(
                                    feature,
                                    "removing"
                                  )
                                }
                                disabled={
                                  selectedPropertyFeatures?.find((featureEl) =>
                                    featureEl.includes(feature)
                                  )
                                    ? false
                                    : true
                                }
                                className="text-[25px] text-neutral-500"
                              >
                                <FiMinusSquare />
                              </button>
                              <span className="w-[3rem] text-center  text-theme-blue font-semibold">
                                {selectedPropertyFeatures
                                  ?.find((featureEl) =>
                                    featureEl.includes(feature)
                                  )
                                  ?.split(" ")[0] || 0}
                              </span>
                              <button
                                onClick={() =>
                                  propertyFeatureDataChangeHandler(
                                    feature,
                                    "adding"
                                  )
                                }
                                className="text-[25px] text-neutral-500"
                              >
                                <FiPlusSquare />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* For Secondary Features */}
                  {category === "Secondary Features" && (
                    <div
                      className={`secondaryFeaturesCont ${
                        whichFeaturesDropdownOpen[index]
                          ? "max-h-[100rem]"
                          : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {secondaryFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className="text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[1.3rem] rounded-md cursor-default"
                          >
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Button */}
        <section className="w-full flex justify-end gap-[1rem] px-[1rem] py-[1rem]">
          <button
            onClick={() => setIsFeaturesModalOpen(false)}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[2rem] py-[1.2rem] bg-neutral-800 rounded-md flex items-center gap-[0.5rem]"
          >
            Close
          </button>

          <button
            // onClick={setPropertyCoordinatesHandler}
            // disabled={propertyCoordinates ? false : true}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[2rem] py-[1.2rem] bg-theme-blue rounded-md flex items-center gap-[0.5rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </section>
      </div>
    </div>
  );
};

export default AddPropertyFeaturesModal;
