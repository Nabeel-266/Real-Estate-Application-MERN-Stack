import { useEffect, useState } from "react";
import {
  periodDropdownOptions,
  DR_SummaryByPropertyTypes,
  DR_SummaryByPropertyCities,
} from "../../../lib/dummyDataAdmin";

// Import React Icon
import { IoMdArrowDropdown } from "react-icons/io";

// Import Components
import LineChart from "../../../components/Admin/Charts/LineChart";
import DonutChart from "../../../components/Admin/Charts/DonutChart";
import InputDropdown from "../../../components/Admin/InputDropdown";

const Dashboard = () => {
  const [summarizedBy, setSummarizedBy] = useState("By Property Types");
  const [summarizedData, setSummarizedData] = useState(
    DR_SummaryByPropertyTypes
  );
  const [selectedPeriodOfData, setSelectedPeriodOfData] = useState({
    totalDR: { year: "2024" },
    salesDR: { year: "2024" },
    rentalDR: { year: "2024" },
    graphDR: { year: "2024", monthRange: "Jan - Jun" },
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
    <div className="w-full flex flex-col gap-[2rem]">
      {/* Section One */}
      <section className="w-full flex gap-[2rem]">
        {/* Total Deals & Revenue  */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0.6rem_0.6rem_1.2rem_#08283550]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Total DR</h2>

            {/* Select Year Dropdown */}
            <InputDropdown
              size={"8.5"}
              dataTitle={"totalDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedYear={selectedPeriodOfData.totalDR.year}
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
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1.2rem_#08283550]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Sales DR</h2>

            {/* Select Year Dropdown */}
            <InputDropdown
              size={"8.5"}
              dataTitle={"salesDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedYear={selectedPeriodOfData.salesDR.year}
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
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1.2rem_#08283550]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Rental DR</h2>

            {/* Select Year Dropdown */}
            <InputDropdown
              size={"8.5"}
              dataTitle={"rentalDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedYear={selectedPeriodOfData.rentalDR.year}
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

      {/* Section Two */}
      <section className="w-full flex gap-[2rem]">
        {/* Revenue & Deals Chart */}
        <div className="w-[53%] min-w-[40rem] h-fit bg-theme-blue p-[1.6rem] rounded-3xl flex flex-col gap-[1rem]">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.8rem] font-bold text-white font-montAlter">
              Deals & Revenue
            </h2>

            <div className="flex gap-[1rem] mb-[0.2rem]">
              {/* Select Year Dropdown */}
              <InputDropdown
                size={"8.5"}
                drpdBgColor={"#fffffff0"}
                dataTitle={"graphDR"}
                to={"year"}
                options={periodDropdownOptions.year}
                selectedYear={selectedPeriodOfData.graphDR.year}
                onSelect={handleSelect}
              />

              {/* Select Months-Range Dropdown */}
              <InputDropdown
                size={"12"}
                drpdBgColor={"#fffffff0"}
                dataTitle={"graphDR"}
                to={"monthRange"}
                options={periodDropdownOptions.monthRange}
                selectedYear={selectedPeriodOfData.graphDR.monthRange}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Chart */}
          <LineChart
            selectedPeriodOfData={selectedPeriodOfData.graphDR.monthRange}
          />
        </div>

        {/* Revenue & Deals Chart by Property Category */}
        <div className="w-[47%] min-w-[30rem] h-fit flex flex-col gap-[1rem] bg-theme-blue px-[2rem] pb-[1.8rem] pt-[1.5rem] rounded-3xl">
          {/* Chart Top */}
          <div className="w-full space-y-[0.8rem]">
            <h2 className="text-[1.8rem] font-bold text-white">
              Property Category - DR
            </h2>

            {/* Select Month & Year */}
            <div className="flex gap-[1rem]">
              {/* Select Year Dropdown */}
              <InputDropdown
                size={"8.5"}
                drpdBgColor={"#fffffff0"}
                dataTitle={"propertyCategoryDR"}
                to={"year"}
                options={periodDropdownOptions.year}
                selectedYear={selectedPeriodOfData.propertyCategoryDR.year}
                onSelect={handleSelect}
              />

              {/* Select Month Dropdown */}
              <InputDropdown
                size={"8.5"}
                drpdBgColor={"#fffffff0"}
                dataTitle={"propertyCategoryDR"}
                to={"month"}
                options={periodDropdownOptions.month}
                selectedYear={selectedPeriodOfData.propertyCategoryDR.month}
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
                  className={`size-[1.2rem] rounded-full mb-[0.1rem] bg-slate-600 ${
                    index === 0
                      ? "bg-[#00ef87]"
                      : index === 1
                      ? "bg-[#00b3e5]"
                      : "bg-[#ff9f40]"
                  }`}
                ></span>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center gap-[2rem] mt-[1rem]">
            <DonutChart
              data={{
                label: "Deals",
                data: [10, 5, 8],
                backgroundColor: ["#00ef87f0", "#00b3e5f0", "#ff9f40f0"],
                hoverBackgroundColor: ["#00ef87f0", "#00b3e5f0", "#ff9f40f0"],
                borderWidth: 4,
                borderColor: "transparent",
                hoverBorderColor: ["#00ef87", "#00b3e5", "#ff9f40"],
              }}
            />

            <DonutChart
              data={{
                label: "Revenue",
                data: [1000000, 5000000, 2000000],
                backgroundColor: ["#00ef87f0", "#00b3e5f0", "#ff9f40f0"],
                hoverBackgroundColor: ["#00ef87f0", "#00b3e5f0", "#ff9f40f0"],
                borderWidth: 4,
                borderColor: "transparent",
                hoverBorderColor: ["#00ef87", "#00b3e5", "#ff9f40"],
              }}
            />
          </div>
        </div>
      </section>

      {/* Section Three */}
      <section className="w-full">
        {/* Top Side */}
        <div className="w-full flex items-center justify-between px-[1.2rem] pt-[1.2rem] pb-[1rem] rounded-t-xl">
          <h2 className="text-[2rem] font-bold text-theme-blue">
            Deals & Revenue Summary
          </h2>

          {/* Select Month & Year */}
          <div className="flex gap-[1rem]">
            {/* Select Year Dropdown */}
            <InputDropdown
              size={"8.5"}
              inputColor={"#022835"}
              dataTitle={"summaryDR"}
              to={"year"}
              options={periodDropdownOptions.year}
              selectedYear={selectedPeriodOfData.summaryDR.year}
              onSelect={handleSelect}
            />

            {/* Select Month Dropdown */}
            <InputDropdown
              size={"8.5"}
              inputColor={"#022835"}
              dataTitle={"summaryDR"}
              to={"month"}
              options={periodDropdownOptions.month}
              selectedYear={selectedPeriodOfData.summaryDR.month}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <table className="w-full table-auto text-left">
          <thead>
            <tr className="*:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.2rem] *:py-[1.2rem] border-b-[2px] border-neutral-500">
              <th className="relative group">
                <div className="flex gap-[0.6rem] cursor-pointer">
                  <p>{summarizedBy}</p>
                  <IoMdArrowDropdown />
                </div>

                <div className="w-full bg-theme-blue text-white absolute top-[100%] left-0 rounded-lg shadow-lg shadow-neutral-200 py-[0.5rem] border-[2px] border-neutral-500 hidden group-hover:block">
                  <ul className="text-[1.4rem] leading-[1.4rem] font-semibold *:px-[1.2rem] *:py-[1rem] *:transition-all *:cursor-pointer">
                    {["By Property Types", "By Property Cities"].map(
                      (by, index) => (
                        <li
                          key={index}
                          onClick={() => setSummarizedBy(by)}
                          className="hover:bg-white hover:text-theme-blue"
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
                className="border-t-[1px] border-neutral-400 *:leading-[1.5rem] *:font-semibold *: *:px-[1.2rem] *:py-[1.4rem]"
              >
                <td className="text-[1.5rem] text-theme-blue">{summaryBy}</td>
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
      </section>
    </div>
  );
};

export default Dashboard;
