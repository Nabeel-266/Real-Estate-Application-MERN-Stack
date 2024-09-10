import { useRef, useState } from "react";

// Import Components
import LineChart from "../../../components/Admin/Charts/LineChart";

const Dashboard = () => {
  return (
    <div className="w-full p-[2rem]">
      <div className="w-full flex flex-col">
        {/* Section One */}
        <section className="w-full flex gap-[2rem]">
          {/* Total Deals */}
          {/* Sales Deals */}
          {/* Rental Deals */}
        </section>

        {/* Section Two */}
        <section className="w-full flex gap-[2rem]">
          {/* Revenue & Deals Chart */}
          <LineChart title="Revenue & Deals" />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
