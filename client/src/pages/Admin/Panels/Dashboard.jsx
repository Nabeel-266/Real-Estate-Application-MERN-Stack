import React, { useRef, useState } from "react";
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

const Dashboard = () => {
  const chartRef = useRef(null);
  const [lineToggle, setLineToggle] = useState([]);

  const convertPrice = (value) => {
    let number = parseFloat(value);
    if (isNaN(number)) return "";

    let formattedNumber;
    let unit = "";

    if (number >= 1e11) {
      formattedNumber = number / 1e11;
      unit = " Kharab";
    } else if (number >= 1e9) {
      formattedNumber = number / 1e9;
      unit = " Arab";
    } else if (number >= 1e7) {
      formattedNumber = number / 1e7;
      unit = " Crore";
    } else if (number >= 1e5) {
      formattedNumber = number / 1e5;
      unit = " Lac";
    } else if (number >= 1e3) {
      formattedNumber = number / 1e3;
      unit = " k";
    } else {
      formattedNumber = number;
    }

    if (formattedNumber % 1 === 0) {
      return formattedNumber.toFixed(0) + unit;
    } else if ((formattedNumber * 10) % 1 === 0) {
      return formattedNumber.toFixed(1) + unit;
    } else {
      return formattedNumber.toFixed(2) + unit;
    }
  };

  const chartData = {
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
      // Left Y-axis (Revenue datasets)
      {
        label: "Total Revenue",
        data: [
          100000, 200000, 350000, 525658, 600000, 400000, 20000, 525658, 300000,
          100000, 600000, 15658,
        ],
        borderColor: "rgba(27, 229, 229, 1)",
        pointBackgroundColor: "rgba(27, 229, 229, 1)",
        yAxisID: "y",
        fill: false,
        tension: 0.5,
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
      },
      {
        label: "Sales Reveneue",
        data: [
          200000, 500000, 350000, 300000, 400000, 200000, 500000, 450000,
          300000, 400000, 300000, 400000,
        ],
        borderColor: "rgba(174, 38, 211, 1)",
        pointBackgroundColor: "rgba(174, 38, 211, 1)",
        yAxisID: "y",
        fill: false,
        tension: 0.5,
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
      },
      {
        label: "Rental Reveneue",
        data: [
          300000, 400000, 350000, 400000, 200000, 500000, 200000, 500000,
          450000, 450000, 300000, 400000,
        ],
        borderColor: "rgba(0, 100, 252, 1)",
        pointBackgroundColor: "rgba(0, 100, 252, 1)",
        yAxisID: "y",
        fill: false,
        tension: 0.5,
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
      },
      // Right Y-axis (Deals datasets)
      {
        label: "Total Deals",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y1",
        fill: false,
        tension: 0.5,
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
      },
      {
        label: "Sales Deals",
        data: [7, 10, 24, 25, 22, 15, 32, 52, 78, 82, 65, 95],
        borderColor: "rgba(255, 159, 64, 1)",
        pointBackgroundColor: "rgba(255, 159, 64, 1)",
        yAxisID: "y1",
        fill: false,
        tension: 0.5,
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
      },
      {
        label: "Rental Deals",
        data: [3, 10, 6, 15, 28, 45, 38, 28, 12, 18, 45, 25],
        borderColor: "rgba(39, 174, 96, 1)",
        pointBackgroundColor: "rgba(39, 174, 96, 1)",
        yAxisID: "y1",
        fill: false,
        tension: 0.5,
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
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
          boxWidth: 5,
          boxHeight: 5,
          color: "#fff",
          padding: 13,
          font: {
            size: "14rem",
            family: "'Montserrat Alternates', sans-serif",
            weight: "normal",
          },
        },
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return context[0].label;
          },

          label: function (context) {
            return context.dataset.label.includes("Deals")
              ? `${context.raw} Deals`
              : `PKR ${context.raw.toLocaleString()}`;
          },
        },
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#333",
        bodySpacing: 10,
        cornerRadius: 10,
        padding: 10,
        usePointStyle: true,
        boxPadding: 5,
        boxWidth: 8,
        boxHeight: 8,
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
    scales: {
      x: {
        grid: {
          lineWidth: 0,
        },
        ticks: {
          color: "#ffffff",
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 13,
            weight: "500",
            color: "#ffffff",
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 7,
          color: "#ffffff",
          padding: 5,
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 12,
            weight: "500",
          },
          callback: function (value) {
            const formattedPrice = convertPrice(value);
            return `PKR ${formattedPrice}`;
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.2)",
          lineWidth: 1,
          tickLength: 12,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 7,
          color: "#ffffff",
          padding: 5,
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 12,
            weight: "500",
          },
        },
        grid: {
          drawOnChartArea: false,
          color: "rgba(0, 0, 0, 0.2)",
          lineWidth: 1,
          tickLength: 12,
        },
      },
    },
  };

  const toggleDataset = (datasetLabel, datasetIndex) => {
    const chart = chartRef.current;
    const meta = chart.getDatasetMeta(datasetIndex);

    // Toggle dataset visibility
    meta.hidden =
      meta.hidden === null ? !chart.data.datasets[datasetIndex].hidden : null;

    // Trigger the update
    chart.update();

    if (!lineToggle.includes(datasetLabel)) {
      setLineToggle((prv) => [...prv, datasetLabel]);
    } else {
      setLineToggle((prv) =>
        prv.filter((lineLabel) => lineLabel !== datasetLabel)
      );
    }
  };

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
          {/* Revenue Chart */}
          <div className="w-[70%] min-w-[50rem] bg-theme-blue text-white p-[2rem] rounded-3xl flex flex-col gap-[1rem]">
            <h2 className="text-[2.1rem] font-bold text-white font-montAlter">
              Revenue & Deals
            </h2>

            <div className="w-full flex flex-col gap-[2rem] mt-[0.5rem]">
              {/* Custom Legend  */}
              <div className="w-full flex flex-wrap gap-[1.5rem] pr-[35%]">
                {chartData?.datasets.map((dataset, index) => (
                  <div
                    key={index}
                    onClick={() => toggleDataset(dataset.label, index)}
                    className={`text-[1.35rem] leading-[1.3rem] font-semibold text-neutral-100 cursor-pointer flex items-center gap-[0.4rem] select-none`}
                  >
                    <span
                      className="size-[1.2rem] rounded-full mb-[0.1rem]"
                      style={{
                        backgroundColor: dataset.borderColor,
                      }}
                    ></span>
                    <span
                      className={`whitespace-nowrap ${
                        lineToggle.includes(dataset.label) &&
                        "line-through decoration-[0.3rem] decoration-theme-blue"
                      }`}
                    >
                      {dataset.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="w-full">
                <Line ref={chartRef} data={chartData} options={options} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
