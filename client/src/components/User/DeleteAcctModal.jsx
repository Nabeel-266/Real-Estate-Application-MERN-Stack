import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../api/userAPIs";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

// Import Component
import Loader from "../Loader";

const DeleteAcctModal = ({ isModalOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [confirmation, setConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Change Account Password Handler
  const accountPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const deleteAccountHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await deleteAccount(
        currentUser._id,
        currentUser.email,
        password,
        dispatch
      );

      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="overlayCont flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] bg-[#404040b0] overflow-hidden ">
      {/* Delete Account Modal Cont */}
      <div className="w-[85%] tabletSm:w-[50rem] tabletRg:w-[55rem] max-h-[80%] relative z-20 bg-white rounded-md px-[1.2rem] shadow-2xl">
        {/* Delete Account Modal Header */}
        <header className="w-full px-[1rem] pt-[2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Delete Account
          </h2>
          <button
            onClick={() => isModalOpen(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        {/* Delete Account Modal Body */}
        <div className="w-full h-full flex flex-col px-[1.5rem] pt-[1.5rem] pb-[2rem]">
          {!confirmation ? (
            // Delete Account Confirmation Content
            <div className="w-full flex flex-col gap-[2.5rem]">
              {/* Message */}
              <p className="text-[1.55rem] font-medium text-neutral-800">
                <span className="text-[1.7rem] font-semibold">
                  Dear {currentUser.username},
                </span>
                <br />
                <span className="text-[#990000]">Danger!</span> Are you sure you
                want to delete your NAB Estate Account. If once you delete your
                account, there is no going back. Please be certain!
              </p>

              {/* Decision Buttons */}
              <div className="w-full flex items-center justify-end gap-[1.5rem]">
                <button
                  onClick={() => isModalOpen(false)}
                  className={`flex justify-center items-center gap-[0.8rem] text-[1.7rem] leading-[1.7rem] font-semibold bg-neutral-800 text-white cursor-pointer px-[2rem] py-[1rem] rounded-md hover:shadow-lg active:scale-[0.98] transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setConfirmation(true)}
                  className={`flex justify-center items-center gap-[0.8rem] text-[1.7rem] leading-[1.7rem] font-semibold border-theme-blue border-[0.2rem] text-theme-blue cursor-pointer px-[2rem] py-[0.8rem] rounded-md hover:shadow-lg hover:bg-theme-blue hover:text-white active:scale-[0.98] transition-all`}
                >
                  Yes Sure!
                </button>
              </div>
            </div>
          ) : (
            // Sending Delete Account Request Content
            <div className="w-full flex flex-col items-center justify-center gap-[1rem]">
              <p className="text-[1.5rem] font-medium text-neutral-800">
                Dear {currentUser.username}, Please enter your account password
                for security purpose and then you delete this account. Thankyou!
              </p>

              {/* Account Password Cont */}
              <div className="w-full flex flex-col gap-[0.2rem] mt-[0.5rem]">
                {/* Account Password Input */}
                <label
                  htmlFor="password"
                  className="flex flex-col gap-[0.2rem] "
                >
                  <span className="text-[1.8rem] font-semibold text-neutral-800">
                    Enter Your Account Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={accountPasswordChangeHandler}
                    placeholder="Enter Password here..."
                    className={`w-full tabletSm:w-[90%] px-[0.8rem] py-[0.8rem] text-neutral-700 text-[1.6rem] leading-[2rem] font-medium font-mont outline-none bg-transparent border-[0.2rem] border-neutral-500 rounded-md focus:border-theme-blue placeholder:font-montAlter placeholder:text-neutral-700 ${
                      error && "border-red-700"
                    }`}
                  />
                </label>

                {/* Account Password Error Message */}
                {error && (
                  <span className="errorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700 mt-[0.5rem]">
                    {error}
                  </span>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={deleteAccountHandler}
                disabled={password ? false : true}
                className={`flex items-center justify-center gap-[0.8rem] self-end px-[1.5rem] py-[1rem] mt-[1.5rem] text-[1.7rem] leading-[1.6rem] tracking-wider font-bold rounded-md transition-all ${
                  password
                    ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                    : "text-neutral-700 bg-neutral-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <Loader value="Deleting" color="white" size="0.55rem" />
                ) : (
                  <>
                    <RiDeleteBin6Line size="1.8rem" />
                    <span>DELETE</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAcctModal;
