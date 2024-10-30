import React from "react";

// Import React Icons
import { HiArrowSmRight } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { RiIdCardLine } from "react-icons/ri";
import { TiPhoneOutline } from "react-icons/ti";

const ClientDetails = () => {
  return (
    <div className="w-full flex flex-col gap-[6rem] p-[2rem]">
      {/* Core Details */}
      <div className="w-full space-y-[2.4rem]">
        {/* Core Details Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Core Details</span>
          </h2>
        </div>

        {/* Core Details Content */}
        <div className="w-full flex">
          {/* Primary Details */}
          <section className="w-[50%] space-y-[2.5rem]">
            {/* Picture, Name & Identifier */}
            <div className="w-full flex items-center gap-[1.5rem]">
              {/* Profile Picture */}
              <img
                src="/src/assets/user.png"
                alt="ProfilePicture"
                className="size-[9rem] object-cover rounded-full border-[0.2rem] border-theme-blue select-none"
              />

              {/* Name & Identifier Key */}
              <div className="space-y-[0.4rem] mb-[0.4rem]">
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
          <section className="w-[50%] space-y-[1rem]">
            {/* Client Badge & Live In City */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Client Badge */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Client Badge</h5>
                <p className="text-neutral-700 font-semibold">Standard</p>
              </div>

              {/* Live In City */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Live In City</h5>
                <p className="text-neutral-700 font-semibold">
                  Dera Ghazi Khan
                </p>
              </div>
            </div>

            {/* Client Since & Last Role */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Client Since */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Client Since</h5>
                <p className="text-neutral-700 font-semibold">Sep 26, 2023</p>
              </div>

              {/* Last Role */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Last Role</h5>
                <p className="text-neutral-700 font-semibold">Rental Owner</p>
              </div>
            </div>

            {/* Associated Since & Transaction Value */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Associated Since */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Associated Since</h5>
                <p className="text-neutral-700 font-semibold">Dec 26, 2022</p>
              </div>

              {/* Transaction Value */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Transaction Value</h5>
                <p className="text-neutral-700 font-semibold">1.5 Crore</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;

// Standard Client
// Trusted Client
// Premium Client

// Buyer
// Seller
// Renter
// Rental Owner
