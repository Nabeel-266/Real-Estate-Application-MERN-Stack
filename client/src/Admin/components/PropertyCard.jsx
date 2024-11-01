import React from "react";

// Import React Icons
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiArea } from "react-icons/bi";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-[20rem] object-cover"
        />
        <div className="absolute top-[1.4rem] right-0">
          <span
            className={`pl-[1rem] pr-[0.5rem] py-[0.3rem] rounded-l-full text-[1.4rem] leading-[1.4rem] text-theme-blue font-bold select-none ${
              property.status === "Sold"
                ? "bg-green-400"
                : property.status === "Rented"
                ? "bg-blue-400"
                : "bg-yellow-400"
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="w-full px-[1.2rem]">
        {/* Property Info */}
        <div className="py-[1.2rem]">
          <h3 className="text-[1.8rem] leading-[1.8rem] font-bold text-gray-800 mb-[0.7rem]">
            {property.type}
          </h3>

          <div className="flex items-center gap-[0.4rem] font-medium text-neutral-700 mb-[1.2rem]">
            <HiOutlineLocationMarker size="1.3rem" />
            <span className="text-[1.3rem] leading-[1.3rem]">
              {property.city}
            </span>
          </div>

          <div className="text-[1.55rem] leading-[1.6rem] font-bold text-theme-blue mb-[1rem]">
            PKR {property.price.toLocaleString()}
          </div>

          <div className="text-[1.35rem] leading-[1.4rem] font-semibold text-neutral-700 flex gap-[1.2rem]">
            <p className="flex gap-[0.4rem]">
              <BiArea size="1.4rem" /> {property.size}
            </p>

            <p>{property.bedrooms} Beds</p>

            <p>{property.bathrooms} Baths</p>
          </div>
        </div>

        {/* Agent Details */}
        <div className="relative border-t border-neutral-200 py-[1.2rem]">
          <h4 className="text-[1.5rem] leading-[1.4rem] font-semibold text-neutral-800 mb-[1rem]">
            Lead Agent
          </h4>

          <div className="flex items-center mb-[1.2rem]">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="size-[3.5rem] rounded-full mr-3 peer/agent"
            />
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="size-[8rem] rounded-xl absolute top-[1rem] right-0 hidden peer-hover/agent:block"
            />

            <div className="space-y-[0.4rem]">
              <p className="text-[1.35rem] leading-[1.3rem] font-semibold text-gray-800">
                {property.agent.name}
              </p>
              <p className="text-[1.25rem] leading-[1.3rem] font-medium text-gray-600">
                {property.agent.experienceBadge} Agent
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[0.6rem]">
            <div className="flex items-center gap-[0.4rem] text-[1.3rem] leading-[1.3rem] font-medium text-neutral-700">
              <TiPhoneOutline size="1.4rem" />
              <span>{property.agent.phone}</span>
            </div>

            <div className="flex items-center gap-[0.4rem] text-[1.3rem] leading-[1.3rem] font-medium text-neutral-700">
              <MdOutlineEmail size="1.4rem" />
              <span>{property.agent.email}</span>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="border-t py-[1.2rem]">
          <p className="text-[1.35rem] leading-[1.4rem] flex items-center gap-[0.5rem] font-semibold text-green-600 mb-[1rem]">
            <FaCheckCircle size="1.4rem" />
            <span>Transaction Finalized</span>
          </p>

          <p className="text-[1.3rem] leading-[1.3rem] font-medium text-neutral-700 mb-[0.6rem]">
            On {property.transactionDate}
          </p>

          <p className="text-[1.3rem] leading-[1.3rem] font-medium text-neutral-700">
            Finalized at <span className="font-bold">PKR 25,000,000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

// <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
//   {/* Property Image */}
//   <div className="relative">
//     <img
//       src={property.image}
//       alt={property.title}
//       className="w-full h-48 object-cover"
//     />
//     <div className="absolute top-4 right-4">
//       <span
//         className={`
//                                     px-3 py-1 rounded-full text-sm font-semibold
//                                     ${
//                                       property.status === "Sold"
//                                         ? "bg-green-500 text-white"
//                                         : property.status === "Rented"
//                                         ? "bg-blue-500 text-white"
//                                         : "bg-yellow-500 text-white"
//                                     }
//                                 `}
//       >
//         {property.status}
//       </span>
//     </div>
//   </div>

//   {/* Property Details */}
//   <div className="p-6">
//     <h3 className="text-xl font-bold text-gray-800 mb-2">
//       {property.type}
//     </h3>

//     <div className="flex items-center text-gray-600 mb-2">
//       <FaMapMarkerAlt className="mr-2" />
//       <span>{property.city}</span>
//     </div>

//     <div className="text-2xl font-bold text-green-600 mb-4">
//       ${property.price.toLocaleString()}
//     </div>

//     <p className="text-gray-600 mb-4">{property.description}</p>

//     {/* Property Features */}
//     <div className="flex gap-4 mb-4">
//       <div className="flex items-center">
//         <span className="text-gray-600">{property.bedrooms} Beds</span>
//       </div>
//       <div className="flex items-center">
//         <span className="text-gray-600">{property.bathrooms} Baths</span>
//       </div>
//       <div className="flex items-center">
//         <span className="text-gray-600">{property.sqft} sqft</span>
//       </div>
//     </div>

//     {/* Agent Details */}
//     <div className="border-t pt-4 mt-4">
//       <h4 className="text-lg font-semibold text-gray-800 mb-2">
//         Agent Details
//       </h4>
//       <div className="flex items-center mb-2">
//         <img
//           src={property.agent.avatar}
//           alt={property.agent.name}
//           className="w-10 h-10 rounded-full mr-3"
//         />
//         <div>
//           <p className="font-semibold text-gray-800">
//             {property.agent.name}
//           </p>
//           <p className="text-sm text-gray-600">{property.agent.role}</p>
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex items-center text-gray-600">
//           <FaPhone className="mr-2" />
//           <span>{property.agent.phone}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaEnvelope className="mr-2" />
//           <span>{property.agent.email}</span>
//         </div>
//       </div>
//     </div>

//     {/* Transaction Details */}
//     <div className="border-t pt-4 mt-4">
//       <div className="flex items-center text-green-600">
//         <FaCheckCircle className="mr-2" />
//         <span>Transaction Completed on {property.transactionDate}</span>
//       </div>
//     </div>
//   </div>
// </div>
