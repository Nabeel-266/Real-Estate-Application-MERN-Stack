import React, { useState } from "react";

// Import React Icons
import { FaCameraRetro } from "react-icons/fa";

// Import Assets
import ProfileAvatar from "../../assets/user.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [profilePic, setProfilePic] = useState(ProfileAvatar);

  const imagesChangeHandler = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setProfilePic(imageURL);
    }
  };
  return (
    <div className="w-full px-[2rem]">
      {/* Profile Header */}
      <div className="header text-neutral-800 border-b-[0.2rem] border-neutral-200 pb-[1rem]">
        <h1 className="text-[2.5rem] leading-[3rem] font-bold">Profile</h1>
        <p className="text-[1.4rem] font-medium">Manage your Profile</p>
      </div>

      <div className="w-full flex flex-col gap-[3rem] py-[3rem]">
        {/* Profile Image */}
        <section className="flex flex-col items-start gap-[1rem]">
          <h2 className="text-[1.8rem] leading-[2rem] font-semibold">
            Profile Picture
          </h2>
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile Pic"
              className="w-[12rem] h-[12rem] rounded-full object-cover bg-neutral-200"
            />

            <label
              htmlFor="uploadPicture"
              className="absolute bottom-[0.5rem] right-[0.5rem] bg-theme-blue p-[0.8rem] cursor-pointer rounded-full"
            >
              <input
                type="file"
                name="uploadPicture"
                id="uploadPicture"
                accept=".jpg, .png, .jpeg"
                onChange={imagesChangeHandler}
                className="hidden"
              />
              <FaCameraRetro className="text-[1.8rem] text-neutral-200" />
            </label>
          </div>
        </section>

        {/* Username */}
        <section className="flex flex-col items-start gap-[1rem]">
          <label
            htmlFor="username"
            className="text-[1.8rem] leading-[2rem] font-semibold"
          >
            Your Name
          </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={currentUser?.username}
            onChange={(e) => console.log(e.target.value)}
            className="w-[50%] min-w-[40rem] outline-none border-b-[0rem] text-neutral-800 border-neutral-200 font-medium px-[0rem] py-[0.8rem] text-[1.7rem] leading-[1.7rem] focus:border-theme-blue"
          />
        </section>
      </div>
    </div>
  );
};

export default Profile;
