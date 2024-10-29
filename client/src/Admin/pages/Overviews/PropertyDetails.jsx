import React, { useRef, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { landmarksNearby } from "../../../lib/dummyData";

// Import React Icons
import { FaChevronRight } from "react-icons/fa6";
import { LuBath } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { BiArea, BiFullscreen } from "react-icons/bi";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";

// Import Components
import ImageSlider from "../../../components/Property/ImageSlider";

const propertyImages = [
  "/src/assets/Properties/house-02.jpg",
  "/src/assets/Properties/room-05.jpg",
  "/src/assets/Properties/room-04.jpg",
  "/src/assets/Properties/balcony-02.jpg",
];

const PropertyDetails = () => {
  const mapRef = useRef(null);
  const [isOpenImageSlider, setIsOpenImageSlider] = useState(false);

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
    <div className="w-full p-[2rem]">
      {/* Property Images & Property Details */}
      <div className="w-full flex flex-col">
        {/* Property Images */}
        <section className="w-full laptopSm:max-h-[60dvh] relative z-[1] grid grid-cols-5 grid-rows-2 gap-[1rem]">
          {propertyImages.map((imageURL, index) => (
            <div
              key={index}
              onClick={() => setIsOpenImageSlider(true)}
              className={`size-full relative shadow-lg shadow-[#00000010] hover:brightness-90 transition-all rounded-2xl cursor-pointer ${
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

          <div className="size-full flex items-center justify-center gap-[0.5rem] bg-neutral-200 shadow-lg shadow-[#00000010] hover:brightness-90 transition-all rounded-2xl cursor-pointer">
            <span className="text-[1.6rem] leading-[1.6rem] font-medium pointer-events-none">
              +5 Photos
            </span>
            <FaChevronRight size="1.5rem" />
          </div>
        </section>

        {/* Property Details & Info */}
        <div className="w-full flex gap-[4%]">
          {/* Details Side */}
          <div className="w-[58%]">
            {/* Primary Details */}
            <section className="w-full flex flex-col gap-[1.5rem] py-[2rem]">
              {/* Title */}
              <h2 className="text-[2.3rem] leading-[2.3rem] text-neutral-800 font-bold">
                Appartment For Sale
              </h2>

              {/* Price */}
              <p className="space-x-[0.8rem] text-theme-blue select-none">
                <span className="text-[1.7rem] leading-[1.8rem] font-semibold">
                  PKR
                </span>
                <span className="text-[2.3rem] leading-[1.8rem] font-bold">
                  2.4 Crore
                </span>
              </p>

              {/* City */}
              <p className="flex items-center gap-[0.5rem] text-[1.8rem] leading-[1.8rem] text-neutral-800  font-semibold">
                <HiOutlineLocationMarker size="1.7rem" />
                <span>Dera Ghazi Khan</span>
              </p>

              {/* Size */}
              <p className="flex items-center gap-[0.5rem] text-[1.8rem] leading-[1.8rem] text-neutral-800 font-semibold">
                <BiArea size="1.9rem" />
                <span>1200 Sq.ft</span>
              </p>

              {/* Bedroom & Bathroom */}
              <div className="w-full flex items-center gap-[2rem] text-[1.6rem] leading-[1.6rem] text-neutral-800 font-semibold select-none mt-[0.5rem]">
                {/* Bedroom */}
                <p className="flex items-center gap-[0.6rem] px-[1rem] py-[0.6rem] bg-slate-200 rounded-lg">
                  <LiaBedSolid size="2rem" />
                  <span className="mt-[0.2rem]">4 Bedroom</span>
                </p>

                {/* Bathroom */}
                <p className="bath flex items-center gap-[0.6rem] px-[1rem] py-[0.7rem] bg-slate-200 rounded-lg">
                  <LuBath size="1.8rem" />
                  <span className="mt-[0.2rem]">3 Bathroom</span>
                </p>
              </div>
            </section>

            {/* Secondary Details */}
            <section className="w-full flex flex-col">
              {/* Condition */}
              <div className="border-t-[0.1rem] border-neutral-200 py-[1.4rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Condition
                </h6>
                <p className="flex items-center gap-[0.8rem] text-[1.6rem] font-semibold text-neutral-700">
                  <span>Excellent - in a good shape and well maintained</span>
                </p>
              </div>

              {/* Description */}
              <div className="border-t-[0.1rem] border-neutral-200 py-[1.4rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Description
                </h6>
                <p className="flex items-center gap-[0.8rem] text-[1.6rem] font-semibold text-neutral-700">
                  <span>This is my beautiful house where you have seen</span>
                </p>
              </div>

              {/* Features */}
              <div className="border-t-[0.1rem] border-neutral-200 py-[1.4rem]">
                <h6 className="text-[2rem] leading-[2rem] font-bold select-none text-theme-blue">
                  Features
                </h6>

                {true && (
                  <div className="flex flex-wrap gap-[1rem] mt-[1.2rem]">
                    {[
                      "2 TV Lounge",
                      "1 Store Room",
                      "1 Kitchen",
                      "Corner Plot",
                      "Corner Plot",
                      "Corner Plot",
                      "Corner Plot",
                      "Corner Plot",
                    ].map((feature, index) => (
                      <span
                        key={index}
                        className="text-[1.5rem] leading-[1.5rem] font-semibold text-neutral-800 p-[0.8rem] flex items-center gap-[1rem] bg-neutral-200 rounded-md whitespace-nowrap"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Near By Places */}
              <div className="border-t-[0.1rem] border-neutral-200 py-[1.4rem]">
                <h6 className="text-[2rem] font-bold select-none text-theme-blue">
                  Near by Facility
                </h6>

                {true && (
                  <ul className="flex flex-wrap gap-[2.5rem] mt-[1.2rem]">
                    {["Masjid", "Markets", "Parks", "Hospitals"].map(
                      (place, index) => (
                        <li
                          key={index}
                          className="text-[1.6rem] leading-[1.8rem] font-semibold text-neutral-800 flex items-end gap-[1rem] rounded-lg whitespace-nowrap "
                        >
                          <img
                            src={`https://res.cloudinary.com/dnwt1ltlm/image/upload/v1724891736/NAB_Estate/Places/${place}.png`}
                            alt="Place"
                            className="size-[2.2rem]"
                          />
                          <span>{place}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </section>
          </div>

          {/* Info Side */}
          <div className="w-[38%]">
            {/* Status */}
            <div className="flex flex-col items-end space-y-[0.6rem] font-semibold text-neutral-800 px-[0.5rem] py-[2.4rem]">
              <h5 className="text-[1.5rem] leading-[1.5rem] bg-yellow-300 px-[1rem] py-[0.4rem] rounded-full">
                Pending On
              </h5>
              <p className="text-[1.5rem] leading-[1.5rem]">
                September 22 - 2023
              </p>
            </div>

            {/* Location Map */}
            <div
              ref={mapRef}
              className="w-full h-[30rem] relative border-[0.2rem] border-neutral-300 rounded-xl shadow-xl shadow-neutral-200 overflow-hidden"
            >
              <button
                onClick={handleFullScreen}
                className="text-[2.2rem] p-[0.3rem] bg-white text-neutral-700 absolute z-[1] top-[1rem] right-[1rem]"
              >
                <BiFullscreen />
              </button>

              <Map
                defaultCenter={[24.8607, 67.0011]}
                defaultZoom={12}
                minZoom={4}
              >
                {/* Marker */}
                <Marker
                  width={35}
                  color="#082835"
                  anchor={[24.8607, 67.0011]}
                />

                {/* Zoom Control */}
                <ZoomControl />
              </Map>
            </div>
          </div>
        </div>
      </div>

      {/* Property Images Slider */}
      {isOpenImageSlider && (
        <ImageSlider
          images={propertyImages}
          isOpenSlider={setIsOpenImageSlider}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
