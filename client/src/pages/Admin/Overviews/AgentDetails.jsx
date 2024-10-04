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

const AgentDetails = () => {
  return (
    <div className="w-full flex flex-col gap-[5rem] p-[2rem]">
      {/* Core Details */}
      <div className="w-full space-y-[1.5rem]">
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
          <section className="w-[48%] space-y-[2rem]">
            {/* Picture, Name & Identifier */}
            <div className="w-full flex items-center gap-[1.5rem]">
              {/* Profile Picture */}
              <img
                src="/src/assets/user.png"
                alt="ProfilePicture"
                className="size-[10rem] object-cover rounded-full border-[0.2rem] border-theme-blue"
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

          <section className="w-[52%] space-y-[1rem]">
            {/* Age, Experience & Marital Status */}
            <div className="w-full flex gap-[1rem]">
              {/* Age */}
              <div className="w-[25%] space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Age</h5>
                <p className="text-neutral-700 font-semibold">25 years</p>
              </div>

              {/* Experience */}
              <div className="w-[33%] space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Experience</h5>
                <p className="text-neutral-700 font-semibold">5 years</p>
              </div>

              {/* Marital Status */}
              <div className="w-[42%] space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Marital Status</h5>
                <p className="text-neutral-700 font-semibold">Single</p>
              </div>
            </div>

            {/* Date Of Birth, Experience & Marital Status */}
            <div className="w-full flex gap-[1rem]">
              {/* Date Of Birth */}
              <div className="w-full space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Date Of Birth</h5>
                <p className="text-neutral-700 font-semibold">Dec 26, 2000</p>
              </div>

              {/* Experience */}
              <div className="w-full space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Education</h5>
                <p className="text-neutral-700 font-semibold">Under Graduate</p>
              </div>
            </div>

            {/* Residential Address */}
            <div className="w-full space-y-[0.6rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem]">
              <h5 className="text-theme-blue leading-[1.6rem] font-bold">
                Residential Address
              </h5>
              <p className="text-neutral-700 leading-[2.1rem] font-semibold">
                Flat no 12, Al Amna Avenue, Sector 09, North-Karachi, Karachi.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Operational Stats */}
      <div className="w-full space-y-[2rem]">
        {/* Operational Stats Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Operational Stats</span>
          </h2>
        </div>

        {/* Operational Stats Content */}
        <div className="w-full flex flex-wrap gap-[2rem]">
          {/* Operating City */}
          <div className="flex items-center gap-[1.2rem] pl-[1.5rem] pr-[2.5rem] py-[1.5rem] bg-neutral-200 rounded-3xl shadow-xl border-[2px] border-neutral-300">
            {/* Icon */}
            <div className="w-fit p-[1.2rem] rounded-full bg-white text-theme-blue">
              <FaCity size="3.5rem" className="drop-shadow-lg" />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[0.7rem]">
              <h3 className="text-[1.75rem] leading-[1.8rem] text-neutral-800 font-bold whitespace-nowrap">
                Operating City
              </h3>
              <p className="text-white bg-theme-blue text-[1.6rem] leading-[1.5rem] font-semibold px-[1.5rem] py-[0.5rem] rounded-full shadow-lg whitespace-nowrap">
                Karachi
              </p>
            </div>
          </div>

          {/* Joining Date */}
          <div className="flex items-center gap-[1.2rem] pl-[1.5rem] pr-[2.5rem] py-[1.5rem] bg-neutral-200 rounded-3xl shadow-xl border-[2px] border-neutral-300">
            {/* Icon */}
            <div className="w-fit p-[1.4rem] rounded-full bg-white text-theme-blue">
              <BsFillCalendarRangeFill
                size="2.6rem"
                className="drop-shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[0.7rem]">
              <h3 className="text-[1.75rem] leading-[1.8rem] text-neutral-800 font-bold whitespace-nowrap">
                Joining Date
              </h3>
              <p className="text-white bg-theme-blue text-[1.6rem] leading-[1.5rem] font-semibold px-[1.5rem] py-[0.5rem] rounded-full shadow-lg whitespace-nowrap">
                Dec 29, 2020
              </p>
            </div>
          </div>

          {/* Successful Deals */}
          <div className="flex items-center gap-[1.2rem] pl-[1.5rem] pr-[2.5rem] py-[1.5rem] bg-neutral-200 rounded-3xl shadow-xl border-[2px] border-neutral-300">
            {/* Icon */}
            <div className="w-fit p-[1rem] rounded-full bg-white text-theme-blue">
              <FaHandshake size="3.3rem" className="drop-shadow-lg" />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[0.7rem]">
              <h3 className="text-[1.75rem] leading-[1.8rem] text-neutral-800 font-bold whitespace-nowrap">
                Successful Deals
              </h3>
              <p className="text-white bg-theme-blue text-[1.6rem] leading-[1.5rem] font-semibold px-[1.5rem] py-[0.5rem] rounded-full shadow-lg whitespace-nowrap">
                20 Deals
              </p>
            </div>
          </div>

          {/* Total Earned */}
          <div className="flex items-center gap-[1.2rem] pl-[1.5rem] pr-[2.5rem] py-[1.5rem] bg-neutral-200 rounded-3xl shadow-xl border-[2px] border-neutral-300">
            {/* Icon */}
            <div className="w-fit p-[1.2rem] rounded-full bg-white text-theme-blue">
              <FaMoneyCheck size="3rem" className="drop-shadow-lg" />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[0.7rem]">
              <h3 className="text-[1.75rem] leading-[1.8rem] text-neutral-800 font-bold whitespace-nowrap">
                Total Earned
              </h3>
              <p className="text-white bg-theme-blue text-[1.6rem] leading-[1.5rem] font-semibold px-[1.5rem] py-[0.5rem] rounded-full shadow-lg whitespace-nowrap">
                PKR 1500000
              </p>
            </div>
          </div>

          {/* Highest Earned */}
          <div className="flex items-center gap-[1.2rem] pl-[1.5rem] pr-[2.5rem] py-[1.5rem] bg-neutral-200 rounded-3xl shadow-xl border-[2px] border-neutral-300">
            {/* Icon */}
            <div className="w-fit p-[1.2rem] rounded-full bg-white text-theme-blue">
              <FaMoneyBillTrendUp size="3rem" className="drop-shadow-lg" />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[0.7rem]">
              <h3 className="text-[1.75rem] leading-[1.8rem] text-neutral-800 font-bold whitespace-nowrap">
                Highest Earned
              </h3>
              <p className="text-white bg-theme-blue text-[1.6rem] leading-[1.5rem] font-semibold px-[1.5rem] py-[0.5rem] rounded-full shadow-lg whitespace-nowrap">
                PKR 180000
              </p>
            </div>
          </div>

          {/* Service Period */}
          <div className="flex items-center gap-[1.2rem] pl-[1.5rem] pr-[2.5rem] py-[1.5rem] bg-neutral-200 rounded-3xl shadow-xl border-[2px] border-neutral-300">
            {/* Icon */}
            <div className="w-fit p-[1.2rem] rounded-full bg-white text-theme-blue">
              <FaServicestack size="3rem" className="drop-shadow-lg" />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[0.7rem]">
              <h3 className="text-[1.75rem] leading-[1.8rem] text-neutral-800 font-bold whitespace-nowrap">
                Period of Service
              </h3>
              <p className="text-white bg-theme-blue text-[1.6rem] leading-[1.5rem] font-semibold px-[1.5rem] py-[0.5rem] rounded-full shadow-lg whitespace-nowrap">
                2 years
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Track Record */}
      <div className="w-full space-y-[1.5rem]">
        {/* Track Record Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Track Record</span>
          </h2>
        </div>

        {/* Track Record Content */}
      </div>
    </div>
  );
};

