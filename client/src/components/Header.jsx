import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Import React Icons
import { CgMenuRight } from "react-icons/cg";

// Import Assets
import LogoDark from "../assets/logo-dark.png";
import User from "../assets/user.png";

const Header = ({ setIsOpenSidebar }) => {
  const location = useLocation();
  const routeLocation = location.pathname;
  const { authenticUser } = useSelector((state) => state?.user);

  return (
    <header className="header w-full flex items-center fixed top-0 left-0 z-[99] backdrop-blur-[20px] bg-[#fffffff0]">
      <div className="headerWrapper w-full h-[6rem] flex items-center justify-between mx-[2%] px-[2%] border-b-[1px] border-neutral-100 ">
        {/* Header Left Side */}
        <div className="leftSide flex items-center justify-between gap-[2.5rem] laptopSm:gap-[3rem]">
          {/* Logo */}
          <div className="logo w-[22rem] tabletLg:w-[21rem]">
            <Link to="/">
              <img src={LogoDark} alt="Logo" className="w-full mb-[0.4rem]" />
            </Link>
          </div>

          {/* Navigations */}
          <nav className="navigations hidden tabletLg:block">
            <ul className="flex items-center gap-[0.7rem] laptopSm:gap-[0.9rem]">
              {[
                ["Explore", "/explore"],
                // ["Add Property", "/add-property"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([tilte, path], index) => (
                <li
                  key={index}
                  className={`nav-item text-theme-blue relative z-[2] before:content-[''] before:absolute before:z-[1] before:bottom-[-0.5rem] before:w-full before:h-[0.3rem] before:rounded-full before:transition-[all_0.5s_ease-in] before:scale-x-[0] hover:before:scale-x-[1] ${
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
                <button className="signinBtn text-[1.7rem] leading-[1.6rem] font-semibold text-theme-blue p-[0.8rem] rounded-md hover:text-theme-yellow border-[0.2rem] border-theme-yellow transition-all ">
                  Sign in
                </button>
              </Link>

              {/* Signup Button */}
              <Link to="/account/sign-up">
                <button className="signupBtn text-[1.7rem] leading-[1.6rem] font-semibold text-theme-blue p-[1rem] bg-theme-yellow rounded-md hover:bg-theme-blue hover:text-theme-yellow transition-all">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Profile */}
          {authenticUser && (
            <div className="profile relative hidden tabletSm:flex items-center gap-[1rem] px-[0.5rem] tabletSm:px-0">
              {/* Add Property Button */}
              <Link to="/add-property">
                <button className="addPropertyBtn text-[1.6rem] leading-[1.5rem] font-semibold bg-theme-yellow text-theme-blue px-[1.2rem] py-[0.9rem] rounded-md hover:bg-theme-blue hover:text-white transition-all ">
                  Add Property
                </button>
              </Link>

              {/* Profile Image */}
              <div className="profileImage">
                <img
                  src={User}
                  alt="profile"
                  className="w-[3.4rem] rounded-full bg-theme-blue border-[0.2rem] border-neutral-300"
                />
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
