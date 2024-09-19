import React, { useState } from "react";

// Import React Icons
import { MdSupportAgent } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";

// Import Components
import ButtonDropdown from "../../../components/Admin/ButtonDropdown";
import { agents } from "../../../lib/dummyDataAdmin";

const Agents = () => {
  function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  return (
    <div className="w-full flex flex-col gap-[3rem]">
      {/* Section Top */}
      <section className="w-full flex gap-[2rem]">
        {/* Total Agents */}
        <div className="w-fit h-fit flex items-center gap-[3rem] bg-theme-blue px-[1.5rem] py-[1.2rem] rounded-xl shadow-[0.4rem_0.4rem_1rem_#08283580] *:text-white">
          <div className="space-y-[1rem] select-none">
            <h2 className="text-[1.7rem] leading-[2rem] font-bold whitespace-nowrap">
              Total Agents
            </h2>

            <p className="text-[3rem] leading-[3.2rem] ml-[0.5rem] font-bold text-theme-yellow">
              125
            </p>
          </div>

          <div className="flex items-center justify-center">
            <MdSupportAgent size="5rem" />
          </div>
        </div>

        {/* Active Agents */}
        <div className="w-fit h-fit flex items-center gap-[3rem] bg-theme-blue px-[1.5rem] py-[1.2rem] rounded-xl shadow-[0.4rem_0.4rem_1rem_#08283580] *:text-white">
          <div className="space-y-[1rem] select-none">
            <h2 className="text-[1.7rem] leading-[2rem] font-bold whitespace-nowrap">
              Active Agents
            </h2>

            <p className="text-[3rem] leading-[3.2rem] ml-[0.5rem] font-bold text-theme-yellow">
              75
            </p>
          </div>

          <div className="flex items-center justify-center">
            <FaUserTie size="3.8rem" />
          </div>
        </div>

        {/* Senior Agents */}
        <div className="w-fit h-fit flex items-center gap-[3rem] bg-theme-blue px-[1.5rem] py-[1.2rem] rounded-xl shadow-[0.4rem_0.4rem_1rem_#08283580] *:text-white">
          <div className="space-y-[1rem] select-none">
            <h2 className="text-[1.7rem] leading-[2rem] font-bold whitespace-nowrap">
              Senior Agents
            </h2>

            <p className="text-[3rem] leading-[3.2rem] ml-[0.5rem] font-bold text-theme-yellow">
              25
            </p>
          </div>

          <div className="flex items-center justify-center">
            <FaUserShield size="4.4rem" />
          </div>
        </div>
      </section>

      {/* Section Bottom */}
      <section className="w-full">
        <div className="w-full bg-white px-[0.5rem] rounded-xl">
          {/* Top Side */}
          <div className="w-full relative flex items-center justify-between py-[1rem] rounded-t-xl">
            <h2 className="text-[2.2rem] font-bold text-theme-blue">
              Agents Record
            </h2>

            {/* Display Data Options */}
            <div className="flex items-center gap-[1rem]">
              <div className="relative">
                <ButtonDropdown to="Sort By" />
              </div>
              <div className="">
                <ButtonDropdown to="Filter By" />
              </div>
              <div className="relative">
                <ButtonDropdown to="Columns" />
              </div>
            </div>
          </div>

          <div className="w-full overflow-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-[2px] border-neutral-600 *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-neutral-800 *:px-[1.5rem] *:py-[1.2rem] *:whitespace-nowrap">
                  <th>Image</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                  <th>Operating City</th>
                  <th>Joining Date</th>
                  <th>Successed Deals</th>
                  <th>Active Deals</th>
                  <th>Commission Earned</th>
                  <th>Experience Badge</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-neutral-400 *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.5rem] *:py-[1rem] *:whitespace-nowrap"
                  >
                    <td className="flex justify-center">
                      <img
                        src="/src/assets/user.png"
                        alt="Agent"
                        className="size-[2.6rem] rounded-full bg-theme-blue"
                      />
                    </td>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.mobileNumber}</td>
                    <td>{calculateAge(agent.dateOfBirth.split(" ")[2])}</td>
                    <td>{agent.operatingCity}</td>
                    <td>{agent.joiningDate}</td>
                    <td>
                      Sales - {agent.deals.successed.sales} | Rental -{" "}
                      {agent.deals.successed.rental}
                    </td>
                    <td>
                      Sales {agent.deals.active.sales} | Rental{" "}
                      {agent.deals.active.rental}
                    </td>
                    <td>PKR {agent.comissionEarned.toLocaleString()}</td>
                    <td className="text-center">
                      <span
                        className={`px-[1.5rem] py-[0.3rem] rounded-full ${
                          agent.badge === "Junior"
                            ? "bg-blue-300"
                            : agent.badge === "Mid-Level"
                            ? "bg-emerald-300"
                            : agent.badge === "Senior"
                            ? "bg-orange-300"
                            : agent.badge === "Expert" && "bg-purple-300"
                        }`}
                      >
                        {agent.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agents;
