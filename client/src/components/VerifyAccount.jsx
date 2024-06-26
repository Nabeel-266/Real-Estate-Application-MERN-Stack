import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerVerifyUser, resendOTPtoUser } from "../api/authAPIs";
import { checkOtpVerificationHandler } from "../utils/authErrors";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../utils/toastify";

// Import React Icon
import { FaArrowRotateRight } from "react-icons/fa6";

// Component
import Loader from "./Loader";

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];
  const [OTPCode, setOTPCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const { pending } = useSelector((state) => state?.user);
  let userDoc = JSON.parse(localStorage.getItem("user_Doc"));

  console.log(userDoc);

  // If remove user_Doc from Storage so navigate to signup
  useEffect(() => {
    if (!userDoc) {
      const handleStorageChange = (event) => {
        if (event.key === "user_Doc") {
          const signupUserDoc = JSON.parse(localStorage.getItem("user_Doc"));
          userDoc = signupUserDoc;
          if (!signupUserDoc) {
            navigate("/account/sign-up");
          }
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [userDoc]);

  // Signup Verification Handler
  const signupVerificationHandler = async (e) => {
    e.preventDefault();

    try {
      const isOtpOk = checkOtpVerificationHandler(userDoc, OTPCode);

      if (isOtpOk) {
        // Call Register Verify_User API Function
        await registerVerifyUser(userDoc, OTPCode, dispatch);
      }
    } catch (error) {
      toastify(
        "error",
        `${error?.response?.data?.message || error.message}`,
        "top-right",
        "dark",
        6000
      );
    }
  };

  // Resent OTP Handler
  const resentOTPHandler = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const isOtpExpire = userDoc.otpExpiry < Date.now();

      if (isOtpExpire) {
        // Call Resend OTP API Function
        await resendOTPtoUser(userDoc);
      } else {
        toastify(
          "info",
          "Rejected! Your current OTP is already active",
          "top-right",
          "dark",
          6000
        );
      }

      setOtpLoading(false);
    } catch (error) {
      console.log(error);
      toastify(
        "error",
        `${error?.response?.data?.message || error.message}`,
        "top-right",
        "dark",
        6000
      );
      setOtpLoading(false);
    }
  };

  return (
    <div
      className={`accountVerifyCont w-full h-full bg-white absolute z-[90] top-0 left-0 flex justify-center items-center p-[3rem] ${
        routeLocation === "verification"
          ? "opacity-100 scale-100 "
          : "opacity-0 scale-0"
      } transition-all duration-[700ms] ease-in-out`}
    >
      {/* Verification Cont */}
      <div className="verificationCont mobileSm:min-w-[90%] mobileRg:min-w-[90%] tabletSm:min-w-[55rem] max-w-[65rem] bg-white p-[2.5rem] shadow-2xl rounded-lg">
        {/* Verfication Cont Header */}
        <header className="pb-[1.5rem] border-b-[0.2rem] border-neutral-500">
          <h1 className="text-[2.5rem] leading-[2.5rem] text-theme-blue font-semibold">
            Verify & Create Account
          </h1>
        </header>

        {/* Verfication Cont Content */}
        <div className="content flex flex-col gap-[1.5rem] pt-[1rem]">
          {/* Message */}
          <p className="text-[1.6rem] font-normal">
            We have sent <b>OTP</b> to your email to verify your account. Please
            check your email and put your <b>account verification code</b> here
            then click on a <b>Verify & Create Account</b> Button.
          </p>

          {/* OTP Input */}
          <input
            type="text"
            name="otp"
            id="otp"
            defaultValue={OTPCode}
            placeholder="Enter code here..."
            onChange={(e) => setOTPCode(e.target.value)}
            maxLength={8}
            className="w-full pl-[0.5rem] pr-[3.5rem] py-[0.6rem] text-neutral-600 text-[1.6rem] leading-[1.6rem] font-medium font-mont outline-none bg-transparent border-b-2 border-neutral-400 focus:border-cyan-900"
          />

          {/* Action Buttons */}
          <div className="actionBtns w-full flex justify-between items-end pt-[0.5rem]">
            <button
              onClick={(e) => signupVerificationHandler(e)}
              disabled={OTPCode?.length === 8 ? false : true}
              className={`${
                OTPCode?.length === 8
                  ? "bg-theme-yellow text-neutral-800 cursor-pointer active:scale-[0.98]"
                  : "bg-neutral-500 text-white cursor-not-allowed"
              } gap-[0.5rem] text-[1.6rem] leading-[1.5rem] font-semibold px-[2rem] py-[1.2rem] rounded-sm hover:shadow-lg transition-all`}
            >
              {pending ? (
                <Loader value="Processing" color="#262626" />
              ) : (
                "Verify & Create Account"
              )}
            </button>
            <button
              onClick={(e) => resentOTPHandler(e)}
              className="flex items-center gap-[0.5rem] text-[1.6rem] leading-[1.5rem] font-medium px-[1.5rem] py-[1.2rem] bg-cyan-950 text-white rounded-md hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {otpLoading ? (
                <Loader value="Sending" color="white" />
              ) : (
                <>
                  <FaArrowRotateRight /> <span>Resend OTP</span>
                </>
              )}
            </button>
          </div>

          {/* Note */}
          <div className="w-full text-[1.45rem] font-medium">
            <h6 className="text-red-800 text-[1.5rem] font-bold">Note :</h6>
            <p>
              <b className="text-[2rem] leading-[1.45rem]">-</b> If your account
              is not verified, you will not be able to see any property details
              or take any actions such as selling property, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
