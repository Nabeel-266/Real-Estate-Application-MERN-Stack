import { useEffect, useState } from "react";
import {
  propertyFeaturesCategory,
  primaryFeatures,
} from "../constants/propertyFormData";

// Import React Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";

const AddPropertyFeaturesModal = ({ setIsFeaturesModalOpen }) => {
  const [isPrimaryFeaturesOpen, setIsPrimaryFeaturesOpen] = useState(false);

  const featuresCategoryOnCLickHandler = (categoryName) => {
    if (categoryName === "Primary Features") {
      setIsPrimaryFeaturesOpen(!isPrimaryFeaturesOpen);
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
      <section className="w-[80rem] min-h-[30rem] max-h-[80%] relative z-20 bg-white rounded-md px-[1rem] py-[1rem] shadow-2xl select-none">
        {/* Add Property Features Modal Header */}
        <header className="w-full px-[1rem] py-[1rem] border-b-[0.2rem] border-neutral-300 text-theme-blue">
          <h2 className="text-[2.4rem] leading-[2.4rem] font-bold">
            Set Features and Amenities
          </h2>
        </header>

        {/* Add Property Features Modal Body  */}
        <div className="w-full px-[2rem] py-[3rem]">
          <div className="featuresCont h-[27rem] w-full flex flex-col justify-between gap-[2rem] overflow-auto scrollbar-slim">
            {propertyFeaturesCategory.map((category, index) => (
              // Single Feature Category Cont
              <div
                key={index}
                className="singleFeatureCategoryCont w-full flex flex-col rounded-md border-[0.2rem] border-neutral-200"
              >
                {/* Single Feature Category Header */}
                <div
                  onClick={(e) =>
                    featuresCategoryOnCLickHandler(e.target.innerText)
                  }
                  className="w-full text-[1.7rem] leading-[1.7rem] font-semibold text-neutral-700 flex items-center justify-between p-[1.5rem] cursor-pointer"
                >
                  <h4 className="categoryTitle">{category}</h4>
                  <IoMdArrowDropdown
                    className={`pointer-events-none ${
                      isPrimaryFeaturesOpen
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
                        isPrimaryFeaturesOpen ? "max-h-[100rem]" : "max-h-0"
                      } transition-all duration-500`}
                    >
                      <ul className="w-full flex flex-col gap-[1rem] p-[1rem]">
                        {primaryFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className="text-[1.6rem] leading-[1.5rem] font-medium text-neutral-700 flex items-center justify-between border-[0.2rem] border-neutral-200 px-[1rem] py-[0.8rem] cursor-default"
                          >
                            <span>{feature}</span>

                            <div className="flex items-center gap-[0.5rem]">
                              <button className="text-[25px] text-neutral-500">
                                <FiMinusSquare />
                              </button>
                              <span className="text-theme-blue font-semibold">
                                0
                              </span>
                              <button className="text-[25px] text-neutral-500">
                                <FiPlusSquare />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Button */}
        <div className="w-full flex justify-end gap-[1rem] px-[1rem] py-[1rem]">
          <button
            onClick={() => setIsFeaturesModalOpen(false)}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[2rem] py-[1rem] bg-neutral-800 rounded-md flex items-center gap-[0.5rem]"
          >
            Close
          </button>

          <button
            // onClick={setPropertyCoordinatesHandler}
            // disabled={propertyCoordinates ? false : true}
            className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[2rem] py-[1rem] bg-theme-blue rounded-md flex items-center gap-[0.5rem] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddPropertyFeaturesModal;