export default AgentDetails;

// Accepted Deals
// Successed Deals
// Active Deals
// Rejected Deals

// import { BsFillCalendarRangeFill } from "react-icons/bs";
// import { RiCake2Fill } from "react-icons/ri";
// import { IoBriefcase } from "react-icons/io5";
// import { FaGraduationCap } from "react-icons/fa6";
// import { RiHeart2Fill } from "react-icons/ri";
// import { HiLocationMarker } from "react-icons/hi";

//   <p>Name: Muhammad Nabeel</p>
//   <p>Identifier Key: @muhammad_nabeel_91756</p>
//   <p>Email Address: nabeelmajeed266@gmail.com</p>
//   <p>Mobile Number: 03345678564</p>
//   <p>CNIC Number: 42301-44578955-3</p>
//   + + + + + + + + + + + + + + + + +
//   <p>Age: 26 Years</p>
//   <p>Date Of Birth: Decemeber 26, 2000</p>
//   <p>Experience: 5 Years</p>
//   <p>Education: Under Graduate</p>
//   <p>Marital Status: Single</p>
//   <p>Residential Address: Flat no 12, Al Amna Avenue, Sector 09, </p>
//   + + + + + + + + + + + + + + + + +
//   <p>Operating City: Karachi</p>
//   <p>Joining Date: Decemeber 26, 2000</p>
//   <p>Successful Deals: 15</p>
//   <p>Total Earned: 1500000</p>
//   <p>Highest Earned: 1500000</p>
//   <p>Period of service: 2 years</p>
