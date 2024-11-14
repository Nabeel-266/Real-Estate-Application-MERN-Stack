import React, { useState } from "react";

// Import React Icons
import { HiHomeModern } from "react-icons/hi2";
import { FaShop } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { PiStarFourFill } from "react-icons/pi";

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
        {/* Top Header */}
        <div className="w-fit flex items-center gap-[0.4rem] text-theme-blue">
          <PiStarFourFill size="1.2rem" className="rotate-12" />
          <h2 className="text-[2.2rem] leading-[2.2rem] font-bold">
            Listings Overview by Category
          </h2>
        </div>

        {/* Charts Area */}
        <div className="w-full flex gap-[3rem]">
          {/* Properties Bar Chart Content */}
          <div className="w-[58%] min-w-[50rem] flex flex-col gap-[1.2rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
            {/* Heading */}
            <h3 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue">
              Based On Property Status
            </h3>

            <ListingsBarChart />
          </div>

          {/* Properties Donut Chart Content */}
          <div className="w-[40%] min-w-[30rem] flex flex-col gap-[1.2rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
            {/* Heading */}
            <h3 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue">
              Based On Property Purpose
            </h3>

            {/* Custom Legend  */}
            {/* <div className="w-full flex flex-wrap gap-[1.2rem]">
              {["Finalized", "Published", "Pending"].map((label, index) => (
                <div
                  key={index}
                  className={`text-[1.5rem] leading-[1.5rem] font-semibold text-theme-blue flex items-center gap-[0.4rem] select-none`}
                >
                  <span
                    className={`size-[1.2rem] rounded-full ${
                      index === 0
                        ? "bg-[#082835e0]"
                        : index === 1
                        ? "bg-[#082835b0]"
                        : "bg-[#08283580]"
                    }`}
                  ></span>
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div> */}

            {/* Chart */}
            {/* <div className="w-full h-full flex bg-neutral-200 rounded-2xl p-[1.2rem] mt-[0.2rem] select-none">
              <div className="w-full flex flex-col-reverse items-center justify-end gap-[1rem] overflow-hidden">
                <h5 className="text-[1.7rem] leading-[1.7rem] font-semibold text-white bg-theme-blue px-[1.2rem] py-[0.4rem] rounded-full">
                  Sale
                </h5>

                <div className="w-[95%]">
                  <PropertiesDonutChart
                    data={{
                      label: "Sale",
                      data: [10, 5, 8],
                      backgroundColor: ["#082835e0", "#082835b0", "#08283580"],
                      hoverBackgroundColor: [
                        "#082835e0",
                        "#082835b0",
                        "#08283580",
                      ],
                      borderWidth: 4,
                      borderColor: "transparent",
                      hoverBorderColor: ["#223f4c", "#4c646f", "#758893"],
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col items-center justify-end gap-[1.2rem] overflow-hidden">
                <h5 className="text-[1.7rem] leading-[1.7rem] font-semibold text-white bg-theme-blue px-[1.2rem] py-[0.4rem] rounded-full">
                  Rent
                </h5>

                <div className="w-[95%]">
                  <PropertiesDonutChart
                    data={{
                      label: "Rent",
                      data: [12, 8, 10],
                      backgroundColor: ["#082835e0", "#082835b0", "#08283580"],
                      hoverBackgroundColor: [
                        "#082835e0",
                        "#082835b0",
                        "#08283580",
                      ],
                      borderWidth: 4,
                      borderColor: "transparent",
                      hoverBorderColor: ["#223f4c", "#4c646f", "#758893"],
                    }}
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listings;
