import { useState } from "react";

// Import Assets
import aboutUsImage from "../assets/About/about-us.png";
import ourMissionImage from "../assets/About/mission.png";
import ourVisionImage from "../assets/About/vision.png";
import ourSolutionImage from "../assets/About/solution.png";
import expertiseImage from "../assets/About/expertise.png";
import personalizedImage from "../assets/About/personalized.png";
import insuranceImage from "../assets/About/insurance.png";
import profitImage from "../assets/About/profit.png";

// Import React Icons
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa6";

// Import Component
import Footer from "../components/Footer";

const solutions = [
  {
    id: 1,
    query: "How do you help in finding the perfect property ?",
    solution:
      "At NAB Estate, we have a vast database of properties and use advanced search tools to match your preferences. Our team listens to your needs and provides a curated list of properties that fit your criteria, saving you time and effort.",
  },
  {
    id: 2,
    query: "What services do you offer for property sellers ?",
    solution:
      "We offer comprehensive services for property sellers, including property valuation, marketing, and negotiation support. Our aim is to help you sell your property at the best possible price and in the shortest time frame.",
  },
  {
    id: 3,
    query: "Can you assist with property investments ?",
    solution:
      "At NAB Estate, we have a vast database of properties and use advanced search tools to match your preferences. Our team listens to your needs and provides a curated list of properties that fit your criteria, saving you time and effort.",
  },
  {
    id: 4,
    query: "Do you provide legal and financial advice ?",
    solution:
      "Absolutely. We work closely with a network of legal and financial experts to offer you advice and assistance on all legal and financial aspects of your property transaction, ensuring a smooth and compliant process.",
  },
  {
    id: 5,
    query: "What makes your customer service stand out ?",
    solution:
      "Our customer service is driven by a commitment to excellence. We are available to assist you at every step, offering timely and responsive support to address any concerns or queries you may have.",
  },
];

const services = [
  {
    id: 1,
    iconImage: expertiseImage,
    title: "Expertise and Experience",
    description:
      "With years of experience in the real estate industry, our team brings a wealth of knowledge and expertise to every transaction. We have a deep understanding of the market trends and are adept at navigating complex real estate scenarios.",
  },
  {
    id: 2,
    iconImage: personalizedImage,
    title: "Personalized Service",
    description:
      "We believe that every client is unique, and so are their real estate needs. Our dedicated professionals provide tailored solutions to match your specific requirements, ensuring a personalized and satisfactory experience.",
  },
  {
    id: 3,
    iconImage: insuranceImage,
    title: "Property Insurance",
    description:
      "We prioritize your property's safety with comprehensive insurance solutions. NAB Estate partners with leading insurers to offer tailored coverage, protecting your investment from unforeseen events and providing you with peace of mind and security.",
  },
  {
    id: 4,
    iconImage: profitImage,
    title: "Lowest Commission",
    description:
      "NAB Estate offers the lowest commission rates in the market, ensuring cost-effective real estate transactions. Save money while receiving top-notch service, maximizing your investment returns with our expert and personalized approach.",
  },
];

