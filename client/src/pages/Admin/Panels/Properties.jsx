// Import React Icons
import { FaHourglassHalf } from "react-icons/fa";
import { BsBuildingFillCheck } from "react-icons/bs";
import { MdAddHomeWork } from "react-icons/md";
import {
  propertiesDataColumns,
  propertiesDataSortBy,
} from "../../../lib/dummyDataAdmin";

// Import Components
import FilterDropdown from "../../../components/Admin/Dropdowns/FilterDropdown";
import SortDropdown from "../../../components/Admin/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../../components/Admin/Dropdowns/ColumnsDropdown";
import { useState } from "react";

// Example data for cards and table
const propertyStats = [
  {
    title: "Dealt Properties",
    count: 120,
    icon: <BsBuildingFillCheck />,
  },
  {
    title: "Active Properties",
    count: 60,
    icon: <MdAddHomeWork />,
  },
  {
    title: "Pending Properties",
    count: 15,
    icon: <FaHourglassHalf />,
  },
];

const Properties = () => {
  const [selectedColumns, setSelectedColumns] = useState(propertiesDataColumns);

  // Toggle Properties Data Column Visibility
  const togglePropertiesDataColumns = (column) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  return (
    <div className="w-full flex flex-col gap-[2.5rem] p-[2rem]">
      {/* Section Top */}
      <section className="w-full flex gap-[2rem]">
        {propertyStats.map((stat, index) => (
          <div
            key={index}
            className="min-w-[25rem] w-[28%] max-w-[28rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Active")
                  ? "text-[6.4rem]"
                  : stat.title.includes("Pending")
                  ? "text-[5.1rem]"
                  : "text-[5.5rem]"
              }`}
            >
              {stat.icon}
            </div>

            <div className="relative z-10 h-fit flex flex-col items-start gap-[1rem] text-white px-[1.5rem] pt-[1.2rem] pb-[1.2rem]">
              <h2 className="text-[1.6rem] leading-[1.6rem] font-bold whitespace-nowrap">
                {stat.title}
              </h2>

              <p className="text-[2.8rem] leading-[2.8rem] font-bold text-theme-yellow">
                {stat.count}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Section Bottom */}
      <section className="w-full bg-neutral-100 relative overflow-x-clip rounded-xl">
        <div className="w-full border-neutral-300 border-[0.2rem] rounded-xl">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between px-[1.5rem] pt-[1.4rem] pb-[1rem]">
            <h2 className="text-[2.3rem] leading-[2.3rem] font-bold text-theme-blue">
              Properties Directory
            </h2>

            {/* Sort, Columns & Filter */}
            <div className="flex items-center gap-[1rem] ">
              <div className="relative">
                <SortDropdown dropdownData={propertiesDataSortBy} />
              </div>

              <div className="relative">
                <ColumnsDropdown
                  dropdownData={propertiesDataColumns}
                  selectedColumns={selectedColumns}
                  toggleDataColumns={togglePropertiesDataColumns}
                />
              </div>

              <FilterDropdown to="Filter By" />
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-[2px] border-neutral-600 text-center *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-neutral-800 *:px-[1.6rem] *:py-[1.2rem] *:whitespace-nowrap ">
                  <th className="text-left">Id</th>
                  <th>Type</th>

                  {selectedColumns.includes("Purpose") && <th>Purpose</th>}
                  {selectedColumns.includes("Size") && <th>Size</th>}

                  {selectedColumns.includes("Demand") && <th>Demand</th>}

                  {selectedColumns.includes("Location In") && (
                    <th>Location In</th>
                  )}

                  {selectedColumns.includes("Status") && <th>Status</th>}

                  {selectedColumns.includes("Pending On") && (
                    <th>Pending On</th>
                  )}

                  {selectedColumns.includes("Published On") && (
                    <th>Published On</th>
                  )}

                  {selectedColumns.includes("Finalized On") && (
                    <th>Finalized On</th>
                  )}

                  {selectedColumns.includes("Revenue Earned") && (
                    <th>Revenue Earned</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4, 5, 6].map((agent, index) => (
                  <tr
                    key={index}
                    onClick={() => agentDetailsNavigateHandler(agent.name)}
                    className="border-t-[1px] border-neutral-400 odd:bg-white cursor-pointer text-center *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[1.3rem] *:whitespace-nowrap"
                  >
                    <td className="text-left">42156</td>

                    <td>Appartment</td>

                    {selectedColumns.includes("Purpose") && <th>Sale</th>}
                    {selectedColumns.includes("Size") && <th>1200 Sq. Ft</th>}

                    {selectedColumns.includes("Demand") && <th>1.2 Crore</th>}

                    {selectedColumns.includes("Location In") && (
                      <th>Karachi</th>
                    )}

                    {selectedColumns.includes("Status") && (
                      <th>
                        <span
                          className={`px-[1.5rem] py-[0.3rem] rounded-full bg-blue-300 `}
                        >
                          Finalized
                        </span>
                      </th>
                    )}

                    {selectedColumns.includes("Pending On") && (
                      <th>Sep 12 - 2023</th>
                    )}

                    {selectedColumns.includes("Published On") && (
                      <th>Nov 03 - 2023</th>
                    )}

                    {selectedColumns.includes("Finalized On") && (
                      <th>Feb 25 - 2024</th>
                    )}

                    {selectedColumns.includes("Revenue Earned") && (
                      <th>PKR 240000</th>
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

export default Properties;

// --> Property Status
// Pending
// Active
// Finalized
// Rejected
