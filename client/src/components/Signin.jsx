import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/authAPIs";
import {
  signinClientErrorHandler,
  signinServerErrorHandler,
} from "../utils/authErrors";

// Import React Icons
import { IoMail, IoMailOpen, IoLockClosed, IoLockOpen } from "react-icons/io5";

// Import Image
import GoogleIcon from "../assets/google.png";

// Import Component
import Loader from "./Loader";

const Signin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];
  const { pending } = useSelector((state) => state?.user);
  const [error, setError] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailSuggest, setIsEmailSuggest] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;

  const formDataChangeHandler = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Empty Form Handler
  const emptyFormHandler = () => {
    setError("");
    setLoginFormData({
      email: "",
      password: "",
    });
  };

  // SIGNIN Form Submission Handler
  const signinFormSubmissionHandler = async (e) => {
    e.preventDefault();

    try {
      // For Detecting Input Errors
      const isUserCredentialsOK = signinClientErrorHandler(
        loginFormData,
        setError
      );

      if (isUserCredentialsOK) {
        // Call Signin User API Function
        await loginUser(loginFormData, dispatch);

        emptyFormHandler();
      }
    } catch (err) {
      console.log(err);
      const errorMsg = err?.response?.data?.message || err.message;
      signinServerErrorHandler(errorMsg, setError);
    }
  };

  return (
    <div
      className={`signinCont w-full h-full overflow-auto absolute z-[90] top-0 left-0 scrollbar ${
        routeLocation === "sign-in"
          ? "translate-x-[0%] opacity-100 scale-100"
          : "translate-x-[-100%] opacity-0 scale-0"
      } transition-all duration-[700ms] ease-in-out`}
    >
      <div className="signinWrapper w-full min-h-full p-[1rem] flex items-center justify-center">
        {/* Sign-in Form Cont */}
        <div className="signinFormCont mobileSm:w-[42rem] mobileRg:w-[46rem] tabletSm:w-[50rem] flex flex-col gap-[2.8rem] bg-white shadow-2xl px-[2rem] py-[2.5rem] rounded-lg">
          {/* Sign-in Form */}
          <form
            onSubmit={signinFormSubmissionHandler}
            className="signinForm w-full flex flex-col gap-[2.5rem]"
          >
            {/* Form Header */}
            <header className="flex flex-col items-center gap-[0.2rem]">
              <h1 className="text-[3rem] leading-[3rem] font-semibold text-center text-cyan-950">
                Sign in to your account
              </h1>

              <span className="text-[1.7rem] font-medium text-center text-neutral-800 tracking-normal py-[0.4rem]">
                Welcome back to NAB Estate!
              </span>
            </header>

            {/* Form Fields */}
            <fieldset className="flex flex-col gap-[3rem] px-[1rem]">
              {/* For Login Email */}
              <div className="formEmailCont w-full flex flex-col gap-[0.5rem]">
                {/* Login Email Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type="text"
                    name="email"
                    id="signin_email"
                    value={email}
                    autoCorrect="off"
                    autoComplete={isEmailSuggest ? "on" : "off"}
                    onChange={(e) => formDataChangeHandler(e)}
                    className={`fancyFormInput peer/input ${
                      error[0] === "Email" && "border-red-700"
                    }`}
                  />

                  <label
                    htmlFor="email"
                    className={`fancyFormInputLabel ${
                      email
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
                      className="fancyFormInputIcon cursor-pointer"
                    />
                  ) : (
                    <IoMail
                      onClick={() => setIsEmailSuggest(true)}
                      size="3.2rem"
                      className="fancyFormInputIcon cursor-pointer"
                    />
                  )}
                </div>

                {/* Login Email Error Message */}
                {error[0] === "Email" && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700`}
                  >
                    {error[1]}
                  </span>
                )}
              </div>

              {/* For Login Password */}
              <div className="formPasswordCont w-full flex flex-col gap-[0.5rem]">
                {/* Login Password Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="signin_password"
                    value={password}
                    onChange={(e) => formDataChangeHandler(e)}
                    className={`fancyFormInput peer/input ${
                      error[0] === "Password" && "border-red-700"
                    }`}
                  />

                  <label
                    htmlFor="password"
                    className={`fancyFormInputLabel ${
                      password
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
                      className="fancyFormInputIcon cursor-pointer"
                    />
                  ) : (
                    <IoLockClosed
                      size="3.2rem"
                      onClick={() => setIsPasswordVisible(true)}
                      className="fancyFormInputIcon cursor-pointer"
                    />
                  )}
                </div>

                {/* Login Password Error Message */}
                {error[0] === "Password" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    {error[1]}
                  </span>
                )}
              </div>

              {/* Login Btn */}
              <button
                disabled={email && password ? false : true}
                className={`w-full flex justify-center py-[0.8rem] text-[2.1rem] font-bold rounded-full transition-all ${
                  email && password
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                {pending ? (
                  <Loader value="Processing" color="white" />
                ) : (
                  "Log in"
                )}
              </button>
            </fieldset>
          </form>

          {/* For Other Options */}
          <div className="formActions w-full px-[1rem] flex flex-col gap-[2.2rem]">
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
              className={`w-full flex items-center justify-center gap-[1rem] py-[0.8rem] text-[2rem] font-semibold text-white bg-cyan-950 active:scale-[0.98] cursor-pointer rounded-full transition-all mt-[0.4rem]`}
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
              <Link
                to="/account/sign-up"
                onClick={() => emptyFormHandler()}
                className="font-medium hover:underline hover:cursor-pointer hover:text-cyan-800"
              >
                Regiter Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
