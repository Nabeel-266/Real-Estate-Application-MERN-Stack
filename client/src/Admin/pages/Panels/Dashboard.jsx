import { useEffect, useState } from "react";
import {
  periodDropdownOptions,
  DR_SummaryByPropertyTypes,
  DR_SummaryByPropertyCities,
} from "../../../lib/dummyDataAdmin";

// Import React Icon
import { IoMdArrowDropdown } from "react-icons/io";

// Import Components
import DashboardLineChart from "../../components/Charts/DashboardLineChart";
import DashboardDonutChart from "../../components/Charts/DashboardDonutChart";
import PeriodSelection from "../../components/Selections/PeriodSelection";

const Dashboard = () => {
  const [summarizedBy, setSummarizedBy] = useState("By Property Types");
  const [summarizedData, setSummarizedData] = useState(
    DR_SummaryByPropertyTypes
  );
  const [selectedPeriodOfData, setSelectedPeriodOfData] = useState({
    totalDR: { year: "2024" },
    salesDR: { year: "2024" },
    rentalDR: { year: "2024" },
    propertyCategoryDR: { year: "2024", month: "Jan" },
    summaryDR: { year: "2024", month: "Jan" },
  });

  // Handle option selection
  const handleSelect = (dataTitle, to, value) => {
    if (
      dataTitle === "totalDR" ||
      dataTitle === "salesDR" ||
      dataTitle === "rentalDR"
    ) {
      setSelectedPeriodOfData((prevValues) => ({
        ...prevValues,
        [dataTitle]: { [to]: value },
      }));
    } else {
      setSelectedPeriodOfData((prevValues) => ({
        ...prevValues,
        [dataTitle]: { ...prevValues[dataTitle], [to]: value },
      }));
    }
  };

  useEffect(() => {
    if (summarizedBy.includes("Types")) {
      setSummarizedData(DR_SummaryByPropertyTypes);
    } else {
      setSummarizedData(DR_SummaryByPropertyCities);
    }
  }, [summarizedBy]);

  return (
    <div className="w-full flex flex-col gap-[2rem] p-[2rem]">
      {/* Section Top */}
      <section className="w-full flex gap-[2rem]">
        {/* Total Deals & Revenue  */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0.4rem_0.4rem_0.8rem_#08283590]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Total DR</h2>

            {/* Select Year Dropdown */}
            <PeriodSelection
              width="8.5rem"
              dataTitle={"totalDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedPeriod={selectedPeriodOfData.totalDR.year}
              onSelect={handleSelect}
            />
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-white 
          *:pt-[1rem] *:pb-[0.7rem] *:px-[3%] *:rounded-md"
          >
            {/* Total Revenue */}
            <div className="w-[70%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold flex items-center gap-[0.5rem]">
                <span>Revenue</span>
                <span className="text-[1.4rem]">(PKR)</span>
              </h4>
              <p className="text-[2.2rem] leading-[2rem] font-bold text-theme-blue">
                1.25 Crore
              </p>
            </div>

            {/* Total Deals */}
            <div className="w-[30%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                1204
              </p>
            </div>
          </div>
        </div>

        {/* Sales Deals & Revenue */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0.4rem_0.4rem_0.8rem_#08283590]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Sales DR</h2>

            {/* Select Year Dropdown */}
            <PeriodSelection
              width="8.5rem"
              dataTitle={"salesDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedPeriod={selectedPeriodOfData.salesDR.year}
              onSelect={handleSelect}
            />
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-white 
          *:pt-[1rem] *:pb-[0.7rem] *:px-[3%] *:rounded-md"
          >
            {/* Total Revenue */}
            <div className="w-[70%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold flex items-center gap-[0.5rem]">
                <span>Revenue</span>
                <span className="text-[1.4rem]">(PKR)</span>
              </h4>
              <p className="text-[2.2rem] leading-[2rem] font-bold text-theme-blue">
                1.25 Crore
              </p>
            </div>

            {/* Total Deals */}
            <div className="w-[30%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                1204
              </p>
            </div>
          </div>
        </div>

        {/* Rental Deals & Revenue */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0.4rem_0.4rem_0.8rem_#08283590]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Rental DR</h2>

            {/* Select Year Dropdown */}
            <PeriodSelection
              width="8.5rem"
              dataTitle={"rentalDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedPeriod={selectedPeriodOfData.rentalDR.year}
              onSelect={handleSelect}
            />
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-white 
          *:pt-[1rem] *:pb-[0.7rem] *:px-[3%] *:rounded-md"
          >
            {/* Total Revenue */}
            <div className="w-[70%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold flex items-center gap-[0.5rem]">
                <span>Revenue</span>
                <span className="text-[1.4rem]">(PKR)</span>
              </h4>
              <p className="text-[2.2rem] leading-[2rem] font-bold text-theme-blue">
                1.25 Crore
              </p>
            </div>

            {/* Total Deals */}
            <div className="w-[30%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                1204
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Middle */}
      <section className="w-full flex gap-[2rem]">
        {/* Deals & Revenue Chart */}
        <div className="w-[54%] min-w-[40rem] h-fit bg-theme-blue px-[1.8rem] py-[1.5rem] rounded-3xl flex flex-col gap-[1rem]">
          {/* Chart Top */}
          <div className="flex items-start justify-between">
            <h2 className="text-[1.9rem] leading-[2.4rem] font-bold text-white">
              Deals & Revenue
            </h2>

            <p className="text-[1.4rem] leading-[2rem] text-neutral-100 font-medium px-[1rem] border-[0.2rem] border-neutral-200 rounded-full select-none">
              Last 6 months
            </p>
          </div>

          <DashboardLineChart />
        </div>

        {/* Deals & Revenue Chart by Property Category */}
        <div className="w-[46%] min-w-[30rem] flex flex-col gap-[1.2rem] bg-theme-blue px-[1.8rem] py-[1.7rem] rounded-3xl">
          {/* Chart Top */}
          <div className="w-full space-y-[1.4rem]">
            <h2 className="text-[1.8rem] leading-[1.8rem] font-bold text-white">
              DR by Property Categories
            </h2>

            {/* Select Month & Year */}
            <div className="flex gap-[1rem]">
              {/* Select Year Dropdown */}
              <PeriodSelection
                width="8.5rem"
                drpdBgColor={"#fffffff0"}
                dataTitle={"propertyCategoryDR"}
                to={"year"}
                options={periodDropdownOptions.year}
                selectedPeriod={selectedPeriodOfData.propertyCategoryDR.year}
                onSelect={handleSelect}
              />

              {/* Select Month Dropdown */}
              <PeriodSelection
                width="8.5rem"
                drpdBgColor={"#fffffff0"}
                dataTitle={"propertyCategoryDR"}
                to={"month"}
                options={periodDropdownOptions.month}
                selectedPeriod={selectedPeriodOfData.propertyCategoryDR.month}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Custom Legend  */}
          <div className="w-full flex flex-wrap gap-[1.5rem] mt-[1rem]">
            {["Residential", "Plot", "Commercial"].map((label, index) => (
              <div
                key={index}
                className={`text-[1.55rem] leading-[1.5rem] font-semibold text-neutral-100 flex items-center gap-[0.4rem] select-none`}
              >
                <span
                  className={`size-[1.2rem] rounded-full mb-[0.1rem]  ${
                    index === 0
                      ? "bg-cyan-300"
                      : index === 1
                      ? "bg-cyan-700"
                      : "bg-cyan-500"
                  }`}
                ></span>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center gap-[2rem] mt-[1rem]">
            <DashboardDonutChart
              data={{
                label: "Deals",
                data: [10, 5, 8],
                backgroundColor: ["#67e8f9f0", "#0e7490f0", "#06b6d4f0"],
                hoverBackgroundColor: ["#67e8f9f0", "#0e7490f0", "#06b6d4f0"],
                borderWidth: 4,
                borderColor: "transparent",
                hoverBorderColor: ["#67e8f9", "#0e7490", "#06b6d4"],
              }}
            />

            <DashboardDonutChart
              data={{
                label: "Revenue",
                data: [1000000, 5000000, 2000000],
                backgroundColor: ["#67e8f9f0", "#0e7490f0", "#06b6d4f0"],
                hoverBackgroundColor: ["#67e8f9f0", "#0e7490f0", "#06b6d4f0"],
                borderWidth: 4,
                borderColor: "transparent",
                hoverBorderColor: ["#67e8f9", "#0e7490", "#06b6d4"],
              }}
            />
          </div>
        </div>
      </section>

      {/* Section Bottom */}
      <section className="w-full bg-white relative overflow-x-clip rounded-xl">
        <div className="w-full bg-neutral-100 border-neutral-300 border-[0.2rem] rounded-xl">
          {/* Top Header */}
          <div className="w-full flex items-center justify-between px-[1.2rem] pt-[1.2rem] pb-[1.4rem] rounded-t-xl">
            <h2 className="text-[2rem] font-bold text-theme-blue">
              Deals & Revenue Summary
            </h2>

            {/* Select Month & Year */}
            <div className="flex gap-[1rem]">
              {/* Select Year Dropdown */}
              <PeriodSelection
                width="8.5rem"
                inputColor={"#022835"}
                dataTitle={"summaryDR"}
                to={"year"}
                options={periodDropdownOptions.year}
                selectedPeriod={selectedPeriodOfData.summaryDR.year}
                onSelect={handleSelect}
              />

              {/* Select Month Dropdown */}
              <PeriodSelection
                width="8.5rem"
                inputColor={"#022835"}
                dataTitle={"summaryDR"}
                to={"month"}
                options={periodDropdownOptions.month}
                selectedPeriod={selectedPeriodOfData.summaryDR.month}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-auto scroll-smooth scrollbar-slim-x">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-[2px] border-neutral-500 *:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.2rem] *:py-[1rem] *:whitespace-nowrap">
                  <th className="relative group">
                    <p className="flex gap-[0.6rem] cursor-default">
                      <span>{summarizedBy}</span>
                      <IoMdArrowDropdown />
                    </p>

                    <div className="w-full bg-theme-blue text-white absolute top-[100%] left-0 rounded-lg shadow-lg shadow-neutral-200 py-[0.4rem] border-[1px] border-neutral-500 hidden group-hover:block">
                      <ul className="text-[1.4rem] leading-[1.4rem] font-semibold *:px-[1.2rem] *:py-[0.8rem] *:transition-all *:cursor-pointer">
                        {["By Property Types", "By Property Cities"].map(
                          (by, index) => (
                            <li
                              key={index}
                              onClick={() => setSummarizedBy(by)}
                              className="whitespace-nowrap hover:bg-white hover:text-theme-blue"
                            >
                              {by}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </th>
                  <th>Sales | Rental Deals</th>
                  <th>Sales Rvn</th>
                  <th>Rental Rvn</th>
                  <th>Total Rvn</th>
                </tr>
              </thead>

              <tbody>
                {summarizedData.map(({ summaryBy, deals, revenue }, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-neutral-400 odd:bg-white *:leading-[1.5rem] *:font-semibold *: *:px-[1.2rem] *:py-[1.3rem] *:whitespace-nowrap"
                  >
                    <td className="text-[1.5rem] text-theme-blue">
                      {summaryBy}
                    </td>
                    <td className="text-[1.4rem] text-neutral-700">
                      {deals.sales} Deals | {deals.rental} Deals
                    </td>
                    <td className="text-[1.4rem] text-neutral-700">
                      PKR {revenue.sales.toLocaleString()}
                    </td>
                    <td className="text-[1.4rem] text-neutral-700">
                      PKR {revenue.rental.toLocaleString()}
                    </td>
                    <td className="text-[1.4rem] text-neutral-700">
                      PKR {(revenue.sales + revenue.rental).toLocaleString()}
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

export default Dashboard;
