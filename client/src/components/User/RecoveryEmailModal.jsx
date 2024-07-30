import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recoveryEmailClientErrorHandler } from "../../utils/accountErrors";
import { sendUserRecoveryEmailOTP } from "../../api/userAPIs";

// Import React Icons
import { FaXmark } from "react-icons/fa6";

const RecoveryEmailModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [error, setError] = useState([]);
  const [recoveryStep, setRecoveryStep] = useState("STEP-01");
  const [recoveryEmailCredentials, setRecoveryEmailCredentials] = useState({
    recoveryEmail: "",
    accountPassword: "",
  });
  const { recoveryEmail, accountPassword } = recoveryEmailCredentials;

  // Change Account Password Handler
  const accountPasswordChangeHandler = (e) => {
    setRecoveryEmailCredentials({
      ...recoveryEmailCredentials,
      accountPassword: e.target.value,
    });

    setError([]);
  };

  // Change Account Recovery Email Handler
  const recoveryEmailChangeHandler = (e) => {
    setRecoveryEmailCredentials({
      ...recoveryEmailCredentials,
      recoveryEmail: e.target.value.trim(),
    });

    setError([]);
  };

  const sendRecoveryEmailOTPHandler = async (e) => {
    e.preventDefault();

    try {
      // For Detecting User Input Errors
      const isCredentialsOK = recoveryEmailClientErrorHandler(
        recoveryEmailCredentials,
        setError
      );

      const credentials = {
        userId: currentUser._id,
        userEmail: currentUser.email,
        recoveryEmail,
        password: accountPassword,
      };

      if (isCredentialsOK) {
        // Call Add User Recovery Email API Function
        // await sendUserRecoveryEmailOTP(credentials, dispatch);
      }
    } catch (error) {
      console.error("Error adding user recovery email:", error);
    }
  };

  return (
    <div className="recoveryEmailCont flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden ">
      {/* Main Modal Cont */}
      <div className="w-[85%] tabletSm:w-[50rem] tabletRg:w-[55rem] min-h-[30%] max-h-[80%] relative z-20 bg-white rounded-md px-[1.2rem] py-[1rem] shadow-2xl">
        {/* Recovery Email Modal Header */}
        <header className="w-full px-[1rem] py-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Set Recovery Email
          </h2>
          <button
            onClick={() => closeModal(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        {/* Recovery Email Modal Body */}
        <div className="w-full h-full flex flex-col px-[1.5rem]">
          {recoveryStep === "STEP-01" ? (
            // STEP 01
            <div className="step01 w-full flex flex-col gap-[2rem] py-[2rem] items-start">
              <h6 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue">
                STEP 01
              </h6>

              {/* Recovery Email Cont */}
              <div className="w-full flex flex-col gap-[0.2rem]">
                <p className="text-[1.8rem] leading-[2rem] font-medium">
                  Enter Your Recovery Email Address
                </p>

                {/* Recovery Email Input */}
                <input
                  type="text"
                  name="recoveryEmail"
                  value={recoveryEmail}
                  onChange={recoveryEmailChangeHandler}
                  className={`w-full tabletSm:w-[90%] px-[0.5rem] py-[0.6rem] text-neutral-700 text-[1.7rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-b-[0.2rem] border-neutral-400 rounded-sm focus:border-theme-blue ${
                    error[0] === "Email" && "border-red-700"
                  }`}
                />

                {/* Recovery Email Error Message */}
                {error[0] === "Email" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700 mt-[0.5rem]">
                    {error[1]}
                  </span>
                )}
              </div>

              {/* Account Password Cont */}
              <div className="w-full flex flex-col gap-[0.2rem] mt-[0.5rem]">
                <p className="text-[1.8rem] leading-[2rem] font-medium">
                  Enter Your Current Account Password
                </p>

                {/* Account Password Input */}
                <input
                  type="password"
                  name="password"
                  value={accountPassword}
                  onChange={accountPasswordChangeHandler}
                  className={`w-full tabletSm:w-[90%] px-[0.5rem] py-[0.6rem] text-neutral-700 text-[1.8rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-b-[0.2rem] border-neutral-400 rounded-sm focus:border-theme-blue ${
                    error[0] === "Password" && "border-red-700"
                  }`}
                />

                {/* Account Password Error Message */}
                {error[0] === "Password" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    {error[1]}
                  </span>
                )}
              </div>

              <button
                onClick={sendRecoveryEmailOTPHandler}
                disabled={recoveryEmail && accountPassword ? false : true}
                className={`flex justify-center px-[2rem] py-[1rem] mt-[0.5rem] text-[1.8rem] leading-[1.8rem] font-bold rounded-full transition-all ${
                  recoveryEmail && accountPassword
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                SEND OTP
              </button>
            </div>
          ) : (
            // STEP 02
            <div className="step01 w-full flex flex-col gap-[2rem] py-[2rem] items-start">
              <h6 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue">
                STEP 02
              </h6>

              {/* Recovery Email OTP Cont */}
              <div className="w-full flex flex-col gap-[0.2rem]">
                <p className="text-[1.8rem] leading-[2rem] font-medium">
                  Enter Your Recovery Email OTP
                </p>

                {/* Recovery Email OTP Input */}
                <input
                  type="text"
                  name="recoveryEmail"
                  // value={recoveryEmail}
                  // onChange={recoveryEmailChangeHandler}
                  className={`w-full tabletSm:w-[90%] px-[0.5rem] py-[0.6rem] text-neutral-700 text-[1.7rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-b-[0.2rem] border-neutral-400 rounded-sm focus:border-theme-blue ${
                    error[0] === "OTP" && "border-red-700"
                  }`}
                />

                {/* Recovery Email OTP Error Message */}
                {error[0] === "OTP" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                    {error[1]}
                  </span>
                )}
              </div>

              <button
                disabled={recoveryEmail && accountPassword}
                className={`flex justify-center px-[2rem] py-[1rem] text-[1.8rem] leading-[1.8rem] font-bold rounded-full transition-all ${
                  recoveryEmail && accountPassword
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                VERIFY RECOVERY EMAIL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoveryEmailModal;
