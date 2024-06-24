import { useState } from "react";
import { useSelector } from "react-redux";

// Import Assets
import ProfilePicture from "../assets/user.png";

// Import React Icons
import { RxUpdate } from "react-icons/rx";
import { FiUpload } from "react-icons/fi";

const EditProfile = ({ setIsOpenModal }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [userImage, setUserImage] = useState(user?.profilePicture || "");
  const [userName, setUserName] = useState(user?.username || "");
  const [userMobileNumber, setUserMobileNumber] = useState(
    user?.mobileNumber || ""
  );

  const updateProfileHandler = (e) => {
    e.preventDefault();
    console.log(userImage);
    console.log(userName);
    console.log(userMobileNumber);
  };

  return (
    <div className="editProfileModalCont w-full min-h-dvh flex items-center justify-center fixed z-[990] top-0 left-0">
      {/* Edit Profile Modal Overlay */}
      <div
        onClick={() => setIsOpenModal(false)}
        className={`w-full h-full absolute z-0 backdrop-blur-[5px] bg-[#40404090] overflow-hidden`}
      ></div>

      <div className="w-[50rem] min-h-[30rem] relative z-20 bg-white rounded-md px-[1rem] py-[1rem] shadow-2xl">
        {/* Edit Profile Modal Header */}
        <header className="w-full px-[1rem] py-[0.8rem] border-b-[0.2rem] border-neutral-300 text-theme-blue">
          <h2 className="text-[2.4rem] leading-[2.4rem] font-bold">
            Edit Profile
          </h2>
        </header>

        {/* Edit Profile Modal Body */}
        <form className="w-full flex flex-col gap-[2rem]">
          {/* Update User Image Cont */}
          <div className="w-full flex justify-between items-start px-[1rem] py-[1.5rem]">
            {/* User Image Display */}
            <div className="displayPicture w-[12rem] h-[12rem] rounded-full overflow-hidden border-[0.2rem] border-neutral-200">
              <img
                src={ProfilePicture}
                alt="UserPicture"
                className="w-full h-full object-cover bg-theme-blue"
              />
            </div>

            {/* User Image Upload */}
            <div className="uploadPicture">
              <label
                htmlFor="uploadImage"
                className="flex items-center gap-[0.6rem] text-[1.6rem] leading-[1.6rem] text-white font-semibold bg-neutral-800 px-[1rem] py-[0.9rem] rounded-md cursor-pointer"
              >
                <FiUpload />
                <span>Upload Picture</span>
              </label>
              <input
                type="file"
                name="userImage"
                id="uploadImage"
                accept=".jpg, .png, .jpeg"
                defaultValue={userImage}
                onChange={(e) => setUserImage(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>

          {/* Update User Name Cont */}
          <div className="w-full px-[1rem] flex flex-col gap-[0.8rem]">
            <label
              htmlFor="username"
              className="text-[1.8rem] leading-[1.8rem] text-theme-blue font-semibold"
            >
              Your Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              defaultValue={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full outline-none border-[0.2rem] border-neutral-400 px-[1rem] py-[0.8rem] text-[1.7rem] leading-[1.7rem] text-neutral-800 font-semibold font-quick rounded-md focus:border-cyan-800"
            />
          </div>

          {/* Update User Mobile Number Cont */}
          <div className="w-full px-[1rem] flex flex-col gap-[0.8rem]">
            <label
              htmlFor="mobileNumber"
              className="text-[1.8rem] leading-[1.8rem] text-theme-blue font-semibold"
            >
              Mobile Number
            </label>
            <input
              type="number"
              name="mobileNumber"
              id="mobileNumber"
              autoComplete="off"
              defaultValue={userMobileNumber}
              placeholder="e.g. #03321900021"
              onChange={(e) => setUserMobileNumber(e.target.value)}
              className="w-full outline-none border-[0.2rem] border-neutral-400 px-[1rem] py-[0.8rem] text-[1.6rem] leading-[1.6rem] text-neutral-800 font-medium rounded-md focus:border-cyan-800 numberInput"
            />
          </div>

          {/* Modal Button */}
          <div className="w-full flex justify-end gap-[1rem] px-[1rem] py-[1.5rem]">
            <button
              onClick={() => setIsOpenModal(false)}
              className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[1rem] py-[1rem] bg-neutral-800 rounded-md flex items-center gap-[0.5rem]"
            >
              Close
            </button>

            <button
              onClick={(e) => updateProfileHandler(e)}
              className="text-[1.7rem] leading-[1.7rem] font-medium text-white px-[1rem] py-[1rem] bg-theme-blue rounded-md flex items-center gap-[0.5rem]"
            >
              <RxUpdate />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
