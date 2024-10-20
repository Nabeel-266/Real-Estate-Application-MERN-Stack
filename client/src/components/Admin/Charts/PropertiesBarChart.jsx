import { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  layouts,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PropertiesBarChart = () => {
  const chartRef = useRef(null);
  const [lineToggle, setLineToggle] = useState([]);

  // Example data - you can fetch or compute this dynamically
  const chartData = {
    labels: ["Residential", "Commercial", "Plots"],
    datasets: [
      {
        label: "Finalized",
        data: [12, 19, 3], // Example data for Residential properties
        backgroundColor: "#082835e0",
        hoverBackgroundColor: "#082835f0",
      },
      {
        label: "Published",
        data: [8, 13, 7], // Example data for Commercial properties
        backgroundColor: "#082835b0",
        hoverBackgroundColor: "#082835c0",
      },
      {
        label: "Pending",
        data: [6, 10, 4], // Example data for Plots properties
        backgroundColor: "#08283580",
        hoverBackgroundColor: "#08283590",
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
      <div className="w-full flex flex-wrap gap-[1.5rem]">
        {chartData?.datasets.map((dataset, index) => (
          <div
            key={index}
            onClick={() => toggleDataset(dataset.label, index)}
            className={`text-[1.5rem] leading-[1.5rem] font-semibold text-theme-blue cursor-pointer flex items-center gap-[0.4rem] select-none`}
          >
            <span
              className="size-[1.2rem] rounded-full"
              style={{
                backgroundColor: dataset.backgroundColor,
              }}
            ></span>

            <span
              className={`whitespace-nowrap ${
                lineToggle.includes(dataset.label) &&
                "line-through decoration-[0.2rem] decoration-theme-blue"
              }`}
            >
              {dataset.label}
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full flex bg-neutral-200 rounded-2xl p-[1.5rem]">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PropertiesBarChart;
