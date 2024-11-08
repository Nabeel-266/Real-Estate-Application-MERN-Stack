import React from "react";

// Import React Icons
import { MdOutlineEmail } from "react-icons/md";
import { RiIdCardLine } from "react-icons/ri";
import { TiPhoneOutline } from "react-icons/ti";
import { PiStarFourFill } from "react-icons/pi";

// Import Component
import InfoCard from "../../components/InfoCard";
import PropertyCard from "../../components/PropertyCard";

const client = {
  name: "John Doe",
  properties: [
    {
      // "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
  ],
};

const ClientDetails = () => {
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
              <div className="space-y-[0.6rem] mb-[0.4rem]">
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
              <InfoCard title="Client Badge" text="Standard" />

              {/* Live In City */}
              <InfoCard title="Live In City" text="Dera Ghazi Khan" />
            </div>

            {/* Client Since & Associated Since */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Client Since */}
              <InfoCard title="Client Since" text="Sep 26, 2023" />

              {/* Associated Since */}
              <InfoCard title="Associated Since" text="Dec 26, 2022" />
            </div>

            {/* Last Login & Transaction Value */}
            <div className="w-full grid grid-cols-2 gap-[1rem]">
              {/* Last Login */}
              <InfoCard title="Last Login" text="Aug 24, 2024" />

              {/* Transaction Value */}
              <InfoCard title="Transaction Stats" text="1 Deal - 1.5 Crore" />
            </div>
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

        {/* Property Portfolio Cards Cont */}
        <div className="w-full p-[1.5rem] bg-neutral-100 rounded-xl">
          <h6 className="text-[1.6rem] text-neutral-700 font-semibold px-[0.2rem] mb-[1.5rem]">
            <span className="font-bold">ROLE</span> : Buyer, Seller, Tenant &
            Rental owner
          </h6>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]">
            {client.properties.map((property, index) => (
              <PropertyCard
                key={index}
                property={property}
                index={index}
                specific={false}
              />
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
