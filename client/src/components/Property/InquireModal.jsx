import { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import Flag from "react-world-flags";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";

const InquireModal = ({ isModalOpen, propertyDetails }) => {
  const dropdownRef = useRef(null);
  const { username, email, mobileNumber } = useSelector(
    (state) => state?.user?.authenticUser
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inquireFormData, setInquireFormData] = useState({
    name: username || "",
    email: email || "",
    mobileNumber: mobileNumber || "",
    message: "",
  });
  const [contactNumInfo, setContactNumInfo] = useState({
    ISOCode:
      Object.keys(countries).find(
        (key) =>
          countries[key].phone[0] === +mobileNumber?.split(" ")[0].slice(1)
      ) || "PK",
    callingCode: mobileNumber.split(" ")[0] || "+92",
    callingNumber: mobileNumber.split(" ")[1] || "",
  });

  const { name: clientName, email: clientEmail, message } = inquireFormData;
  const { ISOCode, callingCode, callingNumber } = contactNumInfo;
  const { size, type, purpose, city } = propertyDetails;

  // Dropdown Close when clicked outside of the dropdown
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownRef]);

  // Username Change Handler
  const usernameChangeHandler = (e) => {
    const name = e.target.value.trim();
    const fullNameArray = name
      .split(" ")
      .filter((str) => str !== "")
      .map(
        (str) =>
          str.trim().charAt(0).toLocaleUpperCase() +
          str.trim().slice(1).toLocaleLowerCase()
      );

    const fullName = fullNameArray.join(" ");

    setInquireFormData({
      ...inquireFormData,
      name: fullName,
    });

    error && error[0] === "name" && setError(null);
  };

  // Email Change Handler
  const emailChangeHandler = (e) => {
    setInquireFormData({
      ...inquireFormData,
      email: e.target.value.trim(),
    });

    error && error[0] === "email" && setError(null);
  };

  // Contact Number Change Handler
  const contactNumChangeHandler = (key, value) => {
    if (key === "code") {
      if (callingNumber) {
        setInquireFormData({
          ...inquireFormData,
          mobileNumber: `${value.callingCode} ${callingNumber}`,
        });
      }

      setContactNumInfo({
        ...contactNumInfo,
        ISOCode: value.ISOCode,
        callingCode: value.callingCode,
      });

      setIsDropdownOpen(false);
    } else if (key === "number") {
      if (
        value.length > 10 ||
        value.length < 1 ||
        value.startsWith(0) ||
        value.includes(".")
      ) {
        setContactNumInfo({
          ...contactNumInfo,
          callingNumber: "",
        });
        setInquireFormData({
          ...inquireFormData,
          mobileNumber: "",
        });
      } else if (value.length <= 10) {
        setContactNumInfo({
          ...contactNumInfo,
          callingNumber: value,
        });
        setInquireFormData({
          ...inquireFormData,
          mobileNumber: `${callingCode} ${value}`,
        });
      }
    }

    error && error[0] === "mobileNumber" && setError(null);
  };

  // Message Change Handler
  const messageChangeHandler = (e) => {
    setInquireFormData({
      ...inquireFormData,
      message: e.target.value.trim(),
    });

    error && error[0] === "message" && setError(null);
  };

  // Inquire Form Data Validation Handler
  const inquireFormDataValidationHandler = (formData) => {
    const { name, email, mobileNumber, message } = formData;
    const mobileNumLength = mobileNumber.split(" ")[1].length;
    const emailPattern =
      /^(?:[^@\s]+@(?:gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|zoho\.com|icloud\.com|protonmail\.com|aol\.com))$/;

    if (!name.includes(" ")) {
      setError([
        "name",
        "Please! enter your proper fullname with space separated",
      ]);
      return false;
    } else if (!emailPattern.test(email)) {
      setError(["email", "Your Email is invalid"]);
      return false;
    } else if (mobileNumLength > 10 || mobileNumLength < 10) {
      setError(["mobileNumber", "Your mobile number is invalid"]);
      return false;
    } else {
      return true;
    }
  };

  // Inquire Form Submission Handler
  const inquireFormSubmissionHandler = (e) => {
    e.preventDefault();

    try {
      const isInquireDataOK = inquireFormDataValidationHandler(inquireFormData);

      if (isInquireDataOK) {
        console.log("OK");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[4px] bg-[#404040b0] overflow-hidden">
      <div
        className={`w-[90%] tabletSm:w-[45rem] tabletRg:w-[45rem] relative z-20 bg-white rounded-md px-[1.5rem] shadow-2xl`}
      >
        {/* Contact Me Modal Header */}
        <header className="w-full px-[1rem] pt-[2.2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Get More Information
          </h2>
          <button
            onClick={() => isModalOpen(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        <section className="flex flex-col gap-[1rem] px-[1rem] py-[2.2rem]">
          <p className="text-[1.6rem] text-neutral-700 font-medium">
            For more information, please fill out the form and our team will get
            back to you
          </p>

          <form className="flex flex-col gap-[1.4rem] py-[1rem]">
            {/* Username Input Cont */}
            <div className="w-full space-y-[0.8rem]">
              <div className="input w-full">
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={inquireFormData?.name}
                  onChange={usernameChangeHandler}
                  placeholder="Enter your full name"
                  autoComplete="off"
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium px-[1rem] py-[1.1rem] text-[1.6rem] leading-[1.6rem] rounded-md focus:border-theme-blue placeholder:text-neutral-500 ${
                    error && error[0] === "name"
                      ? "border-red-700"
                      : "border-neutral-300"
                  }`}
                />
              </div>

              {error && error[0] === "name" && <FieldError error={error[1]} />}
            </div>

            {/* Email Input Cont */}
            <div className="w-full space-y-[0.8rem]">
              <div className="input w-full">
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={inquireFormData?.email}
                  onChange={emailChangeHandler}
                  placeholder="Enter your email address"
                  autoComplete="off"
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium px-[1rem] py-[1.1rem] text-[1.6rem] leading-[1.6rem] rounded-md focus:border-theme-blue placeholder:text-neutral-500 ${
                    error && error[0] === "email"
                      ? "border-red-700"
                      : "border-neutral-300"
                  }`}
                />
              </div>

              {error && error[0] === "email" && <FieldError error={error[1]} />}
            </div>

            {/* Mobile Number Input Cont */}
            <div className="w-full space-y-[0.8rem]">
              <div className="input w-full relative z-[4]">
                <input
                  type="number"
                  name="contactNumber"
                  id="contactNumber"
                  value={callingNumber}
                  onChange={(e) =>
                    contactNumChangeHandler("number", e.target.value)
                  }
                  maxLength="10"
                  placeholder="Enter 10 digit number"
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium pl-[13rem] pr-[2rem] py-[0.9rem] text-[1.6rem] tracking-wide rounded-md focus:border-theme-blue numberInput placeholder:text-neutral-500 ${
                    error && error[0] === "mobileNumber"
                      ? "border-red-700"
                      : "border-neutral-300"
                  }`}
                />

                {/* Input Flag and Calling Code Display Area */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute top-[0.2rem] left-[0.2rem] bottom-[0.2rem] px-[1.4rem] flex items-center gap-[1rem] text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700 cursor-pointer select-none"
                >
                  <span>
                    <Flag code={ISOCode} className="w-[2.5rem]" />
                  </span>
                  <IoMdArrowDropdown
                    size="1.8rem"
                    className={`${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                  <span>{callingCode}</span>
                </div>

                {/* Country Dial Code Dropdown */}
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="dropdownCountry w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 bottom-[100%] left-0"
                  >
                    <ul className="w-full max-h-[25rem] overflow-auto scrollbar-slim-y ">
                      <h6 className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 px-[1.5rem] py-[1rem]">
                        Select Country
                      </h6>
                      {Object.entries(countries)
                        .sort((a, b) => a[1].name.localeCompare(b[1].name))
                        .map(([countryCode, countryData], index) => (
                          <li
                            key={index}
                            onClick={() => {
                              contactNumChangeHandler("code", {
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
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              {error && error[0] === "mobileNumber" && (
                <FieldError error={error[1]} />
              )}
            </div>

            {/* Message Textarea Cont */}
            <div className="w-full space-y-[0.8rem]">
              <div className="input w-full">
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  defaultValue={`I am interested in ${size} ${type} for ${
                    purpose === "Sell" ? "Sale" : purpose
                  } In ${city}. Please contact me at your earliest convenience.`}
                  onChange={messageChangeHandler}
                  placeholder="Tell us, what you would like to know more about regarding this property."
                  className={`w-full min-h-[14rem] max-h-[14rem] border-[0.2rem] text-neutral-800 font-medium p-[1rem] text-[1.6rem] leading-[2.2rem] rounded-md focus:border-theme-blue placeholder:text-neutral-500 ${
                    error && error[0] === "message"
                      ? "border-red-700"
                      : "border-neutral-300"
                  }`}
                />
              </div>

              {error && error[0] === "message" && (
                <FieldError error={error[1]} />
              )}
            </div>

            {/* Send Info Request Button */}
            <button
              onClick={(e) => inquireFormSubmissionHandler(e)}
              disabled={
                clientName && clientEmail && callingNumber && message
                  ? false
                  : true
              }
              className={`w-full flex items-center justify-center gap-[1rem] px-[3rem] py-[1.2rem] mt-[1rem] text-[1.8rem] leading-[1.8rem] tracking-wider font-bold rounded-full transition-all ${
                clientName && clientEmail && callingNumber && message
                  ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                  : "text-neutral-700 bg-neutral-400 opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <Loader value="Sending" color="white" size="0.55rem" />
              ) : (
                "SEND INFO REQUEST"
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

const FieldError = ({ error }) => {
  return (
    <p className="fieldErrorMsg text-[1.4rem] leading-[1.8rem] font-medium text-red-700">
      {error}
    </p>
  );
};

export default InquireModal;
