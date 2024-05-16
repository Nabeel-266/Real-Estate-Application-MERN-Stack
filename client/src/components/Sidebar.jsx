import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// Import Assets
import LogoLight from "../assets/logoIcon-light.png";
import User from "../assets/user2.png";

// Import React Icons
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const location = useLocation();
  const [isActiveTab, setIsActiveTab] = useState(
    location.pathname.split("/")[1]
  );

  return (
    <aside
      className={`sidebar w-[35rem] min-w-[30rem] h-dvh fixed z-[999] top-0 left-0 backdrop-blur-[10px] bg-[#06171fe0] translate-x-[-100%] tabletLg:translate-x-[-100%] ${
        isOpenSidebar ? "translate-x-[0%]" : "translate-x-[-100%]"
      } transition-all `}
    >
      {/* Sidebar Header */}
      <div className="sidebarHeader w-full px-[1rem]">
        <div className="headerWrapper w-full flex items-center justify-between py-[1.5rem] border-b-[0.2rem] border-[#0b2a33]">
          <div className="logo flex items-center gap-[0.6rem]">
            <img
              src={LogoLight}
              alt="Logo"
              className="w-[4.3rem] select-none"
            />
            <h4 className="text-[3rem] leading-[3rem] text-white font-semibold font-quick select-none">
              <span className="font-bold font-montAlter">Nab</span>
              <span>Estate</span>
            </h4>
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
              [HiOutlineHome, "Home", "/"],
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
                  } w-full relative overflow-hidden before:content-[''] before:w-[100%] before:h-[100%] before:z-0 before:absolute before:top-0 before:left-0 before:bg-[#0b2a33] before:rounded-e-full before:transition before:ease-out before:duration-[0.4s] peer/navItem`}
                >
                  <Link
                    to={route}
                    onClick={() => {
                      setIsActiveTab(route.split("/")[1]);
                      // setSidebarState(false);
                    }}
                    className={`${
                      isActiveTab === route.split("/")[1]
                        ? "text-amber-400 border-amber-400 border-l-[0.3rem]"
                        : "text-white border-white hover:border-l-[0.3rem]"
                    } w-full relative z-10 flex items-center gap-[1.2rem] px-[1.5rem] py-[1rem]`}
                  >
                    <Icon className="text-[2.4rem]" />
                    <span className="text-[2rem] leading-[2rem] font-semibold">
                      {title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="w-full flex flex-col px-[0.8rem] py-[1.5rem] absolute z-50 bottom-0 border-t-[0.2rem] border-[#0b2a33]">
          <button className="w-full relative flex items-center gap-[1.2rem] px-[1.2rem] py-[0.8rem] text-[2rem] text-cyan-950 font-semibold bg-white cursor-pointer rounded-full transition-all hover:bg-amber-400 active:scale-[0.98]">
            <img
              src={User}
              alt="profile"
              className="w-[2.9rem] rounded-full bg-cyan-950 p-[0.2rem]"
            />
            Profile
            <span className="flex items-center justify-center min-w-[3rem] min-h-[3rem] p-[0.4rem] absolute right-[0.8rem] text-[1.4rem] leading-[1rem] font-semibold font-quick text-white bg-red-500 rounded-full overflow-hidden">
              99+
            </span>
          </button>
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;