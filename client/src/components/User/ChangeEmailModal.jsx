import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChangeEmailLink } from "../../api/userAPIs";
import {
  changeEmailClientErrorHandler,
  changeEmailServerErrorHandler,
} from "../../utils/errors/accountErrors";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { RiMailSendFill } from "react-icons/ri";

// Import Component
import Loader from "../Loader";

const ChangeEmailModal = ({ isModalOpen, recoveryEmailModalOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [responseUser, setResponseUser] = useState(null);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeEmailCredentials, setChangeEmailCredentials] = useState({
    recoveryEmail: "",
    accountPassword: "",
  });
  const { recoveryEmail, accountPassword } = changeEmailCredentials;

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

  // Send Change Email Confirmation Link Handler
  const sendChangeEmailLinkHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // For Detecting User Input Errors
      const isCredentialsOK = changeEmailClientErrorHandler(
        changeEmailCredentials,
        currentUser,
        setError
      );

      if (isCredentialsOK) {
        // Call send User Change Email Link API Function
        const response = await sendChangeEmailLink(changeEmailCredentials);

        if (response) {
          setResponseUser(response);
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Error adding user recovery email:", err);
      const errorMsg = err?.response?.data?.message || err.message;
      changeEmailServerErrorHandler(errorMsg, setError);
      setLoading(false);
    }
  };

  return (
    <div className="changeEmailCont flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden ">
      {/* Main Modal Cont */}
      <div className="w-[90%] tabletSm:w-[50rem] tabletRg:w-[55rem] max-h-[80%] relative z-20 bg-white rounded-md px-[1.2rem] shadow-2xl">
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

        {!!currentUser.recoveryEmail ? (
          // Change Email Modal Body
          <div className="w-full h-full flex flex-col px-[1rem]">
            {!responseUser ? (
              // Send Change Email Link Confirmation Mail Content
              <div className="w-full flex flex-col gap-[1rem] py-[2rem] items-start">
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
                    placeholder="Enter Recovery Email here..."
                    className={`w-full px-[0.8rem] py-[0.8rem] text-neutral-700 text-[1.6rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-[0.2rem] border-neutral-500 rounded-md focus:border-theme-blue placeholder:font-montAlter placeholder:text-neutral-700 ${
                      error[0] === "Email" && "border-red-700"
                    }`}
                  />

                  {/* Recovery Email Error Message */}
                  {error[0] === "Email" && (
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
                  onClick={sendChangeEmailLinkHandler}
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
                    "SEND CHANGE EMAIL LINK"
                  )}
                </button>
              </div>
            ) : (
              // Sending Change Email Link Confirmation Success Message
              <div className="w-full flex flex-col items-center justify-center gap-[1rem] p-[1rem] pb-[2rem]">
                <div className="mailIcon p-[1.2rem] bg-theme-blue text-white rounded-full">
                  <RiMailSendFill size="4.5rem" />
                </div>

                <h3 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue mt-[1rem]">
                  Please check your email
                </h3>

                <p className="text-[1.5rem] font-medium text-center text-neutral-800">
                  Dear{" "}
                  <span className="font-semibold">
                    {responseUser?.username}
                  </span>
                  , we have sent a change email link to your recovery email{" "}
                  <span className="font-semibold">
                    {responseUser?.recoveryEmail}
                  </span>
                  . Please check your inbox to proceed with changing your NAB
                  Estate account email.
                </p>
              </div>
            )}
          </div>
        ) : (
          // No Recovery Email Message
          <div className="w-full px-[1rem] pt-[1.8rem] pb-[2.5rem]">
            <h2 className="text-[2.2rem] leading-[2.2rem] font-semibold text-neutral-800">
              No Recovery Email !
            </h2>
            <p className="text-[1.7rem] font-medium text-neutral-900 mt-[1rem]">
              If you want to change your Account Email so you should have a
              recovery email, but you haven't set up a recovery email yet.
              Please set a recovery email first.
            </p>
            <button
              onClick={() => {
                isModalOpen(false);
                recoveryEmailModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-[1rem] px-[3rem] py-[1rem] mt-[2rem] text-[1.8rem] leading-[1.8rem] tracking-wider font-bold rounded-full transition-all text-white bg-theme-blue active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
            >
              SET RECOVERY EMAIL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeEmailModal;
