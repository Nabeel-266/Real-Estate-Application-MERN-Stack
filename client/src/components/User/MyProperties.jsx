import { useState, useEffect, useRef } from "react";

// Import Asset
import NoPropertyFoundImage from "../../assets/no-property-found.png";

const tabs = ["Draft", "Publish", "Pending", "Rejected", "Remove"];

const MyProperties = () => {
  const [activeTab, setActiveTab] = useState("active");
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
    <div className="w-full px-[2rem]">
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
      <div className="body w-full py-[2rem]">
        <div className="max-w-fit relative flex border-b-[0.2rem] border-gray-200 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setActiveTab(tab)}
              className={`relative py-[1rem] px-[2rem] text-[1.8rem] leading-[2rem] font-semibold transition-all duration-300 ${
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
        {/* <img
          src={NoPropertyFoundImage}
          alt="NoPropertyFound"
          className="w-full h-full object-cover opacity-100"
        /> */}
      </div>
    </div>
  );
};

export default MyProperties;
