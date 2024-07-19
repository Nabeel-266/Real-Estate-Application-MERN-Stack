import { useEffect, useState } from "react";
import {
  propertyFeaturesCategory,
  accountableFeatures,
  highlightedFeatures,
  directions,
  landmarksNearby,
  utilities,
} from "../../constants/data";

// Import React Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";

const AddPropertyFeaturesModal = ({
  setIsFeaturesModalOpen,
  propertyFormDataChangeHandler,
  propertyDetails,
}) => {
  const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState([]);
  const [isFacingDropdownOpen, setIsFacingDropdownOpen] = useState(false);
  const [propertyFacing, setPropertyFacing] = useState("");
  const [whichFeaturesDropdownOpen, setWhichFeaturesDropdownOpen] = useState(
    new Array(propertyFeaturesCategory.length).fill(false)
  );

  useEffect(() => {
    if (propertyDetails?.features) {
      setSelectedPropertyFeatures(propertyDetails.features);

      const isFacingFeatureInclude = propertyDetails?.features?.find(
        (feature) => feature.includes("Facing")
      );

      if (isFacingFeatureInclude) {
        const facingFeature = isFacingFeatureInclude.split(" ");
        facingFeature.pop(facingFeature.length - 1);
        setPropertyFacing(facingFeature.join(" "));
      }
    }
  }, [propertyDetails]);

  const featuresDropdownsHandler = (index) => {
    setWhichFeaturesDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const propertyFeatureDataChangeHandler = (feature, condition) => {
    const isGivenFeaturePresent = selectedPropertyFeatures?.find((featureEl) =>
      featureEl.includes(feature)
    );

    // For Primary Features Adding or Removing
    if (condition) {
      if (isGivenFeaturePresent) {
        let featureCount;

        if (condition === "adding") {
          featureCount = +isGivenFeaturePresent.split(" ")[0] + 1;
        } else if (condition === "removing") {
          if (isGivenFeaturePresent.split(" ")[0] > 1) {
            featureCount = +isGivenFeaturePresent.split(" ")[0] - 1;
          } else {
            return setSelectedPropertyFeatures((prvFeatures) =>
              prvFeatures?.filter(
                (singleFeature) => singleFeature !== isGivenFeaturePresent
              )
            );
          }
        }

        const updateSelectedFeature = `${featureCount} ${feature}`;
        return setSelectedPropertyFeatures((prvFeatures) =>
          prvFeatures?.map((singleFeature) =>
            singleFeature === isGivenFeaturePresent
              ? updateSelectedFeature
              : singleFeature
          )
        );
      } else {
        if (condition === "adding") {
          return setSelectedPropertyFeatures([
            ...selectedPropertyFeatures,
            `1 ${feature}`,
          ]);
        }
      }
    }

    // For Only Secondary Facing Feature
    if (feature.includes("Facing")) {
      const isFacingFeaturePresent = selectedPropertyFeatures?.find(
        (featureEl) => featureEl.includes("Facing")
      );

      if (!isFacingFeaturePresent) {
        return setSelectedPropertyFeatures([
          ...selectedPropertyFeatures,
          feature,
        ]);
      } else {
        return setSelectedPropertyFeatures((prvFeatures) =>
          prvFeatures?.map((singleFeature) =>
            singleFeature === isFacingFeaturePresent ? feature : singleFeature
          )
        );
      }
    }

    // Other Features
    if (!isGivenFeaturePresent) {
      setSelectedPropertyFeatures([...selectedPropertyFeatures, feature]);
    } else {
      setSelectedPropertyFeatures((prvFeatures) =>
        prvFeatures?.filter(
          (singleFeature) => singleFeature !== isGivenFeaturePresent
        )
      );
    }
  };

  const setPropertyFeaturesHandler = () => {
    if (selectedPropertyFeatures?.length) {
      propertyFormDataChangeHandler(
        "added",
        "features",
        selectedPropertyFeatures
      );
    } else {
      propertyFormDataChangeHandler("deleted", "features");
    }
    setIsFeaturesModalOpen(false);
  };

  const removeFeaturesHandler = (el) => {
    if (!el.includes("Facing")) {
      setSelectedPropertyFeatures((prvFeatures) =>
        prvFeatures?.filter((singleFeature) => singleFeature !== el)
      );
    } else {
      setSelectedPropertyFeatures((prvFeatures) =>
        prvFeatures?.filter((singleFeature) => singleFeature !== el)
      );
      setPropertyFacing("");
    }
  };

  return (
    <div className="editProfileModalCont w-full h-dvh flex items-center justify-center fixed z-[990] top-0 left-0">
      {/* Add Property Features Modal Overlay */}
      <div
        onClick={() => setIsFeaturesModalOpen(false)}
        className={`w-full h-full absolute z-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden`}
      ></div>

      {/* Add Property Features Modal Cont */}
      <div className="w-[90%] tabletRg:w-[70%] laptopSm:w-[60%] min-h-[40rem] relative z-20 bg-white rounded-md px-[1rem] py-[1rem] shadow-2xl select-none">
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
              selectedPropertyFeatures?.length ? "block" : "hidden"
            } overflow-auto scrollbar-slim`}
          >
            <ul className="w-full flex flex-wrap items-center gap-[1rem]">
              {selectedPropertyFeatures?.map((el, index) => (
                <li
                  key={index}
                  className="singleFeature text-[1.4rem] leading-[1.4rem] font-medium text-theme-blue p-[1rem] flex items-center gap-[1rem] bg-theme-yellow rounded-md whitespace-nowrap"
                >
                  <span>{el}</span>
                  <span
                    onClick={() => removeFeaturesHandler(el)}
                    className="cursor-pointer"
                  >
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
                  {/* For Accountable Features */}
                  {category === "Accountable Features" && (
                    <div
                      className={`accountableFeaturesCont ${
                        whichFeaturesDropdownOpen[index]
                          ? "max-h-[100rem]"
                          : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {accountableFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className={`text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[0.8rem] rounded-md cursor-default hover:border-theme-blue transition-all ${
                              selectedPropertyFeatures?.some((el) =>
                                el.includes(feature)
                              )
                                ? "bg-neutral-200"
                                : "bg-transparent"
                            }`}
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

                  {/* For Highlighted Features */}
                  {category === "Highlighted Features" && (
                    <div
                      className={`highlightedFeaturesCont ${
                        whichFeaturesDropdownOpen[index]
                          ? "max-h-[100rem]"
                          : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {highlightedFeatures.map((feature, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              feature === "Facing"
                                ? setIsFacingDropdownOpen(!isFacingDropdownOpen)
                                : propertyFeatureDataChangeHandler(feature);
                            }}
                            className={`relative z-[1] text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[1.3rem] rounded-md cursor-default hover:border-theme-blue transition-all ${
                              selectedPropertyFeatures?.some((el) =>
                                el.includes(feature)
                              )
                                ? "bg-neutral-200"
                                : "bg-transparent"
                            }`}
                          >
                            <span>{feature}</span>
                            {feature === "Facing" && (
                              <div className="dropdownTextIcon flex items-center gap-[1rem]">
                                <span>{propertyFacing}</span>
                                <IoMdArrowDropdown
                                  className={`pointer-events-none  ${
                                    isFacingDropdownOpen
                                      ? "rotate-[180deg]"
                                      : "rotate-[360deg]"
                                  } transition-all duration-300`}
                                />
                              </div>
                            )}

                            {/* Facing Dropdown */}
                            {feature === "Facing" && (
                              <ul
                                className={`scale-0 max-h-[16.5rem] overflow-auto scrollbar-slim absolute z-10 bottom-[105%] right-[2rem] py-[0.5rem] bg-white border-[0.2rem] border-neutral-300 shadow-xl rounded-lg ${
                                  isFacingDropdownOpen && "scale-100"
                                } transition-all duration-100`}
                              >
                                {directions.map((direction, index) => (
                                  <li
                                    key={index}
                                    onClick={() => {
                                      setPropertyFacing(direction);
                                      propertyFeatureDataChangeHandler(
                                        `${direction} ${feature}`
                                      );
                                    }}
                                    className="text-[1.5rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between pl-[1rem] pr-[5rem] py-[0.8rem] hover:bg-theme-blue hover:text-white transition-all cursor-pointer"
                                  >
                                    {direction}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* For Landmarks Nearby */}
                  {category === "Landmarks Nearby" && (
                    <div
                      className={`landmarksCont ${
                        whichFeaturesDropdownOpen[index]
                          ? "max-h-[100rem]"
                          : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {landmarksNearby.map((feature, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              propertyFeatureDataChangeHandler(feature)
                            }
                            className={`text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[1.3rem] rounded-md cursor-default hover:border-theme-blue transition-all ${
                              selectedPropertyFeatures?.some((el) =>
                                el.includes(feature)
                              )
                                ? "bg-neutral-200"
                                : "bg-transparent"
                            }`}
                          >
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* For Utilities */}
                  {category === "Utilities" && (
                    <div
                      className={`utilitiesCont ${
                        whichFeaturesDropdownOpen[index]
                          ? "max-h-[100rem]"
                          : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {utilities.map((feature, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              propertyFeatureDataChangeHandler(feature)
                            }
                            className={`text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[1.3rem] rounded-md cursor-default hover:border-theme-blue transition-all ${
                              selectedPropertyFeatures?.some((el) =>
                                el.includes(feature)
                              )
                                ? "bg-neutral-200"
                                : "bg-transparent"
                            }`}
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
        <section className="w-full flex items-end justify-end gap-[1rem] px-[1rem] py-[1rem]">
          <button
            onClick={() => setIsFeaturesModalOpen(false)}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[2rem] py-[1rem] bg-neutral-800 rounded-md"
          >
            Close
          </button>

          <button
            onClick={setPropertyFeaturesHandler}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[2rem] py-[1rem] bg-theme-blue rounded-md"
          >
            Confirm
          </button>
        </section>
      </div>
    </div>
  );
};

export default AddPropertyFeaturesModal;
