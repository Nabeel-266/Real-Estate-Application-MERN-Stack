import { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ImageSlider = ({ images }) => {
  const swiperRef = useRef(null);

  return (
    <div className="fixed z-[990] top-0 left-0 bottom-0 right-0 bg-[#202020f0] backdrop-blur-[0.5rem] flex justify-center items-center">
      <div className="w-full tabletRg:w-[85%] laptopSm:w-[75%] relative flex items-center justify-center bg-transparent p-[1rem] rounded-xl overflow-hidden transition-all hover:bg-[#ffffff20] group/picture">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          loop={images?.length > 1 ? true : false}
          pagination={{ clickable: true }}
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
                alt="Property Image"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="previous hidden tabletRg:block absolute left-[0%] z-[5] bg-[#ffffffa0] text-[2.8rem] text-neutral-800 px-[0.4rem] py-[1rem] rounded-r-md transition-all translate-x-[-101%] group-hover/picture:translate-x-[0%]"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="next hidden tabletRg:block absolute right-[0%] z-[5] bg-[#ffffffa0] text-[2.8rem] text-neutral-800 px-[0.4rem] py-[1rem] rounded-l-md transition-all translate-x-[101%] group-hover/picture:translate-x-[0%]"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
