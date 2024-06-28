import { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required module
import { Navigation } from "swiper/modules";

// Import React Icon
import { FaBed, FaBath, FaArrowRightLong } from "react-icons/fa6";
import { BiArea } from "react-icons/bi";
import { MdOutlineTimer } from "react-icons/md";
import {
  HiLocationMarker,
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

// Import Image
import bannerHomes from "../assets/banner-homes.png";
import bannerRoom from "../assets/banner-room.jpg";
import bannerBalcony from "../assets/banner-balcony.jpg";
import cardImage from "../assets/home.jpg";
import buy from "../assets/buy.png";
import sell from "../assets/sell.png";
import rent from "../assets/rent.png";
import agent01 from "../assets/Agents/agent01.jpg";
import agent02 from "../assets/Agents/agent02.png";
import agent03 from "../assets/Agents/agent03.png";
import agent04 from "../assets/Agents/agent04.png";
import feedbackImage from "../assets/feedback-image.jpg";
import person01 from "../assets/Persons/person01.jpg";
import person02 from "../assets/Persons/person02.jpg";
import person03 from "../assets/Persons/person03.jpeg";
import person04 from "../assets/Persons/person04.jpeg";
import person05 from "../assets/Persons/person05.jpg";

// Component
import Footer from "../components/Footer";
import { AiOutlinePartition } from "react-icons/ai";
import { PiToiletBold } from "react-icons/pi";
import { TbToolsKitchen } from "react-icons/tb";

const testimonials = [
  {
    id: 1,
    image: person01,
    name: "Azlan Farooq",
    designation: "Our Trusted Client",
  },
  {
    id: 2,
    image: person02,
    name: "Sheraz Iqbal",
    designation: "Our Trusted Client",
  },
  {
    id: 3,
    image: person03,
    name: "Najam Iftikhar",
    designation: "Our Trusted Client",
  },
  {
    id: 4,
    image: person04,
    name: "Muhammad Ibad",
    designation: "Our Trusted Client",
  },
  {
    id: 5,
    image: person05,
    name: "Junaid Rehman",
    designation: "Our Trusted Client",
  },
];

const Home = () => {
  const [propertyTab, setPropertyTab] = useState("residential");
  const swiperRef = useRef(null);

  return (
    <div className="homeCont w-full">
      {/* Banner Cont */}
      <div className="bannerCont w-full">
        <section className="bannerWrapper laptopSm:h-dvh flex flex-col gap-[10rem] tabletRg:gap-[13rem] laptopSm:gap-0 laptopSm:flex-row items-center justify-between py-[10rem] tabletSm:py-[11rem] laptopSm:py-[0rem] mx-[4%]">
          {/* Side First */}
          <section className="sideFirst w-full laptopSm:w-[55%] laptopRg:w-[50%] pr-0 tabletSm:pr-[6%] tabletRg:pr-[16%] laptopSm:pr-0 laptopRg:mt-[1rem]">
            <h1 className="text-[4rem] leading-[4.8rem] font-bold text-theme-blue mb-[1.5rem] tracking-[-0.1rem] pr-0 tabletSm:pr-[3%] tabletLg:pr-[14%] laptopSm:pr-0">
              Find your next perfect place with ease
            </h1>

            <p className="text-[1.55rem] text-neutral-800 font-medium mb-[2.5rem] pr-[4rem]">
              Nab Estate will help you find your dream home fast and easy with
              tailored to your desires. Our agents and expert support are always
              available.
            </p>

            <button className="relative flex items-center gap-[1rem] bg-theme-yellow text-theme-blue py-[1.2rem] pl-[1.2rem] pr-[3.8rem] text-[1.8rem] leading-[2rem] font-semibold rounded-md active:scale-[0.96] transition-all group/button">
              <span className="relative z-[2] bg-theme-yellow">Explore it</span>
              <FaArrowRightLong className="text-[1.9rem] absolute z-[1] right-[1.2rem] group-hover/button:animate-moveArrow" />
            </button>

            <div className="w-full flex gap-[2.5%] mt-[3.2rem]">
              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-theme-blue p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  16+
                </span>
                <span className="text-[1.5rem] font-normal">
                  Years Experience
                </span>
              </div>

              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-theme-blue p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  200
                </span>
                <span className="text-[1.5rem] font-normal">Awards Gained</span>
              </div>

              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-theme-blue p-[1.5rem] rounded-[0.4rem] boxPattern">
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
          <section className="sideSecond w-full laptopSm:w-[45%] laptopRg:w-[50%]">
            <div className="sideTwoWrapper w-full relative flex items-center justify-center">
              <img
                src={bannerHomes}
                alt="Homes"
                className="min-w-[34rem] w-[50%] laptopSm:w-[75%] laptopRg:w-[68%] desktopSm:w-[62%] laptopRg:ml-[4%] shadow-2xl shadow-[#33333390] select-none rounded-[1rem_10rem_1rem_10rem] object-cover border-white border-y-[0.4rem] border-l-[0.3rem]"
              />

              <img
                src={bannerBalcony}
                alt="Homes"
                className="min-w-[15rem] w-[27%] tabletSm:w-[25%] laptopSm:w-[32%] laptopRg:w-[28%] shadow-xl shadow-[#33333330] absolute top-[-11%] laptopSm:top-[-8%] laptopRg:top-[-4%] left-[5%] tabletSm:left-[10%] laptopSm:left-[2%] laptopRg:left-[8%] drop-shadow-xl select-none rounded-full object-cover border-theme-blue border-y-[0.3rem] border-l-[0.5rem] border-dashed animate-holding"
              />

              <img
                src={bannerRoom}
                alt="Homes"
                className="min-w-[22rem] w-[42%] tabletSm:w-[40%] laptopSm:w-[53%] laptopRg:w-[50%] shadow-xl shadow-[#33333330] overflow-hidden absolute bottom-[-10%] right-[5%] laptopSm:bottom-[-8%] laptopSm:right-0 drop-shadow-xl select-none rounded-full object-cover border-theme-blue border-y-[0.6rem] border-r-[0.8rem] border-double animate-holding"
              />
            </div>
          </section>
        </section>
      </div>

      {/* Property Cont */}
      <div className="propertyCont w-full">
        <section className="propertyWrapper flex flex-col items-center border-t-[0.2rem] border-neutral-200 mx-[4%] pt-[2.5rem] pb-[6rem]">
          {/* Property Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-theme-yellow ">
              Estate
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-theme-blue tracking-tight">
              Featured Property
            </h1>
            <span className="w-[26rem] h-[0.3rem] bg-theme-blue rounded-full mb-[0.2rem]"></span>
            <span className="w-[22rem] h-[0.2rem] bg-theme-blue rounded-full"></span>
          </div>

          {/* Property Tab Indicators */}
          <div className="tabIndicators w-full tabletRg:w-[80%] tabletLg:w-[70%] laptopSm:w-[65%] laptopRg:w-[60%] desktopSm:w-[50%] flex justify-between bg-theme-blue rounded-full overflow-hidden my-[1rem] border-[0.3rem] border-theme-blue">
            {["residential", "commercial", "plots"].map((category, index) => (
              <span
                key={index}
                onClick={() => setPropertyTab(category)}
                className={`propertyTab ${
                  propertyTab === category
                    ? "before:translate-x-[0%] text-theme-blue"
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
            <div className="propertyRowWrap grid grid-cols-1 mobileRg:grid-cols-2 laptopSm:grid-cols-4 gap-[2.5rem]">
              {/* Property Cards */}
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="propertyCard max-w-[35rem] min-w-[22rem] min-h-[25rem] relative bg-white overflow-hidden shadow-[0px_20px_30px_#d0d0d0] rounded-xl font-quick"
                >
                  {/* Card Image */}
                  <div className="imageArea relative w-full h-[18rem] object-cover before:content-[''] before:absolute before:z-[1] before:bottom-0 before:left-0 before:right-0 before:h-[50%] before:bg-gradient-to-b to-[#30303070] from-transparent before:pointer-events-none">
                    <img
                      src={cardImage}
                      alt="property"
                      className="cardImage w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="cardContent w-full flex flex-col gap-[0.7rem] px-[1rem] py-[0.8rem] text-neutral-900">
                    {/* Title */}
                    <p className="title truncate text-[1.7rem] leading-[1.9rem] font-semibold">
                      Newly Renovated House
                    </p>

                    {/* Price */}
                    <span className="price text-[1.5rem] leading-[1.5rem] font-bold text-theme-blue select-none">
                      PKR{" "}
                      <strong className="text-[2rem] leading-[2rem] font-montAlter font-semibold">
                        450,000,00
                      </strong>
                    </span>

                    {/* Details */}
                    <div className="w-full flex items-center justify-between mt-[0.4rem] text-neutral-600">
                      <div className="leftSide flex items-center gap-[1rem] text-[1.4rem] leading-[1.2rem] font-medium select-none">
                        {/* Bedroom */}
                        <abbr title="Bedroom" className="no-underline">
                          <span className="bed flex items-center gap-[0.3rem]">
                            <FaBed size="1.4rem" /> 04
                          </span>
                        </abbr>

                        {/* Bathroom */}
                        <abbr title="Bathroom" className="no-underline">
                          <span className="bath flex items-center gap-[0.3rem]">
                            <FaBath size="1.1rem" /> 03
                          </span>
                        </abbr>

                        {/* Kitchen */}
                        <abbr title="Kitchen" className="no-underline hidden">
                          <span className="bath flex items-center gap-[0.3rem]">
                            <TbToolsKitchen size="1.3rem" /> 03
                          </span>
                        </abbr>

                        {/* Toilet */}
                        <abbr title="Toilet" className="no-underline hidden">
                          <span className="bath flex items-center gap-[0.3rem]">
                            <PiToiletBold size="1.35rem" /> 01
                          </span>
                        </abbr>

                        {/* Partitions */}
                        <abbr
                          title="Partitions"
                          className="no-underline hidden"
                        >
                          <span className="bath flex items-center gap-[0.3rem]">
                            <AiOutlinePartition size="1.35rem" /> 01
                          </span>
                        </abbr>
                      </div>

                      <span className="area text-[1.4rem] leading-[1.4rem] font-medium flex items-center gap-[0.3rem]">
                        <BiArea /> sqft 3500
                      </span>
                    </div>

                    {/* Info */}
                    <div className="w-full flex items-center justify-between mt-[0.4rem]">
                      <span className="bg-theme-blue text-white text-[1.4rem] leading-[1.2rem] font-semibold p-[0.5rem] rounded-md">
                        For Sale
                      </span>

                      <span className="area text-[1.4rem] leading-[1.4rem] font-semibold text-neutral-600 flex items-center gap-[0.3rem]">
                        <MdOutlineTimer size="1.6rem" /> 2 minutes ago
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <abbr title="Sector-9, Main Disco Mor, North-Karachi">
                    <span className="absolute top-[1rem] left-[1rem] px-[0.8rem] py-[0.6rem] bg-[#fffffff0] text-neutral-700 flex items-center gap-[0.3rem] text-[1.4rem] leading-[1.4rem] font-semibold rounded-md cursor-default">
                      <HiLocationMarker /> North-Karachi
                    </span>
                  </abbr>

                  {/* Visit Btn */}
                  <button className="absolute z-[5] top-[46%] right-[6%] p-[0.5rem] bg-[#ffffff] text-neutral-800 text-[1.8rem] flex items-center justify-center rounded-full shadow-2xl">
                    <FaArrowRightLong />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="text-[1.7rem] leading-[1.7rem] font-medium flex items-center gap-[1rem] bg-theme-blue text-white px-[2.5rem] py-[1rem] rounded-md self-end hover:text-gray-950 hover:bg-theme-yellow hover:scale-[1.02] active:scale-[0.98] transition-all">
            <span>View All</span>
            <FaArrowRightLong size="2rem" />
          </button>
        </section>
      </div>

      {/* Demand Cont */}
      <div className="demandCont w-full bg-theme-blue bg-fixed overflow-hidden">
        <section className="demandWrapper relative z-[1] flex flex-col items-center gap-[2rem] mx-[4%] pt-[3rem] pb-[7rem]">
          {/* Demand Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-theme-yellow ">
              Demand
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-medium text-white tracking-tight">
              What do you Want ?
            </h1>
            <span className="w-[28rem] h-[0.3rem] bg-white rounded-full mb-[0.2rem]"></span>
            <span className="w-[24rem] h-[0.2rem] bg-white rounded-full"></span>
          </div>

          {/* Demand Row */}
          <div className="demandRow w-full flex justify-center">
            <div className="demandRowWrapper w-full grid mobileSm:grid-rows-3 mobileSm:grid-cols-1 laptopSm:grid-rows-1 laptopSm:grid-cols-3 justify-items-center gap-[3rem] tabletRg:gap-[5rem] p-[2rem] tabletRg:p-[3rem]">
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
                  className="demandCard w-full min-w-[28rem] mobileSm:px-[5%] laptopSm:px-[10%] py-[2.5rem] tabletSm:py-[3rem] tabletRg:py-[3.5rem] flex mobileSm:flex-col tabletSm:flex-row laptopSm:flex-col items-center gap-[3rem] bg-[#ffffffb0] backdrop-blur-xl rounded-xl text-theme-blue hover:translate-y-[-0.8rem] hover:shadow-xl transition-all"
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
                    <button className="text-[1.5rem] leading-[1.5rem] font-semibold flex items-center gap-[1rem] bg-transparent text-theme-blue px-[1.5rem] py-[1rem] rounded-md border-[0.2rem] border-theme-blue hover:text-white hover:bg-theme-blue hover:scale-[1.02] active:scale-[0.98] transition-all">
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
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-theme-yellow ">
              Agents
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-theme-blue tracking-tight">
              Our Lead Experts
            </h1>
            <span className="w-[23rem] h-[0.3rem] bg-theme-blue rounded-full mb-[0.2rem]"></span>
            <span className="w-[19rem] h-[0.2rem] bg-theme-blue rounded-full"></span>
          </div>

          {/* Agent Row */}
          <div className="agentRow w-full flex justify-center pt-[3rem] pb-[4rem]">
            <div className="agentRowWrap grid grid-cols-1 mobileRg:grid-cols-2 laptopSm:grid-cols-4 gap-[2.5rem]">
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

      {/* Feedback Cont */}
      <div className="feedbackCont w-full">
        <section className="feedbackWrapper flex flex-col items-center gap-[2rem] tabletLg:gap-[2rem] laptopSm:gap-[4rem] laptopRg:gap-[5rem] desktopSm:gap-[5.5rem] mx-[4%] pt-[3rem] pb-[7rem] border-t-[0.2rem] border-neutral-200">
          {/* Feedback Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-theme-yellow ">
              Feedback
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-theme-blue tracking-tight">
              People Say About Us
            </h1>
            <span className="w-[23rem] h-[0.3rem] bg-theme-blue rounded-full mb-[0.2rem]"></span>
            <span className="w-[19rem] h-[0.2rem] bg-theme-blue rounded-full"></span>
          </div>

          {/* Feedback Content */}
          <div className="feedbackContent w-full flex flex-col gap-[5rem] tabletLg:flex-row justify-between pb-[4rem]">
            {/* Feedback Swiper */}
            <div className="textSide w-[100%] tabletLg:w-[50%] self-start tabletLg:self-start  flex flex-col items-start gap-[2.5rem] tabletLg:gap-[3rem]">
              {/* Quote Icon */}
              <div className="quoteIcon text-[4.5rem] text-cyan-950 drop-shadow-xl ml-[1rem] mt-[1rem]">
                <FaQuoteLeft />
              </div>

              {/* Swiper */}
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                loop={true}
                navigation={false}
                className="mySwiper w-full cursor-grab"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {testimonials.map(({ name, designation, image }, index) => (
                  <SwiperSlide
                    key={index}
                    className="w-full flex flex-col gap-[3rem] px-[2.5rem]"
                  >
                    <p className="text-[1.6rem] text-neutral-800 font-medium">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Reprehenderit velit debitis corporis blanditiis aliquid
                      esse inventore suscipit, doloribus beatae consectetur
                      vitae, sed animi provident! Laborum voluptates adipisci
                      ratione voluptatibus odio commodi saepe nisi iure, dolore
                      quae, tenetur molestiae minus labore.
                    </p>

                    <div className="feedbackPerson flex items-center gap-[2rem]">
                      <div className="personImage flex items-center justify-center">
                        <img
                          src={image}
                          alt="person"
                          className="w-[6rem] h-[6rem] object-cover rounded-full drop-shadow-lg"
                        />
                      </div>
                      <div className="personInfo flex flex-col items-start gap-[0.8rem]">
                        <h6 className="text-[1.8rem] leading-[1.8rem] font-semibold text-neutral-800">
                          {name}
                        </h6>
                        <p className="text-[1.5rem] leading-[1.5rem] font-medium">
                          {designation}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Swiper Buttons */}
              <div className="swiperButtons flex gap-[1.2rem] pl-[2.5rem] mt-[1rem]">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="previous outline-none text-[4rem] text-neutral-800 hover:scale-[1.3] hover:text-theme-yellow transition-all"
                >
                  <HiOutlineArrowNarrowLeft />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="next outline-none text-[4rem] text-neutral-800 hover:scale-[1.2] hover:text-theme-yellow transition-all"
                >
                  <HiOutlineArrowNarrowRight />
                </button>
              </div>
            </div>

            {/* Feedback Image */}
            <div className="imageSide w-[100%] mobileRg:w-[90%] tabletSm:w-[80%] tabletLg:w-[46%] self-end tabletLg:self-center tabletLg:max-h-[40rem] relative z-[1] flex items-center justify-center before:content-[''] before:absolute before:z-10 before:w-full before:h-full before:bg-gradient-to-r before:to-[#22222260] before:from-transparent before:rounded-xl after:content-[''] after:absolute after:z-[-1] after:right-[-11%] after:bottom-[-10%] after:w-[60%] after:h-[120%] after:bg-theme-yellow after:rounded-tl-xl after:rounded-bl-xl">
              <img
                src={feedbackImage}
                alt="feedback"
                className="w-full h-full tabletLg:min-h-[35rem] object-cover select-none rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Subscribe Cont */}
      <div className="subscribeCont w-full">
        <section className="subscribeWrapper flex flex-col items-center gap-[1rem] mx-[4%] pt-[3rem] pb-[8rem] border-t-[0.2rem] border-neutral-200">
          {/* Subscribe Heading */}
          <div className="heading w-full flex flex-col items-center py-[2rem]">
            <span className="text-[1.5rem] leading-[1.5rem] font-semibold text-theme-yellow ">
              Subscribe
            </span>
            <h1 className="text-[3.2rem] leading-[4.5rem] font-semibold text-theme-blue tracking-tight">
              Stay In Touch
            </h1>
            <span className="w-[18rem] h-[0.3rem] bg-theme-blue rounded-full mb-[0.2rem]"></span>
            <span className="w-[14rem] h-[0.2rem] bg-theme-blue rounded-full"></span>
          </div>

          {/* Subscribe Content */}
          <div className="content w-full flex flex-col items-center gap-[3rem]">
            <p className="mobileSm:w-[90%] tabletSm:w-[80%] tabletRg:w-[75%] tabletLg:w-[65%] laptopSm:w-[55%] desktopSm:w-[50%] text-[1.6rem] leading-[2.2rem] font-medium text-center">
              We recommended you to subscribe our newsletter, enter your get our
              daily update about us.
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
                  className="w-[32.5%] tabletSm:w-[30%] tabletRg:w-[27.5%] tabletLg:w-[25%] laptopSm:w-[22.5%] desktopSm:w-[20%] bg-theme-blue text-white text-[1.5rem] leading-[1.6rem] py-[1rem] rounded-md font-semibold tracking-[0.02rem] cursor-pointer"
                />
              </fieldset>
            </form>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
