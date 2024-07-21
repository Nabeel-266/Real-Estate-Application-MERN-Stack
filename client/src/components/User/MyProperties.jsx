import { useState, useEffect, useRef } from "react";

// Import React Icons
import { BiArea, BiEditAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

// Import Asset
import PropertyImage from "../../assets/home.jpg";

const tabs = ["Draft", "Published", "Pending", "Rejected", "Remove"];

const MyProperties = () => {
  const [activeTab, setActiveTab] = useState("Draft");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
    setUnderlineStyle({
      left: `${activeTabElement?.offsetLeft}px`,
      width: `${activeTabElement?.clientWidth}px`,
    });
  }, [activeTab]);

  return (
    <div className="w-full px-[5%] laptopSm:px-[2%]">
      {/* Properties Header */}
      <div className="header text-neutral-800 border-b-[0.2rem] border-neutral-200 pb-[1rem]">
        <h1 className="text-[2.5rem] leading-[3rem] font-bold">
          My Properties
        </h1>
        <p className="text-[1.4rem] font-medium">
          Manage and overview of your properties
        </p>
      </div>

      {/* Properties Body */}
      <div className="body w-full py-[2rem] flex flex-col gap-[2.5rem]">
        {/* My Property Tabs Cont */}
        <div className="max-w-fit overflow-x-auto scrollbar-slim-x">
          <div className="w-full relative flex border-b-[0.2rem] border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(tab)}
                className={`relative py-[1rem] px-[2rem] text-[1.7rem] leading-[2rem] font-semibold transition-all duration-300 ${
                  activeTab === tab ? "text-theme-blue" : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <div
              className="absolute bottom-0 h-[0.2rem] bg-theme-yellow transition-all duration-300"
              style={{ ...underlineStyle }}
            />
          </div>
        </div>

        {/* My Property Cards */}
        <div className="w-full">
          {/* No Property View Cont */}
          <div className="noPropertyViewCont hidden w-full tabletLg:w-[90%] h-[38rem] relative z-[1] rounded-md p-[2rem] space-y-[0.5rem] before:content-[''] before:absolute before:z-[-1] before:top-0 before:left-0 before:w-full before:h-full before:bg-cover before:bg-no-repeat before:bg-center before:bg-no-property-found-image before:opacity-90">
            <p className="text-theme-blue text-[3rem] leading-[3.4rem] font-bold font-mont">
              {activeTab === "Draft" ? "No Saved Draft" : "No Properties Found"}
            </p>
            <p className="text-neutral-700 text-[1.8rem] leading-[2.5rem] font-semibold">
              {activeTab === "Draft"
                ? "It appears you have not drafted any properties yet"
                : activeTab === "Published"
                ? "None of your properties are currently published"
                : activeTab === "Pending"
                ? "None of your properties are in review"
                : activeTab === "Rejected"
                ? "None of your properties has been rejected"
                : activeTab === "Remove" &&
                  "None of your properties has been removed"}
            </p>
          </div>

          {/* Property Cards Cont */}
          <div className="propertyCardsCont w-full grid grid-cols-1 tabletLg:grid-cols-3 tabletSm:grid-cols-2 desktopSm:grid-cols-3 gap-[3rem_2rem] pb-[3rem] px-[1rem]">
            {/* Property Card */}
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                // key={index}
                className="propertyCard max-w-[35rem] min-w-full relative bg-white overflow-hidden shadow-[0px_15px_20px_#e0e0e0] rounded-xl"
              >
                {/* Card Image */}
                <div className="imageArea relative w-full h-[22rem] tabletSm:h-[18rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:h-[50%] before:bg-gradient-to-b to-[#30303080] from-transparent before:pointer-events-none">
                  <img
                    src={PropertyImage}
                    alt="property"
                    className="cardImage w-full h-full object-cover"
                  />

                  {/* Visit Btn */}
                  <abbr title="View">
                    <button className="absolute z-[5] bottom-[8%] right-[6%] p-[0.7rem] bg-white text-theme-blue text-[2.2rem] flex items-center justify-center rounded-full shadow-2xl hover:bg-theme-yellow transition-all">
                      <FaArrowRightLong />
                    </button>
                  </abbr>
                </div>

                {/* Card Content */}
                <div className="cardContent w-full flex flex-col gap-[1rem] p-[1rem] text-neutral-700">
                  {/* Type & Purpose */}
                  <div className="typePurpose flex justify-between">
                    {/* Type */}
                    <p className="type relative flex items-center text-[1.6rem] leading-[1.6rem] font-semibold pl-[1.8rem] before:content-[''] before:w-[1rem] before:h-[1rem] before:bg-theme-yellow before:absolute before:left-0 before:rounded-full">
                      Appartment
                    </p>

                    {/* Purpose */}
                    <span className="text-[1.3rem] leading-[1.5rem] font-semibold rounded-sm bg-theme-blue text-white px-[0.5rem] py-[0.2rem]">
                      For Sell
                    </span>
                  </div>

                  {/* Price */}
                  <div className="price flex items-end gap-[1rem] text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue select-none">
                    <span>PKR</span>
                    <span className="text-[2.1rem] leading-[2rem] font-bold">
                      45 Crore
                    </span>
                  </div>

                  {/* Details */}
                  <div className="w-full flex items-center justify-between mt-[0.1rem] text-neutral-600">
                    <div className="leftSide flex items-center gap-[1rem] text-[1.5rem] leading-[1.5rem] font-semibold select-none">
                      {/* Bedroom */}
                      <abbr title="Bedroom" className="no-underline ">
                        <span className="bed flex items-center gap-[0.5rem]">
                          <LiaBedSolid size="1.8rem" /> <span>4</span>
                        </span>
                      </abbr>

                      {/* Bathroom */}
                      <abbr title="Bathroom" className="no-underline ">
                        <span className="bath flex items-center gap-[0.5rem]">
                          <LuBath /> <span>3</span>
                        </span>
                      </abbr>

                      {/* Size */}
                      <abbr title="Size" className="no-underline">
                        <span className="area flex items-center gap-[0.5rem]">
                          <BiArea /> <span>3500 Sq.Ft</span>
                        </span>
                      </abbr>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="location flex items-center gap-[0.5rem] text-[1.5rem] text-neutral-600 mt-[0.1rem]">
                    <HiOutlineLocationMarker />
                    <span className="leading-[1.4rem] font-semibold">
                      Karachi
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="w-full flex items-center justify-between gap-[1rem] mt-[0.4rem]">
                    <button className="w-[50%] flex items-center justify-center gap-[0.5rem] text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue tracking-wider px-[1rem] py-[0.8rem] bg-transparent border-[0.2rem] border-theme-blue rounded-full hover:bg-theme-blue hover:text-white transition-all duration-200">
                      <BiEditAlt />
                      <span>Edit</span>
                    </button>

                    <button className="w-[50%] flex items-center justify-center gap-[0.5rem] text-[1.6rem] leading-[1.6rem] font-semibold text-red-700 tracking-wider px-[1rem] py-[0.8rem] bg-transparent border-[0.2rem] border-red-700 rounded-full hover:bg-red-700 hover:text-white transition-all duration-200">
                      <RiDeleteBin6Line size="1.5rem" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
