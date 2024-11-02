import React, { useRef, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { landmarksNearby } from "../../../lib/dummyData";

// Import React Icons
import { FaChevronRight } from "react-icons/fa6";
import { LuBath } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { BiArea, BiFullscreen } from "react-icons/bi";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { PiTagSimpleBold } from "react-icons/pi";
import { IoPricetag } from "react-icons/io5";

// Import Components
import ImageSlider from "../../../components/Property/ImageSlider";

const propertyImages = [
  "/src/assets/Properties/house-02.jpg",
  "/src/assets/Properties/room-05.jpg",
  "/src/assets/Properties/room-04.jpg",
  "/src/assets/Properties/balcony-02.jpg",
];

const timelineRecords = [
  { title: "Submission", date: "September 14, 2023", time: "12:23 PM" },
  { title: "Acceptance", date: "September 24, 2023", time: "08:12 PM" },
  { title: "Publish", date: "October 28, 2023", time: "12:10 PM" },
  { title: "Finalize", date: "January 5, 2024", time: "05:30 PM" },
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
        {/* Property Specifications */}
        <section className="w-full flex justify-between bg-white px-[0.5rem] rounded-xl mb-[2rem]">
          {/* Left Side */}
          <div className="flex flex-col">
            <h2 className="text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold mb-[1.5rem]">
              Appartment For Sale
            </h2>

            {/* City */}
            <p className="flex items-center gap-[0.5rem] text-[1.7rem] leading-[1.7rem] text-neutral-800 font-semibold mb-[0.8rem]">
              <HiOutlineLocationMarker size="1.8rem" />
              <span>Dera Ghazi Khan</span>
            </p>

            {/* Size */}
            <p className="flex items-center gap-[0.5rem] text-[1.7rem] leading-[1.7rem] text-neutral-800 font-semibold mb-[1.5rem]">
              <BiArea size="1.8rem" />
              <span>1200 Sq.ft</span>
            </p>

            {/* Bedroom & Bathroom */}
            <div className="w-full flex items-center gap-[1.2rem] text-[1.55rem] leading-[1.6rem] text-neutral-700 font-semibold select-none *:border *:border-neutral-700 *:border-dashed *:rounded-full">
              {/* Bedroom */}
              <p className="flex items-center gap-[0.6rem] px-[1rem] py-[0.4rem]">
                <LiaBedSolid size="1.9rem" />
                <span className="mt-[0.2rem]">4 Beds</span>
              </p>

              {/* Bathroom */}
              <p className="bath flex items-center gap-[0.6rem] px-[1rem] py-[0.5rem] ">
                <LuBath size="1.7rem" />
                <span className="mt-[0.2rem]">3 Bath</span>
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end justify-between">
            {/* Status */}
            <p className="text-[1.4rem] leading-[1.4rem] font-semibold text-yellow-700 bg-yellow-200 flex items-center gap-[0.4rem] px-[1.2rem] py-[0.5rem] rounded-full select-none">
              <FaDotCircle size="1.2rem" />
              Pending
            </p>

            {/* Price */}
            <p className="relative text-theme-blue px-[0.6rem] py-[0.3rem] rounded-lg border-[0.1rem] border-dashed border-theme-blue select-none mb-[0.2rem]">
              <span className="absolute top-[-1%] right-[96%]">
                <IoPricetag size="2rem" className="-rotate-12" />
              </span>

              <span className="text-[1.7rem] leading-[1.7rem] font-semibold mr-[0.8rem]">
                PKR
              </span>

              <span className="text-[2.2rem] leading-[2.2rem] font-bold">
                2.4 Crore
              </span>
            </p>
          </div>
        </section>

        {/* Property Images */}
        <section className="w-full laptopSm:max-h-[60dvh] relative z-[1] grid grid-cols-5 grid-rows-2 gap-[1rem] select-none mb-[2.5rem]">
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
          <div className="w-[60%]">
            {/* Primary Details */}
            <section className="w-full flex-col gap-[1.5rem] pb-[2.2rem] border-b-[0.1rem] border-neutral-200 mb-[1.4rem] hidden">
              {/* Title & Status */}
              <div className="w-full flex items-center justify-between">
                <h2 className="text-[2.3rem] leading-[2.3rem] text-neutral-800 font-bold">
                  Appartment For Sale
                </h2>

                <p className="text-[1.5rem] leading-[1.4rem] font-semibold text-neutral-700 flex gap-[0.5rem] px-[1.2rem] py-[0.4rem] rounded-full select-none border-[0.2rem] border-neutral-300">
                  <FaDotCircle className="text-yellow-400" />
                  Pending
                </p>
              </div>

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
              <div className="border-b-[0.1rem] border-neutral-200 pb-[1.4rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Condition
                </h6>
                <p className="flex items-center gap-[0.8rem] text-[1.6rem] font-semibold text-neutral-700">
                  <span>Excellent - in a good shape and well maintained</span>
                </p>
              </div>

              {/* Description */}
              <div className="border-b-[0.1rem] border-neutral-200 py-[1.4rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Description
                </h6>
                <p className="flex items-center gap-[0.8rem] text-[1.6rem] font-semibold text-neutral-700">
                  <span>This is my beautiful house where you have seen</span>
                </p>
              </div>

              {/* Features */}
              <div className="border-b-[0.1rem] border-neutral-200 pt-[1.4rem] pb-[1.8rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Features
                </h6>

                {true && (
                  <div className="flex flex-wrap gap-[1rem] mt-[0.5rem]">
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
              <div className="border-b-[0.1rem] border-neutral-200 pt-[1.4rem] pb-[1.8rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Near by Facility
                </h6>

                {true && (
                  <ul className="flex flex-wrap gap-[2.5rem] mt-[1.2rem]">
                    {["Masjid", "Markets", "Parks", "Hospitals"].map(
                      (place, index) => (
                        <li
                          key={index}
                          className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 flex items-end gap-[1rem] rounded-lg whitespace-nowrap "
                        >
                          <img
                            src={`https://res.cloudinary.com/dnwt1ltlm/image/upload/v1724891736/NAB_Estate/Places/${place}.png`}
                            alt="Place"
                            className="size-[2rem]"
                          />
                          <span>{place}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* Visiting Schedule */}
              <div className="pt-[1.4rem] pb-[1.8rem]">
                <h6 className="text-[1.8rem] font-bold select-none text-theme-blue">
                  Visiting Schedule
                </h6>

                {true && (
                  <div className="flex flex-wrap gap-[1.5rem] mt-[0.6rem]">
                    {["Friday", "Saturday", "Sunday"].map((days, index) => (
                      <span
                        key={index}
                        className="text-[1.5rem] leading-[1.5rem] font-semibold text-neutral-800 px-[1rem] py-[0.8rem] flex items-center gap-[1rem] bg-neutral-200 rounded-md whitespace-nowrap"
                      >
                        {days}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Timeline Record Details  */}
            <div className="w-full py-[2.5rem] border-t-[0.1rem] border-neutral-200">
              <h3 className="text-[2rem] leading-[2rem] font-bold text-theme-blue mb-[0.5rem]">
                Timeline Record
              </h3>

              <p className="text-[1.4rem] leading-[1.8rem] font-medium text-neutral-800 mb-[2rem]">
                Track milestones and updates of property with precise date and
                time logs.
              </p>

              {/* Timeline Records */}
              <div className="w-full grid grid-cols-2 gap-[3rem_2rem]">
                {timelineRecords.map(({ title, date, time }, index) => (
                  <div
                    key={index}
                    className="w-full even:self-end space-y-[0.6rem] rounded-xl"
                  >
                    <h6 className="text-[1.55rem] leading-[1.6rem] font-bold text-neutral-700">
                      {title} Timestamp
                    </h6>

                    <p className="flex items-center gap-[0.5rem] text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-700">
                      <HiMiniCalendarDays size="1.6rem" />
                      <span>On {date}</span>
                    </p>

                    <p className="flex items-center gap-[0.5rem] text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-700">
                      <HiOutlineClock size="1.6rem" />
                      <span>At {time}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="w-[36%] flex flex-col gap-[2.5rem]">
            {/* Location Map */}
            <div
              ref={mapRef}
              className="w-full h-[25rem] relative border-[0.2rem] border-neutral-300 rounded-xl shadow-xl shadow-[#00000010] overflow-hidden"
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

            {/* Lead Agent Details */}
            <section className="w-full p-[4%] bg-neutral-100 rounded-xl overflow-hidden shadow-lg shadow-[#00000010] border-[0.2rem] border-neutral-200">
              {/* Title */}
              <h4 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue select-none mb-[1.2rem]">
                Lead Agent
              </h4>

              {/* Agent Image & Identity */}
              <div className="w-full flex items-center gap-[1.2rem] mb-[1.2rem]">
                {/* Agent Image */}
                <div>
                  <img
                    src="/src/assets/Agents/agent03.png"
                    alt="Agent"
                    className="size-[4.2rem] object-cover rounded-full select-none"
                  />
                </div>

                {/* Agent Identity */}
                <div className="flex flex-col gap-[0.4rem]">
                  <h6 className="text-[1.55rem] leading-[1.55rem] font-semibold text-neutral-800">
                    Muhammad Nabeel
                  </h6>
                  <p className="text-[1.4rem] leading-[1.4rem] font-medium text-neutral-700">
                    Senior Agent
                  </p>
                </div>
              </div>

              {/* Others */}
              <div className="w-full space-y-[0.8rem]">
                {/* Email and Mobile Number */}
                <div className="w-full space-y-[0.7rem] text-neutral-700 text-[1.4rem] leading-[1.5rem] font-semibold tracking-wide px-[0.2rem] *:flex *:items-center *:gap-[0.8rem]">
                  <p>
                    <PiTagSimpleBold
                      size="1.8rem"
                      className="text-neutral-700"
                    />
                    <span>@muhammad_nabeel_91756</span>
                  </p>

                  <p>
                    <MdOutlineEmail
                      size="1.8rem"
                      className="text-neutral-700"
                    />
                    <span>nabeelmajeed266@gmail.com</span>
                  </p>

                  <p>
                    <TiPhoneOutline
                      size="1.8rem"
                      className="text-neutral-700"
                    />
                    <span>03345678564</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Presenter Details */}
            <section className="w-full p-[4%] bg-neutral-50 rounded-xl overflow-hidden shadow-lg shadow-[#00000010] border-[0.2rem] border-neutral-200">
              {/* Title */}
              <h4 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue select-none mb-[1.2rem]">
                Presenter Details
              </h4>

              {/* Name */}
              <div className="flex flex-col gap-[0.5rem] mb-[1.2rem]">
                <span className="text-[1.4rem] leading-[1.4rem] font-medium text-neutral-800 select-none">
                  Name
                </span>
                <span className="text-[1.55rem] leading-[1.55rem] font-semibold text-neutral-700">
                  Juanid Farooq
                </span>
              </div>

              {/* Account Identity */}
              <div className="flex flex-col gap-[0.6rem] mb-[1.2rem]">
                <span className="text-[1.4rem] leading-[1.4rem] font-medium text-neutral-800 select-none">
                  Account Identity
                </span>
                <span className="text-[1.55rem] leading-[1.55rem] font-semibold text-neutral-700">
                  @junaid_farooq_91266
                </span>
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-[0.6rem]">
                <span className="text-[1.4rem] leading-[1.4rem] font-medium text-neutral-800 select-none">
                  Contact Number
                </span>
                <span className="text-[1.55rem] leading-[1.55rem] font-semibold text-neutral-700">
                  +92 3345678564
                </span>
              </div>
            </section>
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

// import React from "react";
// import {
//   FaBed,
//   FaBath,
//   FaRulerCombined,
//   FaPhoneAlt,
//   FaUser,
//   FaMapMarkerAlt,
//   FaRegCalendar,
// } from "react-icons/fa";
// import { BsHouseDoor, BsTag } from "react-icons/bs";

// const property = {
//   purpose: "Sell",
//   category: "Residential",
//   type: "House",
//   city: "Karachi",
//   size: "2 Kanal",
//   price: "2,50,00,000",
//   condition: "Excellent - in a good shape and well maintained",
//   images: [
//     "/src/assets/Properties/house-02.jpg",
//     "/src/assets/Properties/room-05.jpg",
//     "/src/assets/Properties/room-04.jpg",
//     "/src/assets/Properties/balcony-02.jpg",
//   ],
//   contactNumber: "+92 3455785785",
//   username: "Muhammad Junaid",
//   bedroom: "4",
//   bathroom: "4",
//   features: [
//     "Swimming Pool",
//     "Garden",
//     "Parking",
//     "Security",
//     "Central AC",
//     "Servant Quarter",
//     "Kitchen",
//     "Balcony",
//     "Gym",
//     "Elevator",
//     "Backup Power",
//     "Gas",
//     "Water Supply",
//   ],
//   description: "This is my beautiful house where you have seen",
//   status: "drafted",
//   createdAt: "2024-08-15T05:22:35.517+00:00",
//   updatedAt: "2024-08-15T05:22:35.517+00:00",
// };

// const PropertyDetails = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Property Header */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
//                   {property.purpose}
//                 </span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
//                   {property.category}
//                 </span>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {property.type} for {property.purpose}
//               </h1>
//               <div className="flex items-center text-gray-600">
//                 <FaMapMarkerAlt className="mr-2" />
//                 <span>{property.city}</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-3xl font-bold text-green-600">
//                 PKR {property.price}
//               </p>
//               <p className="text-gray-500">{property.size}</p>
//             </div>
//           </div>
//         </div>

//         {/* Image Gallery */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           {property.images.map((image, index) => (
//             <div
//               key={index}
//               className={`rounded-lg overflow-hidden ${
//                 index === 0 ? "col-span-2 row-span-2" : ""
//               }`}
//             >
//               <img
//                 src={image}
//                 alt={`Property ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Property Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Main Details */}
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//               <h2 className="text-2xl font-bold mb-4">Property Details</h2>

//               {/* Key Features */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                 <div className="flex items-center gap-2">
//                   <FaBed className="text-gray-400 text-xl" />
//                   <div>
//                     <p className="text-sm text-gray-500">Bedrooms</p>
//                     <p className="font-semibold">{property.bedroom}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaBath className="text-gray-400 text-xl" />
//                   <div>
//                     <p className="text-sm text-gray-500">Bathrooms</p>
//                     <p className="font-semibold">{property.bathroom}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaRulerCombined className="text-gray-400 text-xl" />
//                   <div>
//                     <p className="text-sm text-gray-500">Size</p>
//                     <p className="font-semibold">{property.size}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <BsHouseDoor className="text-gray-400 text-xl" />
//                   <div>
//                     <p className="text-sm text-gray-500">Condition</p>
//                     <p className="font-semibold">{property.condition}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold mb-3">Description</h3>
//                 <p className="text-gray-600">{property.description}</p>
//               </div>

//               {/* Features */}
//               <div>
//                 <h3 className="text-xl font-semibold mb-3">Features</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {property.features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                       <span className="text-gray-600">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="md:col-span-1">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <FaUser className="text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Listed by</p>
//                     <p className="font-semibold">{property.username}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FaPhoneAlt className="text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Contact Number</p>
//                     <p className="font-semibold">{property.contactNumber}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FaRegCalendar className="text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Listed Date</p>
//                     <p className="font-semibold">
//                       {new Date(property.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
//                   Contact Seller
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;
