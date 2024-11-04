import React from "react";

// Import React Icons
import { MdOutlineEmail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { PiCityBold } from "react-icons/pi";
import { PiStarFourFill } from "react-icons/pi";

// Import Components
import InfoCard from "../../components/InfoCard";
import UserProperties from "../../components/UserProperties";

const UserDetails = () => {
  return (
    <div className="w-full flex flex-col gap-[6.5rem] p-[2rem]">
      {/* Core Details */}
      <div className="w-full space-y-[1.5rem]">
        {/* Core Details Header */}
        <div className="w-fit flex items-center gap-[0.4rem] bg-white text-theme-blue rounded-md select-none">
          <PiStarFourFill size="1.2rem" className="rotate-12" />
          <h2 className="text-[2.25rem] leading-[2.3rem] font-bold uppercase">
            Core Details
          </h2>
        </div>

        {/* Core Details Content */}
        <div className="w-full flex justify-between">
          {/* Primary Details */}
          <section className="w-[70%] space-y-[2.5rem]">
            {/* Picture, Name & Identifier */}
            <div className="w-full flex items-center gap-[1.5rem]">
              {/* Profile Picture */}
              <img
                src="/src/assets/user.png"
                alt="ProfilePicture"
                className="size-[9rem] object-cover rounded-full border-[0.2rem] border-theme-blue select-none"
              />

              {/* Name & Identifier Key */}
              <div className="space-y-[0.6rem] mb-[0.4rem]">
                <h4 className="text-[2.4rem] leading-[2.4rem] text-neutral-800 font-semibold">
                  Junaid Bilal
                </h4>
                <p className="text-[1.6rem] leading-[1.6rem] text-theme-blue font-semibold">
                  @junaid_bilal_54217
                </p>
              </div>
            </div>

            {/* City, Mobile Number & Email */}
            <div className="space-y-[1.2rem] ml-[0.5rem] text-neutral-700 *:text-[1.6rem] *:leading-[1.6rem] *:font-semibold *:flex *:items-center *:gap-[1rem]">
              <p>
                <PiCityBold size="1.9rem" className="text-theme-blue" />
                <span>Live in Dera Ghazi Khan</span>
              </p>
              <p>
                <MdOutlineEmail size="1.8rem" className="text-theme-blue" />
                <span>nabeelmajeed266@gmail.com</span>
              </p>
              <p>
                <TiPhoneOutline size="1.8rem" className="text-theme-blue" />
                <span>03345678564</span>
              </p>
            </div>
          </section>

          {/* Secondary Details */}
          <section className="w-[25%] grid grid-cols-1 gap-[1rem]">
            {/* Joined On */}
            <InfoCard title="Joined On" text="Aug 24, 2023" />

            {/* Last Login On */}
            <InfoCard title="Last Login On" text="Feb 26, 2024" />

            {/* Last Updated On */}
            <InfoCard title="Last Updated On" text="Dec 17, 2023" />
          </section>
        </div>
      </div>

      {/* Property Portfolio */}
      <div className="w-full space-y-[1.5rem]">
        {/* Property Portfolio Header */}
        <div className="w-fit flex items-center gap-[0.4rem] bg-white text-theme-blue rounded-md select-none">
          <PiStarFourFill size="1.2rem" className="rotate-12" />
          <h2 className="text-[2.25rem] leading-[2.3rem] font-bold uppercase">
            Property Portfolio
          </h2>
        </div>

        {/* Property Portfolio Content */}
        <div className="w-full p-[1rem] bg-neutral-100 rounded-xl">
          <UserProperties />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

// Pending
// Published
// Rejected
// Removed
// Draft
// Finalized
