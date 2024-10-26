import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  agents,
  agentsDataColumns,
  agentsDataSortBy,
} from "../../../lib/dummyDataAdmin";

// Import React Icons
import { FaUsers } from "react-icons/fa";
import { FaUserCheck, FaUserTie } from "react-icons/fa6";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

// Import Components
import FilterDropdown from "../../../components/Admin/Dropdowns/FilterDropdown";
import SortDropdown from "../../../components/Admin/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../../components/Admin/Dropdowns/ColumnsDropdown";

// Example data for cards and table
const agentStats = [
  {
    title: "Total Agents",
    count: 120,
    icon: <FaUsers />,
  },
  {
    title: "Active Agents",
    count: 60,
    icon: <FaUserCheck />,
  },
  {
    title: "Expert Agents",
    count: 15,
    icon: <FaUserTie />,
  },
];

const Agents = () => {
  const navigate = useNavigate();
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

  const agentDetailsNavigateHandler = (refernceKey) => {
    navigate(`/admin/agent/${refernceKey}`);
  };

  // console.log(sortAgentsData("Age", "asc"));

  return (
    <div className="w-full flex flex-col gap-[2.5rem] p-[2rem]">
      {/* Section Top */}
      <section className="w-full flex justify-between gap-[2rem]">
        {agentStats.map((stat, index) => (
          <div
            key={index}
            className="w-[32%] min-w-[26rem] max-w-[33rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1.5rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Total")
                  ? "text-[7rem] mb-[0.2rem]"
                  : stat.title.includes("Active")
                  ? "text-[6rem]"
                  : "text-[4.8rem]"
              }`}
            >
              {stat.icon}
            </div>

            <div className="relative z-10 h-fit flex flex-col items-start gap-[1rem] text-white px-[1.5rem] pt-[1.2rem] pb-[1.2rem]">
              <h2 className="text-[1.6rem] leading-[1.6rem] font-bold whitespace-nowrap">
                {stat.title}
              </h2>

              <p className="flex items-center gap-[1rem] text-[3rem] leading-[2.8rem] font-bold">
                <TbArrowBigRightLinesFilled size="2.2rem" />
                <span className="text-theme-yellow ">{stat.count}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Section Bottom */}
      <section className="w-full bg-white relative overflow-x-clip rounded-xl">
        <div className="w-full bg-neutral-100 border-neutral-300 border-[0.2rem] rounded-xl">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between px-[1.5rem] pt-[1.4rem] pb-[1rem]">
            <h2 className="text-[2.1rem] leading-[2rem] font-bold text-theme-blue">
              Agents Directory
            </h2>

            {/* Sort, Columns & Filter */}
            <div className="flex items-center gap-[1rem] ">
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

              <FilterDropdown to="Agents" />
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full min-h-[43rem] overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-[2px] border-neutral-300 *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-neutral-800 *:px-[1.6rem] *:py-[1.2rem] *:whitespace-nowrap">
                  <th>Image</th>
                  <th>Id Code</th>
                  <th>Agent Name</th>
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
                    onClick={() => agentDetailsNavigateHandler(agent.name)}
                    className="border-b-[1px] border-neutral-400 odd:bg-white cursor-pointer *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[0.6rem] *:whitespace-nowrap"
                  >
                    <td>
                      <img
                        src={agent.image}
                        alt="Agent"
                        className="size-[3.5rem] rounded-full object-cover"
                      />
                    </td>

                    <td>AG-12754</td>

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
