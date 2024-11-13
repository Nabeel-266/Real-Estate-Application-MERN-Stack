import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ListingsBarChart = ({ data }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Update chart data whenever the `data` prop changes
    setChartData({
      labels: Object.keys(data),
      datasets: [
        {
          label: "Listings Count",
          data: Object.values(data),
          backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
          borderColor: "#4e73df",
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: true, position: "top" },
          title: { display: true, text: "Property Listings by Category" },
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Count" } },
          x: { title: { display: true, text: "Property Category" } },
        },
      }}
    />
  );
};

export default ListingsBarChart;
