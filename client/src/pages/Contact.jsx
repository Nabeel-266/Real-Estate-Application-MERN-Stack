import React, { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import Flag from "react-world-flags";

// Import React Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMail } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { VscCallIncoming } from "react-icons/vsc";

// Import Component
import Footer from "../components/Footer";

const contactOptions = [
  {
    id: "1",
    Icon: FiMail,
    title: "Email Support",
    text: "Our team can respond in real time",
    to: "nabestate@gmail.com",
  },
  {
    id: "2",
    Icon: HiOutlineBuildingOffice2,
    title: "Visit Our Office",
    text: "Visit our location in real life",
    to: "Karachi, Islamabad & Lahore",
  },
  {
    id: "3",
    Icon: VscCallIncoming,
    title: "Call Us Directly",
    text: "Available during on working hours",
    to: "(+1) 123-456-7890",
  },
];

const Contact = () => {
  const dropdownRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [contactNumInfo, setContactNumInfo] = useState({
    ISOCode: "PK",
    callingCode: "+92",
    callingNumber: "",
  });
  const { name, email, message } = contactFormData;
  const { ISOCode, callingCode, callingNumber } = contactNumInfo;

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

    setContactFormData({
      ...contactFormData,
      name: fullName,
    });

    error && error[0] === "name" && setError(null);
  };

  // Email Change Handler
  const emailChangeHandler = (e) => {
    setContactFormData({
      ...contactFormData,
      email: e.target.value.trim(),
    });

    error && error[0] === "email" && setError(null);
  };

  // Contact Number Change Handler
  const contactNumChangeHandler = (key, value) => {
    if (key === "code") {
      if (callingNumber) {
        setContactFormData({
          ...contactFormData,
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
        setContactFormData({
          ...contactFormData,
          mobileNumber: "",
        });
      } else if (value.length <= 10) {
        setContactNumInfo({
          ...contactNumInfo,
          callingNumber: value,
        });
        setContactFormData({
          ...contactFormData,
          mobileNumber: `${callingCode} ${value}`,
        });
      }
    }

    error && error[0] === "mobileNumber" && setError(null);
  };

  // Message Change Handler
  const messageChangeHandler = (e) => {
    setContactFormData({
      ...contactFormData,
      message: e.target.value.trim(),
    });

    error && error[0] === "message" && setError(null);
  };

  // Inquire Form Data Validation Handler
  const contactFormDataValidationHandler = (formData) => {
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

  // Contact Form Submission Handler
  const contactFormSubmissionHandler = (e) => {
    e.preventDefault();

    try {
      const isContactDataOK = contactFormDataValidationHandler(contactFormData);

      if (isContactDataOK) {
        console.log("OK");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contactCont w-full min-h-dvh pt-[6rem] flex flex-col gap-[2rem] tabletRg:gap-[4rem]">
      {/* Contact Form */}
      <div className="w-full min-h-[calc(100dvh-6rem)] tabletRg:h-[calc(100dvh-6rem)] flex flex-col items-center tabletRg:flex-row">
        {/* Image Side */}
        <section className="w-full tabletRg:w-[45%] laptopSm:w-[50%] h-full flex items-start pl-[0rem] p-[1.5rem]">
          <img
            src="/src/assets/contact-banner_1.jpeg"
            alt="Contact-Banner"
            className="h-full object-cover rounded-r-full shadow-lg tabletRg:shadow-2xl shadow-neutral-200"
          />
        </section>

        {/* Form Side */}
        <section className="w-full tabletRg:w-[55%] laptopSm:w-[50%] h-full px-[4%] py-[2rem] flex flex-col justify-center">
          <h2 className="text-[2.8rem] text-theme-blue font-bold">
            Let's Get In Touch
          </h2>

          <p className="text-[1.6rem] text-neutral-700 font-medium">
            Or just reach out manually to{" "}
            <span className="text-theme-blue">nabestate@gmail.com</span>
          </p>

          <form className="flex flex-col gap-[1.4rem] py-[1rem] tabletLg:pr-[8%] mt-[1rem]">
            {/* Username Input Cont */}
            <div className="w-full space-y-[0.8rem]">
              <div className="input w-full">
                <label
                  htmlFor="username"
                  className="text-[1.5rem] leading-[2rem] font-semibold text-neutral-700 pl-[1rem]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={contactFormData?.name}
                  onChange={usernameChangeHandler}
                  placeholder="Enter your full name"
                  autoComplete="off"
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium px-[1.5rem] py-[1.1rem] text-[1.6rem] leading-[1.6rem] rounded-full focus:border-theme-blue placeholder:text-neutral-500 mt-[0.5rem] ${
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
                <label
                  htmlFor="email"
                  className="text-[1.5rem] leading-[2rem] font-semibold text-neutral-700 pl-[1rem]"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={contactFormData?.email}
                  onChange={emailChangeHandler}
                  placeholder="Enter your email address"
                  autoComplete="off"
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium px-[1.5rem] py-[1.1rem] text-[1.6rem] leading-[1.6rem] rounded-full focus:border-theme-blue placeholder:text-neutral-500 mt-[0.5rem] ${
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
                <label
                  htmlFor="contactNumber"
                  className="text-[1.5rem] leading-[2rem] font-semibold text-neutral-700 pl-[1rem]"
                >
                  Mobile Number
                </label>
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
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium pl-[13.5rem] pr-[2rem] py-[0.9rem] text-[1.6rem] tracking-wide rounded-full focus:border-theme-blue numberInput placeholder:text-neutral-500 mt-[0.5rem] ${
                    error && error[0] === "mobileNumber"
                      ? "border-red-700"
                      : "border-neutral-300"
                  }`}
                />

                {/* Input Flag and Calling Code Display Area */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute left-[0.2rem] bottom-[1.38rem] px-[1.5rem] flex items-center gap-[1rem] text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-700 cursor-pointer select-none"
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
                    className="dropdownCountry w-full py-[0.5rem] shadow-lg border-[0.2rem] bg-white border-neutral-300 rounded-md absolute z-10 top-[100%] left-0"
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
                <label
                  htmlFor="message"
                  className="text-[1.5rem] leading-[2rem] font-semibold text-neutral-700 pl-[1rem]"
                >
                  Message
                </label>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  onChange={messageChangeHandler}
                  placeholder="Enter your message here..."
                  className={`w-full min-h-[10rem] max-h-[10rem] border-[0.2rem] text-neutral-800 font-medium p-[1rem] text-[1.6rem] leading-[2.2rem] rounded-3xl focus:border-theme-blue placeholder:text-neutral-500 mt-[0.5rem] ${
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
              onClick={(e) => contactFormSubmissionHandler(e)}
              disabled={
                name && email && callingNumber && message ? false : true
              }
              className={`w-full flex items-center justify-center gap-[1rem] px-[3rem] py-[1.4rem] mt-[0.5rem] text-[1.8rem] leading-[1.8rem] tracking-wider font-bold rounded-full transition-all ${
                name && email && callingNumber && message
                  ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                  : "text-neutral-700 bg-neutral-300 opacity-90 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <Loader value="Sending" color="white" size="0.55rem" />
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        </section>
      </div>

      {/* Contact Options Card */}
      <div className="mx-[4%] laptopSm:mx-[5%] laptopRg:mx-[6%] py-[2rem] flex flex-col items-center laptopSm:items-start">
        <h6 className="w-fit text-[1.5rem] text-neutral-700 font-medium px-[1rem] border-[0.2rem] border-neutral-400 rounded-full mb-[0.5rem]">
          Reach Out To Us
        </h6>

        <h2 className="text-[2.5rem] tabletSm:text-[3rem] text-theme-blue font-bold">
          We'd Love to Hear From You
        </h2>

        <p className="text-[1.6rem] text-neutral-700 font-semibold text-center hidden tabletSm:block">
          Or just reach out manually to{" "}
          <span className="text-theme-blue">nabestate@gmail.com</span>
        </p>

        <div className="w-full flex flex-wrap justify-around laptopSm:justify-between gap-[5rem] laptopSm:gap-[2rem] py-[3rem] tabletSm:py-[5rem]">
          {contactOptions.map(({ id, Icon, title, text, to }) => (
            <div
              key={id}
              className={`w-auto flex flex-col items-center gap-[0.5rem] ${
                id == 1
                  ? "laptopSm:items-start"
                  : id == 2
                  ? "laptopSm:items-center"
                  : "laptopSm:items-end"
              }`}
            >
              <div className="w-fit p-[1rem] bg-theme-blue rounded-full text-[2.4rem] text-white">
                <Icon />
              </div>

              <h5 className="text-[2rem] text-theme-blue font-bold mt-[1rem]">
                {title}
              </h5>

              <p className="text-[1.6rem] text-neutral-700 font-semibold">
                {text}
              </p>

              <p className="text-[1.6rem] text-theme-blue font-semibold mt-[1rem]">
                {to}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FieldError = ({ error }) => {
  return (
    <p className="fieldErrorMsg text-[1.4rem] leading-[1.8rem] font-medium text-red-700 ml-[1rem]">
      {error}
    </p>
  );
};

export default Contact;
