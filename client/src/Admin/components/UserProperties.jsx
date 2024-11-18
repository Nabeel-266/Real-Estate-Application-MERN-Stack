import { useEffect, useRef, useState, memo } from "react";

// Import Component
import PropertyCard from "./PropertyCard";
import LoaderCircle from "./Loaders/LoaderCircle";

const tabs = ["drafted", "pending", "published", "rejected", "removed"];

const properties = [
  {
    images: [
      "/src/assets/Properties/house-02.jpg",
      "/src/assets/Properties/room-05.jpg",
      "/src/assets/Properties/room-04.jpg",
      "/src/assets/Properties/balcony-02.jpg",
    ],
    type: "Apartment",
    status: "Sold",
    city: "Dera Ghazi Khan",
    price: 450000,
    description: "Luxurious modern apartment with stunning city views",
    bedrooms: 3,
    bathrooms: 2,
    size: "1500 Sq. Ft",
    transactionDate: "Mar 15, 2024",
    agent: {
      name: "Amjad Daniyal",
      experienceBadge: "Senior",
      avatar: "/src/assets/Agents/agent02.png",
      phone: "03342587462",
      email: "ahmedaniyal@gmail.com",
    },
  },
  {
    images: [
      "/src/assets/Properties/house-02.jpg",
      "/src/assets/Properties/room-05.jpg",
      "/src/assets/Properties/room-04.jpg",
      "/src/assets/Properties/balcony-02.jpg",
    ],
    type: "Apartment",
    status: "Sold",
    city: "Dera Ghazi Khan",
    price: 450000,
    description: "Luxurious modern apartment with stunning city views",
    bedrooms: 3,
    bathrooms: 2,
    size: "1500 Sq. Ft",
    transactionDate: "Mar 15, 2024",
    agent: {
      name: "Amjad Daniyal",
      experienceBadge: "Senior",
      avatar: "/src/assets/Agents/agent02.png",
      phone: "03342587462",
      email: "ahmedaniyal@gmail.com",
    },
  },
  {
    images: [
      "/src/assets/Properties/house-02.jpg",
      "/src/assets/Properties/room-05.jpg",
      "/src/assets/Properties/room-04.jpg",
      "/src/assets/Properties/balcony-02.jpg",
    ],
    type: "Apartment",
    status: "Sold",
    city: "Dera Ghazi Khan",
    price: 450000,
    description: "Luxurious modern apartment with stunning city views",
    bedrooms: 3,
    bathrooms: 2,
    size: "1500 Sq. Ft",
    transactionDate: "Mar 15, 2024",
    agent: {
      name: "Amjad Daniyal",
      experienceBadge: "Senior",
      avatar: "/src/assets/Agents/agent02.png",
      phone: "03342587462",
      email: "ahmedaniyal@gmail.com",
    },
  },
];

const UserProperties = () => {
  const tabRefs = useRef([]);
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("drafted");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [loading, setLoading] = useState(true);

  // Example to simulate loading for 2 seconds, then show content
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeIndex];

    // Set the underline style based on the active tab
    setUnderlineStyle({
      left: `${activeTabElement?.offsetLeft}px`,
      width: `${activeTabElement?.clientWidth}px`,
    });

    // Create a CancelToken source for Axios
    // const source = axios.CancelToken.source();

    // Fetch properties according to the active tab
    // getPropertiesAccordingActiveTab(status, source.token);

    // return () => {
    //   source.cancel("Operation canceled due to new request.");
    // };
  }, [activeTab, setActiveTab]);

  // Change Tab Handler
  const changeTabHandler = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full flex flex-col gap-[2rem]">
      {/* My Property Tabs Cont */}
      <div className="max-w-fit overflow-x-auto scrollbar-slim-x">
        <div className="w-full relative flex border-b-[0.2rem] border-neutral-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => changeTabHandler(tab)}
              className={`relative py-[0.8rem] px-[2rem] text-[1.6rem] leading-[2rem] font-semibold transition-all duration-300 ${
                activeTab === tab ? "text-theme-blue" : "text-neutral-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <div
            className="absolute bottom-[-6%] h-[0.3rem] bg-theme-blue transition-all duration-300"
            style={{ ...underlineStyle }}
          />
        </div>
      </div>

      <section className="w-full">
        {loading ? (
          <div className="w-full flex justify-center px-[2rem] py-[3.5rem] bg-neutral-100 rounded-xl shadow-[inset_0.2rem_0.2rem_4rem_#00000030]">
            <LoaderCircle size={45} outerC="#999" innerC="#082835" />
          </div>
        ) : (
          <>
            {!!properties ? (
              // Property Cards Cont
              <div className="w-full grid grid-cols-1 tabletLg:grid-cols-3 tabletSm:grid-cols-2 desktopSm:grid-cols-3 gap-[3rem_1.8rem] p-[1.8rem] bg-neutral-100 rounded-xl shadow-[inset_0.2rem_0.2rem_2rem_#00000030]">
                {/* Property Card */}
                {properties?.map((property, index) => (
                  <PropertyCard
                    key={index}
                    property={property}
                    index={index}
                    specific={true}
                  />
                ))}
              </div>
            ) : (
              // No Property View Cont
              <div className="w-full tabletLg:w-[80%] h-[35rem] relative z-[1] rounded-lg p-[2.2rem] space-y-[1rem] overflow-hidden select-none before:content-[''] before:absolute before:z-[-1] before:top-0 before:left-0 before:w-full before:h-full before:bg-cover before:bg-no-repeat before:bg-center before:bg-no-property-found-image before:opacity-90">
                <p className="text-theme-blue text-[2.8rem] leading-[2.8rem] font-bold">
                  {activeTab === "drafted"
                    ? "No Saved Draft"
                    : "No Properties Found"}
                </p>
                <p className="text-neutral-700 text-[1.6rem] leading-[1.6rem] font-semibold">
                  {activeTab === "drafted"
                    ? "It appears you have not drafted any properties yet"
                    : activeTab === "published"
                    ? "None of your properties are currently published"
                    : activeTab === "pending"
                    ? "None of your properties are in review"
                    : activeTab === "rejected"
                    ? "None of your properties has been rejected"
                    : activeTab === "removed" &&
                      "None of your properties has been removed"}
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default memo(UserProperties);
