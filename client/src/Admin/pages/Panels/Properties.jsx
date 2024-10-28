import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  propertiesDataColumns,
  propertiesDataSortBy,
} from "../../../lib/dummyDataAdmin";

// Import React Icons
import { FaHourglassHalf } from "react-icons/fa";
import { BsBuildingFillCheck } from "react-icons/bs";
import { MdAddHomeWork } from "react-icons/md";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { PiStarFourFill } from "react-icons/pi";

// Import Components
import SortDropdown from "../../components/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../components/Dropdowns/ColumnsDropdown";
import FilterDropdown from "../../components/Dropdowns/FilterDropdown";
import PropertiesBarChart from "../../components/Charts/PropertiesBarChart";
import PropertiesDonutChart from "../../components/Charts/PropertiesDonutChart";

// Example data for cards and table
const propertyStats = [
  {
    title: "Finalized Properties",
    count: 120,
    icon: <BsBuildingFillCheck />,
  },
  {
    title: "Published Properties",
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
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(propertiesDataColumns);

  // Toggle Properties Data Column Visibility
  const togglePropertiesDataColumns = (column) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  const propertyDetailsNavigateHandler = (refernceKey) => {
    navigate(`/admin/property/${refernceKey}`);
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
                stat.title.includes("Finalized")
                  ? "text-[5.4rem]"
                  : stat.title.includes("Published")
                  ? "text-[6.4rem]"
                  : "text-[5rem]"
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
      <section className="w-full space-y-[1.8rem]">
        {/* Top Header */}
        <div className="w-full">
          <h2 className="flex items-center gap-[0.4rem] text-[2.1rem] leading-[2.1rem] font-bold text-theme-blue">
            <PiStarFourFill size="1.2rem" className="rotate-12" />
            <span>Properties Distribution by Status</span>
          </h2>
        </div>

        {/* Charts Area */}
        <div className="w-full flex gap-[3rem]">
          {/* Properties Bar Chart Content */}
          <div className="w-[58%] min-w-[50rem] flex flex-col gap-[1.2rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
            {/* Heading */}
            <h3 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue">
              Grouped by Category
            </h3>

            <PropertiesBarChart />
          </div>

          {/* Properties Donut Chart Content */}
          <div className="w-[40%] min-w-[30rem] flex flex-col gap-[1.2rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
            {/* Heading */}
            <h3 className="text-[1.8rem] leading-[1.8rem] font-bold text-theme-blue">
              Grouped by Purpose
            </h3>

            {/* Custom Legend  */}
            <div className="w-full flex flex-wrap gap-[1.2rem]">
              {["Finalized", "Published", "Pending"].map((label, index) => (
                <div
                  key={index}
                  className={`text-[1.5rem] leading-[1.5rem] font-semibold text-theme-blue flex items-center gap-[0.4rem] select-none`}
                >
                  <span
                    className={`size-[1.2rem] rounded-full ${
                      index === 0
                        ? "bg-[#082835e0]"
                        : index === 1
                        ? "bg-[#082835b0]"
                        : "bg-[#08283580]"
                    }`}
                  ></span>
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="w-full h-full flex bg-neutral-200 rounded-2xl p-[1.2rem] mt-[0.2rem] select-none">
              <div className="w-full flex flex-col-reverse items-center justify-end gap-[1rem] overflow-hidden">
                <h5 className="text-[1.7rem] leading-[1.7rem] font-semibold text-white bg-theme-blue px-[1.2rem] py-[0.4rem] rounded-full">
                  Sale
                </h5>

                <div className="w-[95%]">
                  <PropertiesDonutChart
                    data={{
                      label: "Sale",
                      data: [10, 5, 8],
                      backgroundColor: ["#082835e0", "#082835b0", "#08283580"],
                      hoverBackgroundColor: [
                        "#082835e0",
                        "#082835b0",
                        "#08283580",
                      ],
                      borderWidth: 4,
                      borderColor: "transparent",
                      hoverBorderColor: ["#223f4c", "#4c646f", "#758893"],
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col items-center justify-end gap-[1.2rem] overflow-hidden">
                <h5 className="text-[1.7rem] leading-[1.7rem] font-semibold text-white bg-theme-blue px-[1.2rem] py-[0.4rem] rounded-full">
                  Rent
                </h5>

                <div className="w-[95%]">
                  <PropertiesDonutChart
                    data={{
                      label: "Rent",
                      data: [12, 8, 10],
                      backgroundColor: ["#082835e0", "#082835b0", "#08283580"],
                      hoverBackgroundColor: [
                        "#082835e0",
                        "#082835b0",
                        "#08283580",
                      ],
                      borderWidth: 4,
                      borderColor: "transparent",
                      hoverBorderColor: ["#223f4c", "#4c646f", "#758893"],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <th className="text-left">Id Code</th>
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
                    onClick={() => propertyDetailsNavigateHandler(index)}
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
