import React, { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import Flag from "react-world-flags";

// Import React Icons
import { FaCameraRetro } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

// Import Assets
import ProfileAvatar from "../../assets/user.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const dropdownRef = useRef(null);
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [userProfile, setUserProfile] = useState({});
  const { username, profilePicture, mobileNumber } = userProfile;
  const [profilePic, setProfilePic] = useState(profilePicture || ProfileAvatar);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [mobileNumInfo, setMobileNumInfo] = useState({
    ISOCode: "PK",
    callingCode: "+92",
    callingNumber: "",
  });
  const { ISOCode, callingCode, callingNumber } = mobileNumInfo;

  console.log(userProfile);
  console.log(mobileNumInfo);

  useEffect(() => {
    if (currentUser.profilePicture && currentUser.mobileNumber) {
      setUserProfile({
        username: currentUser.username,
        profilePicture: currentUser.profilePicture,
        mobileNumber: currentUser.mobileNumber,
      });

      const [callingCode, callingNum] = currentUser.mobileNumber.split(" ");
      const countryKey = Object.entries(countries).find(([key, country]) =>
        country.phone.includes(+callingCode.slice(1))
      )?.[0];

      setMobileNumInfo({
        ISOCode: countryKey,
        callingCode: callingCode,
        callingNumber: callingNum,
      });
    } else if (!currentUser.profilePicture && currentUser.mobileNumber) {
      setUserProfile({
        username: currentUser.username,
        profilePicture: "",
        mobileNumber: currentUser.mobileNumber,
      });

      const [callingCode, callingNum] = currentUser.mobileNumber.split(" ");
      const countryKey = Object.entries(countries).find(([key, country]) =>
        country.phone.includes(+callingCode.slice(1))
      )?.[0];

      setMobileNumInfo({
        ISOCode: countryKey,
        callingCode: callingCode,
        callingNumber: callingNum,
      });
    } else if (currentUser.profilePicture && !currentUser.mobileNumber) {
      setUserProfile({
        username: currentUser.username,
        profilePicture: ProfileAvatar,
        mobileNumber: "",
      });
    } else {
      setUserProfile({
        username: currentUser.username,
        profilePicture: "",
        mobileNumber: "",
      });
    }
  }, [currentUser]);

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownRef]);

  const imagesChangeHandler = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setProfilePic(imageURL);
    }
  };

  const mobileNumberChangeHandler = (key, value) => {
    if (key === "code") {
      if (!callingNumber) {
        setMobileNumInfo({
          ...mobileNumInfo,
          ISOCode: value.ISOCode,
          callingCode: value.callingCode,
        });
        setIsCountryDropdownOpen(false);
      } else if (callingNumber) {
        setMobileNumInfo({
          ...mobileNumInfo,
          ISOCode: value.ISOCode,
          callingCode: value.callingCode,
        });
        setIsCountryDropdownOpen(false);

        setUserProfile({
          ...userProfile,
          mobileNumber: `${value.callingCode} ${callingNumber}`,
        });
      }
    } else if (key === "number") {
      if (
        value.length > 10 ||
        value.length < 1 ||
        value.startsWith(0) ||
        value.includes(".")
      ) {
        setUserProfile({
          ...userProfile,
          mobileNumber: "",
        });
        setMobileNumInfo({
          ...mobileNumInfo,
          callingNumber: "",
        });
      } else if (value.length <= 10) {
        setUserProfile({
          ...userProfile,
          mobileNumber: `${callingCode} ${value}`,
        });
        setMobileNumInfo({
          ...mobileNumInfo,
          callingNumber: value,
        });
      }
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
        <section className="flex flex-col items-start gap-[1rem] px-[0.5rem]">
          <h3 className="text-[1.8rem] leading-[2rem] font-semibold">
            Profile Picture
          </h3>
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
            className="text-[1.8rem] leading-[2rem] font-semibold px-[0.5rem]"
          >
            Your Name
          </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={username}
            onChange={(e) => console.log(e.target.value)}
            className="w-[50%] min-w-[40rem] outline-none border-b-[0.2rem] text-neutral-800 border-neutral-200 font-medium px-[0.5rem] py-[0.7rem] text-[1.7rem] leading-[1.7rem] focus:border-theme-blue p"
          />
        </section>

        {/* Mobile Number */}
        <section className="flex flex-col items-start gap-[1rem]">
          <h3 className="text-[1.8rem] leading-[2rem] font-semibold px-[0.5rem]">
            Mobile Number
          </h3>
          <div className="input w-[50%] min-w-[40rem] relative z-[4]">
            <input
              type="number"
              name="mobileNumber"
              id="mobileNumber"
              value={callingNumber}
              onChange={(e) =>
                mobileNumberChangeHandler("number", e.target.value)
              }
              maxLength={10}
              placeholder="1234567890"
              className="w-full outline-none text-neutral-800 border-[0.2rem] border-white border-b-[0.2rem] border-b-neutral-300 font-medium pl-[13rem] pr-[2rem] py-[0.5rem] text-[1.6rem] tracking-wider focus:border-b-theme-blue numberInput"
            />

            <div
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="absolute top-[0.2rem] left-[0.2rem] bottom-[0.2rem] px-[0.5rem] flex items-center gap-[1rem] text-[1.6rem] font-semibold text-neutral-700 cursor-pointer select-none"
            >
              <span>
                <Flag code={ISOCode} className="w-[2.5rem] " />
              </span>
              <IoMdArrowDropdown
                size="1.8rem"
                className={`${
                  isCountryDropdownOpen ? "rotate-180" : "rotate-0"
                } transition-all `}
              />
              <span>{callingCode}</span>
            </div>

            {/* Country Dial Code Dropdown */}
            {isCountryDropdownOpen && (
              <div
                // ref={dropdownRef}
                className="dropdownCountry w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 bottom-[110%] left-0"
              >
                <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim ">
                  <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                    Select Country
                  </h6>
                  {Object.entries(countries).map(
                    ([countryCode, countryData], index) => (
                      <li
                        key={index}
                        onClick={() => {
                          mobileNumberChangeHandler("code", {
                            ISOCode: countryCode,
                            callingCode: `+${countryData.phone[0]}`,
                          });
                        }}
                        className="w-full flex items-center gap-[2rem] text-[1.5rem] leading-[1.6rem] font-medium text-neutral-700 px-[1.5rem] py-[1rem] hover:bg-theme-blue hover:text-white transition-all cursor-pointer"
                      >
                        <Flag code={countryCode} className="w-[2.4rem]" />
                        <div className="flex-1 flex items-center justify-between">
                          <span>{countryData.name}</span>
                          <span className="font-semibold">
                            +{countryData.phone[0]}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
