import { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required module
import { Pagination } from "swiper/modules";

// Import React Icons
import { MdOutlineWifi } from "react-icons/md";
import { PiCellSignalHighFill } from "react-icons/pi";
import { IoBatteryFullOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const AddPropertyReview = ({ propertyDetails }) => {
  const [time, setTime] = useState(new Date());
  const [isSticky, setIsSticky] = useState(false);
  const rightDivRef = useRef(null);
  const sentinelRef = useRef(null);
  const swiperRef = useRef(null);

  const {
    purpose,
    type,
    city,
    size,
    price,
    bedroom,
    bathroom,
    condition,
    features,
    description,
    images,
    contact,
    username,
    availability,
  } = propertyDetails;

  // Initial Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatted Time
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
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

  return (
    <>
      <div ref={sentinelRef}></div>
      <section
        ref={rightDivRef}
        className={`${
          isSticky ? "fixed top-[7rem]" : "sticky top-[0rem]"
        } w-full max-w-[33rem] h-[56rem] bg-white border-x-[0.8rem] border-y-[1rem] border-theme-blue rounded-3xl flex flex-col`}
      >
        {/* Mobile View Header */}
        <header className="w-full flex items-center justify-between px-[1rem] py-[0.2rem] shadow-md">
          {/* Timing */}
          <p className="text-[1.2rem] text-neutral-800 font-semibold">
            {formatTime(time)}
          </p>

          {/* Icons */}
          <div className="topIcons flex items-center gap-[0.5rem] text-neutral-600">
            <PiCellSignalHighFill size="1.5rem" />
            <MdOutlineWifi size="1.6rem" />
            <IoBatteryFullOutline size="2.2rem" />
          </div>
        </header>

        {/* Mobile View Screen */}
        <div className="screenCont w-full flex-1 overflow-auto scrollbar-slim-y select-none">
          {/* Property Image Cont */}
          <div className="w-full h-[18rem] border-b-[0.2rem] border-neutral-200">
            {!images ? (
              <div className="noImageView w-full h-full flex items-center justify-center bg-neutral-100">
                <FaRegImage className="text-[7rem] text-neutral-600 drop-shadow-2xl" />
              </div>
            ) : (
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                loop={images?.length > 1 ? true : false}
                pagination={{ clickable: true }}
                className="mySwiper w-full h-full cursor-grab"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
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
            )}
          </div>

          {/* Property Details Content Cont */}
          <div className="w-full flex flex-col px-[1rem] pb-[1rem]">
            {/* Primary Details */}
            <div className="primaryDetails flex flex-col gap-[1rem] py-[0.8rem] border-b-[0.1rem] border-neutral-200">
              {/* Property Type & Purpose Cont */}
              <div className="w-full flex items-end justify-between">
                {/* Type */}
                <p className="type relative flex items-center text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700 pl-[1.8rem] before:content-[''] before:w-[1rem] before:h-[1rem] before:bg-theme-yellow before:absolute before:left-0 before:rounded-sm">
                  {type}
                </p>

                {/* Purpose */}
                <span className="text-[1.5rem] leading-[1.6rem] font-semibold text-theme-blue rounded-md">
                  {purpose === "Sell" ? "For Sale" : `For ${purpose}`}
                </span>
              </div>

              {/* Property Price */}
              <div className="w-full">
                {price ? (
                  <p className="text-[1.4rem] leading-[1.4rem] text-neutral-800 font-semibold">
                    PKR{" "}
                    <span className="text-[1.8rem] leading-[1.8rem] font-bold">
                      {price}
                    </span>
                  </p>
                ) : (
                  <span className="text-[1.8rem] leading-[1.8rem] text-neutral-800 font-semibold">
                    Price
                  </span>
                )}
              </div>

              {/* Property Size & Bedrooms & Bathrooms Cont */}
              <div className="w-full flex items-center gap-[1rem] text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-700">
                {/* Bedroom */}
                {bedroom && (
                  <p className="bed flex items-center gap-[0.5rem]">
                    <LiaBedSolid size="1.6rem" className="text-theme-blue" />{" "}
                    <span>{bedroom}</span>
                  </p>
                )}

                {/* Bathroom */}
                {bathroom && (
                  <p className="bath flex items-center gap-[0.5rem]">
                    <LuBath size="1.4rem" className="text-theme-blue" />{" "}
                    <span>{bathroom}</span>
                  </p>
                )}

                {/* Size */}
                <p className="size flex items-center gap-[0.5rem] text-[1.5rem]">
                  <BiArea size="1.7rem" className="text-theme-blue" />{" "}
                  {size ? <span>{size}</span> : <span>Size</span>}
                </p>
              </div>

              {/* Property City */}
              <div className="w-full">
                {/* City */}
                <p className="size flex items-center gap-[0.5rem] text-[1.5rem] leading-[1.5rem] font-semibold text-neutral-700">
                  <HiOutlineLocationMarker size="1.7rem" />{" "}
                  {city ? <span>{city}</span> : <span>City</span>}
                </p>
              </div>
            </div>

            {/* Secondary Details */}
            <div className="secondaryDetails flex flex-col gap-[1rem] py-[1rem] border-b-[0.1rem] border-neutral-200">
              {/* Property Condition */}
              <div className="flex flex-col items-start gap-[0.5rem] text-neutral-700">
                <span className="text-[1.5rem] leading-[1.5rem] font-bold">
                  Condition
                </span>

                {condition ? (
                  <span className="text-[1.4rem] font-medium">{condition}</span>
                ) : (
                  <span className="text-[1.4rem] font-medium">
                    Your property's condition
                  </span>
                )}
              </div>

              {/* Property Description */}
              <div className="flex flex-col items-start gap-[0.5rem] text-neutral-700">
                <span className="text-[1.5rem] leading-[1.5rem] font-bold">
                  Description
                </span>

                {description ? (
                  <span className="text-[1.4rem] font-medium">
                    {description}
                  </span>
                ) : (
                  <span className="text-[1.4rem] font-medium">
                    Description comes here
                  </span>
                )}
              </div>
            </div>

            {/* Property Features */}
            <div className="flex flex-col gap-[1rem] py-[1rem] border-b-[0.1rem] border-neutral-200">
              <div className="flex flex-col items-start gap-[1rem] text-neutral-700">
                <span className="text-[1.6rem] leading-[1.6rem] font-bold">
                  Features
                </span>

                {features && (
                  <ul className="w-full flex flex-col gap-[0.5rem]">
                    {features?.map((el, index) => (
                      <li
                        key={index}
                        className="text-[1.4rem] leading-[1.4rem] font-medium text-neutral-800 bg-neutral-100 p-[0.8rem] rounded-md whitespace-nowrap"
                      >
                        {el}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-[1rem] py-[1rem] border-b-[0.1rem] border-neutral-200">
              <div className="flex flex-col items-start gap-[0.5rem] text-neutral-700">
                <span className="text-[1.5rem] leading-[1.5rem] font-bold">
                  Availability Schedule
                </span>

                {availability && (
                  <span className="text-[1.2rem] font-medium">
                    The property can be visited in the following slots:
                  </span>
                )}

                {availability && (
                  <ul className="w-full flex flex-wrap gap-[0.5rem] mt-[0.5rem]">
                    {availability?.map((el, index) => (
                      <li
                        key={index}
                        className="text-[1.4rem] leading-[1.4rem] font-medium text-neutral-800 bg-neutral-200 p-[0.8rem] rounded-md whitespace-nowrap"
                      >
                        {el}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Name & Contact Number */}
            <div className="secondaryDetails flex flex-col gap-[1rem] py-[1rem] border-b-[0.1rem] border-neutral-200">
              {/* Username */}
              <div className="flex flex-col items-start gap-[0.5rem] text-neutral-700">
                <span className="text-[1.5rem] leading-[1.5rem] font-bold">
                  Name
                </span>

                {username ? (
                  <span className="text-[1.4rem] font-medium">{username}</span>
                ) : (
                  <span className="text-[1.4rem] font-medium">Your name</span>
                )}
              </div>

              {/* Contact Number */}
              <div className="flex flex-col items-start gap-[0.5rem] text-neutral-700">
                <span className="text-[1.5rem] leading-[1.5rem] font-bold">
                  Contact Number
                </span>

                {contact ? (
                  <span className="text-[1.4rem] font-medium">{contact}</span>
                ) : (
                  <span className="text-[1.4rem] font-medium">
                    Your contact number
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddPropertyReview;

// What a nice property , there is such a illusion. I like interior and exterior both of this property
