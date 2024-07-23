import { Link, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

const ForgotPassword = () => {
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];

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
        {/* Verfication Cont Header */}
        <header className="pb-[1.5rem] border-b-[0.2rem] border-neutral-500">
          <h1 className="text-[2.5rem] leading-[2.5rem] text-theme-blue font-semibold">
            Forgot Password
          </h1>
        </header>

        {/* Verfication Cont Content */}
        <div className="content flex flex-col gap-[1rem] pt-[1rem]">
          {/* Message Cont */}
          <div className="w-full space-y-[0.5rem]">
            <h6 className="text-[1.8rem] font-semibold text-theme-blue">
              You Forgot Your Account Password?
            </h6>
            <p className="text-[1.55rem] font-medium text-neutral-800">
              No worries! just enter your email address below, and click on{" "}
              <span className="font-bold">Reset Password</span> button and we
              will send you instructions to recover your password in your given
              account email.
            </p>
          </div>

          <p className="text-[1.6rem] font-semibold text-neutral-800 mt-[0.5rem]">
            Please! Enter the email address associated with your account
          </p>

          {/* Email Input */}
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address"
            autoComplete="off"
            // onChange={(e) => setOTPCode(e.target.value)}
            maxLength={8}
            className="w-full py-[0.6rem] text-neutral-600 text-[1.6rem] leading-[1.6rem] font-medium font-mont outline-none bg-transparent border-b-2 border-neutral-400 focus:border-cyan-900 placeholder:font-montAlter"
          />

          {/* ${
              OTPCode?.length === 8
                ? "bg-theme-yellow text-neutral-800 cursor-pointer active:scale-[0.98]"
                : "bg-neutral-500 text-white cursor-not-allowed"
            } */}

          {/* Action Buttons */}
          <div className="actionBtns w-full flex flex-col gap-[1rem] mt-[1rem]">
            <button
              // onClick={(e) => signupVerificationHandler(e)}
              // disabled={OTPCode?.length === 8 ? false : true}
              className={`w-full flex justify-center items-center gap-[0.8rem] bg-theme-blue text-white cursor-pointer active:scale-[0.98] text-[1.7rem] leading-[1.6rem] font-semibold px-[2rem] py-[1.2rem] rounded-md hover:shadow-lg transition-all`}
            >
              <BsFillSendFill />
              <span>Send Reset Password Link</span>
            </button>

            <Link to="/account/sign-in">
              <button className="w-full flex justify-center items-center gap-[0.8rem] text-[1.6rem] leading-[1.6rem] font-semibold px-[1.5rem] py-[1rem] border-[0.2rem] border-theme-blue text-theme-blue rounded-md hover:shadow-lg active:scale-[0.98] transition-all">
                <FaArrowLeftLong />
                <span>Back to Login</span>
              </button>
            </Link>
          </div>

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
