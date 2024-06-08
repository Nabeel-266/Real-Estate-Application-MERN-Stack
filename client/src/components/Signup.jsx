import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authAPIs";
import {
  signupClientErrorHandler,
  signupServerErrorHandler,
} from "../utils/authErrors";
import {
  signupPending,
  signupSuccess,
  signupFailure,
} from "../app/actions/userActions";
import toastify from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";

// Import React Icons
import { IoMail, IoMailOpen, IoLockClosed, IoLockOpen } from "react-icons/io5";

// Import Asset
import GoogleIcon from "../assets/google.png";

// Component
import Loader from "./Loader";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];
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
  const { currentUser, pending, failed } = useSelector((state) => state?.user);

  const { username, email, password, confirmPassword } = registerFormData;

  // Get Form Data Handler
  const formDataChangeHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // SIGNUP Form Submission Handler
  const signupHandler = async (e) => {
    e.preventDefault();

    // For Detecting Input Errors
    const isUserCredentialsOK = signupClientErrorHandler(
      registerFormData,
      setError
    );
    try {
      if (isUserCredentialsOK) {
        dispatch(signupPending());
        const userFullname = username?.trim()?.split(" ");
        const firstname =
          userFullname[0]?.charAt(0).toLocaleUpperCase() +
          userFullname[0]?.slice(1).toLocaleLowerCase();
        const lastname =
          userFullname[1]?.charAt(0).toLocaleUpperCase() +
          userFullname[1]?.slice(1).toLocaleLowerCase();

        const userCredentials = {
          username: `${firstname} ${lastname}`,
          email: email,
          password,
          confirmPassword,
        };

        const newUser = await registerUser(userCredentials);
        dispatch(signupSuccess(newUser?.data));

        toastify(
          "success",
          `${newUser.data.username}!       You Signup Succeessfully`,
          "top-right",
          "dark",
          4000
        );

        setRegisterFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setError("");

        setTimeout(() => {
          navigate("/account/verification", { state: newUser?.data });
        }, 500);
      }
    } catch (err) {
      console.log(err);
      dispatch(signupFailure());
      const errorMsg = err?.response?.data?.message || err.message;
      signupServerErrorHandler(errorMsg, setError);
    }
  };

  return (
    <div
      className={`signupCont w-full h-full overflow-auto absolute z-[90] top-0 left-0 scrollbar ${
        routeLocation === "sign-up"
          ? "translate-x-[0%] translate-y-[0%] scale-100 rotate"
          : "translate-x-[100%] translate-y-[100%] scale-0 rotate-180"
      } transition-all duration-[700ms] ease-in-out`}
    >
      <div className="signupWrapper w-full min-h-full pt-[9rem] pb-[3rem] flex items-center justify-center">
        {/* Sign-up Form Cont */}
        <div className="regiterFormCont w-[50rem] flex flex-col gap-[2.8rem] bg-white shadow-2xl px-[2rem] py-[2.5rem] rounded-lg">
          {/* Sign-up Form */}
          <form
            onSubmit={signupHandler}
            className="registerForm w-full flex flex-col gap-[2.5rem]"
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
                    className="formInput peer/input"
                  />

                  <label
                    htmlFor="username"
                    className={`formInputLabel ${
                      username
                        ? "mb-[4.5rem] text-[1.5rem] text-cyan-950"
                        : "mb-[0rem] text-[1.75rem] text-neutral-500"
                    }`}
                  >
                    Full Name
                  </label>
                </div>

                {/* Register Username Error Message */}
                {error[0] === "Username" && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] text-red-700`}
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

                {/* Register Email Error Message */}
                {error[0] === "Email" && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] text-red-700`}
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
                    className="formInput peer/input"
                  />

                  <label
                    htmlFor="signup_password"
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

                {/* Register Password Error Message */}
                {error[0] === "Password" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] text-red-700">
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
                    className="formInput peer/input"
                  />

                  <label
                    htmlFor="confirmPass"
                    className={`formInputLabel ${
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
                {error[0] === "ConfirmPassword" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] text-red-700">
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
                className={`w-full py-[0.8rem] text-[2.1rem] font-bold rounded-full transition-all flex justify-center ${
                  username && email && password && confirmPassword
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-amber-400 cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                {pending ? (
                  <Loader value="Processing" color="white" />
                ) : (
                  "Register"
                )}
              </button>
            </fieldset>
          </form>

          {/* OR */}
          <div className="orCont relative w-full flex items-center justify-center my-[0.5rem]">
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
