import React from "react";

// Import React Icons
import { FaRegImage } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const PropertyDetails = () => {
  return (
    <div className="w-full flex flex-col gap-[6rem] p-[2rem]">
      {/* Property Title & Property Images */}
      <div className="w-full">
        {/* Property Images */}
        <section className="w-full laptopSm:max-h-[60dvh] relative z-[1] grid grid-cols-5 grid-rows-2 gap-[1rem] overflow-hidden">
          {[
            "/src/assets/Properties/house-02.jpg",
            "/src/assets/Properties/room-05.jpg",
            "/src/assets/Properties/room-04.jpg",
            "/src/assets/Properties/balcony-02.jpg",
          ].map((imageURL, index) => (
            <div
              className={`size-full relative shadow-lg hover:brightness-90 transition-all rounded-2xl cursor-pointer ${
                index === 0 ? "col-span-3 row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              <img
                src={imageURL}
                alt="Property"
                className={`size-full object-cover rounded-2xl`}
              />
            </div>
          ))}

          <div className="size-full flex items-center justify-center gap-[0.5rem] bg-neutral-200 shadow-lg hover:brightness-90 transition-all rounded-2xl cursor-pointer">
            <span className="text-[1.6rem] leading-[1.6rem] font-medium pointer-events-none">
              +5 Photos
            </span>
            <FaChevronRight size="1.5rem" />
          </div>
        </section>

        {/* Property Title */}
        {/* <h2 className="text-[2.3rem] leading-[2.3rem] text-theme-blue font-bold">
          Appartment For Sale
        </h2> */}
      </div>
    </div>
  );
};

export default PropertyDetails;
