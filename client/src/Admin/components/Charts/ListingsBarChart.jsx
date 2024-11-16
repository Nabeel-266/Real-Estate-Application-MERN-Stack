import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import PeriodSelection from "../Selections/PeriodSelection";
import PreSelectedSelection from "../Selections/PreSelectedSelection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Dummy data for different statuses and time periods
const barChartDummyData = {
  pending: {
    "last 1 month": [
      { category: "Residential", count: 12 },
      { category: "Commercial", count: 8 },
      { category: "Plot or Land", count: 5 },
    ],
    "last 2 months": [
      { category: "Residential", count: 18 },
      { category: "Commercial", count: 12 },
      { category: "Plot or Land", count: 7 },
    ],
  },
  published: {
    "last 1 month": [
      { category: "Residential", count: 20 },
      { category: "Commercial", count: 15 },
      { category: "Plot", count: 10 },
    ],
    "last 2 months": [
      { category: "Residential", count: 25 },
      { category: "Commercial", count: 18 },
      { category: "Plot", count: 12 },
    ],
  },
  finalized: {
    "last 1 month": [
      { category: "Residential", count: 30 },
      { category: "Commercial", count: 22 },
      { category: "Plot", count: 15 },
    ],
    "last 2 months": [
      { category: "Residential", count: 35 },
      { category: "Commercial", count: 28 },
      { category: "Plot", count: 20 },
    ],
  },
};

const donutChartDummyData = {
  pending: {
    "last 1 month": [
      { purpose: "For Sale", count: 12 },
      { purpose: "For Rent", count: 8 },
    ],
    "last 2 months": [
      { purpose: "For Sale", count: 18 },
      { purpose: "For Rent", count: 12 },
    ],
  },
  published: {
    "last 1 month": [
      { purpose: "For Sale", count: 20 },
      { purpose: "For Rent", count: 15 },
    ],
    "last 2 months": [
      { purpose: "For Sale", count: 25 },
      { purpose: "For Rent", count: 18 },
    ],
  },
  finalized: {
    "last 1 month": [
      { purpose: "For Sale", count: 30 },
      { purpose: "For Rent", count: 22 },
    ],
    "last 2 months": [
      { purpose: "For Sale", count: 35 },
      { purpose: "For Rent", count: 28 },
    ],
  },
};

const ListingsBarChart = () => {
  const [status, setStatus] = useState("pending");
  const [timePeriod, setTimePeriod] = useState("last 1 month");

  // Get data based on current filters
  const barChartFilteredData = barChartDummyData[status][timePeriod] || [];
  const donutChartFilteredData = donutChartDummyData[status][timePeriod] || [];

  // Prepare data for the chart
  const barChartData = {
    labels: barChartFilteredData.map((item) => item.category),
    datasets: [
      {
        label: "Listings Count",
        data: barChartFilteredData.map((item) => item.count),
        backgroundColor: ["#082835e0", "#082835b0", "#08283580"],
        hoverBackgroundColor: ["#082835f0", "#082835c0", "#08283590"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          color: "#082835",
          padding: 15,
          font: {
            size: "14rem",
            family: "'Montserrat Alternates', sans-serif",
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return context[0].label;
          },

          label: function (context, i) {
            return `${context.raw} ${context.dataset.label}`;
          },
        },
        backgroundColor: "#fff",
        titleColor: "#082835",
        bodyColor: "#333",
        bodySpacing: 10,
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
    scales: {
      x: {
        stacked: true,
        grid: {
          lineWidth: 0,
        },
        ticks: {
          color: "#082835",
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 14,
            weight: "600",
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 7,
          color: "#082835",
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 13,
            weight: "600",
          },
        },
        grid: {
          color: "#e0e0e0",
          lineWidth: 1,
          tickLength: 5,
        },
      },
    },
  };

  const donutChartData = {
    labels: donutChartFilteredData.map((item) => item.purpose),
    datasets: [
      {
        label: "Listings Count",
        data: donutChartFilteredData.map((item) => item.count),
        backgroundColor: ["#223f4c", "#4c646f"],
        hoverBackgroundColor: ["#223f4c", "#4c646f"],
        borderWidth: 4,
        borderColor: "transparent",
        hoverBorderColor: ["#223f4c", "#4c646f"],
      },
    ],
  };

  const donutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return context[0].label;
          },

          label: function (context, i) {
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
    <div className="w-full space-y-[1.5rem]">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-[2rem] leading-[2rem] font-bold text-theme-blue">
          Listings Overview Graphs
        </h2>

        {/* Dropdowns for filtering */}
        <div className="flex items-center gap-[1rem]">
          <PreSelectedSelection
            value={status}
            setValue={setStatus}
            options={["Pending", "Published", "Finalized"]}
            width="14rem"
          />

          <PreSelectedSelection
            value={timePeriod}
            setValue={setTimePeriod}
            options={["Last 1 month", "Last 2 months"]}
            width="16rem"
          />
        </div>
      </div>

      {/* Charts Area */}
      <div className="w-full h-fit flex gap-[2rem]">
        {/* Listings Bar Chart Content */}
        <div className="w-[58%] min-w-[50rem] flex flex-col gap-[1.2rem] bg-neutral-100 rounded-3xl">
          {/* Heading */}
          {/* <h3 className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue">
            By Property Category
          </h3> */}

          {/* Bar Chart */}
          <div className="w-full bg-neutral-200 rounded-2xl p-[1.5rem]">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Listings Donut Chart Content */}
        <div className="w-[40%] min-w-[30rem] h-full flex flex-col gap-[1.2rem] bg-neutral-100 rounded-3xl">
          {/* Heading */}
          {/* <h3 className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue">
            By Property Purpose
          </h3> */}

          <div className="w-full h-full flex flex-col items-center justify-center gap-[2rem] bg-neutral-200 rounded-2xl p-[1.5rem]">
            {/* Custom Legend  */}
            <div className="w-full flex flex-wrap gap-[1.2rem]">
              {["For Sale", "For Rent"].map((label, index) => (
                <div
                  key={index}
                  className={`text-[1.5rem] leading-[1.5rem] font-semibold text-theme-blue flex items-center gap-[0.4rem] select-none`}
                >
                  <span
                    className={`size-[1.2rem] rounded-full ${
                      label === "For Sale" ? "bg-[#223f4c]" : "bg-[#4c646f]"
                    }`}
                  ></span>
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>

            <div className="w-[65%]">
              <Doughnut data={donutChartData} options={donutChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsBarChart;
