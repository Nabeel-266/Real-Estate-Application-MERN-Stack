import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

// Import Assets
import LogoLight from "../assets/logo-light.png";
import User from "../assets/user.png";

// Import React Icons
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state?.user);
  const [isActiveTab, setIsActiveTab] = useState(
    location.pathname.split("/")[1]
  );

  useEffect(() => {
    setIsActiveTab(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsOpenSidebar(false)}
        className={`${
          isOpenSidebar ? "block" : "hidden"
        } sidebarCont w-full h-dvh fixed z-[990] top-0 left-0 backdrop-blur-[10px] bg-[#40404090] overflow-hidden tabletLg:hidden`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`sidebar w-[35rem] min-w-[30rem] h-dvh fixed z-[999] top-0 left-0 backdrop-blur-[10px] bg-[#06171fe0] translate-x-[-100%] tabletLg:translate-x-[-100%] ${
          isOpenSidebar ? "translate-x-[0%]" : "translate-x-[-100%]"
        } transition-all `}
      >
        {/* Sidebar Header */}
        <div className="sidebarHeader w-full px-[1rem]">
          <div className="headerWrapper w-full flex items-center justify-between py-[2rem] border-b-[0.2rem] border-cyan-950">
            <div className="logo flex items-center gap-[0.6rem]">
              <Link to="/" onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
                <img src={LogoLight} alt="Logo" className="w-[23rem]" />
              </Link>
            </div>

            <button
              onClick={() => setIsOpenSidebar(!isOpenSidebar)}
              className="text-[2.8rem] text-white"
            >
              <FaXmark />
            </button>
          </div>
        </div>

        {/* Sidebar Body */}
        <div className="w-full h-[90%] relative flex flex-col">
          <div className="w-full h-[70%] pr-[0.6rem] pt-[1.5rem] pb-[1rem]">
            <ul className="w-full flex flex-col gap-[0.8rem]">
              {[
                [MdOutlineExplore, "Explore", "/explore"],
                [MdOutlineRealEstateAgent, "About", "/about"],
                [RiMessage2Line, "Contact", "/contact"],
                [RiTeamLine, "Team", "/team"],
              ].map(([Icon, title, route], index) => {
                // console.log(route.split("/")[1]);
                return (
                  <li
                    key={index}
                    className={`${
                      isActiveTab === route.split("/")[1]
                        ? "before:translate-x-[-20%]"
                        : "before:translate-x-[-100%] hover:before:translate-x-[0%]"
                    } w-full relative overflow-hidden before:content-[''] before:w-[100%] before:h-[100%] before:z-0 before:absolute before:top-0 before:left-0 before:bg-[#0c2e38] before:rounded-e-full before:transition before:ease-out before:duration-[0.4s] peer/navItem`}
                  >
                    <Link
                      to={route}
                      onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                      className={`${
                        isActiveTab === route.split("/")[1]
                          ? "text-amber-400 border-amber-400 border-l-[0.3rem]"
                          : "text-white border-white hover:border-l-[0.3rem]"
                      } w-full relative z-10 flex items-center gap-[1.5rem] px-[1.5rem] py-[1rem]`}
                    >
                      <Icon className="text-[2.6rem]" />
                      <span className="text-[2.3rem] leading-[2rem] font-semibold">
                        {title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <footer className="w-full flex flex-col px-[0.8rem] py-[1.5rem] absolute z-50 bottom-0 border-t-[0.2rem] border-cyan-950">
            {/* Profile and Logout Buttons */}
            {!currentUser && (
              <div className="w-full">
                <Link to={"/account/sign-in"}>
                  <button
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    className="w-full relative flex items-center gap-[1rem] px-[1.4rem] py-[1rem] text-[2.2rem] leading-[3.2rem] text-cyan-950 font-semibold bg-white cursor-pointer rounded-full transition-all hover:bg-amber-400 active:scale-[0.98]"
                  >
                    <PiSignInBold size={"3rem"} />
                    <span>Sign in</span>
                  </button>
                </Link>
              </div>
            )}

            {/* Profile and Logout Buttons */}
            {currentUser && (
              <div className="w-full flex flex-col gap-[1.5rem]">
                <Link to={"/profile"}>
                  <button
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    className="w-full relative flex items-center gap-[1.2rem] px-[1.2rem] py-[1rem] text-[2.2rem] leading-[3.2rem] text-cyan-950 font-semibold bg-white cursor-pointer rounded-full transition-all hover:bg-amber-400 active:scale-[0.98]"
                  >
                    <img
                      src={User}
                      alt="profile"
                      className="w-[2.9rem] rounded-full bg-cyan-950 p-[0.2rem]"
                    />
                    <span>Profile</span>
                    <span className="flex items-center justify-center min-w-[3rem] min-h-[3rem] p-[0.4rem] absolute right-[0.8rem] text-[1.4rem] leading-[1rem] font-semibold font-quick text-white bg-red-500 rounded-full overflow-hidden">
                      99+
                    </span>
                  </button>
                </Link>

                <button
                  onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                  className="w-full relative flex items-center gap-[1rem] px-[1.4rem] py-[1rem] text-[2.2rem] leading-[3.2rem] text-cyan-950 font-semibold bg-white cursor-pointer rounded-full transition-all hover:bg-amber-400 active:scale-[0.98]"
                >
                  <PiSignOutBold size={"3rem"} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </footer>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
