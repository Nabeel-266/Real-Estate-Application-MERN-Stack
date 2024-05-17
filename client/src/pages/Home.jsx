import { useState } from "react";

// Import React Icon
import { FaBed, FaBath, FaArrowRightLong } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { MdOutlineTimer } from "react-icons/md";

// Import Image
import bannerImage from "../assets/3d-house-2.png";
import cardImage from "../assets/banner-bg-new.jpg";
import buy from "../assets/buy.png";
import sell from "../assets/sell.png";
import rent from "../assets/rent.png";
import agent01 from "../assets/Agents/agent01.jpg";
import agent02 from "../assets/Agents/agent02.png";
import agent03 from "../assets/Agents/agent03.png";
import agent04 from "../assets/Agents/agent04.png";

const Home = () => {
  const [propertyTab, setPropertyTab] = useState("residential");
  return (
    <div className="homeCont w-full">
      {/* Banner Cont */}
      <div className="bannerCont w-full">
        <section className="bannerWrapper laptopSm:h-dvh flex flex-col laptopSm:flex-row items-center justify-between mt-[10rem] tabletSm:mt-[11rem] laptopSm:mt-[0rem] mx-[4%]">
          {/* Side First */}
          <section className="sideFirst w-full laptopSm:w-[45%] laptopRg:w-[50%] pr-0 tabletRg:pr-[18%] laptopSm:pr-0">
            <h1 className="text-[4rem] leading-[4.6rem] font-bold text-[#082835] mb-[1rem] tracking-[-0.1rem]">
              Find your next perfect place with ease
            </h1>

            <p className="text-[1.55rem] text-neutral-800 font-medium mb-[1.5rem] pr-[4rem]">
              Nab Estate will help you find your dream home fast and easy with
              tailored to your desires. Our agents and expert support are always
              available.
            </p>

            <button className="flex items-center gap-[1rem] bg-amber-400 text-[#082835] py-[1rem] px-[1rem] text-[1.8rem] leading-[2rem] font-semibold rounded-md active:scale-[0.96] hover:scale-[1.02] transition-all">
              <span>Explore it</span>
              <FaArrowRightLong />
            </button>

            <div className="w-full flex gap-[2%] mt-[3rem]">
              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-[#082835] p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  16+
                </span>
                <span className="text-[1.5rem] font-normal">
                  Years Experience
                </span>
              </div>

              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-[#082835] p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  200
                </span>
                <span className="text-[1.5rem] font-normal">Awards Gained</span>
              </div>

              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-[#082835] p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  1200+
                </span>
                <span className="text-[1.5rem] font-normal">
                  Property Ready
                </span>
              </div>
            </div>
          </section>

          {/* Side Second */}
          <section className="sideSecond w-full laptopSm:w-[53%] laptopRg:w-[50%] mb-[3.5rem]">
            <div className="sideTwoWrapper w-full flex items-center justify-center">
              <img
                src={bannerImage}
                alt="banner"
                className="w-full drop-shadow-2xl select-none"
              />
            </div>
          </section>
        </section>
      </div>

      {/* Property Cont */}
      <div className="propertyCont w-full">
        <section className="propertyWrapper flex flex-col items-center border-t-[0.2rem] border-neutral-200 mx-[4%] pt-[2rem] pb-[5rem]">
          {/* Property Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-amber-400 ">
              Estate
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-[#082835] tracking-tight">
              Featured Property
            </h1>
            <span className="w-[26rem] h-[0.3rem] bg-[#082835] rounded-full mb-[0.2rem]"></span>
            <span className="w-[22rem] h-[0.2rem] bg-[#082835] rounded-full"></span>
          </div>

          {/* Property Tab Indicators */}
          <div className="tabIndicators w-full tabletRg:w-[80%] tabletLg:w-[70%] laptopSm:w-[65%] laptopRg:w-[60%] desktopSm:w-[50%] flex justify-between bg-[#082835] rounded-full overflow-hidden my-[1rem] border-[0.3rem] border-[#082835]">
            {["residential", "commercial", "plots"].map((category, index) => (
              <span
                key={index}
                onClick={() => setPropertyTab(category)}
                className={`propertyTab ${
                  propertyTab === category
                    ? "before:translate-x-[0%] text-[#082835]"
                    : "before:translate-x-[-101%] text-white"
                }`}
              >
                {`${category.charAt(0).toUpperCase()}${category
                  .slice(1)
                  .toLowerCase()}`}
              </span>
            ))}
          </div>

          {/* Property Row */}
          <div className="propertyRow w-full flex justify-center pt-[3rem] pb-[4rem]">
            <div className="propertyRowWrap grid grid-cols-1 mobileSm:grid-cols-2 laptopSm:grid-cols-4 gap-[2rem]">
              {/* Cards */}
              {[1, 2, 3, 4].map((item, index) => (
                <figure
                  key={index}
                  className="propertyCard max-w-full min-w-[22rem] min-h-[25rem] relative bg-white overflow-hidden shadow-[0px_20px_30px_#d0d0d0] rounded-xl font-quick"
                >
                  {/* Card Image */}
                  <div className="imageArea relative w-full h-[18rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:w-[120%] before:h-[50%] before:bg-gradient-to-b to-[#30303090] from-transparent before:pointer-events-none">
                    <img
                      src={cardImage}
                      alt="property"
                      className="cardImage w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <figcaption className="cardContent w-full flex flex-col gap-[0.7rem] px-[1rem] py-[0.8rem] text-neutral-900">
                    {/* Title */}
                    <p className="title truncate text-[1.7rem] leading-[1.9rem] font-semibold">
                      Newly Renovated House
                    </p>

                    {/* Price */}
                    <span className="price text-[1.5rem] leading-[1.5rem] font-bold text-[#082835] select-none">
                      PKR{" "}
                      <strong className="text-[2rem] leading-[2rem] font-montAlter font-semibold">
                        450,000,00
                      </strong>
                    </span>

                    {/* Details */}
                    <div className="w-full flex items-center justify-between mt-[0.4rem] text-neutral-600">
                      <div className="leftSide flex items-center gap-[1rem] text-[1.4rem] leading-[1.2rem] font-medium">
                        <span className="bed flex items-center gap-[0.3rem]">
                          <FaBed size="1.4rem" /> 04
                        </span>
                        <span className="bath flex items-center gap-[0.3rem]">
                          <FaBath size="1.1rem" /> 03
                        </span>
                      </div>

                      <span className="area text-[1.4rem] leading-[1.4rem] font-medium flex items-center gap-[0.3rem]">
                        <BiArea /> sqft 3500
                      </span>
                    </div>

                    {/* Info */}
                    <div className="w-full flex items-center justify-between mt-[0.4rem]">
                      <span className="bg-[#082835] text-white text-[1.4rem] leading-[1.2rem] font-semibold p-[0.5rem] rounded-md">
                        For Sale
                      </span>

                      <span className="area text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-600 flex items-center gap-[0.3rem]">
                        <MdOutlineTimer size="1.6rem" /> 2 minutes ago
                      </span>
                    </div>
                  </figcaption>

                  {/* Location */}
                  <abbr title="Sector-9, Main Disco Mor, North-Karachi">
                    <span className="absolute top-[1rem] left-[1rem] px-[0.8rem] py-[0.6rem] bg-[#ffffffd8] text-neutral-800 flex items-center gap-[0.3rem] text-[1.4rem] leading-[1.4rem] font-semibold rounded-md cursor-default">
                      <HiLocationMarker /> North-Karachi
                    </span>
                  </abbr>

                  {/* Visit Btn */}
                  <button className="absolute z-[5] top-[46%] right-[6%] p-[0.5rem] bg-[#ffffff] text-neutral-800 text-[1.8rem] flex items-center justify-center rounded-full shadow-2xl">
                    <FaArrowRightLong />
                  </button>
                </figure>
              ))}
            </div>
          </div>

          <button className="text-[1.7rem] leading-[1.7rem] font-medium flex items-center gap-[1rem] bg-[#082835] text-white px-[2.5rem] py-[1rem] rounded-md self-end hover:text-gray-950 hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <span>View All</span>
            <FaArrowRightLong size="2rem" />
          </button>
        </section>
      </div>

      {/* Demand Cont */}
      <div className="demandCont w-full bg-[#082835] bg-fixed overflow-hidden">
        <section className="demandWrapper relative z-[1] flex flex-col items-center gap-[2rem] mx-[4%] pt-[2.5rem] pb-[6rem]">
          {/* Demand Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-amber-400 ">
              Demand
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-medium text-white tracking-tight">
              What do you Want ?
            </h1>
            <span className="w-[28rem] h-[0.3rem] bg-white rounded-full mb-[0.2rem]"></span>
            <span className="w-[24rem] h-[0.2rem] bg-white rounded-full"></span>
          </div>

          {/* Demand Row */}
          <div className="demandRow w-full flex justify-center bg-[#ffffff05] backdrop-blur-[75px] rounded-xl">
            <div className="demandRowWrapper shadow-xl w-full grid mobileSm:grid-rows-3 mobileSm:grid-cols-1 laptopSm:grid-rows-1 laptopSm:grid-cols-3 justify-items-center gap-[3rem] tabletRg:gap-[5rem] p-[3rem] tabletRg:p-[4rem]">
              {/* Demand Card */}
              {[
                {
                  image: buy,
                  title: "Buy a property",
                  text: "Find your perfect place where you meet happiness",
                  buttonText: "FIND PROPERTY",
                },
                {
                  image: sell,
                  title: "Sell a property",
                  text: "Get the best value of your property in any economy",
                  buttonText: "ADD DETAILS",
                },
                {
                  image: rent,
                  title: "Rent a property",
                  text: "Live where you can love with perfect lovely rental",
                  buttonText: "FIND RENTALS",
                },
              ].map(({ image, title, text, buttonText }, index) => (
                <div
                  key={index}
                  className="demandCard w-full min-w-[28rem] mobileSm:px-[5%] laptopSm:px-[10%] py-[2.5rem] tabletSm:py-[3rem] tabletRg:py-[3.5rem] flex mobileSm:flex-col tabletSm:flex-row laptopSm:flex-col items-center gap-[3rem] bg-[#ffffffb0] backdrop-blur-xl rounded-xl text-[#082835] hover:translate-y-[-0.8rem] hover:shadow-xl transition-all"
                >
                  {/* Card Image */}
                  <div className="imageCont w-full flex justify-center">
                    <img
                      src={image}
                      alt="buy"
                      className={`${
                        image === sell
                          ? "mobileSm:w-[22rem] tabletRg:w-[29rem] laptopSm:w-[17rem]"
                          : "mobileSm:w-[22rem] tabletRg:w-[30rem] laptopSm:w-[18rem]"
                      } object-cover`}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="contentCont w-full flex flex-col items-center gap-[2.2rem]">
                    {/* Title */}
                    <h4 className="text-[2rem] leading-[2rem] font-semibold text-center">
                      {title}
                    </h4>

                    {/* Slogan */}
                    <span className="text-[1.5rem] leading-[2rem] font-normal text-center">
                      {text}
                    </span>

                    {/* Button */}
                    <button className="text-[1.5rem] leading-[1.5rem] font-semibold flex items-center gap-[1rem] bg-transparent text-[#082835] px-[1.5rem] py-[1rem] rounded-md border-[0.2rem] border-[#082835] hover:text-white hover:bg-[#082835] hover:scale-[1.02] active:scale-[0.98] transition-all">
                      {buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Agent Cont */}
      <div className="agentCont w-full">
        <section className="agentWrapper flex flex-col items-center mx-[4%] pt-[3rem] pb-[4rem]">
          {/* Agent Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-amber-400 ">
              Agents
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-[#082835] tracking-tight">
              Our Lead Experts
            </h1>
            <span className="w-[23rem] h-[0.3rem] bg-[#082835] rounded-full mb-[0.2rem]"></span>
            <span className="w-[19rem] h-[0.2rem] bg-[#082835] rounded-full"></span>
          </div>

          {/* Agent Row */}
          <div className="agentRow w-full flex justify-center pt-[3rem] pb-[4rem]">
            <div className="agentRowWrap grid grid-cols-1 mobileSm:grid-cols-2 laptopSm:grid-cols-4 gap-[2rem]">
              {/* Agent Cards */}
              {[
                {
                  name: "Kinza Arsalan",
                  image: agent01,
                },
                {
                  name: "Hammad Khan",
                  image: agent02,
                },
                {
                  name: "Bilal Siddique",
                  image: agent03,
                },
                {
                  name: "Muhammad Raza",
                  image: agent04,
                },
              ]
                .reverse()
                .map(({ name, image }, index) => (
                  <figure
                    key={index}
                    className="propertyCard relative max-w-[24rem] min-w-[20rem] bg-white overflow-hidden shadow-[0px_20px_30px_#d0d0d0] rounded-xl"
                  >
                    {/* Card Image */}
                    <div className="imageArea relative w-full h-[28rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:w-[120%] before:h-[40%] before:bg-gradient-to-b to-[#202020] from-transparent before:pointer-events-none">
                      <img
                        src={image}
                        alt="property"
                        className="cardImage w-full h-full object-cover"
                      />
                    </div>

                    {/* Card Text */}
                    <figcaption className="cardContent w-full text-white absolute z-[2] bottom-[2rem] text-center">
                      <span className="title text-[1.8rem] leading-[2rem] font-medium font-quick tracking-[0.05rem]">
                        {name}
                      </span>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        </section>
      </div>

      {/* Subscribe Cont */}
      <div className="subscribeCont w-full">
        <section className="subscribeWrapper flex flex-col items-center gap-[1rem] mx-[4%] pt-[2rem] pb-[6rem] border-t-[0.2rem] border-neutral-200">
          {/* Subscribe Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-amber-400 ">
              Subscribe
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-[#082835] tracking-tight">
              Stay In Touch
            </h1>
            <span className="w-[18rem] h-[0.3rem] bg-[#082835] rounded-full mb-[0.2rem]"></span>
            <span className="w-[14rem] h-[0.2rem] bg-[#082835] rounded-full"></span>
          </div>

          {/* Subscribe Content */}
          <div className="content w-full flex flex-col items-center gap-[3rem]">
            <p className="mobileSm:w-[90%] tabletSm:w-[80%] tabletRg:w-[75%] tabletLg:w-[65%] laptopSm:w-[55%] desktopSm:w-[50%] text-[1.6rem] leading-[2.2rem] font-medium text-center">
              We recommended you to subscribe to our newspaper, enter your get
              our daily update about us.
            </p>

            <form action="#" className="w-full flex justify-center">
              <fieldset className="w-full tabletSm:w-[90%] tabletRg:w-[85%] tabletLg:w-[80%] laptopSm:w-[75%] desktopSm:w-[70%] flex justify-center p-[1rem] border-[0.2rem] border-neutral-300 rounded-lg font-quick">
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Enter your email address"
                  className="w-[67.5%] tabletSm:w-[70%] tabletRg:w-[72.5%] tabletLg:w-[75%] laptopSm:w-[77.5%] desktopSm:w-[80%] outline-none text-neutral-700 text-[1.7rem] leading-[1.6rem] py-[1rem] px-[1rem] font-medium"
                />
                <input
                  type="submit"
                  value="Subscribe now"
                  className="w-[32.5%] tabletSm:w-[30%] tabletRg:w-[27.5%] tabletLg:w-[25%] laptopSm:w-[22.5%] desktopSm:w-[20%] bg-[#082835] text-white text-[1.5rem] leading-[1.6rem] py-[1rem] rounded-md font-semibold tracking-[0.02rem] cursor-pointer"
                />
              </fieldset>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
