import React, { useState } from "react";

// Import React Icons
import { IoMail, IoMailOpen, IoLockClosed, IoLockOpen } from "react-icons/io5";

// Import Image
import GoogleIcon from "../assets/google.png";

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailSuggest, setIsEmailSuggest] = useState(false);

  return (
    // bg-[#082835]
    <div className="authCont w-full">
      {/* Sign-in Cont */}
      <div className="signinCont w-full relative z-[1] before:content-[''] before:absolute before:z-[-1] before:bottom-0 before:left-0 before:right-0 before:h-[100%] before:bg-gradient-to-b to-[#08283590] from-[#08283505]">
        {/* Sign-in Cont Wrapper */}
        <div className="signinContWrapper w-full min-h-dvh flex items-center justify-center">
          {/* Sign-in Form */}
          <form
            action="#"
            className="loginForm w-[50rem] flex flex-col gap-[2.5rem] bg-white shadow-2xl px-[2rem] py-[3rem] rounded-lg mt-[5rem]"
          >
            {/* Form Header */}
            <header className="flex flex-col items-center gap-[0.5rem]">
              <h1 className="text-[3.2rem] leading-[3.4rem] font-semibold text-center text-cyan-950">
                Sign in to your account
              </h1>

              <span className="text-[1.7rem] font-medium text-center text-neutral-800 tracking-normal py-[0.4rem]">
                Welcome back to NAB Estate!
              </span>
            </header>

            {/* Form Fields */}
            <fieldset className="flex flex-col gap-[3rem]">
              {/* For Email */}
              <div className="formEmailCont w-full px-[1.5rem] flex items-center relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={loginEmail}
                  autoComplete={isEmailSuggest ? "on" : "off"}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="formInput peer/input"
                />

                <label
                  htmlFor="email"
                  className={`formInputLabel ${
                    loginEmail
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

              {/* For Password */}
              <div className="formPasswordCont w-full px-[1.5rem] flex items-center relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  defaultValue={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="formInput peer/input"
                />

                <label
                  htmlFor="password"
                  className={`formInputLabel ${
                    loginPassword
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
            </fieldset>

            {/* For Login & Forget */}
            <div className="formActions w-full px-[2rem] flex flex-col gap-[2.5rem]">
              {/* Login Btn */}
              <button
                disabled={loginEmail && loginPassword ? false : true}
                className={`w-full py-[0.8rem] text-[2.1rem] font-bold rounded-full transition-all ${
                  loginEmail && loginPassword
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-amber-400 cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                Log in
              </button>

              {/* Forget Password */}
              <p className="text-[1.6rem] text-neutral-600 font-semibold">
                Forgot Password?{" "}
                <span className="font-medium hover:underline hover:cursor-pointer hover:text-cyan-800">
                  verify your credentials
                </span>
              </p>

              {/* OR */}
              <div className="orCont relative w-full flex items-center justify-center my-[0.5rem]">
                <span className="w-full h-[0.2rem] bg-neutral-300"></span>
                <span className="absolute text-neutral-600 text-[1.5rem] bg-white px-[3rem]">
                  OR
                </span>
              </div>

              {/* Google Login Btn */}
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
                Don't have an account?{" "}
                <span className="font-medium hover:underline hover:cursor-pointer hover:text-cyan-800">
                  Regiter Now
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Sign-up Cont */}
    </div>
  );
};

export default Auth;
