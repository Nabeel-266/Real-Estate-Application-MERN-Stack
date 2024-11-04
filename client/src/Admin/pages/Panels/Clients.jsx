import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clientsDataColumns,
  clientsDataSortBy,
} from "../../../lib/dummyDataAdmin";

// Import React Icons
import { HiUsers } from "react-icons/hi2";
import { PiStarFourFill } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

// Import Components
import SortDropdown from "../../components/Dropdowns/SortDropdown";
import ColumnsDropdown from "../../components/Dropdowns/ColumnsDropdown";
import FilterDropdown from "../../components/Dropdowns/FilterDropdown";

// Example data for cards and table
const clientsStats = [
  {
    title: "Total Clients",
    count: 120,
    icon: <HiUsers />,
  },
  {
    title: "Buyer Clients",
    count: 60,
    icon: <GiTakeMyMoney />,
  },
  {
    title: "Seller Clients",
    count: 15,
    icon: <FaHouseChimneyUser />,
  },
];

const clientCountbyCity = [
  {
    city: "Karachi",
    count: 60,
  },
  {
    city: "Lahore",
    count: 45,
  },
  {
    city: "Islamabad",
    count: 30,
  },
  {
    city: "Rawalpindi",
    count: 25,
  },
  {
    city: "Peshawar",
    count: 20,
  },
  {
    city: "Faisalabad",
    count: 40,
  },
  {
    city: "Multan",
    count: 18,
  },
  {
    city: "Sialkot",
    count: 12,
  },
  {
    city: "Quetta",
    count: 10,
  },
  {
    city: "Hyderabad",
    count: 22,
  },
  {
    city: "Dera Ghazi Khan",
    count: 6,
  },
  {
    city: "Gujranwala",
    count: 15,
  },
  {
    city: "Sukkur",
    count: 8,
  },
  {
    city: "Bahawalpur",
    count: 14,
  },
];

const Clients = () => {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(clientsDataColumns);

  // Toggle Properties Data Column Visibility
  const togglePropertiesDataColumns = (column) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  const clientDetailsNavigateHandler = (refernceKey) => {
    navigate(`/admin/client/${refernceKey}`);
  };

  return (
    <div className="w-full flex flex-col gap-[3rem] px-[2rem] pt-[2rem] pb-[4rem]">
      {/* Section Top */}
      <section className="w-full flex justify-between gap-[2rem]">
        {clientsStats.map((stat, index) => (
          <div
            key={index}
            className="w-[32%] min-w-[26rem] max-w-[33rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1.5rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Total")
                  ? "text-[6.2rem]"
                  : stat.title.includes("Buyer")
                  ? "text-[6rem]"
                  : "text-[5.4rem]"
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
        <div className="w-fit flex items-center gap-[0.4rem] text-theme-blue">
          <PiStarFourFill size="1.2rem" className="rotate-12" />
          <h2 className="text-[2.2rem] leading-[2.2rem] font-bold">
            Clients Distribution by City
          </h2>
        </div>

        {/* Content Area */}
        <div className="w-full bg-neutral-200 grid grid-cols-4 gap-[1.5rem] p-[1.5rem] rounded-xl border-neutral-300 border-[0.2rem]">
          {clientCountbyCity.map(({ city, count }) => (
            <div className="bg-white shadow-lg rounded-xl p-[1.5rem]">
              <div className="flex justify-between items-center gap-[1rem]">
                {/* City Name */}
                <div className="space-y-[0.4rem]">
                  <h2 className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue">
                    {city}
                  </h2>
                  <p className="text-[1.3rem] leading-[1.3rem] font-medium text-neutral-800">
                    Clients
                  </p>
                </div>

                {/* Client Count */}
                <div className="text-theme-blue flex flex-col">
                  <span className="text-[2.4rem] leading-[2.4rem] font-bold">
                    {count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Bottom */}
      <section className="w-full bg-white relative overflow-clip rounded-xl">
        <div className="w-full bg-neutral-100 border-neutral-300 border-[0.2rem] rounded-xl">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between px-[1.5rem] pt-[1.4rem] pb-[1rem]">
            <h2 className="text-[2.1rem] leading-[2rem] font-bold text-theme-blue">
              Clients Directory
            </h2>

            {/* Sort, Columns & Filter */}
            <div className="flex items-center gap-[1rem] ">
              <div className="relative">
                <SortDropdown dropdownData={clientsDataSortBy} />
              </div>

              <div className="relative">
                <ColumnsDropdown
                  dropdownData={clientsDataColumns}
                  selectedColumns={selectedColumns}
                  toggleDataColumns={togglePropertiesDataColumns}
                />
              </div>

              <FilterDropdown to="Clients" />
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full min-h-[43rem] overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b-[2px] border-neutral-300 text-center *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.6rem] *:py-[1rem] *:whitespace-nowrap">
                  <th className="text-left">Id Code</th>
                  <th>Client Name</th>

                  {selectedColumns.includes("Email Address") && (
                    <th>Email Address</th>
                  )}

                  {selectedColumns.includes("Contact Number") && (
                    <th>Contact Number</th>
                  )}

                  {selectedColumns.includes("Role") && <th>Role</th>}

                  {selectedColumns.includes("From City") && <th>From City</th>}

                  {selectedColumns.includes("Deals") && <th>Deals</th>}

                  {selectedColumns.includes("Commission") && (
                    <th>Commission</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr
                    key={index}
                    onClick={() => clientDetailsNavigateHandler(index)}
                    className="border-b-[1px] border-neutral-300 odd:bg-white cursor-pointer text-center *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.6rem] *:py-[1.3rem] *:whitespace-nowrap"
                  >
                    <td className="text-left">CL-12485</td>

                    <td>Syed Ali Ansari</td>

                    {selectedColumns.includes("Email Address") && (
                      <th>aliansari@gmail.com</th>
                    )}
                    {selectedColumns.includes("Contact Number") && (
                      <th>03312548965</th>
                    )}

                    {selectedColumns.includes("Role") && <th>Seller</th>}

                    {selectedColumns.includes("From City") && <th>Karachi</th>}

                    {selectedColumns.includes("Deals") && <th>1 Deal</th>}

                    {selectedColumns.includes("Commission") && (
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

export default Clients;
