import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/authAPIs";
import {
  signinClientErrorHandler,
  signinServerErrorHandler,
} from "../utils/authErrors";
import {
  signinFailure,
  signinSuccess,
  signinPending,
} from "../app/actions/userActions";
import toastify from "../utils/toastify";

// Import React Icons
import { IoMail, IoMailOpen, IoLockClosed, IoLockOpen } from "react-icons/io5";

// Import Image
import GoogleIcon from "../assets/google.png";

// Import Component
import Loader from "./Loader";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeLocation = useLocation();
  const currentLocation = routeLocation.pathname.split("/")[2];
  const [error, setError] = useState([]);
  const { currentUser, pending } = useSelector((state) => state?.user);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailSuggest, setIsEmailSuggest] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (currentUser) {
  //     if (!currentUser.isVerified) {

  //     } else {
  //       navigate("/");
  //     }
  //   }
  // }, [currentUser, navigate]);

  const { email, password } = loginFormData;
  // console.log(email, password);

  const formDataChangeHandler = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // SIGNIN Form Submission Handler
  const signinHandler = async (e) => {
    e.preventDefault();

    // For Detecting Input Errors
    const isUserCredentialsOK = signinClientErrorHandler(
      loginFormData,
      setError
    );

    try {
      if (isUserCredentialsOK) {
        dispatch(signinPending());

        const loggedInUser = await loginUser(loginFormData);
        dispatch(signinSuccess(loggedInUser?.data));

        toastify(
          "success",
          `${loggedInUser.data.username}! You Login Successfully`,
          "top-right",
          "dark",
          4000
        );

        setError("");
        setLoginFormData({
          email: "",
          password: "",
        });

        if (!loggedInUser.data.isVerified) {
          navigate("/account/verification");
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(signinFailure());
      const errorMsg = err?.response?.data?.message || err.message;
      signinServerErrorHandler(errorMsg, setError);
    }
  };

  return (
    <div
      className={`signinCont w-full h-full overflow-auto absolute z-[90] top-0 left-0 scrollbar ${
        currentLocation === "sign-in"
          ? "translate-x-[0%] translate-y-[0%] scale-100 rotate-0"
          : "translate-x-[-100%] translate-y-[-100%] scale-0 rotate-180"
      } transition-all duration-[700ms] ease-in-out`}
    >
      <div className="signinWrapper w-full min-h-full pt-[8rem] pb-[3rem] flex items-center justify-center">
        {/* Sign-in Form Cont */}
        <div className="signinFormCont mobileSm:w-[42rem] mobileRg:w-[46rem] tabletSm:w-[50rem] flex flex-col gap-[2.8rem] bg-white shadow-2xl px-[2rem] py-[2.5rem] rounded-lg">
          {/* Sign-in Form */}
          <form
            onSubmit={signinHandler}
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
              <div className="formEmailCont w-full flex flex-col gap-[1rem]">
                {/* Login Email Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type="email"
                    name="email"
                    id="signin_email"
                    value={email}
                    autoCorrect="off"
                    autoComplete={isEmailSuggest ? "on" : "off"}
                    onChange={(e) => formDataChangeHandler(e)}
                    className="formInput peer/input"
                  />

                  <label
                    htmlFor="email"
                    className={`formInputLabel ${
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

                {/* Login Email Error Message */}
                {error[0] === "Email" && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] text-red-700`}
                  >
                    {error[1]}
                  </span>
                )}
              </div>

              {/* For Login Password */}
              <div className="formPasswordCont w-full flex flex-col gap-[1rem]">
                {/* Login Password Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="signin_password"
                    onChange={(e) => formDataChangeHandler(e)}
                    className="formInput peer/input"
                  />

                  <label
                    htmlFor="password"
                    className={`formInputLabel ${
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

                {/* Login Password Error Message */}
                {error[0] === "Password" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] text-red-700">
                    {error[1]}
                  </span>
                )}
              </div>

              {/* Login Btn */}
              <button
                disabled={email && password ? false : true}
                className={`w-full flex justify-center py-[0.8rem] text-[2.1rem] font-bold rounded-full transition-all ${
                  email && password
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-amber-400 cursor-pointer"
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
