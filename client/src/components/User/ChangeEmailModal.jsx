import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

// Import Component
import Loader from "../Loader";

const ChangeEmailModal = ({ isModalOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [recoveryStep, setRecoveryStep] = useState("STEP-01");
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeEmailCredentials, setChangeEmailCredentials] = useState({
    recoveryEmail: "",
    accountPassword: "",
  });
  const { recoveryEmail, accountPassword } = changeEmailCredentials;

  // Run OTP Code Timer
  useEffect(() => {
    if (recoveryStep === "STEP-02") {
      setTimeLeft(119); // Set timer for 2 minutes

      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(intervalRef.current);
            setTimeout(() => {
              isModalOpen(false);
            }, 5000);

            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [recoveryStep]);

  // Format OTP Code Timer
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Change Account Recovery Email Handler
  const recoveryEmailChangeHandler = (e) => {
    setChangeEmailCredentials({
      ...changeEmailCredentials,
      recoveryEmail: e.target.value.trim(),
    });

    setError([]);
  };

  // Change Account Password Handler
  const accountPasswordChangeHandler = (e) => {
    setChangeEmailCredentials({
      ...changeEmailCredentials,
      accountPassword: e.target.value,
    });

    setError([]);
  };

  //   // Send Recovery Email OTP Handler
  //   const sendRecoveryEmailOTPHandler = async (e) => {
  //     e.preventDefault();

  //     // For checking recovery email is not same as current account email & recovery email
  //     if (
  //       currentUser?.email === recoveryEmail ||
  //       currentUser?.recoveryEmail === recoveryEmail
  //     ) {
  //       setError([
  //         "Email",
  //         "This recovery email is already in use for your account.",
  //       ]);
  //       return;
  //     }

  //     try {
  //       setLoading(true);

  //       // For Detecting User Input Errors
  //       const isCredentialsOK = recoveryEmailClientErrorHandler(
  //         changeEmailCredentials,
  //         setError
  //       );

  //       if (isCredentialsOK) {
  //         // Call send User Recovery Email OTP API Function
  //         const response = await sendUserRecoveryEmailOTP(
  //           changeEmailCredentials
  //         );

  //         if (response) {
  //           setResponseData(response);
  //           setRecoveryStep("STEP-02");
  //         }
  //       }

  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error adding user recovery email:", err);
  //       const errorMsg = err?.response?.data?.message || err.message;
  //       recoveryEmailServerErrorHandler(errorMsg, setError);
  //       setLoading(false);
  //     }
  //   };

  //   // Verify Recovery Email OTP Handler
  //   const verifyRecoveryEmailOTPHandler = async (e) => {
  //     const OTPCode = e.target.value;

  //     try {
  //       if (OTPCode.length === 6) {
  //         const isOTPCodeExpired = responseData?.otpExpiry < Date.now();

  //         if (!isOTPCodeExpired) {
  //           const credentials = {
  //             ...responseData,
  //             enteredOTP: OTPCode,
  //           };

  //           // Call verify User Recovery Email OTP API Function
  //           await verifyUserRecoveryEmailOTP(credentials, dispatch);

  //           isModalOpen(false);
  //         } else {
  //           setError(["OTP", "OTP code has been expired"]);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Error adding user recovery email verification:", err);
  //       const errorMsg = err?.response?.data?.message || err.message;
  //       recoveryEmailServerErrorHandler(errorMsg, setError);
  //     }
  //   };

  return (
    <div className="changeEmailCont flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden ">
      {/* Main Modal Cont */}
      <div className="w-[85%] tabletSm:w-[50rem] tabletRg:w-[55rem] max-h-[80%] relative z-20 bg-white rounded-md px-[1.2rem] shadow-2xl">
        {/* Change Email Modal Header */}
        <header className="w-full px-[1rem] pt-[2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Change Email
          </h2>
          <button
            onClick={() => isModalOpen(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        {/* Change Email Modal Body */}
        <div className="w-full h-full flex flex-col px-[1.5rem]">
          {recoveryStep === "STEP-01" ? (
            // STEP 01
            <div className="step01 w-full flex flex-col gap-[1rem] py-[2rem] items-start">
              <h6 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue">
                STEP 01
              </h6>

              <p className="text-[1.5rem] font-medium pb-[1rem] border-b-[0.2rem] border-neutral-300">
                Please enter credential of your's and click on Confirmation
                Button, Confirmation Email is send to your Recovery Email, so
                please check your recovery email inbox after enter your
                credentials.
              </p>

              {/* Recovery Email Cont */}
              <div className="w-full flex flex-col gap-[0.2rem] mt-[0.5rem]">
                {/* Recovery Email Input */}
                <input
                  type="text"
                  name="recoveryEmail"
                  value={recoveryEmail}
                  onChange={recoveryEmailChangeHandler}
                  autoComplete="off"
                  placeholder={
                    currentUser?.recoveryEmail
                      ? "Enter New Recovery Email here..."
                      : "Enter Recovery Email here..."
                  }
                  className={`w-full px-[0.8rem] py-[0.8rem] text-neutral-700 text-[1.6rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-[0.2rem] border-neutral-500 rounded-md focus:border-theme-blue placeholder:font-montAlter placeholder:text-neutral-700 ${
                    error[0] === "RecoveryEmail" && "border-red-700"
                  }`}
                />

                {/* Recovery Email Error Message */}
                {error[0] === "RecoveryEmail" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.8rem] font-medium text-red-700 mt-[0.5rem]">
                    {error[1]}
                  </span>
                )}
              </div>

              {/* Account Password Cont */}
              <div className="w-full flex flex-col gap-[0.2rem] mt-[0.5rem]">
                {/* Account Password Input */}
                <input
                  type="password"
                  name="password"
                  value={accountPassword}
                  onChange={accountPasswordChangeHandler}
                  placeholder="Enter Account Password here..."
                  className={`w-full px-[0.8rem] py-[0.8rem] text-neutral-700 text-[1.6rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-[0.2rem] border-neutral-500 rounded-md focus:border-theme-blue placeholder:font-montAlter placeholder:text-neutral-700 ${
                    error[0] === "Password" && "border-red-700"
                  }`}
                />

                {/* Account Password Error Message */}
                {error[0] === "Password" && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700 mt-[0.5rem]">
                    {error[1]}
                  </span>
                )}
              </div>

              <button
                // onClick={sendRecoveryEmailOTPHandler}
                disabled={recoveryEmail && accountPassword ? false : true}
                className={`w-full flex items-center justify-center gap-[1rem] px-[3rem] py-[1rem] mt-[1.5rem] text-[1.8rem] leading-[1.8rem] tracking-wider font-bold rounded-full transition-all ${
                  recoveryEmail && accountPassword
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 opacity-70 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <Loader value="Sending" color="white" size="0.55rem" />
                ) : (
                  "SEND CONFIRMATION"
                  //   "Send Confirmation Email"
                )}
              </button>
            </div>
          ) : (
            // STEP 02
            <div className="step02 w-full flex flex-col gap-[1.5rem] pt-[2rem] pb-[3rem] items-start">
              {timeLeft < 1 ? (
                <p className="w-full text-[2rem] font-semibold text-neutral-700 text-center">
                  Your OTP Code had expired <br />
                  Please Try Again!
                </p>
              ) : (
                <>
                  {/* top Content */}
                  <div className="topContent w-full flex items-start justify-between">
                    <h6 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue">
                      STEP 02
                    </h6>
                    {/* Timer */}
                    <p className="timer text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700">
                      {formatTime(timeLeft)}
                    </p>
                  </div>

                  <p className="text-[1.55rem] font-medium text-neutral-700">
                    We have sent <strong>OTP Code</strong> to your recovery
                    email <strong>{responseData.recoveryEmail}</strong>. Please
                    check your email and put your OTP code here to verify your
                    Recovery Email.
                  </p>

                  {/* Recovery Email OTP Input Cont */}
                  <div className="w-full flex flex-col gap-[0.2rem]">
                    {/* Recovery Email OTP Input */}
                    <input
                      type="text"
                      name="recoveryEmailOTP"
                      onChange={verifyRecoveryEmailOTPHandler}
                      maxLength={6}
                      placeholder="Enter your 6-digit OTP code here..."
                      className={`w-full tabletSm:w-[90%] px-[0.5rem] py-[0.6rem] text-neutral-700 text-[1.7rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-b-[0.2rem] border-neutral-400 rounded-sm focus:border-theme-blue placeholder:font-montAlter placeholder:text-neutral-600 ${
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailModal;
