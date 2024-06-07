import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUser } from "../api/authAPIs";
import toastify from "../utils/toastify";

// Import React Icon
import { FaArrowRotateRight } from "react-icons/fa6";

// Component
import Loader from "./Loader";

const VerifyAccount = () => {
  const [OTPCode, setOTPCode] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const routeLocation = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  // Account Verification Handler
  const accountVerifiactionHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const verifiedUser = await verifyUser(OTPCode);
      console.log(verifiedUser);

      toastify(
        "success",
        `${verifiedUser.data.username} ! Your Verification Succeessfully`,
        "top-center",
        "dark",
        3000
      );

      setError("");
      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`${
        routeLocation === "verification" ? "block" : "hidden"
      } accountVerifyCont w-full h-full relative flex justify-center items-center pt-[9rem] px-[1rem] z-[1000] bg-neutral-200`}
    >
      {/* Verification Cont */}
      <div className="verificationCont min-w-[50rem] max-w-[65rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[2.5rem] shadow-2xl rounded-lg">
        <header className="pb-[1.5rem] border-b-[0.2rem] border-neutral-500">
          <h1 className="text-[2.5rem] leading-[2.5rem] text-[#082835] font-semibold">
            Please Verify Your Account
          </h1>
        </header>

        <div className="content flex flex-col gap-[1.5rem] pt-[1rem]">
          <p className="text-[1.6rem] font-normal">
            We have sent <b>OTP</b> to your email to verify your account. Please
            check your email and put your account verification <b>OTP</b> here
            then click on a <b>Verify Account</b> Button.
          </p>

          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Type OTP here..."
            onChange={(e) => setOTPCode(e.target.value)}
            maxLength={8}
            className="w-full pl-[0.5rem] pr-[3.5rem] py-[0.6rem] text-neutral-600 text-[1.6rem] leading-[1.6rem] font-medium font-mont outline-none bg-transparent border-b-2 border-neutral-400 focus:border-cyan-900"
          />

          <div className="actionBtns flex justify-between items-end pt-[0.5rem]">
            <button
              onClick={(e) => accountVerifiactionHandler(e)}
              disabled={OTPCode?.length === 8 ? false : true}
              className={`${
                OTPCode?.length === 8
                  ? "bg-amber-400 text-neutral-800 cursor-pointer active:scale-[0.98]"
                  : "bg-neutral-500 text-white cursor-not-allowed"
              } gap-[0.5rem] text-[1.6rem] leading-[1.5rem] font-semibold px-[2rem] py-[1rem] rounded-sm hover:shadow-lg transition-all`}
            >
              {loading ? (
                <Loader value="Processing" color="white" />
              ) : (
                "Verify Account"
              )}
            </button>
            <button className="flex items-center gap-[0.5rem] text-[1.6rem] leading-[1.5rem] font-medium px-[1rem] py-[1rem] bg-cyan-950 text-white rounded-md hover:shadow-lg active:scale-[0.98] transition-all">
              <FaArrowRotateRight /> <span>Resend OTP</span>
            </button>
          </div>

          <div className="text-[1.45rem] font-medium mt-[0.5rem]">
            <b className="text-red-800 text-[1.5rem]">Note :</b>
            <ul className="list-inside mt-[0.2rem]">
              <li className="">
                <b>-</b> If account will not be verified, so that account will
                be deleted.
              </li>
              <li>
                <b>-</b> Then try again with an authenticated email address
                account.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
