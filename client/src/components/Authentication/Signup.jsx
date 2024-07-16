import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUserVerification } from "../../api/authAPIs";
import { useDispatch } from "react-redux";

// Import Error Checking Handler Functions
import {
  signupClientErrorHandler,
  signupServerErrorHandler,
} from "../../utils/authErrors";

// Import React Icons
import { IoMail, IoMailOpen, IoLockClosed, IoLockOpen } from "react-icons/io5";

// Import Asset
import GoogleIcon from "../../assets/google.png";

// Component
import Loader from "../Loader";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [isEmailSuggest, setIsEmailSuggest] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = registerFormData;

  // Get Form Data Handler
  const formDataChangeHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Empty Form Handler
  const emptyFormHandler = () => {
    setError("");
    setRegisterFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // SIGNUP Form Submission Handler
  const signupFormSubmissionHandler = async (e) => {
    e.preventDefault();

    try {
      // For Detecting Input Errors
      const isUserCredentialsOK = signupClientErrorHandler(
        registerFormData,
        setError
      );

      if (isUserCredentialsOK) {
        setLoading(true);

        // Username Modification
        const fullNameArray = username
          .split(" ")
          .filter((str) => str !== "")
          .map(
            (str) =>
              str.trim().charAt(0).toLocaleUpperCase() +
              str.trim().slice(1).toLocaleLowerCase()
          );

        // User Credentials
        const userCredentials = {
          username: `${fullNameArray.join(" ")}`,
          email,
          password,
          confirmPassword,
        };

        // Call Signup User API Function
        await registerUserVerification(userCredentials, dispatch, navigate);

        setLoading(false);
        emptyFormHandler();
      }
    } catch (err) {
      console.log(err);
      const errorMsg = err?.response?.data?.message || err.message;
      signupServerErrorHandler(errorMsg, setError);
      setLoading(false);
    }
  };

  return (
    <div
      className={`signupCont w-full h-full overflow-auto absolute z-[90] top-0 left-0 scrollbar ${
        routeLocation === "sign-up"
          ? "translate-x-[0%] opacity-100 scale-100 "
          : "translate-x-[100%] opacity-0 scale-0"
      } transition-all duration-[700ms] ease-in-out`}
    >
      <div className="signupWrapper w-full min-h-full p-[0rem] flex items-center justify-center">
        {/* Sign-up Form Cont */}
        <div className="signupFormCont mobileSm:w-[42rem] mobileRg:w-[46rem] tabletSm:w-[50rem] flex flex-col gap-[2.8rem] bg-white shadow-2xl px-[2rem] py-[2.5rem] rounded-lg">
          {/* Sign-up Form */}
          <form
            onSubmit={signupFormSubmissionHandler}
            className="signupForm w-full flex flex-col gap-[2.5rem]"
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
            <fieldset className="flex flex-col gap-[3rem] px-[1rem]">
              {/* For Register Name */}
              <div className="w-full flex flex-col gap-[0.5rem]">
                <div className="w-full flex items-center relative">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => formDataChangeHandler(e)}
                    className={`fancyFormInput peer/input ${
                      error[0] === "Username" && "border-red-700"
                    }`}
                  />

                  <label
                    htmlFor="username"
                    className={`fancyFormInputLabel ${
                      username
                        ? "mb-[4.5rem] text-[1.5rem] text-cyan-950"
                        : "mb-[0rem] text-[1.75rem] text-neutral-500"
                    }`}
                  >
                    Your Name
                  </label>
                </div>

                {/* Register Username Error Message */}
                {error[0] === "Username" && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700`}
                  >
                    {error[1]}
                  </span>
                )}
              </div>

              {/* For Register Email */}
              <div className="formEmailCont w-full flex flex-col gap-[0.5rem]">
                {/* Register Email Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type="text"
                    name="email"
                    id="signup_email"
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

                {/* Register Email Error Message */}
                {error[0] === "Email" && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700`}
                  >
                    {error[1]}
                  </span>
                )}
              </div>

              {/* For Register Password */}
              <div className="formPasswordCont w-full flex flex-col gap-[0.5rem]">
                {/* Register Password Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="signup_password"
                    value={password}
                    onChange={(e) => formDataChangeHandler(e)}
                    className={`fancyFormInput peer/input ${
                      error[0] === "Password" && "border-red-700"
                    }`}
                  />

                  <label
                    htmlFor="signup_password"
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

                {/* Register Password Error Message */}
                {error[0] === "Password" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    {error[1]}
                  </span>
                )}
              </div>

              {/* For Register Confirm Password */}
              <div className="formConfirmPassCont w-full flex flex-col gap-[0.5rem]">
                {/* Register Confirm Pass Input Cont */}
                <div className="w-full flex items-center relative">
                  <input
                    type={isConfirmPassVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPass"
                    value={confirmPassword}
                    onChange={(e) => formDataChangeHandler(e)}
                    className={`fancyFormInput peer/input ${
                      error[0] === "ConfirmPassword" && "border-red-700"
                    }`}
                  />

                  <label
                    htmlFor="confirmPass"
                    className={`fancyFormInputLabel ${
                      confirmPassword
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
                      className="fancyFormInputIcon cursor-pointer"
                    />
                  ) : (
                    <IoLockClosed
                      size="3.2rem"
                      onClick={() => setIsConfirmPassVisible(true)}
                      className="fancyFormInputIcon cursor-pointer"
                    />
                  )}
                </div>

                {/* Register Confirm Password Error Message */}
                {error[0] === "ConfirmPassword" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    {error[1]}
                  </span>
                )}
              </div>

              {/* Register Btn */}
              <button
                disabled={
                  username && email && password && confirmPassword
                    ? false
                    : true
                }
                className={`w-full flex justify-center py-[0.8rem] text-[2.1rem] font-bold rounded-full transition-all ${
                  username && email && password && confirmPassword
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <Loader value="Processing" color="white" />
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </fieldset>
          </form>

          {/* OR */}
          <div className="orCont relative w-full flex items-center justify-center px-[1rem] my-[0.5rem]">
            <span className="w-full h-[0.2rem] bg-neutral-300"></span>
            <span className="absolute text-neutral-600 text-[1.5rem] bg-white px-[3rem]">
              OR
            </span>
          </div>

          {/* For Other Options */}
          <div className="formActions w-full px-[1rem] flex flex-col gap-[2.5rem]">
            {/* Google Register Btn */}
            <button
              className={`w-full flex items-center justify-center gap-[1rem] py-[0.8rem] text-[2.1rem] font-semibold text-white bg-cyan-950 active:scale-[0.98] cursor-pointer rounded-full transition-all`}
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
                to="/account/sign-in"
                onClick={() => emptyFormHandler()}
                className="font-medium hover:underline hover:cursor-pointer hover:text-cyan-800"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
