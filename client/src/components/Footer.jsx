import React from "react";
import { Link } from "react-router-dom";

// Import React Icon
import { FaCaretRight } from "react-icons/fa";

// Import Images
import LogoLight from "../assets/logo-light.png";
import Facebook from "../assets/Social-Icons/facebook.png";
import Instagram from "../assets/Social-Icons/instagram.png";
import Linkedin from "../assets/Social-Icons/linkedin.png";
import Twitter from "../assets/Social-Icons/twitter.png";
import Youtube from "../assets/Social-Icons/youtube.png";

const Footer = () => {
  return (
    <footer className="header relative bottom-0 w-full flex items-center backdrop-blur-[20px] bg-footer-image bg-cover bg-no-repeat bg-center bg-fixed bg-clip-padding bg-[#08283560] bg-blend-multiply border-t-[0.2rem] border-[#082835] border-dotted">
      <div className="headerWrapper w-full flex flex-col justify-between mx-[4%] text-white">
        {/* Footer Top */}
        <section className="footerTop w-full grid grid-cols-12 gap-[3rem] laptopSm:grid-cols-5 laptopSm:gap-[2rem] pt-[4rem] pb-[3rem]">
          {/* Objective */}
          <div className="objective col-span-12 tabletSm:col-span-12 laptopSm:col-span-2 flex flex-col gap-[1rem] text-[1.5rem] leading-[1.9rem] font-sans font-light text-neutral-200 pr-[0%] tabletSm:pr-[15%]">
            <img src={LogoLight} alt="Logo" className="w-[20rem]" />

            <p className="tracking-[-0.02rem]">
              <b className="text-neutral-100">Nab Estate</b> is your premier
              destination for luxury and comfort in the real estate market. We
              pride ourselves on offering exclusive properties that meet the
              highest standards of quality and design.
            </p>

            <p className="tracking-[-0.02rem]">
              Our dedicated team is committed to helping you find your dream
              home, whether you are buying, selling, or investing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="quickLinks col-span-6 tabletSm:col-span-4 laptopSm:col-span-1 flex flex-col gap-[1rem] py-[0.5rem]">
            <h5 className="text-[1.8rem] font-medium">Quick Links</h5>
            <ul className="flex flex-col gap-[1rem]">
              {[
                { linkTitle: "Home", linkRoute: "/" },
                { linkTitle: "Explore", linkRoute: "/explore" },
                { linkTitle: "About", linkRoute: "/about" },
                { linkTitle: "Contact", linkRoute: "/contact" },
                { linkTitle: "Team", linkRoute: "/team" },
              ].map(({ linkTitle, linkRoute }, index) => (
                <li key={index}>
                  <Link
                    to={linkRoute}
                    className="text-[1.5rem] leading-[1.5rem] font-sans text-neutral-200 flex items-center gap-[0.2rem] hover:translate-x-[0.5rem] hover:text-amber-400 transition-all"
                  >
                    <FaCaretRight /> {linkTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div className="propertyTypes col-span-6 tabletSm:col-span-4 laptopSm:col-span-1 flex flex-col gap-[1rem] py-[0.5rem]">
            <h5 className="text-[1.8rem] font-medium">Property Types</h5>
            <ul className="flex flex-col gap-[1rem]">
              {[
                { linkTitle: "Commercial", linkRoute: "/" },
                { linkTitle: "Office", linkRoute: "/" },
                { linkTitle: "Shop", linkRoute: "/" },
                { linkTitle: "Residential", linkRoute: "/" },
                { linkTitle: "House", linkRoute: "/" },
                { linkTitle: "Appartment", linkRoute: "/" },
                { linkTitle: "Rooms", linkRoute: "/" },
                { linkTitle: "Plot", linkRoute: "/" },
              ].map(({ linkTitle, linkRoute }, index) => (
                <li key={index} className="max-w-max">
                  <Link
                    to={linkRoute}
                    className={`text-[1.5rem] leading-[1.5rem] font-sans text-neutral-200 flex items-center gap-[0.2rem] hover:translate-x-[0.5rem] hover:text-amber-400 transition-all ${
                      linkTitle === "Commercial" ||
                      linkTitle === "Residential" ||
                      linkTitle === "Plot"
                        ? "pl-[0rem]"
                        : "pl-[1rem]"
                    }`}
                  >
                    <FaCaretRight /> {linkTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="follow&Help col-span-12 tabletSm:col-span-4 laptopSm:col-span-1 flex flex-col items-center tabletSm:items-start gap-[1rem] py-[0.5rem]">
            <h5 className="text-[1.8rem] font-medium">Follow Us</h5>
            <ul className="flex gap-[0.5rem]">
              {[
                { LinkIcon: Facebook, linkRoute: "/" },
                { LinkIcon: Instagram, linkRoute: "/" },
                { LinkIcon: Linkedin, linkRoute: "/" },
                { LinkIcon: Twitter, linkRoute: "/" },
                { LinkIcon: Youtube, linkRoute: "/" },
              ].map(({ LinkIcon, linkRoute }, index) => (
                <li key={index}>
                  <Link
                    to={linkRoute}
                    className="text-[1.5rem] leading-[1.5rem] font-sans text-neutral-200 flex items-center gap-[0.2rem] filter grayscale-[0.5] hover:filter-none hover:scale-[1.1] hover:text-amber-400 transition-all"
                  >
                    <img
                      src={LinkIcon}
                      alt="LinkIcon"
                      className="w-[3.4rem] h-[3.4rem] object-contain"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer Bottom */}
        <section className="footerBottom w-full flex flex-col gap-[0.5rem] tabletRg:flex-row items-center justify-between py-[1.5rem] text-[1.4rem] font-sans border-t-[0.2rem] border-neutral-500 border-dotted">
          <span>&copy; Copyright 2024. All rights reserved</span>
          <span>Designed & Powered by Muhammad Nabeel</span>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
