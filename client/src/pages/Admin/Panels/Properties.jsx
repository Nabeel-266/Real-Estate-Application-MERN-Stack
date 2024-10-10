import { useState } from "react";
import {
  propertiesDataColumns,
  propertiesDataSortBy,
} from "../../../lib/dummyDataAdmin";

// Import React Icons
import { FaHourglassHalf } from "react-icons/fa";
import { BsBuildingFillCheck } from "react-icons/bs";
import { MdAddHomeWork } from "react-icons/md";
import { FaArrowRightLong, FaArrowsTurnRight } from "react-icons/fa6";
import {
  TbArrowBigRightLines,
  TbArrowBigRightLinesFilled,
} from "react-icons/tb";

// Import Components
import FilterDropdown from "../../../components/Admin/Dropdowns/FilterDropdown";
import SortDropdown from "../../../components/Admin/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../../components/Admin/Dropdowns/ColumnsDropdown";
import BarChart from "../../../components/Admin/Charts/BarChart";

// Example data for cards and table
const propertyStats = [
  {
    title: "Finalized Properties",
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
    <div className="w-full flex flex-col gap-[3rem] px-[2rem] pt-[2rem] pb-[4rem]">
      {/* Section Top */}
      <section className="w-full flex justify-between gap-[2rem]">
        {propertyStats.map((stat, index) => (
          <div
            key={index}
            className="w-[32%] min-w-[26rem] max-w-[33rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1.5rem] flex items-center justify-center text-[#ffffff30] ${
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

              <p className="flex items-center gap-[1rem] text-[3rem] leading-[2.8rem] font-bold">
                <TbArrowBigRightLinesFilled size="2.2rem" />
                <span className="text-theme-yellow ">{stat.count}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Section Middle */}
      <div className="w-[62%] min-w-[50rem] flex flex-col gap-[1rem] bg-neutral-100 p-[2rem] rounded-3xl border-neutral-300 border-[0.2rem]">
        {/* Heading */}
        <h2 className="text-[2rem] leading-[2rem] font-bold text-theme-blue">
          Property Categories Grouped by Status
        </h2>

        <BarChart />
      </div>

      {/* Section Bottom */}
      <section className="w-full min-h-[40rem] bg-white relative overflow-clip rounded-xl">
        <div className="w-full bg-neutral-100 border-neutral-300 border-[0.2rem] rounded-xl">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between px-[1.5rem] pt-[1.4rem] pb-[1rem]">
            <h2 className="text-[2.1rem] leading-[2rem] font-bold text-theme-blue">
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

              <FilterDropdown to="Properties" />
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-[2px] border-neutral-300 text-center *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.6rem] *:py-[1rem] *:whitespace-nowrap ">
                  <th className="text-left">Id</th>
                  <th className="text-left">Type</th>

                  {selectedColumns.includes("Purpose") && <th>Purpose</th>}
                  {selectedColumns.includes("Size") && <th>Size</th>}

                  {selectedColumns.includes("Demand") && <th>Demand</th>}

                  {selectedColumns.includes("Located In") && (
                    <th>Located In</th>
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-neutral-300 odd:bg-white cursor-pointer text-center *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[1.3rem] *:whitespace-nowrap"
                  >
                    <td className="text-left">PR-42156</td>

                    <td className="text-left">Appartment</td>

                    {selectedColumns.includes("Purpose") && <th>Sale</th>}
                    {selectedColumns.includes("Size") && <th>1200 Sq. Ft</th>}

                    {selectedColumns.includes("Demand") && <th>1.2 Crore</th>}

                    {selectedColumns.includes("Located In") && <th>Karachi</th>}

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
