import React from "react";

// Import React Icon
import { MdOutlineEmail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { RiIdCardLine } from "react-icons/ri";

const AgentDetails = () => {
  return (
    <div className="w-full flex flex-col gap-[0.5rem] p-[2rem]">
      {/* Profile Details */}
      <div className="w-full flex">
        <div className="w-[48%] space-y-[2rem]">
          {/* Picture, Name & Identifier */}
          <div className="w-full flex items-end gap-[1.5rem]">
            {/* Profile Picture */}
            <img
              src="/src/assets/user.png"
              alt="ProfilePicture"
              className="size-[10rem] object-cover rounded-full border-[0.2rem] border-theme-blue"
            />

            {/* Name & Identifier Key */}
            <div className="space-y-[0.5rem] mb-[1rem]">
              <h2 className="text-[2.4rem] leading-[2.4rem] text-neutral-800 font-semibold">
                Muhammad Nabeel
              </h2>
              <h6 className="text-[1.6rem] leading-[1.6rem] text-theme-blue font-semibold">
                @muhammad_nabeel_91756
              </h6>
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
        </div>

        <div className="w-[52%] space-y-[1rem]">
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
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
