import React, { useEffect, useRef, useState } from "react";
import {
  agents,
  agentsDataColumns,
  agentsDataSortBy,
} from "../../../lib/dummyDataAdmin";

// Import React Icons
import { MdSupportAgent } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";

// Import Components
import FilterDropdown from "../../../components/Admin/Dropdowns/FilterDropdown";
import SortDropdown from "../../../components/Admin/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../../components/Admin/Dropdowns/ColumnsDropdown";

const Agents = () => {
  const [agentsData, setAgentsData] = useState(agents);
  const [selectedColumns, setSelectedColumns] = useState(agentsDataColumns);

  // Toggle Agent Data Column visibility
  const toggleAgentDataColumns = (column) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  // Calculate Age by Birth Year
  function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  // Sort Agents Handler
  function sortAgentsData(sortBy, orderBy) {
    return [...agents].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "Full Name":
          comparison = a.name.localeCompare(b.name);
          break;

        case "Age":
          comparison = a.age - b.age;
          break;

        case "Joining Date":
          comparison = new Date(a.joiningDate) - new Date(b.joiningDate);
          break;

        case "Successed Deals":
          comparison = a.successedDeals - b.successedDeals;
          break;

        case "Active Deals":
          comparison = a.activeDeals - b.activeDeals;
          break;

        case "Total Earned":
          comparison = a.totalEarned - b.totalEarned;
          break;

        case "Highest Earned":
          comparison = a.highestEarned - b.highestEarned;
          break;

        case "Experience":
          comparison = a.experience - b.experience;
          break;

        default:
          break;
      }

      return orderBy === "asc" ? comparison : -comparison;
    });
  }

  // console.log(sortAgentsData("Age", "asc"));

  return (
    <div className="w-full flex flex-col gap-[2.5rem]">
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
      <section className="w-full overflow-hidden">
        <div className="w-full bg-neutral-100 rounded-xl">
          {/* Top Side */}
          <div className="w-full relative z-[99] flex items-center justify-between px-[1.5rem] py-[1.5rem]">
            <h2 className="text-[2.4rem] leading-[2.4rem] font-bold text-theme-blue">
              Agents Record
            </h2>

            {/* Display Data Options */}
            <div className="flex items-center gap-[1rem]">
              <div className="relative">
                <SortDropdown dropdownData={agentsDataSortBy} />
              </div>

              <div className="relative">
                <ColumnsDropdown
                  dropdownData={agentsDataColumns}
                  selectedColumns={selectedColumns}
                  toggleDataColumns={toggleAgentDataColumns}
                />
              </div>

              <div>
                <FilterDropdown to="Filter By" />
              </div>
            </div>
          </div>

          <div className="w-full overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-[2px] border-neutral-600 *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-neutral-800 *:px-[1.6rem] *:py-[1.2rem] *:whitespace-nowrap">
                  <th>Image</th>
                  <th>Full Name</th>
                  {selectedColumns.includes("Email Address") && (
                    <th>Email Address</th>
                  )}

                  {selectedColumns.includes("Mobile Number") && (
                    <th>Mobile Number</th>
                  )}

                  {selectedColumns.includes("CNIC Number") && (
                    <th>CNIC Number</th>
                  )}

                  {selectedColumns.includes("Age") && <th>Age</th>}

                  {selectedColumns.includes("Operating City") && (
                    <th>Operating City</th>
                  )}

                  {selectedColumns.includes("Joining Date") && (
                    <th>Joining Date</th>
                  )}

                  {selectedColumns.includes("Successed Deals") && (
                    <th>Successed Deals</th>
                  )}

                  {selectedColumns.includes("Active Deals") && (
                    <th>Active Deals</th>
                  )}

                  {selectedColumns.includes("Total Earned") && (
                    <th>Total Earned</th>
                  )}

                  {selectedColumns.includes("Highest Earned") && (
                    <th>Highest Earned</th>
                  )}

                  {selectedColumns.includes("Experience Badge") && (
                    <th>Experience Badge</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {agentsData.map((agent, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-neutral-400 *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[0.6rem] *:whitespace-nowrap odd:bg-white"
                  >
                    <td>
                      <img
                        src={agent.image}
                        alt="Agent"
                        className="size-[3.5rem] rounded-full object-cover"
                      />
                    </td>

                    <td>{agent.name}</td>

                    {selectedColumns.includes("Email Address") && (
                      <td>{agent.email}</td>
                    )}

                    {selectedColumns.includes("Mobile Number") && (
                      <td>{agent.mobileNumber}</td>
                    )}

                    {selectedColumns.includes("CNIC Number") && (
                      <td>{agent.cnicNumber}</td>
                    )}

                    {selectedColumns.includes("Age") && <td>{agent.age}</td>}

                    {selectedColumns.includes("Operating City") && (
                      <td>{agent.operatingCity}</td>
                    )}

                    {selectedColumns.includes("Joining Date") && (
                      <td>{agent.joiningDate}</td>
                    )}

                    {selectedColumns.includes("Successed Deals") && (
                      <td>
                        Sales - {agent.deals.successed.sales} | Rental -{" "}
                        {agent.deals.successed.rental}
                      </td>
                    )}

                    {selectedColumns.includes("Active Deals") && (
                      <td>
                        Sales {agent.deals.active.sales} | Rental{" "}
                        {agent.deals.active.rental}
                      </td>
                    )}

                    {selectedColumns.includes("Total Earned") && (
                      <td>PKR {agent.totalEarned.toLocaleString()}</td>
                    )}

                    {selectedColumns.includes("Highest Earned") && (
                      <td>PKR {agent.highestEarned.toLocaleString()}</td>
                    )}

                    {selectedColumns.includes("Experience Badge") && (
                      <td>
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
                    )}
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
