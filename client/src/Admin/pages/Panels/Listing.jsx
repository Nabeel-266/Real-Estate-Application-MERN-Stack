import React, { useState } from "react";

// Import React Icons
import { HiHomeModern } from "react-icons/hi2";
import { FaShop } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

// Inport Components
import ListingsBarChart from "../../components/Charts/ListingsBarChart";

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

const Listing = () => {
  const [propertyStatus, setPropertyStatus] = useState("pending");
  const [timePeriod, setTimePeriod] = useState("last 1 month");

  // Dummy data to simulate listings counts based on categories
  const dummyData = {
    "last 1 month": {
      pending: { Residential: 20, Commercial: 25, Plot: 12 },
      published: { Residential: 15, Commercial: 10, Plot: 8 },
      finalized: { Residential: 18, Commercial: 22, Plot: 10 },
    },
    "last 2 months": {
      pending: { Residential: 30, Commercial: 35, Plot: 20 },
      published: { Residential: 25, Commercial: 15, Plot: 13 },
      finalized: { Residential: 28, Commercial: 32, Plot: 18 },
    },
  };

  // Get data based on current status and time period
  const listingsData = dummyData[timePeriod][propertyStatus];

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
      <section className="w-full space-y-[1.8rem]">
        {/* Properties Bar Chart Content */}
        <div className="w-[58%] min-w-[50rem] flex flex-col gap-[1.2rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between">
            <h3 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue">
              Property Listings by Category
            </h3>

            {/* Dropdowns for selecting Property Status and Time Period */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <select
                value={propertyStatus}
                onChange={(e) => setPropertyStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="published">Published</option>
                <option value="finalized">Finalized</option>
              </select>

              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value="last 1 month">Last 1 Month</option>
                <option value="last 2 months">Last 2 Months</option>
              </select>
            </div>
          </div>

          {/* Pass listings data as a prop to the BarChart component */}
          <ListingsBarChart data={listingsData} />
        </div>
      </section>
    </div>
  );
};

export default Listing;
