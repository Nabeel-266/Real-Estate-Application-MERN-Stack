import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/authAPIs";

// Import React Icons
import { CgMenuRight } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

// Import Assets
import LogoDark from "../assets/logo-dark.png";
import User from "../assets/user.png";

const Header = ({ setIsOpenSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const routeLocation = location.pathname;
  const { authenticUser } = useSelector((state) => state?.user);
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenProfileDropdown(false);
    }
  };

  const logoutHandler = async () => {
    try {
      await logoutUser(dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header w-full flex items-center fixed top-0 left-0 z-[99] backdrop-blur-[20px] bg-[#fffffff0]">
      <div className="headerWrapper w-full h-[6rem] flex items-center justify-between mx-[2%] px-[2%] border-b-[1px] border-neutral-100">
        {/* Header Left Side */}
        <div className="leftSide bg-slate- flex items-center justify-between gap-[2.5rem] laptopSm:gap-[3rem]">
          {/* Logo */}
          <div className="logo w-[21rem] tabletLg:w-[19rem]">
            <Link to="/">
              <img src={LogoDark} alt="Logo" className="w-full mb-[0.4rem]" />
            </Link>
          </div>

          {/* Navigations */}
          <nav className="navigations hidden tabletLg:block mt-[0.3rem]">
            <ul className="flex items-center gap-[0.7rem] laptopSm:gap-[0.9rem]">
              {[
                ["Explore", "/explore"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([tilte, path], index) => (
                <li
                  key={index}
                  className={`nav-item text-theme-blue relative z-[2] before:content-[''] before:absolute before:z-[1] before:bottom-[-0.4rem] before:w-full before:h-[0.3rem] before:rounded-full before:transition-[all_0.5s_ease-in] before:scale-x-[0] hover:before:scale-x-[1] ${
                    routeLocation !== path
                      ? "before:bg-cyan-950"
                      : "before:bg-amber-500"
                  } `}
                >
                  <NavLink
                    to={path}
                    className="nav-link relative z-[3] text-[1.8rem] leading-[1.8rem] font-medium text-center px-[0.6rem] py-[0.4rem] whitespace-nowrap"
                  >
                    {tilte}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Header Right Side */}
        <div className="rightSide flex gap-[2rem]">
          {/* Signin & Signup Buttons */}
          {!authenticUser && (
            <div className="authBtns hidden tabletSm:flex items-center gap-[1.4rem]">
              {/* Signin Button */}
              <Link to="/account/sign-in">
                <button className="signinBtn text-[1.6rem] leading-[1.5rem] font-semibold text-theme-blue px-[1.5rem] p-[0.8rem] rounded-md border-[0.2rem] border-neutral-300 shadow-md shadow-neutral-50 hover:bg-theme-blue hover:text-white hover:border-theme-blue transition-all ">
                  SIGN IN
                </button>
              </Link>

              {/* Signup Button */}
              <Link to="/account/sign-up">
                <button className="signupBtn text-[1.6rem] leading-[1.5rem] font-semibold text-theme-blue px-[1.5rem] py-[1rem] bg-theme-yellow rounded-md shadow-md shadow-neutral-50 transition-all">
                  JOIN US
                </button>
              </Link>
            </div>
          )}

          {/* Add Property Button & Profile Avatar */}
          {authenticUser && (
            <div className="relative hidden tabletSm:flex items-center gap-[1.5rem] px-[0.5rem] tabletSm:px-0">
              {/* Add Property Button */}
              <Link to="/add-property">
                <button className="addPropertyBtn hidden tabletLg:flex items-center gap-[0.5rem] text-[1.6rem] leading-[1rem] font-semibold bg-theme-yellow text-theme-blue px-[1.2rem] py-[1rem] rounded-md hover:bg-theme-blue hover:text-white transition-all">
                  <FaPlus size={"1.6rem"} />
                  <span>Add Property</span>
                </button>
              </Link>

              {/* Profile Image & Dropdown */}
              <div className="profileImageCont select-none relative z-10">
                <img
                  src={authenticUser?.profilePicture || User}
                  alt="profile"
                  onClick={() => setIsOpenProfileDropdown(true)}
                  className="size-[3.5rem] rounded-full bg-neutral-200 object-cover cursor-pointer"
                />

                {/* Dropdown */}
                <div
                  ref={dropdownRef}
                  onMouseLeave={() => setIsOpenProfileDropdown(false)}
                  className={`accountDropdown absolute top-[148%] right-0 z-[99] bg-white rounded-lg overflow-hidden shadow-xl p-[0.6rem] flex flex-col gap-[0.6rem] ${
                    isOpenProfileDropdown
                      ? "h-[20.2rem] opacity-100"
                      : "h-0 opacity-0"
                  } transition-all`}
                >
                  <h6 className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.8rem] pt-[1rem] pb-[1rem] border-b-[0.2rem] border-neutral-200">
                    My Credentials
                  </h6>

                  <ul className="w-[20rem] text-[1.6rem] leading-[2rem] font-semibold text-neutral-600 flex flex-col gap-[0.1rem] select-none ">
                    <li className="w-full hover:bg-neutral-100 hover:text-neutral-800 rounded-md">
                      <Link
                        to="/user/profile"
                        className="flex items-center gap-[0.8rem] p-[0.8rem] cursor-pointer transition-all whitespace-nowrap"
                      >
                        <FiUser size="1.8rem" />
                        <span>Profile</span>
                      </Link>
                    </li>

                    <li className="w-full hover:bg-neutral-100 hover:text-neutral-800 rounded-md">
                      <Link
                        to="/user/account"
                        className="flex items-center gap-[0.8rem] p-[0.8rem] cursor-pointer transition-all whitespace-nowrap"
                      >
                        <RiAccountBoxLine size="2rem" />
                        <span>Account</span>
                      </Link>
                    </li>

                    <li className="w-full hover:bg-neutral-100 hover:text-neutral-800 rounded-md">
                      <Link
                        to="/user/property"
                        className="flex items-center gap-[0.8rem] p-[0.8rem] cursor-pointer transition-all whitespace-nowrap"
                      >
                        <MdOutlineMapsHomeWork size="1.9rem" />
                        <span>My Properties</span>
                      </Link>
                    </li>

                    <li
                      onClick={logoutHandler}
                      className="flex items-center gap-[0.8rem] p-[0.8rem] cursor-pointer hover:bg-neutral-100 hover:text-neutral-800 rounded-sm transition-all whitespace-nowrap"
                    >
                      <PiSignOutBold size="1.8rem" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Profile Button
              <Link to="/profile">
                <button className="profileBtn text-[1.7rem] leading-[1.7rem] font-semibold text-theme-blue px-[1.6rem] py-[0.8rem] bg-theme-yellow rounded-md hidden tabletSm:block">
                  Profile
                </button>
              </Link> */}

              {/* <span className="flex items-center justify-center min-w-[2rem] min-h-[2rem] p-[0.4rem] absolute top-[-0.8rem] right-[-0.8rem] text-[1.2rem] leading-[1rem] font-semibold font-quick text-white bg-red-500 rounded-full overflow-hidden">
                99+
              </span> */}
            </div>
          )}

          {/* Open Sidebar Button */}
          <button
            onClick={() => setIsOpenSidebar((prvState) => !prvState)}
            className="text-[3.5rem] text-theme-blue block tabletLg:hidden"
          >
            <CgMenuRight />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

// #1a1f49
// #00baa9
