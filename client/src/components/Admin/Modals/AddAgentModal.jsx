import React, { useState } from "react";

// Import React Icons
import { FaXmark } from "react-icons/fa6";
import { RiRefreshLine } from "react-icons/ri";
import TypeInput from "../Inputs/TypeInput";

const AddAgentModal = ({ setIsOpenModal }) => {
  const [agentData, setAgentData] = useState({});

  console.log(agentData);

  // Function to auto-generate a 5-digit Agent ID
  const generateAgentId = (e) => {
    e.preventDefault();

    // Generates a random 5-digit number
    const randomId = Math.floor(10000 + Math.random() * 90000);
    setAgentData({ ...agentData, idCode: `${randomId}` });
  };

  const agentDataChangeHandler = (key, value) => {
    console.log(value);

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

  return (
    <div className="flex items-center justify-center fixed z-[990] top-0 left-0 right-0 bottom-0 backdrop-blur-[4px] bg-[#404040b0] overflow-hidden">
      <div className="w-[90%] tabletSm:w-[80%] tabletLg:w-[75rem] min-h-[20rem] relative z-20 bg-white rounded-md px-[1.5rem] shadow-2xl">
        {/* Add Agent Modal Header */}
        <header className="w-full px-[1rem] pt-[2.2rem] pb-[1rem] border-b-[0.2rem] border-neutral-200 text-theme-blue flex items-center justify-between">
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
        <section className="flex flex-col gap-[1rem] px-[1rem] py-[2.2rem]">
          <form>
            <fieldset className="grid grid-cols-2 gap-[2rem]">
              {/* For Agent Name */}
              <TypeInput
                inputFor={["name", "agentName"]}
                inputType="text"
                labelText="Full Name"
                autoComplete="off"
                placeholder="Enter Full Name"
                labelStyle="formInputLabels"
                inputStyle="formInputFields"
                spaceBetween="space-y-[0.6rem]"
                state={agentData}
                setState={agentDataChangeHandler}
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
            </fieldset>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddAgentModal;
