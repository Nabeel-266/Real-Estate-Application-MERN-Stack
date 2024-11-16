import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UsersDonutChart = () => {
  const chartData = {
    labels: ["Basic", "Partial", "Complete"],
    datasets: [
      {
        label: "User Profile Stages",
        data: [58, 34, 28],
        backgroundColor: ["#758893", "#4c646f", "#223f4c"],
        hoverBackgroundColor: ["#758893", "#4c646f", "#223f4c"],
        borderWidth: 4,
        borderColor: "transparent",
        hoverBorderColor: ["#758893", "#4c646f", "#223f4c"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} Users Profile`;
          },
        },
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#333",
        cornerRadius: 10,
        padding: 10,
        usePointStyle: true,
        boxPadding: 5,
        boxWidth: 10,
        boxHeight: 10,
        titleFont: {
          family: "'Montserrat Alternates', sans-serif",
          size: 15,
          weight: "700",
        },
        bodyFont: {
          family: "'Montserrat Alternates', sans-serif",
          size: 14,
          weight: "600",
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col gap-[1.2rem]">
      {/* Custom Legend  */}
      <div className="w-full flex flex-wrap gap-[1.2rem]">
        {["Basic", "Partial", "Complete"].map((label, index) => (
          <div
            key={index}
            className={`text-[1.5rem] leading-[1.5rem] font-semibold text-theme-blue flex items-center gap-[0.4rem] select-none`}
          >
            <span
              className={`size-[1.2rem] rounded-full ${
                label === "Basic"
                  ? "bg-[#758893]"
                  : label === "Partial"
                  ? "bg-[#4c646f]"
                  : "bg-[#223f4c]"
              }`}
            ></span>
            <span className="whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-full flex items-center justify-center bg-neutral-200 rounded-2xl p-[1.5rem]">
        <div className="w-[72%]">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UsersDonutChart;
