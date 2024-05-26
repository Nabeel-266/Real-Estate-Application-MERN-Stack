import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import React Icons
import { IoMail, IoMailOpen, IoLockClosed, IoLockOpen } from "react-icons/io5";

// Import Image
import GoogleIcon from "../assets/google.png";

const Signup = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [isEmailSuggest, setIsEmailSuggest] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const routeLocation = useLocation();
  const currentLocation = routeLocation.pathname.split("/")[2];

  return (
    <div
      className={`signupCont w-full py-[3rem] ${
        currentLocation === "sign-up"
          ? "scale-100 w-full h-full"
          : "scale-0 w-0 h-0"
      } transition-all duration-300`}
    >
      {/* Sign-up Cont Wrapper */}
      <div className="signupContWrapper w-full flex items-center justify-center">
        {/* Sign-up Form */}
        <form
          action="#"
          className="regiterForm w-[50rem] flex flex-col gap-[2.5rem] bg-white shadow-2xl px-[2rem] py-[2.5rem] rounded-lg"
        >
          {/* Form Header */}
          <header className="flex flex-col items-center gap-[0.2rem]">
            <h1 className="text-[3rem] leading-[3rem] font-semibold text-center text-cyan-950">
              Create an account
            </h1>

            <span className="text-[1.7rem] font-medium text-center text-neutral-800 tracking-normal py-[0.4rem]">
              Join NAb Estate Today
            </span>
          </header>

          {/* Form Fields */}
          <fieldset className="flex flex-col gap-[3rem]">
            {/* For Register Name */}
            <div className="w-full flex items-center relative px-[1.5rem]">
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="formInput peer/input"
              />

              <label
                htmlFor="username"
                className={`formInputLabel ${
                  registerUsername
                    ? "mb-[4.5rem] text-[1.5rem] text-cyan-950"
                    : "mb-[0rem] text-[1.75rem] text-neutral-500"
                }`}
              >
                Full Name
              </label>
            </div>

            {/* For Register Email */}
            <div className="formEmailCont w-full px-[1.5rem] flex flex-col gap-[1rem]">
              {/* Register Email Input Cont */}
              <div className="w-full flex items-center relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={registerEmail}
                  autoComplete={isEmailSuggest ? "on" : "off"}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="formInput peer/input"
                />

                <label
                  htmlFor="email"
                  className={`formInputLabel ${
                    registerEmail
                      ? "mb-[4.5rem] text-[1.5rem] text-cyan-950"
                      : "mb-[0rem] text-[1.75rem] text-neutral-500"
                  }`}
                >
                  Email Address
                </label>

                {isEmailSuggest ? (
                  <IoMailOpen
                    onClick={() => setIsEmailSuggest(false)}
                    size="3.2rem"
                    className="formInputIcon cursor-pointer"
                  />
                ) : (
                  <IoMail
                    onClick={() => setIsEmailSuggest(true)}
                    size="3.2rem"
                    className="formInputIcon cursor-pointer"
                  />
                )}
              </div>

              {/* Register Email Error Message */}
              {/* <span className="emailErrorMsg text-[1.4rem] leading-[1.4rem] text-red-700">
                Your email address is invalid
              </span> */}
            </div>

            {/* For Register Password */}
            <div className="formPasswordCont w-full px-[1.5rem] flex flex-col gap-[1rem]">
              {/* Register Password Input Cont */}
              <div className="w-full flex items-center relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="formInput peer/input"
                />

                <label
                  htmlFor="password"
                  className={`formInputLabel ${
                    registerPassword
                      ? "mb-[4.5rem] text-[1.5rem] text-cyan-950"
                      : "mb-[0rem] text-[1.75rem] text-neutral-500"
                  }`}
                >
                  Password
                </label>

                {isPasswordVisible ? (
                  <IoLockOpen
                    size="3.2rem"
                    onClick={() => setIsPasswordVisible(false)}
                    className="formInputIcon cursor-pointer"
                  />
                ) : (
                  <IoLockClosed
                    size="3.2rem"
                    onClick={() => setIsPasswordVisible(true)}
                    className="formInputIcon cursor-pointer"
                  />
                )}
              </div>

              {/* Register Password Error Message */}
              {/* <span className="passwordErrorMsg text-[1.4rem] leading-[1.4rem] text-red-700">
                Your password is wrong
              </span> */}
            </div>

            {/* For Register Confirm Password */}
            <div className="formConfirmPassCont w-full px-[1.5rem] flex flex-col gap-[1rem]">
              {/* Register Confirm Pass Input Cont */}
              <div className="w-full flex items-center relative">
                <input
                  type={isConfirmPassVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="formInput peer/input"
                />

                <label
                  htmlFor="password"
                  className={`formInputLabel ${
                    registerConfirmPassword
                      ? "mb-[4.5rem] text-[1.5rem] text-cyan-950"
                      : "mb-[0rem] text-[1.75rem] text-neutral-500"
                  }`}
                >
                  Confirm Password
                </label>

                {isConfirmPassVisible ? (
                  <IoLockOpen
                    size="3.2rem"
                    onClick={() => setIsConfirmPassVisible(false)}
                    className="formInputIcon cursor-pointer"
                  />
                ) : (
                  <IoLockClosed
                    size="3.2rem"
                    onClick={() => setIsConfirmPassVisible(true)}
                    className="formInputIcon cursor-pointer"
                  />
                )}
              </div>

              {/* Register Confirm Password Error Message */}
              {/* <span className="confirmPasswordErrorMsg text-[1.4rem] leading-[1.4rem] text-red-700">
                Your password is wrong
              </span> */}
            </div>
          </fieldset>

          {/* For Register & Forget */}
          <div className="formActions w-full px-[2rem] flex flex-col gap-[2.5rem]">
            {/* Register Btn */}
            <button
              disabled={registerEmail && registerPassword ? false : true}
              className={`w-full py-[0.8rem] text-[2.1rem] font-bold rounded-full transition-all ${
                registerUsername &&
                registerEmail &&
                registerPassword &&
                registerConfirmPassword
                  ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-amber-400 cursor-pointer"
                  : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
              }`}
            >
              Register
            </button>

            {/* OR */}
            <div className="orCont relative w-full flex items-center justify-center my-[0.5rem]">
              <span className="w-full h-[0.2rem] bg-neutral-300"></span>
              <span className="absolute text-neutral-600 text-[1.5rem] bg-white px-[3rem]">
                OR
              </span>
            </div>

            {/* Google Register Btn */}
            <button
              className={`w-full flex items-center justify-center gap-[1rem] py-[0.8rem] text-[2rem] font-semibold text-white bg-cyan-950 active:scale-[0.98] cursor-pointer rounded-full transition-all`}
            >
              <img
                src={GoogleIcon}
                alt="GoogleIcon"
                className="size-[2.5rem]"
              />
              Continue with Google
            </button>

            {/* Don't have an Account */}
            <p className="text-[1.6rem] text-neutral-600 font-semibold">
              Already have an account?{" "}
              <Link
                to="/auth/sign-in"
                className="font-medium hover:underline hover:cursor-pointer hover:text-cyan-800"
              >
                Login Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
