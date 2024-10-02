import React, { useState } from "react";
import { cities } from "../../../lib/dummyData";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { RiRefreshLine } from "react-icons/ri";

// Import Components
import TypeInput from "../Inputs/TypeInput";
import DateInput from "../Inputs/DateInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";

const AddAgentModal = ({ setIsOpenModal }) => {
  const [agentData, setAgentData] = useState({});
  const citiesNames = [...cities.map((city) => city.name).sort()];

  //   console.log(agentData);

  // Function to auto-generate a 5-digit Agent ID
  const generateAgentId = (e) => {
    e.preventDefault();

    // Generates a random 5-digit number
    const randomId = Math.floor(10000 + Math.random() * 90000);
    setAgentData({ ...agentData, idCode: `${randomId}` });
  };

  // Agent Data On Change Handler
  const agentDataChangeHandler = (key, value) => {
    if (value) {
      // Only allow numbers and limit to 5 digits
      if (key === "idCode") {
        /^\d{0,5}$/.test(value) && setAgentData({ ...agentData, [key]: value });
      } else {
        setAgentData({ ...agentData, [key]: value });
      }
    } else {
      setAgentData((prvData) => {
        const newData = { ...prvData };
        delete newData[key];
        return newData;
      });
    }
  };

  // Close Modal Handler
  const closeModalHandler = () => {
    setIsOpenModal(false);
    setAgentData({});
  };

  return (
    <div className="flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[4px] bg-[#404040b0] overflow-hidden">
      <div className="w-[90%] tabletSm:w-[80%] tabletLg:w-[75rem] min-h-[20rem] relative z-20 bg-white rounded-lg shadow-2xl">
        {/* Add Agent Modal Header */}
        <header className="mx-[1.5rem] px-[1rem] pt-[2.2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
          <h2 className="text-[2.5rem] leading-[2.5rem] font-bold">
            Add New Agent
          </h2>

          <button
            onClick={() => setIsOpenModal(false)}
            className="text-[2.4rem] text-theme-blue rounded-md"
          >
            <FaXmark />
          </button>
        </header>

        {/* Add Agent Modal Body */}
        <section className="flex flex-col gap-[1rem]">
          <form>
            {/* Fields */}
            <fieldset className="max-h-[41rem] grid grid-cols-2 gap-[2rem] px-[2.5rem] py-[2rem] overflow-auto scrollbar-dropdown-dark">
              {/* For Agent Name */}
              <TypeInput
                inputFor={["name", "agentName"]}
                inputType="text"
                labelText="Full Name"
                autoComplete="off"
                placeholder="Enter Full Name"
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Agent ID */}
              <div className="space-y-[0.6rem]">
                <label htmlFor="agentIdCode" className="formInputLabels">
                  ID Code
                </label>

                <div className="flex relative rounded-md overflow-hidden">
                  <input
                    type="number"
                    name="idCode"
                    id="agentIdCode"
                    placeholder="Enter Agent ID"
                    className="formInputFields numberInput"
                    value={agentData?.idCode || ""}
                    onChange={(e) =>
                      agentDataChangeHandler(e.target.name, e.target.value)
                    }
                  />
                  <button
                    onClick={generateAgentId}
                    className="absolute top-0 right-0 bottom-0 px-[1rem] text-neutral-800 text-[2rem]"
                  >
                    <RiRefreshLine />
                  </button>
                </div>
              </div>

              {/* For Agent Email */}
              <TypeInput
                inputFor={["email", "agentEmail"]}
                inputType="email"
                labelText="Email Address"
                autoComplete="off"
                placeholder="Enter Email Address"
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Agent Mobile Number */}
              <TypeInput
                inputFor={["mobileNumber", "agentMobileNumber"]}
                inputType="number"
                labelText="Mobile Number"
                autoComplete="off"
                placeholder="Enter Mobile Number"
                labelStyle="formInputLabels"
                inputStyle="formInputFields numberInput"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Agent CNIC Number */}
              <TypeInput
                inputFor={["cnicNumber", "agentCnicNumber"]}
                inputType="number"
                labelText="CNIC Number"
                autoComplete="off"
                placeholder="Enter CNIC Number"
                labelStyle="formInputLabels"
                inputStyle="formInputFields numberInput"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Agent CNIC Number */}
              <DateInput
                inputFor={["dateOfBirth", "agentDateOfBirth"]}
                inputType="date"
                labelText="Date of Birth"
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Residential Address */}
              <TypeInput
                inputFor={["residentialAddress", "agentResidentialAddress"]}
                inputType="text"
                labelText="Residential Address"
                autoComplete="off"
                placeholder="Enter Proper Residential Address"
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="col-span-2 space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Operting City */}
              <SearchSelection
                selectFor={["operatingCity", "agentOperatingCity"]}
                labelText="Operating City"
                placeholderText="Select a City"
                noOptionMessage="No City Found."
                optionsData={citiesNames}
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Experience Tenure */}
              <SimpleSelection
                selectFor="experienceBadge"
                labelText="Experience Badge"
                placeholderText="Select a Badge"
                optionsData={["Junior", "Mid-Level", "Senior", "Expert"]}
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />

              {/* For Profile Picture */}
              <div className="flex flex-col gap-[0.6rem]">
                <h6 className="formInputLabels">Profile Picture</h6>

                <label
                  htmlFor="agentProfilePicture"
                  className="text-[1.6rem] leading-[1.6rem] font-semibold text-neutral-800 text-center px-[1.5rem] py-[0.8rem] rounded-lg border-[0.2rem] border-neutral-400 cursor-pointer whitespace-nowrap hover:bg-theme-blue hover:text-white hover:border-theme-blue transition-all"
                >
                  <span>Upload Picture</span>
                  <input
                    type="file"
                    name="profilePicture"
                    id="agentProfilePicture"
                    accept=".jpg, .png, .jpeg"
                    className="hidden"
                  />
                </label>

                <span className="text-[1.3rem] leading-[1.3rem] font-medium">
                  No File Chosen
                </span>
              </div>

              {/* For Last Education */}
              <SimpleSelection
                selectFor="lastEducation"
                labelText="Last Education"
                placeholderText="Select a Education"
                optionsData={[
                  "Matriculation",
                  "Intermediate",
                  "Under Graduate",
                  "Graduate",
                  "Post Graduate",
                ]}
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                contStyle="space-y-[0.6rem]"
                state={agentData}
                setStateHandler={agentDataChangeHandler}
              />
            </fieldset>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-[1.2rem] mx-[1.5rem] px-[0.6rem] pt-[1.2rem] pb-[1.5rem] border-t-[0.2rem] border-neutral-200">
              <button
                onClick={(e) => closeModalHandler(e)}
                className="text-[1.6rem] leading-[1.6rem] font-bold text-neutral-800 text-center px-[1.5rem] py-[0.8rem] rounded-full border-[0.2rem] border-neutral-800 whitespace-nowrap hover:bg-neutral-800 hover:text-white transition-all"
              >
                Close
              </button>

              <button
                // onClick={() => applyAgentsFilterQueryHandler()}
                className="text-[1.6rem] leading-[1.6rem] font-semibold bg-theme-blue text-white text-center px-[2rem] py-[0.8rem] rounded-full border-[0.2rem] border-theme-blue whitespace-nowrap active:scale-[0.98] transition-all"
              >
                Add Agent
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddAgentModal;
