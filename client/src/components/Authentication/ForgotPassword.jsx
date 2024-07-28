import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { forgotPasswordErrorHandler } from "../../utils/authErrors";
import { forgotPassword } from "../../api/authAPIs";

// Import React Icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

// Import Component
import Loader from "../Loader";
import toastify from "../../utils/toastify";
import { RiMailSendFill } from "react-icons/ri";

const ForgotPassword = () => {
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseUser, setResponseUser] = useState("");

  // Email Change Handler
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  // Forgot Password Handler
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      // For Detecting Email Errors
      const isValidEmail = forgotPasswordErrorHandler(email, setError);

      if (isValidEmail) {
        setLoading(true);

        // Call Forgot Password API Function
        const response = await forgotPassword(email);
        setResponseUser(response?.data);

        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      const errorMsg = err?.response?.data?.message || err.message;
      toastify("error", `${errorMsg}`, "top-right", "dark", 4000);
      setLoading(false);
    }
  };

  return (
    <div
      className={`accountVerifyCont w-full h-full absolute z-[90] top-0 left-0 flex justify-center items-center p-[3rem] ${
        routeLocation === "forgot-password"
          ? "opacity-100 scale-100 "
          : "opacity-0 scale-0"
      } transition-all duration-[700ms] ease-in-out`}
    >
      {/* Verification Cont */}
      <div className="verificationCont mobileSm:min-w-[90%] mobileRg:min-w-[90%] tabletSm:min-w-[55rem] max-w-[65rem] bg-white p-[2.5rem] shadow-2xl rounded-lg">
        {/* Verfication Header */}
        <header className="w-full pb-[1.5rem] border-b-[0.2rem] border-neutral-500">
          <h1 className="text-[2.5rem] leading-[2.5rem] text-theme-blue font-semibold">
            Forgot Password
          </h1>
        </header>

        {/* Verfication Body */}
        <div className="w-full flex flex-col gap-[1rem] pt-[1rem]">
          {!responseUser ? (
            // Sending Verification Link Content
            <div className="w-full flex flex-col gap-[1rem]">
              {/* Message Cont */}
              <div className="w-full space-y-[0.5rem]">
                <h6 className="text-[1.8rem] font-semibold text-theme-blue">
                  You Forgot Your Account Password?
                </h6>
                <p className="text-[1.55rem] font-medium text-neutral-800">
                  No worries! just enter your email address below, and click on{" "}
                  <span className="font-bold">Reset Password</span> button and
                  we will send you instructions to recover your password in your
                  given account email.
                </p>
              </div>

              <p className="text-[1.6rem] font-semibold text-neutral-800 mt-[0.5rem]">
                Please! Enter the email address associated with your account
              </p>

              {/* Email Input Cont */}
              <div className="w-full flex flex-col gap-[0.5rem]">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  autoComplete="off"
                  onChange={emailChangeHandler}
                  className="w-full py-[0.6rem] text-neutral-600 text-[1.6rem] leading-[1.6rem] font-medium font-mont outline-none bg-transparent border-b-2 border-neutral-400 focus:border-cyan-900 placeholder:font-montAlter"
                />
                {/* Forgot Password Email Error Message */}
                {error && (
                  <span
                    className={`errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700`}
                  >
                    {error}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => forgotPasswordHandler(e)}
                disabled={email ? false : true}
                className={`w-full flex justify-center items-center gap-[0.8rem] text-[1.8rem] leading-[1.8rem] font-semibold px-[2rem] py-[1.3rem] rounded-full hover:shadow-lg active:scale-[0.98] transition-all ${
                  email
                    ? "bg-theme-blue text-white cursor-pointer"
                    : "bg-neutral-500 text-white cursor-not-allowed"
                } mt-[1rem]`}
              >
                {loading ? (
                  <Loader value="Sending" color="white" />
                ) : (
                  <>
                    <BsFillSendFill />
                    <span>Send Reset Password Link</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            // Sending Verification Link Confirmation Message
            <div className="w-full flex flex-col items-center justify-center gap-[1rem] p-[1rem] pb-[2rem]">
              <div className="mailIcon p-[1.2rem] bg-theme-blue text-white rounded-full">
                <RiMailSendFill size="4.5rem" />
              </div>

              <h3 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue mt-[1rem]">
                Please check your email
              </h3>

              <p className="text-[1.5rem] font-medium text-center text-neutral-800">
                Dear{" "}
                <span className="font-semibold">{responseUser.username}</span>,
                we have sent a password reset link to your email{" "}
                <span className="font-semibold">{responseUser.email}</span>.
                Please check your inbox to proceed with resetting your NAB
                Estate account password.
              </p>
            </div>
          )}

          {/* Go Back To Login Link */}
          <Link
            to="/account/sign-in"
            className="w-full flex justify-center items-center gap-[0.8rem] text-[1.8rem] leading-[1.8rem] font-semibold px-[1.5rem] py-[1.2rem] border-[0.2rem] border-theme-blue text-theme-blue rounded-full hover:shadow-lg active:scale-[0.98] transition-all"
          >
            <FaArrowLeftLong />
            <span>Back to Login</span>
          </Link>

          {/* Note */}
          {/* <div className="w-full text-[1.5rem] font-medium mt-[0.5rem]">
        <h6 className="text-red-800 text-[1.6rem] font-bold">Note :</h6>
        <p>
          <b className="text-[2rem] leading-[2rem]">-</b> If your account is
          not verified, you will not be able to create an account.
        </p>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
