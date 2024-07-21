import React, { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import { cities } from "../../constants/data";
import Flag from "react-world-flags";

// Import React Icons
import { FaCameraRetro } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";

// Import Assets
import ProfileAvatar from "../../assets/user.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const dropdownRef = useRef(null);
  const currentUser = useSelector((state) => state?.user?.authenticUser);
  const [userProfile, setUserProfile] = useState({});
  const { username, profilePicture, liveInCity } = userProfile;
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isCitiesDropdownOpen, setIsCitiesDropdownOpen] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [mobileNumInfo, setMobileNumInfo] = useState({
    ISOCode: "PK",
    callingCode: "+92",
    callingNumber: "",
  });
  const { ISOCode, callingCode, callingNumber } = mobileNumInfo;

  console.log(userProfile);

  // Set Current User Profile Properties to User Profile Object
  useEffect(() => {
    const {
      username = "",
      profilePicture = "",
      mobileNumber = "",
      liveInCity = "",
    } = currentUser;

    setUserProfile({
      username,
      profilePicture,
      mobileNumber,
      liveInCity,
    });

    if (mobileNumber) {
      const [callingCode, callingNum] = mobileNumber.split(" ");
      const countryKey = Object.entries(countries).find(([key, country]) =>
        country.phone.includes(+callingCode.slice(1))
      )?.[0];

      setMobileNumInfo({
        ISOCode: countryKey,
        callingCode: callingCode,
        callingNumber: callingNum,
      });
    }
  }, [currentUser]);

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
        setIsCitiesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownRef]);

  const isUserEditProfile = (valueFirst, valueSecond) => {
    const { username = "", mobileNumber = "", liveInCity = "" } = currentUser;

    const currentUserProp =
      valueSecond === "username"
        ? username
        : valueSecond === "mobileNumber"
        ? mobileNumber
        : valueSecond === "liveInCity" && liveInCity;

    console.log(valueFirst, currentUserProp);

    if (valueFirst === currentUserProp) {
      setIsEditProfile(false);
    } else {
      setIsEditProfile(true);
    }
  };

  // Profile Picture Change Handler
  const profilePicChangeHandler = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setUserProfile({
        ...userProfile,
        profilePicture: imageURL,
      });
    }

    setIsEditProfile(true);
  };

  // Username Change Handler
  const usernameChangeHandler = (e) => {
    const name = e.target.value.trim();
    let fullName = "";

    if (name) {
      const fullNameArray = name
        .split(" ")
        .filter((str) => str !== "")
        .map(
          (str) =>
            str.trim().charAt(0).toLocaleUpperCase() +
            str.trim().slice(1).toLocaleLowerCase()
        );

      fullName = `${fullNameArray.join(" ")}`;
    }

    setUserProfile({
      ...userProfile,
      username: fullName,
    });

    isUserEditProfile(fullName, "username");
  };

  // Mobile Number Change Handler
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

        isUserEditProfile(value.callingCode, "mobileNumber");
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
        value = "";
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

      isUserEditProfile(value, "mobileNumber");
    }
  };

  // City Change Handler
  const cityChangeHandler = (e) => {
    setUserProfile({
      ...userProfile,
      liveInCity: e.target.innerText,
    });
    setIsCitiesDropdownOpen(false);

    isUserEditProfile(e.target.innerText, "liveInCity");
  };

  return (
    <div className="w-full px-[5%] laptopSm:px-[2%]">
      {/* Profile Header */}
      <div className="header text-neutral-800 border-b-[0.2rem] border-neutral-200 pb-[1rem]">
        <h1 className="text-[2.5rem] leading-[3rem] font-bold">Profile</h1>
        <p className="text-[1.4rem] font-medium">Manage your profile</p>
      </div>

      <div className="body w-full">
        <form className="w-full flex flex-col tabletRg:flex-row justify-between">
          <div className="w-[50%] min-w-[40rem] flex flex-col gap-[3.5rem] pt-[2.5rem] tabletRg:pb-[5rem]">
            {/* Profile Image */}
            <div className="flex flex-col items-start gap-[1rem] px-[0.5rem]">
              <h3 className="text-[1.9rem] leading-[2rem] font-semibold">
                Profile Picture
              </h3>
              <div className="relative">
                <img
                  src={profilePicture || ProfileAvatar}
                  alt="Profile Pic"
                  className="w-[12rem] h-[12rem] rounded-full object-cover bg-neutral-200 border-[0.3rem] border-neutral-300"
                />

                <label
                  htmlFor="uploadPicture"
                  className="absolute bottom-[0.4rem] right-[0.4rem] bg-theme-blue p-[0.8rem] cursor-pointer rounded-full"
                >
                  <input
                    type="file"
                    name="uploadPicture"
                    id="uploadPicture"
                    accept=".jpg, .png, .jpeg"
                    onChange={profilePicChangeHandler}
                    className="hidden"
                  />
                  <FaCameraRetro className="text-[1.8rem] text-neutral-200" />
                </label>
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col items-start gap-[1rem]">
              <label
                htmlFor="username"
                className="text-[1.9rem] leading-[2rem] font-semibold px-[0.5rem]"
              >
                Your Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                defaultValue={username}
                onChange={usernameChangeHandler}
                className="w-full outline-none border-b-[0.2rem] text-neutral-800 border-neutral-200 font-medium px-[0.5rem] py-[0.7rem] text-[1.7rem] leading-[1.7rem] focus:border-theme-blue"
              />

              {username && !username.includes(" ") && (
                <p className="errorMsg text-[1.6rem] leading-[1.6rem] font-medium text-red-700">
                  Please! enter your proper fullname with space separated
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col items-start gap-[1rem]">
              <h3 className="text-[1.9rem] leading-[2rem] font-semibold px-[0.5rem]">
                Mobile Number
              </h3>

              <div className="w-full space-y-[1rem]">
                <div className="input w-full relative z-[1]">
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
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
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
                      ref={dropdownRef}
                      className="dropdownCountry w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 bottom-[110%] left-0"
                    >
                      <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
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

                {callingNumber.length > 0 && callingNumber.length < 10 && (
                  <p className="errorMsg text-[1.6rem] leading-[1.6rem] font-medium text-red-700">
                    Invalid mobile number
                  </p>
                )}
              </div>
            </div>

            {/* Where You Live */}
            <div className="flex flex-col items-start gap-[1rem]">
              {/* Title */}
              <h3 className="text-[1.9rem] leading-[2rem] font-semibold px-[0.5rem]">
                Where you live in Pakistan?
              </h3>

              {/* City Input Cont */}
              <div className="input w-full relative z-[1]">
                <input
                  type="text"
                  name="city"
                  id="city"
                  defaultValue={liveInCity}
                  readOnly={true}
                  autoComplete="off"
                  onClick={() => setIsCitiesDropdownOpen(!isCitiesDropdownOpen)}
                  className="w-full outline-none text-neutral-800 border-[0.2rem] border-white border-b-[0.2rem] border-b-neutral-300 font-medium pl-[0.5rem] pr-[2rem] py-[0.5rem] text-[1.6rem] tracking-wider focus:border-b-theme-blue"
                />

                <span className="text-[2rem] absolute top-0 right-0 bottom-0 flex items-center justify-center px-[1.5rem] text-theme-blue pointer-events-none">
                  <IoMdArrowDropdown
                    className={`${
                      isCitiesDropdownOpen ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </span>

                {/* Cities Dropdown */}
                {isCitiesDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="dropdownCities w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 bottom-[110%] left-0"
                  >
                    <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                      <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                        Select City
                      </h6>
                      {cities.sort().map((city, index) => (
                        <li
                          key={index}
                          onClick={(e) => cityChangeHandler(e)}
                          className="w-full text-[1.5rem] leading-[1.5rem] font-medium text-neutral-700 px-[1.5rem] py-[1rem] hover:bg-theme-blue hover:text-white transition-all"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Update Profile Button */}
          <div className="flex items-start justify-end py-[5rem] tabletRg:py-[2.5rem]">
            <button
              type="button"
              disabled={!isEditProfile}
              // onClick={}
              className={`text-[1.7rem] leading-[1.7rem] font-semibold px-[2rem] py-[1rem] flex items-center gap-[0.6rem] text-white bg-theme-blue rounded-md transition-all duration-300 hover:bg-theme-blue cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-800 whitespace-nowrap`}
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

export default Profile;
