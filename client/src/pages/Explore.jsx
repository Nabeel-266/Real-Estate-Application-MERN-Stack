import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { getAllProperties } from "../api/propertyAPI's";

// Import Swiper React component and its styles & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import React Icons
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { BiArea, BiFullscreen } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineTimer } from "react-icons/md";

// Import Component
import FilterationDrawer from "../components/Explore/FilterationDrawer";
import LoadingCards from "../components/LoadingCards";
import PagePagination from "../components/Pagination";
import Footer from "../components/Footer";
import { cities } from "../lib/dummyData";

const Explore = () => {
  const sentinelTopRef = useRef(null);
  const sentinelBottomRef = useRef(null);
  const mapRef = useRef(null);
  const swiperRefs = useRef([]);
  const [isSticky, setIsSticky] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const purpose = searchParams.get("purpose");
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState(null);
  const [propertyDataInfo, setPropertyDataInfo] = useState(null);

  useEffect(() => {
    const observerTop = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!!entry.isIntersecting);
      },
      { threshold: [0] }
    );

    const observerBottom = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFixed(false); // Stop being fixed when footer comes into view
        } else {
          setIsFixed(true); // Become fixed again when footer is out of view
        }
      },
      { threshold: [0] }
    );

    if (sentinelTopRef.current) {
      observerTop.observe(sentinelTopRef.current);
    }

    if (sentinelBottomRef.current) {
      observerBottom.observe(sentinelBottomRef.current);
    }

    return () => {
      if (sentinelTopRef.current) {
        observerTop.unobserve(sentinelTopRef.current);
      }
      if (sentinelBottomRef.current) {
        observerBottom.unobserve(sentinelBottomRef.current);
      }
    };
  }, []);

  // Call Get Properties API Funtion according to Search Query Params
  useEffect(() => {
    const queryParams = getAllQueryParams();
    getPropertiesAccordingQuery(queryParams);
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [searchParams]);

  const handleFullScreen = () => {
    mapRef.current.requestFullscreen
      ? mapRef.current.requestFullscreen()
      : // Firefox
      mapRef.current.mozRequestFullScreen
      ? mapRef.current.mozRequestFullScreen()
      : // Chrome, Safari & Opera
      mapRef.current.webkitRequestFullscreen
      ? mapRef.current.webkitRequestFullscreen()
      : // IE/Edge 11
        mapRef.current.msRequestFullscreen();
  };

  const getCityCoordinates = (city) => {
    const cityCoordinates = cities.find((c) => c.name === city)?.coordinates;
    return cityCoordinates;
  };

  // Get all query parameters as an object
  const getAllQueryParams = () => {
    return Object.fromEntries(
      [...searchParams.entries()].map(([key, value]) => [key, value])
    );
  };

  // Get Properties API Funtion
  const getPropertiesAccordingQuery = async (queryParams) => {
    setLoading(true);
    try {
      const result = await getAllProperties(queryParams);

      setPropertyData(result.propertyData);
      setPropertyDataInfo(result.propertyDataInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exploreCont w-full min-h-dvh pt-[6rem] flex flex-col gap-[4rem]">
      <div className="mx-[4%]">
        {/* Property Filtered Tab */}
        <FilterationDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        {/* Showing Result Text Topbar */}
        <div className="w-full flex items-center justify-between gap-[3rem] py-[1rem]">
          {loading ? (
            <p className="text-[1.8rem] leading-[2.2rem] font-medium text-neutral-700">
              Finding Results ...
            </p>
          ) : (
            <>
              {propertyData?.length ? (
                <p className="text-[1.6rem] leading-[2.2rem] font-medium text-neutral-700">
                  Showing Results for{" "}
                  <span className="font-semibold">
                    {category === "All" || !category
                      ? "All Properties"
                      : category === "Plot"
                      ? "s"
                      : ` ${category} Properties`}
                  </span>
                  <br />
                  in
                  <span className="font-semibold">
                    {" "}
                    {city === "All" || !city
                      ? "ALL CITIES"
                      : city.toUpperCase()}
                  </span>
                </p>
              ) : (
                <p className="text-[1.8rem] leading-[2.2rem] font-medium text-neutral-700">
                  Results not Found
                </p>
              )}
            </>
          )}

          {/* Filter Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex justify-center items-center gap-[0.6rem] p-[0.4rem] tabletSm:px-[1rem] tabletSm:py-[0.6rem] text-[1.6rem] leading-[1.6rem] font-semibold bg-white border-theme-blue border-[0.2rem] text-theme-blue rounded-md whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all active:scale-[0.98]"
          >
            <HiMiniAdjustmentsHorizontal className="text-[2.5rem] tabletSm:text-[2rem]" />
            <span className="hidden tabletSm:inline">Filter Results</span>
          </button>
        </div>

        {/* Top Sentinel Scroll Content */}
        <div ref={sentinelTopRef}></div>

        {/* Result Display Area */}
        {loading ? (
          <div className="w-full flex items-start justify-between py-[2rem]">
            {/* Loading Card */}
            <div className="loadingCardsCont w-full laptopSm:w-[56%] px-[2%] grid grid-cols-1 mobileRg:grid-cols-1 tabletSm:grid-cols-2 tabletLg:grid-cols-3 laptopSm:grid-cols-2 gap-[4rem_3rem] place-items-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <LoadingCards key={index} type="noButton" />
              ))}
            </div>

            {/* Loading Map */}
            <div className="w-[44%] h-[75dvh] hidden laptopSm:block bg-neutral-200 animate-pulse mx-[2%]">
              <img
                src="https://i.pinimg.com/originals/b7/87/32/b787320a4743e7c5ce9c36028834b378.png"
                alt="LoadingMap"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <>
            {propertyData?.length ? (
              <div className="w-full h-full flex justify-between">
                {/* Property Cards Side */}
                <div className="w-full laptopSm:w-[60%] laptopRg:w-[55%] py-[2rem] px-[2%] mobileRg:px-0 tabletSm:px-[2%] tabletLg:px-0 laptopSm:px-[2%] flex flex-col gap-[5rem]">
                  {/* Property Cards Cont */}
                  <div className="grid grid-cols-1 mobileRg:grid-cols-1 tabletSm:grid-cols-2 tabletLg:grid-cols-3 laptopSm:grid-cols-2 gap-[3rem] place-items-center">
                    {/* Property Cards */}
                    {propertyData?.map((property, index) => (
                      <div
                        key={property?._id}
                        className="propertyCard w-full min-w-[22rem] relative bg-white overflow-hidden shadow-[0px_5px_15px_#e0e0e0] rounded-xl flex flex-col mobileRg:flex-row tabletSm:flex-col"
                      >
                        {/* Card Image */}
                        <div className="imageArea relative flex items-center w-full mobileRg:w-[45%] tabletSm:w-full h-[22rem] mobileRg:h-[18rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:h-[50%] before:bg-gradient-to-b to-[#30303080] from-transparent before:pointer-events-none group/picture">
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
                            onClick={() =>
                              swiperRefs.current[index]?.slidePrev()
                            }
                            className="previous absolute left-[4%] z-[5] bg-[#ffffffa0] outline-none text-[2.4rem] text-neutral-800 hover:scale-[1.1] p-[0.5rem] rounded-full transition-all scale-0 group-hover/picture:scale-100"
                          >
                            <FaChevronLeft />
                          </button>

                          <button
                            onClick={() =>
                              swiperRefs.current[index]?.slideNext()
                            }
                            className="next absolute right-[4%] z-[5] bg-[#ffffffa0] outline-none text-[2.4rem] text-neutral-800 hover:scale-[1.1] p-[0.5rem] rounded-full transition-all scale-0 group-hover/picture:scale-100"
                          >
                            <FaChevronRight />
                          </button>

                          {!purpose && (
                            <span className="absolute z-10 top-0 right-0 text-[1.4rem] leading-[1.2rem] font-semibold rounded-md bg-neutral-800 text-theme-yellow px-[0.8rem] py-[0.4rem]">
                              For {property?.purpose}
                            </span>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="cardContent w-full mobileRg:w-[55%] tabletSm:w-full flex flex-col justify-between gap-[1rem] p-[1rem] mobileRg:px-[1.5rem] mobileRg:py-[2rem] tabletSm:p-[1rem] text-neutral-700">
                          {/* Type */}
                          <div className="type">
                            <p className="type relative flex items-center text-[1.7rem] leading-[1.7rem] font-semibold pl-[1.8rem] before:content-[''] before:w-[1rem] before:h-[1rem] before:bg-theme-yellow before:absolute before:left-0 before:rounded-full">
                              {property?.type}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="price flex items-end gap-[0.4rem] text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue select-none">
                            <span>PKR</span>
                            <span className="text-[2rem] leading-[2rem] font-bold">
                              {property?.price?.label}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="w-full flex items-center gap-[1rem] text-[1.55rem] leading-[1.5rem] font-semibold select-none text-neutral-600">
                            {/* Bedroom */}
                            {property?.bedroom && (
                              <abbr title="Bedroom" className="no-underline ">
                                <span className="bed flex items-center gap-[0.5rem]">
                                  <LiaBedSolid size="1.7rem" />{" "}
                                  <span>{property.bedroom}</span>
                                </span>
                              </abbr>
                            )}

                            {/* Bathroom */}
                            {property?.bathroom && (
                              <abbr title="Bathroom" className="no-underline">
                                <span className="bath flex items-center gap-[0.5rem]">
                                  <LuBath size="1.5rem" />{" "}
                                  <span>{property.bathroom}</span>
                                </span>
                              </abbr>
                            )}

                            {/* Size */}
                            <abbr title="Size" className="no-underline">
                              <span className="area flex items-center gap-[0.5rem]">
                                <BiArea size="1.7rem" />{" "}
                                <span>{property?.size}</span>
                              </span>
                            </abbr>
                          </div>

                          {/* City */}
                          <div className="city flex items-center gap-[0.5rem] text-[1.6rem] text-neutral-600">
                            <HiOutlineLocationMarker />
                            <span className="leading-[1.7rem] font-semibold">
                              {property?.city}
                            </span>
                          </div>

                          {/* Added Timing */}
                          <div className="w-full flex items-center justify-between mt-[0.2rem]">
                            <span className="text-neutral-600 text-[1.5rem] leading-[1.5rem] font-semibold rounded-md">
                              Added in
                            </span>

                            <span className="area text-[1.5rem] leading-[1.5rem] font-semibold text-neutral-600 flex items-center gap-[0.4rem]">
                              <MdOutlineTimer size="1.5rem" /> 2m ago
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full">
                    <PagePagination propertyDataInfo={propertyDataInfo} />
                  </div>
                </div>

                {/* Property Map Location Side  */}
                <div className="w-[40%] laptopRg:w-[45%] min-h-full relative hidden laptopSm:flex items-start justify-center py-[2rem]">
                  <section
                    ref={mapRef}
                    className={`${
                      isSticky
                        ? "sticky w-[94%] top-0 left-0 h-[75dvh]"
                        : isFixed
                        ? "fixed w-[35%] laptopRg:w-[39%] top-[8rem] h-[85dvh]"
                        : "absolute w-[94%] bottom-[2rem] h-[85dvh]"
                    }`}
                  >
                    <div className="mapCont w-full h-full relative border-[0.2rem] border-neutral-200 rounded-xl shadow-xl shadow-neutral-200 overflow-hidden">
                      <button
                        onClick={handleFullScreen}
                        className="text-[2.2rem] p-[0.3rem] bg-white text-neutral-700 absolute z-[1] top-[1rem] right-[1rem]"
                      >
                        <BiFullscreen />
                      </button>
                      <Map
                        // defaultCenter={[24.8546842, 67.0207055]}
                        defaultCenter={
                          city ? getCityCoordinates(city) : [30.3753, 69.3451]
                        }
                        defaultZoom={city ? 10 : 5}
                        minZoom={4}
                        // onClick={handleMapClick}
                      >
                        {propertyData.map((property, index) => (
                          <Marker
                            key={index}
                            width={35}
                            color="#082835"
                            anchor={[
                              property.coordinates.lat,
                              property.coordinates.lng,
                            ]}
                            payload={property.id}
                            onClick={({ event, anchor, payload }) => {
                              // Handle marker click, if needed
                              console.log(`Clicked marker with ID: ${payload}`);
                            }}
                          />
                        ))}

                        <ZoomControl />
                      </Map>
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              // No Property Found
              <div className="w-full h-[calc(100dvh-15rem)] flex flex-col items-center justify-center text-center text-neutral-700">
                <img
                  src="/src/assets/no-property-data.png"
                  alt="property-not-found"
                  className="w-[30rem] select-none"
                />
                <p className="text-[2.5rem] font-bold">NO PROPERTY FOUND</p>
                <p className="text-[1.6rem] tabletSm:text-[1.8rem] font-semibold mb-[8rem]">
                  We don't have any property exist that matches to your criteria
                </p>
              </div>
            )}
          </>
        )}
        {/* Bottom Sentinel Scroll Content */}
        <div ref={sentinelBottomRef}></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Explore;
