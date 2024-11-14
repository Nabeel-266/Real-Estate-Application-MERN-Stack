import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

// Dummy data for different statuses and time periods
const dummyData = {
  pending: {
    "last 1 month": [
      { category: "Residential", count: 12 },
      { category: "Commercial", count: 8 },
      { category: "Plot", count: 5 },
    ],
    "last 2 months": [
      { category: "Residential", count: 18 },
      { category: "Commercial", count: 12 },
      { category: "Plot", count: 7 },
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

const ListingsBarChart = () => {
  const [status, setStatus] = useState("pending");
  const [timePeriod, setTimePeriod] = useState("last 1 month");

  // Get data based on current filters
  const filteredData = dummyData[status][timePeriod] || [];

  // Prepare data for the chart
  const chartData = {
    labels: filteredData.map((item) => item.category),
    datasets: [
      {
        label: "Listings Count",
        data: filteredData.map((item) => item.count),
        backgroundColor: ["#082835e0", "#082835b0", "#08283580"],
        hoverBackgroundColor: ["#082835f0", "#082835c0", "#08283590"],
      },
    ],
  };

  const options = {
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

  return (
    <div className="w-full">
      {/* Dropdowns for filtering */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Property Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="finalized">Finalized</option>
          </select>
        </label>

        <label style={{ marginLeft: "1rem" }}>
          Time Period:
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="last 1 month">Last 1 Month</option>
            <option value="last 2 months">Last 2 Months</option>
          </select>
        </label>
      </div>

      {/* Bar Chart */}
      <div className="w-full flex flex-col gap-[1rem] bg-neutral-200 rounded-2xl p-[1.5rem]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ListingsBarChart;
