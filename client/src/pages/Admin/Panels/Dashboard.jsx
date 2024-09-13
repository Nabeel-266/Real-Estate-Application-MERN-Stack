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
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1rem_#eee]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Total DR</h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit h-fit px-[0.2rem] py-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-neutral-100 font-semibold rounded-md outline-none *:font-semibold *:bg-neutral-100 *:text-theme-blue"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-neutral-100 
          *:pt-[1rem] *:pb-[0.7rem] *:px-[1rem] *:rounded-md"
          >
            {/* Total Revenue */}
            <div className="w-[60%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Revenue
              </h4>
              <p className="text-[1.4rem] leading-[2rem] font-bold text-theme-blue">
                PKR <span className="text-[2.2rem]">1.2 Crore</span>
              </p>
            </div>

            {/* Total Deals */}
            <div className="w-[40%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                120
              </p>
            </div>
          </div>
        </div>

        {/* Sales Revenue & Deals */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1rem_#eee]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Sales DR</h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit h-fit px-[0.2rem] py-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-neutral-100 font-semibold rounded-md outline-none *:font-semibold *:bg-neutral-100 *:text-theme-blue"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-neutral-100 
          *:pt-[1rem] *:pb-[0.7rem] *:px-[1rem] *:rounded-md"
          >
            {/* Sales Revenue */}
            <div className="w-[60%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Revenue
              </h4>
              <p className="text-[1.4rem] leading-[2rem] font-bold text-theme-blue">
                PKR <span className="text-[2.2rem]">1.2 Crore</span>
              </p>
            </div>

            {/* Sales Deals */}
            <div className="w-[40%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                120
              </p>
            </div>
          </div>
        </div>

        {/* Rental Revenue & Deals */}
        <div className="w-full h-fit bg-theme-blue rounded-xl px-[1rem] py-[1rem] space-y-[0.6rem] shadow-[0rem_0.6rem_1rem_#eee]">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-white font-bold">Rental DR</h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit h-fit px-[0.2rem] py-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-neutral-100 font-semibold rounded-md outline-none *:font-semibold *:bg-neutral-100 *:text-theme-blue"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-neutral-100 
          *:pt-[1rem] *:pb-[0.7rem] *:px-[1rem] *:rounded-md"
          >
            {/* Rental Revenue */}
            <div className="w-[60%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Revenue
              </h4>
              <p className="text-[1.4rem] leading-[2rem] font-bold text-theme-blue">
                PKR <span className="text-[2.2rem]">1.2 Crore</span>
              </p>
            </div>

            {/* Rental Deals */}
            <div className="w-[40%] space-y-[1rem]">
              <h4 className="text-[1.55rem] leading-[1.55rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                120
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Two */}
      <section className="w-full flex gap-[2rem]">
        {/* Revenue & Deals Chart */}
        <LineChart title="Deals & Revenue" />

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
                <span className="size-[1.2rem] rounded-full mb-[0.1rem] bg-slate-600"></span>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center gap-[2rem] mt-[1rem]">
            <DonutChart
              data={{
                label: "Deals",
                data: [10, 5, 8],
                backgroundColor: ["#05bb51e0", "#ff9020e0", "#ff426be0"],
                hoverBackgroundColor: ["#05bb51e0", "#ff9020e0", "#ff426be0"],
                borderWidth: 4,
                borderColor: "transparent",
                hoverBorderColor: ["#05bb51", "#ff9020", "#ff426b"],
              }}
            />

            <DonutChart
              data={{
                label: "Revenue",
                data: [1000000, 5000000, 2000000],
                backgroundColor: ["#FF9F40", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#FF9F40", "#4BC0C0", "#9966FF"],
                borderWidth: 4,
                borderColor: "transparent",
                hoverBorderColor: ["#FF9F40", "#4BC0C0", "#9966FF"],
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
