import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Map, Marker, ZoomControl } from "pigeon-maps";

// Import Swiper React component and its styles & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import Component
import FilterationDrawer from "../components/Explore/FilterationDrawer";

// Import React Icons
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { BiArea, BiFullscreen } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineTimer } from "react-icons/md";

const images = [
  "/src/assets/Properties/house-02.jpg",
  "/src/assets/Properties/house-01.jpg",
  "/src/assets/Properties/room-04.jpg",
];

const Explore = () => {
  const mapRef = useRef(null);
  const swiperRefs = useRef([]);
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const city = searchParams.get("city");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [0] }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

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
          <p className="text-[1.6rem] leading-[2.2rem] font-medium text-neutral-700">
            Showing Results for{" "}
            <span className="font-semibold">
              {category === "All" || !category ? "" : category}
              {category !== "Plot" ? " Properties" : "s"}
            </span>
            <br />
            in
            <span className="font-semibold">
              {" "}
              {city === "All" || !city ? "ALL CITIES" : city.toUpperCase()}
            </span>
          </p>

          {/* Filter Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex justify-center items-center gap-[0.6rem] p-[0.4rem] tabletSm:px-[1rem] tabletSm:py-[0.6rem] text-[1.6rem] leading-[1.6rem] font-semibold bg-white border-theme-blue border-[0.2rem] text-theme-blue rounded-md whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all active:scale-[0.98]"
          >
            <HiMiniAdjustmentsHorizontal className="text-[2.5rem] tabletSm:text-[2rem]" />
            <span className="hidden tabletSm:inline">Filter Results</span>
          </button>
        </div>

        {/* Result Display Area */}
        <div className="w-full flex justify-between">
          {/* Property Cards Side */}
          <div className="w-[55%] py-[2rem] px-[2%]">
            <div className="grid grid-cols-1 mobileRg:grid-cols-1 laptopSm:grid-cols-2 gap-[3rem] place-items-center">
              {/* Property Cards */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                <div
                  key={index}
                  className="propertyCard w-full min-w-[22rem] relative bg-white overflow-hidden shadow-[0px_20px_30px_#d0d0d0] rounded-xl"
                >
                  {/* Card Image */}
                  <div className="imageArea relative flex items-center w-full h-[18rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:h-[50%] before:bg-gradient-to-b to-[#30303080] from-transparent before:pointer-events-none group/picture">
                    <Swiper
                      modules={[Pagination, Navigation]}
                      slidesPerView={1}
                      loop={images?.length > 1 ? true : false}
                      pagination={{ clickable: true }}
                      className="mySwiper w-full h-full cursor-grab"
                      onSwiper={(swiper) => {
                        swiperRefs.current[index] = swiper;
                      }}
                    >
                      {images?.map((imageURL, index) => (
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
                    <div className="typePurpose flex">
                      {/* Type */}
                      <p className="type relative flex items-center text-[1.7rem] leading-[1.7rem] font-semibold pl-[1.8rem] before:content-[''] before:w-[1rem] before:h-[1rem] before:bg-theme-yellow before:absolute before:left-0 before:rounded-full">
                        Appartment
                      </p>
                    </div>

                    {/* Price */}
                    <div className="price flex items-end gap-[0.4rem] text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue select-none">
                      <span>PKR</span>
                      <span className="text-[2rem] leading-[2rem] font-bold">
                        450,000,00
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

                    {/* Added Timing */}
                    <div className="w-full flex items-center justify-between mt-[0.2rem]">
                      <span className="text-neutral-600 text-[1.4rem] leading-[1.4rem] font-semibold rounded-md">
                        Added in
                      </span>

                      <span className="area text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-600 flex items-center gap-[0.3rem]">
                        <MdOutlineTimer size="1.6rem" /> 2 minutes ago
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Map Location Side */}
          <div className="w-[45%] h-full relative flex items-center justify-center py-[2rem]">
            <div ref={sentinelRef}></div>
            <section
              ref={mapRef}
              className={`w-[52rem] ${
                isSticky
                  ? "fixed top-[8rem] h-[54rem]"
                  : "sticky top-[0rem] h-[48rem]"
              }`}
            >
              <div className="mapCont w-full h-full relative border-[0.2rem] border-neutral-200 rounded-xl shadow-xl shadow-neutral-300 overflow-hidden">
                <button
                  onClick={handleFullScreen}
                  className="text-[2.2rem] p-[0.3rem] bg-white text-neutral-700 absolute z-[1] top-[1rem] right-[1rem]"
                >
                  <BiFullscreen />
                </button>
                <Map
                  defaultCenter={[24.8546842, 67.0207055]}
                  defaultZoom={12}
                  minZoom={4}
                  // onClick={handleMapClick}
                >
                  <Marker
                    width={35}
                    anchor={[24.8546842, 67.0207055]}
                    color="#082835"
                  />
                  <ZoomControl />
                </Map>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
