// Import Icon
import { FaArrowRightLong } from "react-icons/fa6";

// Import Image
import bannerImage from "../assets/3d-house-2.png";

const Home = () => {
  return (
    <div className="homeCont w-full">
      <div className="homeWrapper mx-[4%]">
        <div className="bannerCont w-full laptopSm:h-dvh flex flex-col laptopSm:flex-row items-center justify-between mt-[10rem] tabletSm:mt-[11rem] laptopSm:mt-[0rem]">
          {/* Side First */}
          <section className="sideFirst w-full laptopSm:w-[45%] laptopRg:w-[50%] pr-0 tabletRg:pr-[18%] laptopSm:pr-0 cursor-default select-none">
            <h1 className="text-[4.3rem] leading-[4.8rem] font-bold text-cyan-950 mb-[1.5rem] tracking-[-0.1rem]">
              Find your next perfect palace with ease
            </h1>

            <p className="text-[1.6rem] text-neutral-800 font-medium mb-[1.5rem] pr-[4rem]">
              Nab Estate will help you find your dream home fast and easy with
              tailored to your desires. Our agents and expert support are always
              available.
            </p>

            <button className="flex items-center gap-[1rem] bg-amber-400 text-cyan-950 py-[1rem] px-[1rem] text-[2rem] leading-[2rem] font-semibold rounded-md active:scale-[0.96] hover:scale-[1.02] transition-all">
              <span>Explore it</span>
              <FaArrowRightLong />
            </button>

            <div className="w-full flex gap-[2%] mt-[3rem]">
              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-cyan-950 p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  16+
                </span>
                <span className="text-[1.5rem] font-normal">
                  Years Experience
                </span>
              </div>

              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-cyan-950 p-[1.5rem] rounded-[0.4rem] boxPattern">
                <span className="text-[3rem] leading-[3rem] font-semibold">
                  200
                </span>
                <span className="text-[1.5rem] font-normal">Awards Gained</span>
              </div>

              <div className="min-w-[30%] flex flex-col gap-[0.2rem] text-white bg-cyan-950 p-[1.5rem] rounded-[0.4rem] boxPattern">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
