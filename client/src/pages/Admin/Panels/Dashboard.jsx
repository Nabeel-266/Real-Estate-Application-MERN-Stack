import { useRef, useState } from "react";

// Import Components
import LineChart from "../../../components/Admin/Charts/LineChart";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-[1.5rem]">
      {/* Section One */}
      <section className="w-full flex gap-[2rem]">
        {/* Total Revenue & Deals */}
        <div className="w-full h-fit bg-neutral-100 rounded-lg px-[1rem] py-[1rem] space-y-[0.5rem] shadow-[0rem_0.6rem_1rem_#ddd] border-[0.2rem] border-neutral-200">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-theme-blue font-bold">
              Total R&D
            </h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit px-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-neutral-300 font-semibold rounded-md outline-none *:font-semibold *:bg-white *:text-theme-blue"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-neutral-300 
          *:pt-[1.2rem] *:pb-[1rem] *:px-[1.2rem] *:rounded-md"
          >
            {/* Total Revenue */}
            <div className="w-[60%] space-y-[1.2rem]">
              <h4 className="text-[1.6rem] leading-[1.6rem] font-semibold">
                Revenue
              </h4>
              <p className="text-[1.4rem] leading-[2rem] font-bold">
                PKR{" "}
                <span className="text-[2.2rem] text-theme-blue">1.2 Crore</span>
              </p>
            </div>

            {/* Total Deals */}
            <div className="w-[40%] space-y-[1.2rem]">
              <h4 className="text-[1.6rem] leading-[1.6rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                120
              </p>
            </div>
          </div>
        </div>

        {/* Sales Revenue & Deals */}
        <div className="w-full h-fit bg-neutral-100 rounded-lg px-[1rem] py-[1rem] space-y-[0.5rem] shadow-[0rem_0.6rem_1rem_#ddd] border-[0.2rem] border-neutral-200">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-theme-blue font-bold">
              Sales R&D
            </h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit px-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-neutral-300 font-semibold rounded-md outline-none *:font-semibold *:bg-white *:text-theme-blue"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-neutral-300 
          *:pt-[1.2rem] *:pb-[1rem] *:px-[1.2rem] *:rounded-md"
          >
            {/* Sales Revenue */}
            <div className="w-[60%] space-y-[1.2rem]">
              <h4 className="text-[1.6rem] leading-[1.6rem] font-semibold">
                Revenue
              </h4>
              <p className="text-[1.4rem] leading-[2rem] font-bold">
                PKR{" "}
                <span className="text-[2.2rem] text-theme-blue">1.2 Crore</span>
              </p>
            </div>

            {/* Sales Deals */}
            <div className="w-[40%] space-y-[1.2rem]">
              <h4 className="text-[1.6rem] leading-[1.6rem] font-semibold">
                Deals
              </h4>
              <p className="text-[2.2rem] leading-[2.2rem] font-bold text-theme-blue">
                120
              </p>
            </div>
          </div>
        </div>

        {/* Rental Revenue & Deals */}
        <div className="w-full h-fit bg-neutral-100 rounded-lg px-[1rem] py-[1rem] space-y-[0.5rem] shadow-[0rem_0.6rem_1rem_#ddd] border-[0.2rem] border-neutral-200">
          <div className="w-full flex justify-between">
            <h2 className="text-[1.8rem] text-theme-blue font-bold">
              Rental R&D
            </h2>

            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-fit px-[0.2rem] text-[1.4rem] leading-[1.4rem] text-theme-blue bg-neutral-300 font-semibold rounded-md outline-none *:font-semibold *:bg-white *:text-theme-blue"
            >
              <option value="Overall">Overall</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div
            className="w-full h-auto flex gap-[1rem] text-neutral-700 *:bg-neutral-300 
          *:pt-[1.2rem] *:pb-[1rem] *:px-[1.2rem] *:rounded-md"
          >
            {/* Rental Revenue */}
            <div className="w-[60%] space-y-[1.2rem]">
              <h4 className="text-[1.6rem] leading-[1.6rem] font-semibold">
                Revenue
              </h4>
              <p className="text-[1.4rem] leading-[2rem] font-bold">
                PKR{" "}
                <span className="text-[2.2rem] text-theme-blue">1.2 Crore</span>
              </p>
            </div>

            {/* Rental Deals */}
            <div className="w-[40%] space-y-[1.2rem]">
              <h4 className="text-[1.6rem] leading-[1.6rem] font-semibold">
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
        <LineChart title="Revenue & Deals Graph" />
      </section>
    </div>
  );
};

export default Dashboard;
