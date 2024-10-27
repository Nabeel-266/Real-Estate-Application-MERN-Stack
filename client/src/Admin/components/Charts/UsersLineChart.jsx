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
  tension: 0.4,
  pointStyle: "circle",
  radius: 2,
  pointHoverRadius: 5,
  pointBorderWidth: 5,
  pointHoverBorderWidth: 3,
};

const UsersLineChart = () => {
  const chartRef = useRef(null);
  const [lineToggle, setLineToggle] = useState([]);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Surges",
        data: [20, 40, 65, 55, 70, 80],
        borderColor: "#314b55",
        pointBackgroundColor: "#314b55",
        yAxisID: "y",
        ...commonDatasetsStyle,
      },
      {
        label: "User Logins",
        data: [80, 140, 135, 180, 200, 210],
        borderColor: "#697b82",
        pointBackgroundColor: "#697b82",
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
            return `${context.raw} ${context.dataset.label}`;
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
        ticks: {
          color: "#082835",
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 14,
            weight: "600",
          },
        },
        grid: {
          lineWidth: 0,
          tickLength: 15,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 7,
          color: "#082835",
          padding: 5,
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 13,
            weight: "600",
          },
        },
        grid: {
          drawOnChartArea: false,
          color: "rgba(0, 0, 0, 0.0)",
          lineWidth: 0,
          tickLength: 10,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 7,
          color: "#082835",
          padding: 5,
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 13,
            weight: "600",
          },
        },
        grid: {
          drawOnChartArea: false,
          color: "rgba(0, 0, 0, 0)",
          lineWidth: 0,
          tickLength: 10,
        },
      },
    },
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
    <div className="w-full flex flex-col gap-[1.2rem]">
      {/* Custom Legend  */}
      <div className="w-full flex flex-wrap gap-[1.2rem]">
        {chartData?.datasets.map((dataset, index) => (
          <div
            key={index}
            onClick={() => toggleDataset(dataset.label, index)}
            className={`text-[1.5rem] leading-[1.5rem] font-semibold text-theme-blue cursor-pointer flex items-center gap-[0.4rem] select-none`}
          >
            <span
              className="size-[1.2rem] rounded-full"
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
      <div className="w-full bg-neutral-200 rounded-2xl p-[1.5rem]">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UsersLineChart;
