import { useRef, useState } from "react";
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

// Common dataset styling
const commonDatasetsStyle = {
  fill: false,
  tension: 0.5,
  pointStyle: "circle",
  radius: 2,
  pointHoverRadius: 5,
  pointBorderWidth: 5,
  pointHoverBorderWidth: 3,
};

const LineChart = ({ selectedPeriodOfData }) => {
  const chartRef = useRef(null);
  const [lineToggle, setLineToggle] = useState([]);

  const chartData = {
    labels:
      selectedPeriodOfData === "Jan - Jun"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        : ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      // Right Y-axis (Revenue datasets)
      {
        label: "Total Revenue",
        data:
          selectedPeriodOfData === "Jan - Jun"
            ? [100000, 200000, 350000, 525658, 600000, 400000]
            : [20000, 525658, 300000, 100000, 600000, 15658],
        borderColor: "#06b6d4",
        pointBackgroundColor: "#06b6d4",
        yAxisID: "y",
        ...commonDatasetsStyle,
      },
      {
        label: "Sales Revenue",
        data:
          selectedPeriodOfData === "Jan - Jun"
            ? [200000, 500000, 350000, 300000, 400000, 200000]
            : [500000, 450000, 300000, 400000, 300000, 400000],
        borderColor: "#10b981",
        pointBackgroundColor: "#10b981",
        yAxisID: "y",
        ...commonDatasetsStyle,
      },
      {
        label: "Rental Revenue",
        data:
          selectedPeriodOfData === "Jan - Jun"
            ? [300000, 400000, 350000, 400000, 200000, 500000]
            : [200000, 500000, 450000, 450000, 300000, 400000],
        borderColor: "#6366f1",
        pointBackgroundColor: "#6366f1",
        yAxisID: "y",
        ...commonDatasetsStyle,
      },
      // Left Y-axis (Deal datasets)
      {
        label: "Total Deals",
        data:
          selectedPeriodOfData === "Jan - Jun"
            ? [10, 20, 30, 40, 50, 60]
            : [70, 80, 90, 100, 110, 120],
        borderColor: "#06748e",
        pointBackgroundColor: "#06748e",
        yAxisID: "y1",
        ...commonDatasetsStyle,
      },
      {
        label: "Sales Deals",
        data:
          selectedPeriodOfData === "Jan - Jun"
            ? [7, 10, 24, 25, 22, 15]
            : [32, 52, 78, 82, 65, 95],
        borderColor: "#047857",
        pointBackgroundColor: "#047857",
        yAxisID: "y1",
        ...commonDatasetsStyle,
      },
      {
        label: "Rental Deals",
        data:
          selectedPeriodOfData === "Jan - Jun"
            ? [3, 10, 6, 15, 28, 45]
            : [38, 28, 12, 18, 45, 25],
        borderColor: "#3730a3",
        pointBackgroundColor: "#3730a3",
        yAxisID: "y1",
        ...commonDatasetsStyle,
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

  // Price Formatter Function
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

  // Toggle Dataset Function
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
    <div className="w-full flex flex-col gap-[2rem] mt-[0.5rem] bg-emerald-00">
      {/* Custom Legend  */}
      <div className="w-full flex flex-wrap gap-[1.2rem] pr-[6%]">
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
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
