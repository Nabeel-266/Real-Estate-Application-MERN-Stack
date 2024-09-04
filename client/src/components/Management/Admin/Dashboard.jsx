import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Income",
        data: [
          100000, 200000, 350000, 525658, 600000, 400000, 20000, 525658, 300000,
          100000, 600000, 625658,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(255, 255, 255,1)",
        pointStyle: "circle",
        radius: 3,
        pointHoverRadius: 5,
        pointBorderWidth: 4,
        pointHoverBorderWidth: 3,
        fill: true,
        tension: 0.5,
      },
      {
        label: "Expense",
        data: [
          200000, 500000, 450000, 300000, 400000, 200000, 500000, 450000,
          300000, 400000, 300000, 400000,
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "rgba(255, 255, 255,1)",
        pointStyle: "circle",
        radius: 3,
        pointHoverRadius: 5,
        pointBorderWidth: 4,
        pointHoverBorderWidth: 3,
        fill: true,
        tension: 0.5,
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
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            return `PKR ${context.raw.toLocaleString()}`;
          },
        },
        backgroundColor: "#222",
        titleFont: {
          family: "Quicksand, sans-serif",
          size: 14,
          weight: "800",
        },
        bodyFont: {
          family: "Quicksand, sans-serif",
          size: 14,
          weight: "600",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1,
        },
        ticks: {
          callback: function (value) {
            return `PKR ${value.toLocaleString()}`;
          },
          color: "#ffffff",
          font: {
            family: "Quicksand, sans-serif",
            size: 12.5,
            weight: "500",
          },
        },
      },
      x: {
        grid: {
          lineWidth: 0,
        },
        ticks: {
          color: "#ffffff",
          font: {
            family: "Quicksand, sans-serif",
            size: 14,
            weight: "600",
            color: "#ffffff",
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

const Dashboard = () => {
  return (
    <div className="p-[2rem]">
      <div className="w-[65%] bg-theme-blue text-white p-[2rem] rounded-3xl">
        <h2 className="text-[1.8rem] font-bold text-white">Total Revenue</h2>
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
