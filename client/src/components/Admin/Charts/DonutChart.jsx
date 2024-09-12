import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const [lineToggle, setLineToggle] = useState([]);

  const chartData = {
    labels: ["Residential", "Commercial", "Plot"], // Categories
    datasets: [
      {
        label: "Deals",
        data: [10, 5, 8],
        backgroundColor: ["#05bb51e0", "#ff9020e0", "#ff426be0"],
        hoverBackgroundColor: ["#05bb51e0", "#ff9020e0", "#ff426be0"],
        borderWidth: 3,
        borderColor: "transparent",
        borderRadius: 4,
        hoverBorderColor: ["#05bb51", "#ff9020", "#ff426b"],
        spacing: 4,
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
            return `${context.raw} ${context.dataset.label}`;
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
          size: 16,
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
    <div className="flex gap-[1rem] bg-theme-blue px-[2rem] py-[1.6rem] rounded-2xl">
      {/* Content Side */}
      <div className="w-[70%] space-y-[1.5rem] mt-[0.5rem]">
        <h2 className="text-[1.8rem] font-bold text-white">
          Deals By Category
        </h2>

        <div className="w-full flex gap-[1.5rem]">
          {/* Select Month & Year */}
          <div className="flex flex-col gap-[1rem] mb-[0.2rem]">
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
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </div>

          {/* Custom Legend  */}
          <div className="w-full flex flex-col flex-wrap gap-[1.5rem]">
            {chartData?.labels.map((label, index) => (
              <div
                key={index}
                className={`text-[1.5rem] leading-[1.5rem] font-semibold text-neutral-100 cursor-pointer flex items-center gap-[0.4rem] select-none`}
              >
                <span
                  className="size-[1.2rem] rounded-full mb-[0.1rem]"
                  style={{
                    backgroundColor:
                      chartData?.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Side */}
      <div className="w-[30%]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default DonutChart;

// {
//     label: "Revenue (PKR)", // Revenue data
//     data: [1000000, 5000000, 2000000], // Revenue for each category
//     backgroundColor: ["#FF9F40", "#4BC0C0", "#9966FF"], // Different colors for revenue
//     hoverBackgroundColor: ["#FF9F40", "#4BC0C0", "#9966FF"],
//   },

//   label: function (tooltipItem) {
//     const datasetLabel = tooltipItem.dataset.label || "";
//     const value = tooltipItem.raw;
//     return `${datasetLabel}: ${value.toLocaleString()} PKR`;
//   },
