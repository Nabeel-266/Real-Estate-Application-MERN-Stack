import { Link, NavLink } from "react-router-dom";

// Import React Icons
import { CgMenuRight } from "react-icons/cg";

// Import Assets
import LogoDark from "../assets/logo-dark.png";
import User from "../assets/user.png";

const Header = ({ setIsOpenSidebar }) => {
  return (
    <header className="header w-full h-[6rem] flex items-center fixed top-0 left-0 z-[99] backdrop-blur-[20px] bg-[#ffffffd8] shadow-sm">
      <div className="headerWrapper w-full flex items-center justify-between mx-[4%]">
        {/* Header Left Side */}
        <div className="leftSide flex items-center gap-[3.5rem]">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img
                src={LogoDark}
                alt="Logo"
                className="w-[22rem] mb-[0.4rem]"
              />
            </Link>
          </div>

          {/* Navigations */}
          <nav className="navigations hidden tabletLg:block">
            <ul className="flex items-center gap-[1rem]">
              {[
                ["Explore", "/explore"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Team", "/team"],
              ].map(([tilte, path], index) => (
                <li
                  key={index}
                  className="nav-item text-[#082835] relative z-[2] before:content-[''] before:absolute before:z-[1] before:bottom-[-0.2rem] before:w-full before:h-[0.3rem] before:bg-cyan-900 before:rounded-full before:transition-[all_0.5s_ease-in] before:scale-x-[0] hover:before:scale-x-[1]"
                >
                  <NavLink
                    to={path}
                    className="nav-link relative z-[3] text-[1.8rem] leading-[1.8rem] font-medium text-center px-[0.5rem] py-[0.2rem]"
                    href="#"
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
          <div className="authBtns flex items-center gap-[1.4rem]">
            {/* Signin Button */}
            <Link to="/account/sign-in">
              <button className="signinBtn hidden tabletSm:block text-[1.7rem] leading-[1.6rem] font-semibold text-[#082835] p-[1rem] rounded-md hover:text-amber-400 transition-all ">
                Sign in
              </button>
            </Link>

            {/* Signup Button */}
            <Link to="/account/sign-up">
              <button className="signupBtn hidden tabletSm:block text-[1.7rem] leading-[1.6rem] font-semibold text-[#082835] p-[1rem] bg-amber-400 rounded-md hover:bg-[#082835] hover:text-amber-400 transition-all">
                Sign up
              </button>
            </Link>
          </div>

          {/* Profile */}
          <div className="profile relative hidden tabletSm:hidden items-center gap-[1rem] px-[0.5rem] tabletSm:px-0">
            {/* Profile Image */}
            <div className="profileImage">
              <img
                src={User}
                alt="profile"
                className="w-[2.9rem] rounded-full bg-[#082835] p-[0.2rem]"
              />
            </div>

            {/* Profile Button */}
            <button className="profileBtn text-[1.7rem] leading-[1.7rem] font-semibold text-[#082835] px-[1.6rem] py-[0.8rem] bg-amber-400 rounded-md hidden tabletSm:block">
              Profile
            </button>

            <span className="flex items-center justify-center min-w-[2rem] min-h-[2rem] p-[0.4rem] absolute top-[-0.8rem] right-[-0.8rem] text-[1.2rem] leading-[1rem] font-semibold font-quick text-white bg-red-500 rounded-full overflow-hidden">
              99+
            </span>
          </div>

          {/* Open Sidebar Button */}
          <button
            onClick={() => setIsOpenSidebar((prvState) => !prvState)}
            className="text-[3.5rem] text-[#082835] block tabletLg:hidden"
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
