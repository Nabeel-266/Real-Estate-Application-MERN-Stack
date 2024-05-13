import { NavLink } from "react-router-dom";

// Import React Icons
import { CgMenuRight } from "react-icons/cg";

// Import Assets
import LogoDark from "../assets/logoIcon-dark.png";
import User from "../assets/user2.png";

const Header = ({ setIsOpenSidebar }) => {
  return (
    <header className="header w-full h-[6rem] flex items-center fixed top-0 left-0 z-[99] backdrop-blur-[20px] bg-[#ffffffd8]">
      <div className="headerWrapper w-full flex justify-between mx-[4%]">
        {/* Header Left Side */}
        <div className="leftSide flex items-center gap-[3rem]">
          {/* Logo */}
          <div className="logo flex items-center gap-[0.2rem]">
            <img src={LogoDark} alt="Logo" className="w-[4rem] select-none" />
            <h4 className="text-[3rem] leading-[3rem]  text-cyan-950 font-semibold font-quick select-none">
              <span className="font-bold font-montAlter">Nab</span>
              <span>Estate</span>
            </h4>
          </div>

          {/* Navigations */}
          <nav className="navigations hidden tabletLg:block">
            <ul className="flex items-center gap-[1rem]">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Team", "/team"],
              ].map(([tilte, path], index) => (
                <li
                  key={index}
                  className="nav-item text-cyan-950 relative before:content-[''] before:absolute before:-z-[1] before:bottom-[0.2rem] before:w-full before:h-[0.3rem] before:bg-cyan-900 before:rounded-full before:transition-[all_0.5s_ease-in] before:scale-x-[0] hover:before:scale-x-[1]"
                >
                  <NavLink
                    to={path}
                    className="nav-link text-[1.8rem] leading-[2.6rem] font-medium text-center px-[0.5rem] py-[0.2rem]"
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
          <div className="authBtns hidden items-center gap-[1.4rem]">
            {/* Signin Button */}
            <button className="signinBtn text-[1.7rem] leading-[1.6rem] font-semibold text-cyan-950 p-[1rem] rounded-md hover:text-amber-400 transition-all">
              Sign in
            </button>

            {/* Signup Button */}
            <button className="signupBtn text-[1.7rem] leading-[1.6rem] font-semibold text-cyan-950 p-[1rem] bg-amber-400 rounded-md">
              Sign up
            </button>
          </div>

          {/* Profile */}
          <div className="profile relative flex items-center gap-[1rem] px-[0.5rem] tabletSm:px-0">
            {/* Profile Image */}
            <div className="profileImage">
              <img
                src={User}
                alt="profile"
                className="w-[2.9rem] rounded-full bg-cyan-950 p-[0.2rem]"
              />
            </div>

            {/* Profile Button */}
            <button className="profileBtn text-[1.7rem] leading-[1.7rem] font-semibold text-cyan-950 px-[1.6rem] py-[0.8rem] bg-amber-400 rounded-md hidden tabletSm:block">
              Profile
            </button>

            <span className="flex items-center justify-center min-w-[2rem] min-h-[2rem] p-[0.4rem] absolute top-[-0.8rem] right-[-0.8rem] text-[1.2rem] leading-[1rem] font-semibold font-quick text-white bg-red-500 rounded-full overflow-hidden">
              99+
            </span>
          </div>

          <button
            onClick={() => setIsOpenSidebar((prvState) => !prvState)}
            className="text-[3.5rem] text-cyan-950 block tabletLg:hidden"
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
