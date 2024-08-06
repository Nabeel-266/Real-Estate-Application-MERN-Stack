import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

// Import Component
import Loader from "../Loader";
import { RiMailSendFill } from "react-icons/ri";
import { sendChangePasswordLink } from "../../api/userAPIs";

const ChangePasswordModal = ({ isModalOpen }) => {
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [responseUser, setResponseUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Send Change Password Link Email Handler
  const sendChangePasswordLinkHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await sendChangePasswordLink(currentUser.email);
      if (response) setResponseUser(response);
      setLoading(false);
    } catch (err) {
      console.error("Error sending user change password email:", err);
      const errorMsg = err?.response?.data?.message || err.message;
      toastify("error", `${errorMsg}`, "top-right", "dark", 4000);
      setLoading(false);
    }
  };

  return (
    <div className="recoveryEmailCont flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden ">
      {/* Main Modal Cont */}
      <div className="w-[85%] tabletSm:w-[50rem] tabletRg:w-[55rem] max-h-[80%] relative z-20 bg-white rounded-md px-[1.2rem] shadow-2xl">
        {/* Change Password Modal Header */}
        <header className="w-full px-[1rem] pt-[2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Change Password
          </h2>
          <button
            onClick={() => isModalOpen(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        {/* Change Password Modal Body */}
        <div className="w-full h-full flex flex-col px-[1.5rem] pt-[1.5rem] pb-[2.5rem]">
          {!responseUser ? (
            // Send Change Password Link Content
            <div className="w-full flex flex-col gap-[2.5rem]">
              {/* Message */}
              <p className="text-[1.55rem] font-medium text-neutral-800">
                <span className="text-[1.7rem] font-semibold">
                  Dear {currentUser.username},
                </span>
                <br />
                If you want to change your account password, click on the{" "}
                <span className="font-semibold">
                  Send Change Password Link
                </span>{" "}
                button below and then we will send a change account password
                link in your account email and then by going there you can
                change your account password securely.
              </p>

              <button
                onClick={(e) => sendChangePasswordLinkHandler(e)}
                className={`w-full flex justify-center items-center gap-[0.8rem] text-[1.8rem] leading-[1.8rem] font-semibold bg-theme-blue text-white cursor-pointer px-[2rem] py-[1.3rem] rounded-full hover:shadow-lg active:scale-[0.98] transition-all`}
              >
                {loading ? (
                  <Loader value="Sending" color="white" />
                ) : (
                  <>
                    <BsFillSendFill />
                    <span>Send Change Password Link</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            // Sending Verification Link Success Message
            <div className="w-full flex flex-col items-center justify-center gap-[1rem]">
              <div className="mailIcon p-[1.2rem] bg-theme-blue text-white rounded-full">
                <RiMailSendFill size="4.5rem" />
              </div>

              <h3 className="text-[2.2rem] leading-[2.2rem] font-semibold text-theme-blue mt-[1rem]">
                Please check your email
              </h3>

              <p className="text-[1.5rem] font-medium text-center text-neutral-800">
                Dear{" "}
                <span className="font-semibold">{responseUser?.username}</span>,
                we have sent a change password link in your email{" "}
                <span className="font-semibold">{responseUser?.email}</span>.
                Please check your inbox to proceed with changing your NAB Estate
                account password.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
