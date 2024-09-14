import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ data }) {
  const chartData = {
    labels: ["Residential", "Plot", "Commercial"], // Categories
    datasets: [data],
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
            return context.dataset.label.includes("Deals")
              ? `${context.raw} ${context.dataset.label}`
              : `PKR ${context.raw.toLocaleString()}`;
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
    <div className="w-[50%] flex flex-col items-center gap-[1.2rem] overflow-hidden">
      <Doughnut data={chartData} options={options} />
      <h5 className="text-[1.7rem] leading-[1.7rem] font-semibold text-neutral-100">
        {data.label}
      </h5>
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
