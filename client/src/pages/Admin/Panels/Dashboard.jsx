import { useRef, useState } from "react";

// Import Components
import LineChart from "../../../components/Admin/Charts/LineChart";
import DonutChart from "../../../components/Admin/Charts/DonutChart";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-[2rem]">
      {/* Section One */}
      <section className="w-full flex gap-[2rem]">
        {/* Total Revenue & Deals */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1.5rem_#08283525]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Total DR</h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit h-fit px-[0.2rem] py-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-white font-semibold rounded-md outline-none *:font-semibold *:bg-theme-blue *:text-white"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
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

        {/* Sales Revenue & Deals */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1.5rem_#08283525]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Sales DR</h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit h-fit px-[0.2rem] py-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-white font-semibold rounded-md outline-none *:font-semibold *:bg-theme-blue *:text-white"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
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

        {/* Rental Revenue & Deals */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1.5rem_#08283525]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Rental DR</h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit h-fit px-[0.2rem] py-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-white font-semibold rounded-md outline-none *:font-semibold *:bg-theme-blue *:text-white"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
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
          <LineChart />
        </div>

        {/* Revenue & Deals Chart by Property Category */}
        <div className="w-[47%] min-w-[30rem] h-fit flex flex-col gap-[1rem] bg-theme-blue px-[2rem] pb-[2rem] pt-[1.5rem] rounded-3xl">
          {/* Chart Top */}
          <div className="w-full space-y-[1.2rem]">
            <h2 className="text-[1.8rem] font-bold text-white">
              Property Category - DR
            </h2>

            {/* Select Month & Year */}
            <div className="flex gap-[1rem]">
              <select
                // onChange={(e) => setSelectedYear(e.target.value)}
                className="px-[0.4rem] py-[0.2rem] text-[1.3rem] text-theme-blue font-semibold rounded-md outline-none bg-white *:font-semibold *:bg-theme-blue *:text-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>

              <select
                // onChange={(e) => setSelectedRange(e.target.value)}
                className="px-[0.4rem] py-[0.2rem] text-[1.3rem] text-theme-blue font-semibold rounded-md outline-none bg-white *:font-semibold *:bg-theme-blue *:text-white"
              >
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
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
      <section className="w-full flex gap-[2rem]">
        <div className="w-[100%]">
          {/* Top Side */}
          <div className="w-full flex items-center justify-between px-[1.2rem] pt-[1.2rem] pb-[0.8rem] rounded-t-xl">
            <h2 className="text-[2rem] font-bold text-theme-blue">
              Property Types - DR Summary
            </h2>

            {/* Select Month & Year */}
            <div className="flex gap-[1rem]">
              <select
                // onChange={(e) => setSelectedYear(e.target.value)}
                className="px-[0.8rem] pt-[0.3rem] pb-[0.4rem] text-[1.5rem] text-white font-semibold rounded-md outline-none bg-theme-blue *:font-semibold *:bg-theme-blue *:text-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>

              <select
                // onChange={(e) => setSelectedRange(e.target.value)}
                className="px-[0.8rem] pt-[0.3rem] pb-[0.4rem] text-[1.5rem] text-white font-semibold rounded-md outline-none bg-theme-blue *:font-semibold *:bg-theme-blue *:text-white"
              >
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="w-full table-auto text-left">
            <thead>
              <tr className="*:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-neutral-700 *:px-[1.2rem] *:py-[1.5rem] border-b-[2px] border-neutral-500">
                <th className="rounded-bl-2xl">Property Type</th>
                <th>Sales | Rental Deals</th>
                <th>Sales Rvn</th>
                <th>Rental Rvn</th>
                <th className="rounded-br-2xl">Total Rvn</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                <tr
                  key={index}
                  className="border-y-[1px] border-neutral-400 *:text-[1.35rem] *:leading-[1.35rem] *:font-semibold *:text-neutral-600 *:px-[1.2rem] *:py-[1.6rem]"
                >
                  <td className="rounded-l-xl">Agricultural Land</td>
                  <td>10 Deals | 20 Deals</td>
                  <td>PKR 1200000</td>
                  <td>PKR 200000</td>
                  <td className="rounded-r-xl">PKR 1400000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
