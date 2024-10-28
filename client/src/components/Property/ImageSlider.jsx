import { useRef, useState } from "react";

// Import Swiper React component and its styles & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ImageSlider = ({ images, isOpenSlider }) => {
  const swiperRef = useRef(null);

  return (
    <div className="fixed z-[990] top-0 left-0 bottom-0 right-0 bg-[#222] flex justify-center items-center">
      <div className="w-full tabletRg:w-[90%] laptopSm:w-[80%] relative flex items-center justify-center bg-transparent rounded-md overflow-hidden transition-all hover:bg-[#ffffff20] group/picture">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          loop={images?.length > 1 ? true : false}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="width: 1rem; height: 1rem;"></span>`;
            },
          }}
          className="mySwiper w-full aspect-video cursor-grab rounded-lg"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images?.map((imageURL, index) => (
            <SwiperSlide key={index} className="w-full">
              <img
                className="w-full h-full object-contain"
                src={imageURL}
                alt="PropertyImage"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="previous hidden tabletRg:block absolute left-0 z-[5] bg-[#ffffffa0] text-[2.8rem] text-neutral-800 px-[0.4rem] py-[1rem] rounded-r-md transition-all translate-x-[-101%] group-hover/picture:translate-x-[0%]"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="next hidden tabletRg:block absolute right-0 z-[5] bg-[#ffffffa0] text-[2.8rem] text-neutral-800 px-[0.4rem] py-[1rem] rounded-l-md transition-all translate-x-[101%] group-hover/picture:translate-x-[0%]"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Cancel Image Slider Btn */}
      <button
        onClick={() => isOpenSlider(false)}
        className="text-[2.8rem] bg-white text-neutral-700 absolute top-[0%] left-[0%] py-[0.5rem] px-[1rem] rounded-md"
      >
        <FaArrowLeftLong />
      </button>
    </div>
  );
};

export default ImageSlider;
