import { useState } from "react";
import { useSelector } from "react-redux";

// Import React Icons
import { MdOutlineMailOutline, MdOutlinePassword } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

// Import Components
import RecoveryEmailModal from "./RecoveryEmailModal";
import ChangeEmailModal from "./ChangeEmailModal";

const Account = () => {
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [isRecoveryEmailModalOpen, setIsRecoveryEmailModalOpen] =
    useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);

  return (
    <>
      <div className="w-full px-[5%] laptopSm:px-[2%]">
        {/* Account Header */}
        <div className="header text-neutral-800 border-b-[0.2rem] border-neutral-200 pb-[1rem]">
          <h1 className="text-[2.5rem] leading-[3rem] font-bold">Account</h1>
          <p className="text-[1.4rem] font-medium">
            Manage your account information
          </p>
        </div>

        {/* Account Body */}
        <div className="body w-full flex flex-col gap-[3.5rem] py-[3rem]">
          {/* Account Email */}
          <section className="flex flex-col items-start gap-[1rem] px-[0.5rem]">
            <h3 className="text-[1.9rem] leading-[2rem] font-semibold">
              Account Email
            </h3>

            <p className="flex items-center gap-[0.5rem]">
              <MdOutlineMailOutline className="text-[1.8rem] text-theme-blue" />
              <span className="text-[1.7rem] leading-[2rem] text-neutral-800 font-medium">
                {currentUser?.email}
              </span>
            </p>

            <button
              onClick={() => setIsChangeEmailModalOpen(true)}
              className="text-[1.7rem] leading-[1.8rem] font-medium text-theme-blue mt-[1rem] hover:underline underline-offset-2"
            >
              Change your account email?
            </button>
          </section>

          {/* Recovery Email */}
          <section className="flex flex-col items-start gap-[1rem] px-[0.5rem]">
            <h3 className="text-[1.9rem] leading-[2rem] font-semibold">
              Recovery Email
            </h3>

            {currentUser?.recoveryEmail ? (
              <p className="flex items-center gap-[0.5rem]">
                <MdOutlineMailOutline className="text-[1.8rem] text-theme-blue" />
                <span className="text-[1.6rem] leading-[2rem] text-neutral-800 font-medium">
                  {currentUser?.recoveryEmail}
                </span>
              </p>
            ) : (
              <p className="text-[1.6rem] leading-[2.2rem] text-neutral-800 font-medium">
                Add your recovery email, if you change your account email
                address.
              </p>
            )}

            {!currentUser?.recoveryEmail ? (
              <button
                onClick={() => setIsRecoveryEmailModalOpen(true)}
                className="flex items-center gap-[0.5rem] text-[1.7rem] leading-[1.8rem] font-medium text-theme-blue mt-[1.2rem]"
              >
                <FaPlus size="1.6rem" />
                <span>Add recovery email</span>
              </button>
            ) : (
              <button
                onClick={() => setIsRecoveryEmailModalOpen(true)}
                className="text-[1.7rem] leading-[1.8rem] font-medium text-theme-blue mt-[1rem] hover:underline underline-offset-2"
              >
                Change your account recovery email?
              </button>
            )}
          </section>

          {/* Reset Password */}
          <section className="flex flex-col items-start gap-[1rem] px-[0.5rem]">
            <h3 className="text-[1.9rem] leading-[2rem] font-semibold">
              Reset Password
            </h3>

            <button className="flex items-center gap-[0.8rem] text-[1.7rem] leading-[1.8rem] font-medium text-theme-blue mt-[1rem]">
              <MdOutlinePassword size="1.8rem" />
              <span>Change Password</span>
            </button>
          </section>

          {/* Delete Account */}
          <section className="flex flex-col items-start gap-[1rem] px-[0.5rem]">
            <h3 className="text-[1.9rem] leading-[2rem] font-semibold text-red-800">
              Delete Account
            </h3>

            <p className="text-[1.6rem] leading-[2.2rem] text-neutral-800 font-medium">
              <span className="text-red-800">Danger!</span>{" "}
              <span>
                once you delete your account, there is no going back. Please be
                certain.
              </span>
            </p>

            <button className="flex items-center gap-[0.8rem] text-[1.7rem] leading-[1.8rem] font-medium text-red-800 px-[2rem] py-[1rem] border-[0.2rem] border-red-800 rounded-md mt-[1.2rem] hover:bg-red-800 hover:text-white transition-all">
              <RiDeleteBin6Line />
              <span>Delete Your Account</span>
            </button>
          </section>
        </div>
      </div>

      {/* Recovery Email Modal */}
      {isRecoveryEmailModalOpen && (
        <RecoveryEmailModal isModalOpen={setIsRecoveryEmailModalOpen} />
      )}

      {/* Change Email Modal */}
      {isChangeEmailModalOpen && (
        <ChangeEmailModal
          isModalOpen={setIsChangeEmailModalOpen}
          recoveryEmailModalOpen={setIsRecoveryEmailModalOpen}
        />
      )}
    </>
  );
};

export default Account;
