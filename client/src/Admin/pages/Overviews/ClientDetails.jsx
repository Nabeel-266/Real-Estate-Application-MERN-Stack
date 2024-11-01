import React from "react";

// Import React Icons
import { HiArrowSmRight } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { RiIdCardLine } from "react-icons/ri";
import { TiPhoneOutline } from "react-icons/ti";

// Import Component
import PropertyCard from "../../components/PropertyCard";

const client = {
  name: "John Doe",
  properties: [
    {
      // "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      image: "/src/assets/Properties/house-02.jpg",
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
      image: "/src/assets/Properties/room-05.jpg",
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
      image: "/src/assets/Properties/room-04.jpg",
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
  ],
};

const ClientDetails = () => {
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

            {/* Client Since & Associated Since */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Client Since */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Client Since</h5>
                <p className="text-neutral-700 font-semibold">Sep 26, 2023</p>
              </div>

              {/* Associated Since */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Associated Since</h5>
                <p className="text-neutral-700 font-semibold">Dec 26, 2022</p>
              </div>
            </div>

            {/* Last Login & Transaction Value */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Last Login */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Last Login</h5>
                <p className="text-neutral-700 font-semibold">Aug 24, 2024</p>
              </div>

              {/* Transaction Value */}
              <div className="space-y-[0.7rem] p-[1rem] bg-neutral-200 rounded-xl text-[1.6rem] leading-[1.6rem]">
                <h5 className="text-theme-blue font-bold">Transaction Stats</h5>
                <p className="text-neutral-700 font-semibold">
                  1 Deal - 1.5 Crore
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Property Portfolio */}
      <div className="w-full space-y-[1.5rem]">
        {/* Property Portfolio Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="flex items-center gap-[0rem] text-[2.2rem] leading-[2.2rem] text-theme-blue font-bold uppercase underline underline-offset-[0.3rem]">
            <HiArrowSmRight size="1.8rem" />
            <span>Property Portfolio</span>
          </h2>
        </div>

        {/* Property Portfolio Cards Cont */}
        <div className="w-full p-[1.5rem] bg-neutral-100 rounded-lg">
          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]">
            {client.properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
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
