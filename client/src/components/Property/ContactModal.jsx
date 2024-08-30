import { useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import Flag from "react-world-flags";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const ContactModal = ({ isModalOpen }) => {
  const dropdownRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contactNumInfo, setContactNumInfo] = useState({
    ISOCode: "PK",
    callingCode: "+92",
    callingNumber: "",
  });
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

  // Contact Number Change Handler
  const contactNumChangeHandler = (key, value) => {
    if (key === "code") {
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
      } else if (value.length <= 10) {
        setContactNumInfo({
          ...contactNumInfo,
          callingNumber: value,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[4px] bg-[#404040b0] overflow-hidden">
      <div className="w-[90%] tabletSm:w-[50rem] tabletRg:w-[55rem] min-h-[20%] max-h-[80%] relative z-20 bg-white rounded-md px-[1.2rem] shadow-2xl">
        {/* Contact Me Modal Header */}
        <header className="w-full px-[1rem] pt-[2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Get in Touch
          </h2>
          <button
            onClick={() => isModalOpen(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        <section className="flex flex-col gap-[1rem] px-[1rem] py-[2rem]">
          <h6 className="text-[1.8rem] leading-[1.8rem] text-neutral-800 font-semibold">
            Interested in this property?
          </h6>

          <p className="text-[1.6rem] text-neutral-700 font-medium">
            Please provide your phone number, and click{" "}
            <strong>Send Contact Request</strong> button. Our agent will reach
            out to you shortly to discuss this property and answer any questions
            you may have.
          </p>

          <form className="flex flex-col gap-[1rem] py-[1rem]">
            <div className="w-full space-y-[0.8rem]">
              <div className="input w-full relative z-[1]">
                <input
                  type="number"
                  name="contactNumber"
                  id="contactNumber"
                  value={callingNumber}
                  onChange={(e) =>
                    contactNumChangeHandler("number", e.target.value)
                  }
                  maxLength="10"
                  placeholder="1234567890"
                  className={`w-full outline-none border-[0.2rem] text-neutral-800 font-medium pl-[13rem] pr-[2rem] py-[0.9rem] text-[1.6rem] tracking-wider rounded-md focus:border-theme-blue numberInput ${
                    error ? "border-red-700" : "border-neutral-300"
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

              {error && (
                <p className="fieldErrorMsg text-[1.4rem] leading-[1.4rem] font-medium text-red-700">
                  {error}
                </p>
              )}
            </div>

            <button
              //   onClick={sendChangeEmailLinkHandler}
              disabled={callingNumber.length === 10 ? false : true}
              className={`w-full flex items-center justify-center gap-[1rem] px-[3rem] py-[1.2rem] mt-[1.5rem] text-[1.8rem] leading-[1.8rem] tracking-wider font-bold rounded-full transition-all ${
                callingNumber.length === 10
                  ? "text-white bg-cyan-950 active:scale-[0.98] active:bg-theme-yellow cursor-pointer"
                  : "text-neutral-700 bg-neutral-400 opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <Loader value="Sending" color="white" size="0.55rem" />
              ) : (
                "SEND CONTACT REQUEST"
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactModal;
