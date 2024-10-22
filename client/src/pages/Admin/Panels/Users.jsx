import { useState } from "react";
import { usersDataColumns, usersDataSortBy } from "../../../lib/dummyDataAdmin";

// Import React Icons
import { HiMiniUserGroup, HiUserPlus } from "react-icons/hi2";
import { PiUserSwitchFill } from "react-icons/pi";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

// Import Components
import UsersLineChart from "../../../components/Admin/Charts/UsersLineChart";
import SortDropdown from "../../../components/Admin/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../../components/Admin/Dropdowns/ColumnsDropdown";
import FilterDropdown from "../../../components/Admin/Dropdowns/FilterDropdown";
import UsersDonutChart from "../../../components/Admin/Charts/UsersDonutChart";

// Example data for cards and table
const usersStats = [
  {
    title: "Total Users",
    count: 120,
    icon: <HiMiniUserGroup />,
  },
  {
    title: "Active Users",
    count: 60,
    icon: <PiUserSwitchFill />,
  },
  {
    title: "New Users",
    count: 15,
    icon: <HiUserPlus />,
  },
];

const Users = () => {
  const [selectedColumns, setSelectedColumns] = useState(usersDataColumns);

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
        {usersStats.map((stat, index) => (
          <div
            key={index}
            className="w-[32%] min-w-[26rem] max-w-[33rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1.5rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Total")
                  ? "text-[7rem] mb-[0.3rem]"
                  : stat.title.includes("Active")
                  ? "text-[6.6rem]"
                  : "text-[6rem]"
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
      <section className="w-full flex gap-[3rem]">
        {/* Users Surges & Logins Chart Cont */}
        <div className="w-[58%] min-w-[50rem] h-fit flex flex-col gap-[1rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
          {/* Chart Top */}
          <div className="flex items-center justify-between">
            <h2 className="text-[1.9rem] leading-[2.4rem] font-bold text-theme-blue">
              User Surges & Logins
            </h2>

            <p className="text-[1.4rem] leading-[2rem] text-theme-blue font-medium px-[1rem] border-[0.2rem] border-neutral-300 rounded-full select-none">
              Last 6 months
            </p>
          </div>

          <UsersLineChart />
        </div>

        {/* Users Profile Chart Cont */}
        <div className="w-[42%] min-w-[30rem] flex flex-col gap-[1rem] bg-neutral-100 p-[1.5rem] rounded-3xl border-neutral-300 border-[0.2rem]">
          {/* Chart Heading */}
          <h3 className="text-[1.9rem] leading-[2.4rem] font-bold text-theme-blue">
            Users Profile Stages
          </h3>

          {/* Chart */}
          <UsersDonutChart />
        </div>
      </section>

      {/* Section Bottom */}
      <section className="w-full min-h-[40rem] bg-white relative overflow-clip rounded-xl">
        <div className="w-full bg-neutral-100 border-neutral-300 border-[0.2rem] rounded-xl">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between px-[1.5rem] pt-[1.4rem] pb-[1rem]">
            <h2 className="text-[2.1rem] leading-[2rem] font-bold text-theme-blue">
              Users Directory
            </h2>

            {/* Sort, Columns & Filter */}
            <div className="flex items-center gap-[1rem] ">
              <div className="relative">
                <SortDropdown dropdownData={usersDataSortBy} />
              </div>

              <div className="relative">
                <ColumnsDropdown
                  dropdownData={usersDataColumns}
                  selectedColumns={selectedColumns}
                  toggleDataColumns={togglePropertiesDataColumns}
                />
              </div>

              <FilterDropdown to="Properties" />
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b-[2px] border-neutral-300 text-center *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.6rem] *:py-[1rem] *:whitespace-nowrap">
                  <th className="text-left">Id Code</th>
                  <th>User Name</th>

                  {selectedColumns.includes("Email Address") && (
                    <th>Email Address</th>
                  )}

                  {selectedColumns.includes("Mobile Number") && (
                    <th>Mobile Number</th>
                  )}

                  {selectedColumns.includes("Live In") && <th>Live In</th>}

                  {selectedColumns.includes("Join At") && <th>Join At</th>}

                  {selectedColumns.includes("Last Login At") && (
                    <th>Last Login At</th>
                  )}

                  {selectedColumns.includes("Last Updated At") && (
                    <th>Last Updated At</th>
                  )}

                  {selectedColumns.includes("Status") && <th>Status</th>}
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-neutral-300 odd:bg-white cursor-pointer text-center *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[1.3rem] *:whitespace-nowrap"
                  >
                    <td className="text-left">US-12485</td>

                    <td>Syed Ali Ansari</td>

                    {selectedColumns.includes("Email Address") && (
                      <th>aliansari@gmail.com</th>
                    )}
                    {selectedColumns.includes("Mobile Number") && (
                      <th>03312548965</th>
                    )}

                    {selectedColumns.includes("Live In") && <th>Karachi</th>}

                    {selectedColumns.includes("Join At") && (
                      <th>Sep 12 - 2023</th>
                    )}

                    {selectedColumns.includes("Last Login At") && (
                      <th>Jan 26 - 2024</th>
                    )}

                    {selectedColumns.includes("Last Updated At") && (
                      <th>Feb 12 - 2024</th>
                    )}

                    {selectedColumns.includes("Status") && (
                      <th>
                        <span
                          className={`px-[1.5rem] py-[0.3rem] rounded-full bg-green-300 `}
                        >
                          Active
                        </span>
                      </th>
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

export default Users;
