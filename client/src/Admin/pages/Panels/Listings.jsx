import React, { useState } from "react";
import { listingSortBy } from "../../../lib/dummyDataAdmin";

// Import React Icons
import { HiHomeModern } from "react-icons/hi2";
import { FaShop } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { PiStarFourFill } from "react-icons/pi";

// Inport Components
import ListingsCharts from "../../components/Charts/ListingsCharts";
import SortDropdown from "../../components/Dropdowns/SortDropdown";
import FilterDropdown from "../../components/Dropdowns/FilterDropdown";
import PropertyCard from "../../components/PropertyCard";
import PreSelectedSelection from "../../components/Selections/PreSelectedSelection";

// Example data for cards and table
const listingsStats = [
  {
    title: "Residential Listing",
    count: 120,
    icon: <HiHomeModern />,
  },
  {
    title: "Commercial Listing",
    count: 60,
    icon: <FaShop />,
  },
  {
    title: "Plot Listing",
    count: 15,
    icon: <FaMapMarkedAlt />,
  },
];

const properties = [
  {
    images: [
      "/src/assets/Properties/house-02.jpg",
      "/src/assets/Properties/room-05.jpg",
      "/src/assets/Properties/room-04.jpg",
      "/src/assets/Properties/balcony-02.jpg",
    ],
    type: "Apartment",
    status: "Sold",
    city: "Dera Ghazi Khan",
    price: 450000,
    description: "Luxurious modern apartment with stunning city views",
    bedrooms: 3,
    bathrooms: 2,
    size: "1500 Sq. Ft",
    transactionDate: "Mar 15, 2024",
    agent: {
      name: "Amjad Daniyal",
      experienceBadge: "Senior",
      avatar: "/src/assets/Agents/agent02.png",
      phone: "03342587462",
      email: "ahmedaniyal@gmail.com",
    },
  },
  {
    images: [
      "/src/assets/Properties/house-02.jpg",
      "/src/assets/Properties/room-05.jpg",
      "/src/assets/Properties/room-04.jpg",
      "/src/assets/Properties/balcony-02.jpg",
    ],
    type: "Apartment",
    status: "Sold",
    city: "Dera Ghazi Khan",
    price: 450000,
    description: "Luxurious modern apartment with stunning city views",
    bedrooms: 3,
    bathrooms: 2,
    size: "1500 Sq. Ft",
    transactionDate: "Mar 15, 2024",
    agent: {
      name: "Amjad Daniyal",
      experienceBadge: "Senior",
      avatar: "/src/assets/Agents/agent02.png",
      phone: "03342587462",
      email: "ahmedaniyal@gmail.com",
    },
  },
  {
    images: [
      "/src/assets/Properties/house-02.jpg",
      "/src/assets/Properties/room-05.jpg",
      "/src/assets/Properties/room-04.jpg",
      "/src/assets/Properties/balcony-02.jpg",
    ],
    type: "Apartment",
    status: "Sold",
    city: "Dera Ghazi Khan",
    price: 450000,
    description: "Luxurious modern apartment with stunning city views",
    bedrooms: 3,
    bathrooms: 2,
    size: "1500 Sq. Ft",
    transactionDate: "Mar 15, 2024",
    agent: {
      name: "Amjad Daniyal",
      experienceBadge: "Senior",
      avatar: "/src/assets/Agents/agent02.png",
      phone: "03342587462",
      email: "ahmedaniyal@gmail.com",
    },
  },
];

// Dummy data to simulate listings counts based on categories
// const dummyData = {
//   "last 1 month": {
//     pending: { Residential: 20, Commercial: 25, Plot: 12 },
//     published: { Residential: 15, Commercial: 10, Plot: 8 },
//     finalized: { Residential: 18, Commercial: 22, Plot: 10 },
//   },
//   "last 2 months": {
//     pending: { Residential: 30, Commercial: 35, Plot: 20 },
//     published: { Residential: 25, Commercial: 15, Plot: 13 },
//     finalized: { Residential: 28, Commercial: 32, Plot: 18 },
//   },
// };

const Listings = () => {
  const [status, setStatus] = useState("Pending");

  return (
    <div className="w-full flex flex-col gap-[3rem] px-[2rem] pt-[2rem] pb-[4rem]">
      {/* Section Top */}
      <section className="w-full flex justify-between gap-[2rem]">
        {listingsStats.map((stat, index) => (
          <div
            key={index}
            className="w-[32%] min-w-[26rem] max-w-[33rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1.5rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Plot")
                  ? "text-[5.8rem] mb-[0.1rem] "
                  : "text-[6.1rem]"
              }`}
            >
              {stat.icon}
            </div>

            <div className="relative z-10 h-fit flex flex-col items-start gap-[1rem] text-white px-[1.5rem] pt-[1.2rem] pb-[1.2rem]">
              <h2 className="text-[1.6rem] leading-[1.6rem] font-bold whitespace-nowrap">
                {stat.title}
              </h2>

              <p className="flex items-center gap-[1rem] text-[3rem] leading-[2.8rem] font-bold">
                <TbArrowBigRightLinesFilled size="2.2rem" />
                <span className="text-theme-yellow ">{stat.count}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Section Middle */}
      <section className="w-full space-y-[1rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
        <ListingsCharts />
      </section>

      {/* Section Bottom */}
      <section className="w-full min-h-[40rem] bg-neutral-100 relative overflow-clip rounded-xl">
        <div className="w-full bg-neutral-100 border-neutral-300 border-[0.2rem] rounded-xl px-[1rem]">
          {/* Top Header */}
          <div className="w-full flex items-end justify-between px-[0.5rem] py-[1.2rem] border-b-[0.2rem] border-neutral-300">
            <h2 className="text-[2.1rem] leading-[2rem] font-bold text-theme-blue">
              Pending Listing
            </h2>

            {/* Sort & Filter */}
            <div className="flex items-center gap-[1rem] ">
              <div className="relative">
                <SortDropdown dropdownData={listingSortBy} />
              </div>

              <FilterDropdown to="Properties" />
            </div>
          </div>

          {/* Listing Property Cards */}
          <div className="w-full grid grid-cols-3 gap-[1.5rem] px-[0.5rem] pt-[1.5rem] pb-[2rem]">
            {properties?.map((property, index) => (
              <PropertyCard
                key={index}
                property={property}
                index={index}
                specific={true}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listings;
