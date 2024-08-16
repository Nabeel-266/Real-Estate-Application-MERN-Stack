import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getActiveTabUserProperties } from "../../api/propertyAPI's";

// Import Swiper React component and its styles & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import React Icons
import { BiArea, BiEditAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// Import Components
import LoadingCards from "../LoadingCards";

const tabs = ["drafted", "published", "pending", "rejected", "removed"];

const MyProperties = () => {
  const tabRefs = useRef([]);
  const swiperRefs = useRef([]);
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [searchQueryParams, setSearchQueryParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchQueryParams.get("status"));
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!searchQueryParams.get("status")) {
      setSearchQueryParams({ status: "drafted" });
    }
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
    setUnderlineStyle({
      left: `${activeTabElement?.offsetLeft}px`,
      width: `${activeTabElement?.clientWidth}px`,
    });

    getPropertiesAccordingActiveTab(searchQueryParams.get("status"));
  }, [activeTab, searchQueryParams]);

  const changeTabHandler = (tab) => {
    setActiveTab(tab);
    setSearchQueryParams({ status: tab });
  };

  const getPropertiesAccordingActiveTab = async (queryStatus) => {
    try {
      setLoading(true);
      // Fetch properties according to active tab from API or Database
      const properties = await getActiveTabUserProperties(
        currentUser._id,
        queryStatus
      );
      setProperties(properties);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => changeTabHandler(tab)}
                className={`relative py-[1rem] px-[2rem] text-[1.7rem] leading-[2rem] font-semibold transition-all duration-300 ${
                  activeTab === tab.toLowerCase()
                    ? "text-theme-blue"
                    : "text-gray-500"
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
          {loading ? (
            <LoadingCards />
          ) : (
            <>
              {properties?.length ? (
                // Property Cards Cont
                <div className="propertyCardsCont w-full grid grid-cols-1 tabletLg:grid-cols-3 tabletSm:grid-cols-2 desktopSm:grid-cols-3 gap-[3rem_2rem]  px-[1rem]">
                  {/* Property Card */}
                  {properties?.map((property, index) => (
                    <div
                      key={property?._id}
                      className="propertyCard max-w-[35rem] min-w-full relative bg-white overflow-hidden shadow-[0px_15px_20px_#e0e0e0] rounded-xl"
                    >
                      {/* Card Image */}
                      <div className="imageArea relative flex items-center w-full h-[18rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:h-[50%] before:bg-gradient-to-b to-[#30303080] from-transparent before:pointer-events-none group/picture">
                        <Swiper
                          modules={[Pagination, Navigation]}
                          slidesPerView={1}
                          loop={property?.images?.length > 1 ? true : false}
                          pagination={{ clickable: true }}
                          className="mySwiper w-full h-full cursor-grab"
                          onSwiper={(swiper) => {
                            swiperRefs.current[index] = swiper;
                          }}
                        >
                          {property?.images?.map((imageURL, index) => (
                            <SwiperSlide key={index} className="w-full">
                              <img
                                className="w-full h-full object-cover"
                                src={imageURL}
                                alt="Property Image"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        <button
                          onClick={() => swiperRefs.current[index]?.slidePrev()}
                          className="previous absolute left-[4%] z-[5] bg-[#ffffffa0] outline-none text-[2.4rem] text-neutral-800 hover:scale-[1.1] p-[0.5rem] rounded-full transition-all scale-0 group-hover/picture:scale-100"
                        >
                          <FaChevronLeft />
                        </button>

                        <button
                          onClick={() => swiperRefs.current[index]?.slideNext()}
                          className="next absolute right-[4%] z-[5] bg-[#ffffffa0] outline-none text-[2.4rem] text-neutral-800 hover:scale-[1.1] p-[0.5rem] rounded-full transition-all scale-0 group-hover/picture:scale-100"
                        >
                          <FaChevronRight />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="cardContent w-full flex flex-col gap-[1rem] p-[1rem] text-neutral-700">
                        {/* Type & Purpose */}
                        <div className="typePurpose flex justify-between">
                          {/* Type */}
                          <p className="type relative flex items-center text-[1.6rem] leading-[1.6rem] font-semibold pl-[1.8rem] before:content-[''] before:w-[1rem] before:h-[1rem] before:bg-theme-yellow before:absolute before:left-0 before:rounded-full">
                            {property?.type}
                          </p>

                          {/* Purpose */}
                          <span className="text-[1.3rem] leading-[1.5rem] font-semibold rounded-sm bg-theme-blue text-white px-[0.5rem] py-[0.2rem]">
                            For {property?.purpose}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="price flex items-end gap-[1rem] text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue select-none">
                          <span>PKR</span>
                          <span className="text-[2.1rem] leading-[2rem] font-bold">
                            {property?.price?.label}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="w-full flex items-center justify-between mt-[0.1rem] text-neutral-600">
                          <div className="leftSide flex items-center gap-[1rem] text-[1.5rem] leading-[1.5rem] font-semibold select-none">
                            {/* Bedroom */}
                            {property?.bedroom && (
                              <abbr title="Bedroom" className="no-underline ">
                                <span className="bed flex items-center gap-[0.5rem]">
                                  <LiaBedSolid size="1.8rem" />{" "}
                                  <span>{property?.bedroom}</span>
                                </span>
                              </abbr>
                            )}

                            {/* Bathroom */}
                            {property?.bathroom && (
                              <abbr title="Bathroom" className="no-underline ">
                                <span className="bath flex items-center gap-[0.5rem]">
                                  <LuBath /> <span>{property?.bathroom}</span>
                                </span>
                              </abbr>
                            )}

                            {/* Size */}
                            <abbr title="Size" className="no-underline">
                              <span className="area flex items-center gap-[0.5rem]">
                                <BiArea /> <span>{property?.size}</span>
                              </span>
                            </abbr>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="location flex items-center gap-[0.5rem] text-[1.6rem] text-neutral-600 mt-[0.2rem]">
                          <HiOutlineLocationMarker />
                          <span className="leading-[1.4rem] font-semibold">
                            {property?.city}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="w-full flex items-center justify-between gap-[1rem] mt-[0.5rem]">
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
              ) : (
                // No Property View Cont
                <div className="noPropertyViewCont w-full tabletLg:w-[90%] h-[38rem] relative z-[1] rounded-md p-[2rem] space-y-[0.5rem] before:content-[''] before:absolute before:z-[-1] before:top-0 before:left-0 before:w-full before:h-full before:bg-cover before:bg-no-repeat before:bg-center before:bg-no-property-found-image before:opacity-90">
                  <p className="text-theme-blue text-[3rem] leading-[3.4rem] font-bold">
                    {activeTab === "drafted"
                      ? "No Saved Draft"
                      : "No Properties Found"}
                  </p>
                  <p className="text-neutral-700 text-[1.8rem] leading-[2.5rem] font-semibold">
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
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
