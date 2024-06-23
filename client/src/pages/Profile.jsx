import { useState } from "react";
import { useSelector } from "react-redux";

// Import Assets
import ProfilePicture from "../assets/user.png";
import PropertyImage from "../assets/Properties/room-01.jpg";

// Import React Icons
import { PiDotsThreeOutlineVerticalBold, PiToiletBold } from "react-icons/pi";
import { BiArea, BiEditAlt } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineMailOutline, MdOutlineTimer } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { FaBath, FaBed } from "react-icons/fa6";
import { AiOutlinePartition } from "react-icons/ai";
import { TbToolsKitchen } from "react-icons/tb";
import { HiLocationMarker } from "react-icons/hi";

const Profile = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [isActiveTab, setIsActiveTab] = useState("saved");

  return (
    <div className="profileCont w-full min-h-dvh pt-[6rem] bg-profile-image bg-cover bg-no-repeat bg-center">
      <div className="profileWrapperCont mx-[8%] pb-[5rem]">
        {/* Profile Heading */}
        <div className="profileHD w-full flex justify-between items-center pt-[3rem] pb-[1rem] px-[1rem] border-b-[0.2rem] border-theme-blue ">
          <h1 className="text-[3rem] leading-[3rem] font-semibold text-theme-blue">
            Your Profile
          </h1>

          <button className="text-[2.5rem] text-theme-blue rounded-lg">
            <PiDotsThreeOutlineVerticalBold />
          </button>
        </div>

        {/* Profile Info */}
        <section className="profileInfoCont w-full relative px-[2rem] py-[2.5rem] flex flex-col gap-[1.5rem] laptopSm:flex-row laptopSm:items-center laptopSm:gap-[2rem] border-b-[0.2rem] border-neutral-100">
          {/* Profile Buttons */}
          <div className="profileBtns absolute top-[2.5rem] right-[2rem] flex flex-col items-end gap-[1rem]">
            {!user?.isVerified && (
              <button className="verifyProfileBtn text-[1.7rem] leading-[1.7rem] font-medium text-white px-[1rem] py-[0.8rem] bg-theme-blue rounded-md flex items-center gap-[0.5rem]">
                <GiCheckMark />
                <span>Verify Account</span>
              </button>
            )}

            <button className="editProfileBtn text-[1.7rem] leading-[1.7rem] font-medium text-white px-[1rem] py-[0.8rem] bg-theme-blue rounded-md flex items-center gap-[0.5rem]">
              <BiEditAlt />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* User Image */}
          <div className="userImage w-[12rem] h-[12rem] rounded-full border-[0.2rem] border-theme-blue overflow-hidden shadow-lg">
            <img
              src={ProfilePicture}
              alt="ProfilePicture"
              className="w-full h-full object-cover bg-neutral-800 rounded-full p-[1rem] border-[0.4rem] border-white"
            />
          </div>

          {/* User Details */}
          <div className="userDetails flex flex-col gap-[0.6rem]">
            <h4 className="text-[2.6rem] leading-[2.6rem] text-neutral-800 font-semibold font-mont">
              {user.username}
            </h4>

            <p className="text-[1.6rem] flex items-center gap-[0.5rem]">
              <MdOutlineMailOutline className="text-neutral-700" />
              <span className="leading-[2rem] text-neutral-800 font-medium">
                {user.email}
              </span>
            </p>

            <p className="text-[1.6rem] flex items-center gap-[0.5rem]">
              <TiPhoneOutline className="text-neutral-700" />
              <span className="leading-[2rem] text-neutral-800 font-medium">
                03342805639
              </span>
            </p>
          </div>
        </section>

        {/* Profile Properties */}
        <section className="profilePropertiesCont w-full flex flex-col gap-[1rem]">
          {/* Profile Property Tabs */}
          <div className="profilePropertyTab w-full flex items-end text-neutral-800 py-[2rem]">
            <span
              onClick={() => setIsActiveTab("saved")}
              className={`text-[2rem] leading-[2rem] font-semibold relative z-0 px-[1rem] py-[0.8rem] cursor-pointer overflow-hidden before:content-[''] before:absolute before:z-[-1] before:w-full before:h-[0.3rem] before:bottom-0 before:left-0 before:bg-theme-yellow ${
                isActiveTab === "saved"
                  ? "before:translate-x-[0%]"
                  : "before:translate-x-[100%]"
              } before:transition-all before:duration-300`}
            >
              Saved Property
            </span>

            <span
              onClick={() => setIsActiveTab("owned")}
              className={`text-[2rem] leading-[2rem] font-semibold relative z-0 px-[1rem] py-[0.8rem] cursor-pointer overflow-hidden before:content-[''] before:absolute before:z-[-1] before:w-full before:h-[0.3rem] before:bottom-0 before:left-0 before:bg-theme-yellow ${
                isActiveTab === "owned"
                  ? "before:translate-x-[0%]"
                  : "before:translate-x-[-100%]"
              } before:transition-all before:duration-300`}
            >
              Owned Property
            </span>
          </div>

          {/* Property Cards Cont */}
          <div className="tabPropertyCont w-full">
            {/* Empty Message */}
            {isActiveTab === "saved" ? (
              <p className="text-[1.8rem] font-medium text-neutral-800 text-center mt-[3rem] hidden">
                Your <strong>Saved Property</strong> Section is{" "}
                <strong>Empty</strong>
              </p>
            ) : (
              <p className="text-[1.8rem] font-medium text-neutral-800 text-center mt-[3rem] hidden">
                Your <strong>Owned Property</strong> Section is{" "}
                <strong>Empty</strong>
              </p>
            )}

            <div className="propertyCardsCont grid grid-cols-2 gap-[3rem]">
              {/* Property Cards */}
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="propertyCard w-full flex border-[0.2rem] border-neutral-200 overflow-hidden rounded-2xl shadow-md"
                >
                  {/* Image Side */}
                  <div className="imageSide w-[40%]">
                    <img
                      src={PropertyImage}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description Side */}
                  <div className="descSide w-[60%] flex flex-col gap-[0.7rem] px-[1rem] py-[0.8rem] text-neutral-800">
                    {/* Title */}
                    <p className="title truncate text-[1.7rem] leading-[1.9rem] font-semibold">
                      Newly Renovated House
                    </p>

                    {/* Price */}
                    <span className="price text-[1.6rem] leading-[1.5rem] font-bold text-theme-blue select-none">
                      PKR{" "}
                      <strong className="text-[2rem] leading-[2rem] font-montAlter font-semibold">
                        450,000,00
                      </strong>
                    </span>

                    {/* Location */}
                    <div className="location flex items-center gap-[0.4rem] text-neutral-700 mt-[0.4rem]">
                      <HiLocationMarker size="1.5rem" />
                      <span className="text-[1.5rem] leading-[1.4rem] font-medium">
                        Karachi, Pakistan
                      </span>
                    </div>

                    {/* Details */}
                    <div className="details w-full flex items-center justify-between mt-[0.4rem] text-neutral-700">
                      <div className="leftSide flex items-center gap-[1rem] text-[1.4rem] leading-[1.2rem] font-medium select-none">
                        {/* Bedroom */}
                        <abbr title="Bedroom" className="no-underline">
                          <span className="bed flex items-center gap-[0.3rem]">
                            <FaBed size="1.4rem" /> 04
                          </span>
                        </abbr>

                        {/* Bathroom */}
                        <abbr title="Bathroom" className="no-underline">
                          <span className="bath flex items-center gap-[0.3rem]">
                            <FaBath size="1.1rem" /> 03
                          </span>
                        </abbr>

                        {/* Kitchen */}
                        <abbr title="Kitchen" className="no-underline hidden">
                          <span className="bath flex items-center gap-[0.3rem]">
                            <TbToolsKitchen size="1.3rem" /> 03
                          </span>
                        </abbr>

                        {/* Toilet */}
                        <abbr title="Toilet" className="no-underline hidden">
                          <span className="bath flex items-center gap-[0.3rem]">
                            <PiToiletBold size="1.35rem" /> 01
                          </span>
                        </abbr>

                        {/* Partitions */}
                        <abbr
                          title="Partitions"
                          className="no-underline hidden"
                        >
                          <span className="bath flex items-center gap-[0.3rem]">
                            <AiOutlinePartition size="1.35rem" /> 01
                          </span>
                        </abbr>
                      </div>

                      <span className="area text-[1.5rem] leading-[1.5rem] font-medium flex items-center gap-[0.3rem]">
                        <BiArea /> sqft 3500
                      </span>
                    </div>

                    {/* Info */}
                    <div className="info w-full flex items-center justify-between mt-[0.4rem]">
                      <span className="bg-theme-blue text-white text-[1.4rem] leading-[1.2rem] font-semibold p-[0.5rem] rounded-md">
                        For Sale
                      </span>

                      <span className="area text-[1.4rem] leading-[1.4rem] font-medium text-neutral-700 flex items-center gap-[0.3rem]">
                        <MdOutlineTimer size="1.6rem" /> 2 minutes ago
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