const About = () => {
  const [solutionNum, setSolutionNum] = useState(1);

  return (
    <div className="aboutCont w-full min-h-dvh pt-[6rem]">
      {/* About Heading */}
      <div className="aboutHd w-full h-[25rem] bg-about-hd-image bg-cover bg-bottom bg-no-repeat">
        <div className="aboutHdWrapper w-full h-full flex items-center justify-center bg-[#22222290] backdrop-blur-[0.2rem] border-b-[0.3rem] border-dotted border-white">
          <h1 className="text-[4rem] leading-[2rem] font-bold text-white">
            ABOUT US
          </h1>
        </div>
      </div>

      {/* About Us Cont */}
      <div className="aboutUsCont w-full">
        <section className="aboutUsWrapper flex flex-col-reverse gap-[4rem] laptopSm:gap-0 laptopSm:flex-row items-center justify-between mx-[4%] py-[4rem]">
          <div className="imageSide w-[70%] laptopSm:w-[42%] flex items-center justify-center">
            <img
              src={aboutUsImage}
              alt="aboutUs"
              className="w-full h-full object-cover select-none animate-holding drop-shadow-xl"
            />
          </div>
          <div className="textSide w-[100%] laptopSm:w-[55%] flex flex-col items-start gap-[1.2rem]">
            <h2 className="text-[3rem] leading-[3rem] font-semibold relative text-[#082835] before:content-[''] before:absolute before:bottom-[-0.3rem] before:left-0 before:w-full before:h-[0.3rem] before:bg-amber-400 before:rounded-full after:content-[''] after:absolute after:bottom-[-0.8rem] after:left-0 after:w-[75%] after:h-[0.2rem] after:bg-amber-400 after:rounded-full">
              NAB Estate at a Glance
            </h2>
            <p className="text-[1.7rem] font-medium text-neutral-800 mt-[1rem]">
              Welcome to <strong>NAB Estate</strong>, a premier real estate
              company dedicated to providing exceptional services and unmatched
              expertise in the property market. We specialize in providing
              exceptional services to help you find your dream property or sell
              your existing one at the best value. Our dedicated team of
              professionals is committed to helping you navigate the
              complexities of buying, selling, or investing in property.
            </p>

            <p className="text-[1.7rem] font-medium text-neutral-800">
              At <strong>NAB Estate</strong>, we believe in building
              long-lasting relationships based on trust and integrity, making us
              a preferred choice for all your real estate solutions.
            </p>
          </div>
        </section>
      </div>

      {/* Our Mission Cont */}
      <div className="ourMissionCont w-full">
        <section className="ourMissionWrapper flex flex-col-reverse gap-[3rem] laptopSm:gap-0 laptopSm:flex-row-reverse items-center justify-between mx-[4%] py-[3.5rem] laptopSm:py-[2.5rem]">
          <div className="imageSide w-[70%] laptopSm:w-[42%] flex items-center justify-center">
            <img
              src={ourMissionImage}
              alt="OurMission"
              className="w-full h-full object-cover select-none animate-holding"
            />
          </div>

          <div className="textSide w-[100%] laptopSm:w-[55%] flex flex-col items-center gap-[3rem]">
            <h2 className="text-[3rem] leading-[3rem] font-semibold relative text-[#082835] before:content-[''] before:absolute before:bottom-[-0.3rem] before:left-0 before:w-full before:h-[0.3rem] before:bg-amber-400 before:rounded-full after:content-[''] after:absolute after:bottom-[-0.8rem] after:left-0 after:w-[75%] after:h-[0.2rem] after:bg-amber-400 after:rounded-full">
              Our Mission
            </h2>
            <p className="text-[1.7rem] font-medium text-neutral-800 text-center laptopSm:text-left">
              Our mission at <strong>NAB Estate</strong> is to revolutionize the
              real estate industry by offering unparalleled services that exceed
              our clients' expectations. We aim to provide a seamless,
              transparent, and stress-free real estate journey, ensuring every
              transaction is handled with utmost professionalism and care. Our
              goal is to empower our clients with the knowledge and tools they
              need to make informed decisions, fostering a culture of trust and
              reliability in every interaction.
            </p>
          </div>
        </section>
      </div>

      {/* Our Vision Cont */}
      <div className="ourVisionCont w-full">
        <section className="ourVisionWrapper flex flex-col-reverse gap-[3rem] laptopSm:gap-0 items-center justify-between mx-[4%] py-[3.5rem] laptopSm:py-[3rem]">
          <div className="imageSide w-[70%] laptopSm:w-[43%] flex items-center justify-center">
            <img
              src={ourVisionImage}
              alt="OurVision"
              className="w-full h-full object-cover select-none animate-holding"
            />
          </div>
          <div className="textSide w-[100%] laptopSm:w-[53%] flex flex-col items-start gap-[3rem]">
            <h2 className="text-[3rem] leading-[3rem] font-semibold relative text-[#082835] before:content-[''] before:absolute before:bottom-[-0.3rem] before:left-0 before:w-full before:h-[0.3rem] before:bg-amber-400 before:rounded-full after:content-[''] after:absolute after:bottom-[-0.8rem] after:left-0 after:w-[75%] after:h-[0.2rem] after:bg-amber-400 after:rounded-full">
              Our Vision
            </h2>
            <p className="text-[1.7rem] font-medium text-neutral-800">
              Our vision is to become the leading real estate company known for
              excellence, innovation, and integrity. We aspire to set new
              standards in the industry by leveraging cutting-edge technology,
              market expertise, and a client-centric approach. At{" "}
              <strong>NAB Estate</strong>, we envision a future where every
              client finds their perfect property with ease and confidence,
              making us the go-to choice for all real estate solutions.
            </p>
          </div>
        </section>
      </div>

      {/* Our Solution Cont */}
      <div className="ourSolutionCont w-full">
        <section className="ourSolutionWrapper flex flex-row-reverse items-center justify-between mx-[4%] pt-[5rem] pb-[4rem]">
          <div className="imageSide w-[43.5%] flex items-center justify-center">
            <img
              src={ourSolutionImage}
              alt="OurSolution"
              className="w-full object-cover select-none animate-holding"
            />
          </div>

          <div className="textSide w-[48%] flex flex-col items-start gap-[5rem]">
            <h2 className="text-[3rem] leading-[3rem] font-semibold relative text-[#082835] before:content-[''] before:absolute before:bottom-[-0.4rem] before:left-0 before:w-full before:h-[0.3rem] before:bg-amber-400 before:rounded-full after:content-[''] after:absolute after:bottom-[-0.9rem] after:left-0 after:w-[75%] after:h-[0.2rem] after:bg-amber-400 after:rounded-full">
              Our Quick Solutions
            </h2>

            <div className="accCont w-full flex flex-col border-[0.2rem] border-neutral-500 rounded-2xl overflow-hidden">
              {solutions.map(({ id, query, solution }, index) => (
                <div
                  key={index}
                  className={`accordion w-full flex flex-col overflow-hidden ${
                    index !== 0 && "border-t-[0.2rem] border-white"
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => setSolutionNum(id)}
                    className="accHeader w-full flex items-center justify-between px-[1.5rem] py-[1.6rem] bg-[#082835] text-white cursor-pointer"
                  >
                    <h4 className="text-[1.7rem] leading-[1.75rem] font-semibold">
                      {query}
                    </h4>
                    <div className="accIcon flex items-center justify-center text-[2rem]">
                      {id === solutionNum ? (
                        <FaLightbulb className="text-amber-400 drop-shadow-[0px_0px_4px_rgb(251_191_36)]" />
                      ) : (
                        <FaRegLightbulb className="text-white" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className={`accBody ${
                      solutionNum === id
                        ? "h-auto max-h-[100rem] py-[1rem]"
                        : "max-h-0 p-0"
                    } w-full px-[1.5rem] transition-all duration-500 ease-in-out overflow-hidden`}
                  >
                    <p className={`text-[1.55rem] font-medium`}>{solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Us Cont */}
      <div className="chooseUsCont w-full">
        <section className="chooseUsWrapper flex flex-col items-start justify-start gap-[5rem] mx-[4%] pt-[5rem] pb-[7rem]">
          <h2 className="text-[3rem] leading-[3rem] font-semibold relative text-[#082835] before:content-[''] before:absolute before:bottom-[-0.6rem] before:left-0 before:w-full before:h-[0.3rem] before:bg-amber-400 before:rounded-full after:content-[''] after:absolute after:bottom-[-1.1rem] after:left-0 after:w-[75%] after:h-[0.2rem] after:bg-amber-400 after:rounded-full">
            Why Choose Us Our Service
          </h2>

          <div className="grid grid-cols-2 gap-[3rem]">
            {services.map(({ iconImage, title, description }, index) => (
              <div
                key={index}
                className="serviceCard flex items-start gap-[2rem] p-[1.5rem] rounded-xl"
              >
                <div className="icon">
                  <img src={iconImage} alt={title} className="w-[30rem]" />
                </div>
                <div className="discription flex flex-col gap-[1rem]">
                  <h5 className="text-[2.2rem] leading-[2.2rem] font-semibold text-neutral-800">
                    {title}
                  </h5>
                  <p className="text-[1.5rem] font-medium">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
