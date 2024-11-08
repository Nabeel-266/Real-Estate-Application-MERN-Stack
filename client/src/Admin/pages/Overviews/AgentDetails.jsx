import React from "react";

// Import React Icon
import { BiEditAlt } from "react-icons/bi";
import { HiArrowSmRight } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { RiIdCardLine } from "react-icons/ri";
import {
  FaCity,
  FaHandshake,
  FaMoneyBillTrendUp,
  FaServicestack,
} from "react-icons/fa6";
import { BsFillCalendarRangeFill } from "react-icons/bs";
import { FaMoneyCheck } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

// Import Components
import InfoCard from "../../components/InfoCard";

const operationalStats = [
  {
    title: "Operating City",
    desc: "Dera Ghazi Khan",
  },
  {
    title: "Joining Date",
    desc: "Dec 29, 2020",
  },
  {
    title: "Accepted Properties",
    desc: "22 Properties",
  },
  {
    title: "Finalized Deals",
    desc: "8 Deals",
  },
  {
    title: "Total Earned",
    desc: "Rs 12 Lac",
  },
  {
    title: "Highest Earned",
    desc: "Rs 4 Lac",
  },
  {
    title: "Generate Revenue",
    desc: "Rs 4 Crore",
  },
  {
    title: "Period of Service",
    desc: "2 Years",
  },
];

const AgentDetails = () => {
  return (
    <div className="w-full flex flex-col gap-[6rem] p-[2rem]">
      {/* Core Details */}
      <div className="w-full space-y-[2.2rem]">
        {/* Core Details Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Core Details</span>
          </h2>

          <button className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[0.6rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-lg border-[2px] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all">
            <BiEditAlt size="1.7rem" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Core Details Content */}
        <div className="w-full flex">
          {/* Primary Details */}
          <section className="w-[48%] space-y-[2.5rem]">
            {/* Picture, Name & Identifier */}
            <div className="w-full flex items-center gap-[1.5rem]">
              {/* Profile Picture */}
              <img
                src="/src/assets/user.png"
                alt="ProfilePicture"
                className="size-[9rem] object-cover rounded-full border-[0.2rem] border-theme-blue select-none"
              />

              {/* Name & Identifier Key */}
              <div className="space-y-[0.4rem] mb-[1rem]">
                <h4 className="text-[2.4rem] leading-[2.4rem] text-neutral-800 font-semibold">
                  Muhammad Nabeel
                </h4>
                <p className="text-[1.6rem] leading-[1.6rem] text-theme-blue font-semibold">
                  @muhammad_nabeel_91756
                </p>
              </div>
            </div>

            {/* Email, Mobile Number & CNIC Number */}
            <div className="space-y-[1.2rem] ml-[0.5rem] text-neutral-700 *:text-[1.6rem] *:leading-[1.8rem] *:font-semibold *:flex *:items-center *:gap-[1rem]">
              <p>
                <MdOutlineEmail size="1.8rem" className="text-theme-blue" />
                <span>nabeelmajeed266@gmail.com</span>
              </p>
              <p>
                <TiPhoneOutline size="1.8rem" className="text-theme-blue" />
                <span>03345678564</span>
              </p>
              <p>
                <RiIdCardLine size="1.8rem" className="text-theme-blue" />
                <span>42301-44578955-3</span>
              </p>
            </div>
          </section>

          {/* Secondary Details */}
          <section className="w-[52%] space-y-[1rem]">
            {/* Age, Experience & Marital Status */}
            <div className="w-full flex justify-between gap-[1rem]">
              {/* Age */}
              <InfoCard title="Age" text="25 years" width={"25%"} />

              {/* Experience */}
              <InfoCard title="Experience" text="5 years" width={"33%"} />

              {/* Marital Status */}
              <InfoCard title="Marital Status" text="Single" width={"42%"} />
            </div>

            {/* Date Of Birth & Education */}
            <div className="w-full flex gap-[1rem]">
              <InfoCard
                title="Date Of Birth"
                text="Dec 26, 2000"
                width={"50%"}
              />

              <InfoCard title="Education" text="Under Graduate" width={"50%"} />
            </div>

            {/* Residential Address */}
            <div className="w-full flex">
              <InfoCard
                title="Residential Address"
                text="Flat no 12, Al Amna Avenue, Sector 09, North-Karachi, Karachi."
                width={"100%"}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Operational Stats */}
      <div className="w-full space-y-[2rem]">
        {/* Operational Stats Header */}
        <div className="w-full">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Operational Stats</span>
          </h2>
        </div>

        {/* Operational Stats Content */}
        <div className="w-full flex flex-wrap gap-[2rem]">
          {operationalStats.map(({ title, desc }, index) => (
            <div
              key={index}
              className="h-fit flex flex-col items-center justify-center gap-[0.8rem] pt-[1rem] pb-[1.2rem] px-[1.5rem] bg-neutral-100 rounded-2xl shadow-md border-[1px] border-neutral-200"
            >
              <h3 className="text-[1.55rem] leading-[1.6rem] font-bold text-neutral-700 whitespace-nowrap">
                {title}
              </h3>
              <p className="text-[1.5rem] leading-[1.6rem] font-semibold text-white bg-theme-blue px-[1.5rem] py-[0.4rem] rounded-full shadow-md whitespace-nowrap">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Record */}
      <div className="w-full space-y-[2rem]">
        {/* Deal Record Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Deal Record</span>
          </h2>

          <button className="text-[1.6rem] leading-[1.6rem] font-semibold text-theme-blue px-[0.6rem] py-[0.4rem] flex items-center gap-[0.5rem] rounded-lg border-[2px] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all">
            <BiEditAlt size="1.7rem" />
            <span>Sort By</span>
          </button>
        </div>

        {/* Deal Record Table */}
        <div className="w-full overflow-auto scroll-smooth scrollbar-slim-x">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b-[2px] border-neutral-600 text-center *:text-[1.6rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.6rem] *:py-[1.2rem] *:whitespace-nowrap">
                <th className="text-left">Asset</th>
                <th>Purpose</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Accepted On</th>
                <th>Closed On</th>
                <th>Profit Share</th>
                <th>Compensation</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((t, i) => (
                <tr
                  key={i}
                  className="border-t-[1px] border-neutral-400 text-center even:bg-neutral-200 cursor-pointer *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[1.3rem] *:whitespace-nowrap"
                >
                  <td className="text-left">Appartment</td>
                  <td>Sale</td>
                  <td>1.2 Crore</td>
                  <td>
                    <span
                      className={`px-[1.5rem] py-[0.3rem] rounded-full bg-purple-300 `}
                    >
                      Successed
                    </span>
                  </td>
                  <td>Dec 12 - 2023</td>
                  <td>Apr 06 - 2024</td>
                  <td>240,000</td>
                  <td>180,000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;

// ${
//   agent?.badge === "Junior"
//     ? "bg-blue-300"
//     : agent?.badge === "Mid-Level"
//     ? "bg-emerald-300"
//     : agent?.badge === "Senior"
//     ? "bg-orange-300"
//     : agent?.badge === "Expert" &&
// }

// Accepted Deals
// Successed Deals
// Active Deals
// Rejected Deals

// Pending -> abhi under review hai
// Progress -> abhi baat cheet chal rahi hai
// Finalized -> complete hogai hai successfully
// Rejected -> details sahi nahi hain property ki
