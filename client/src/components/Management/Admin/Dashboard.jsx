import React, { useRef } from "react";
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
        label: "Total Revenue",
        data: [
          100000, 200000, 350000, 525658, 600000, 400000, 20000, 525658, 300000,
          100000, 600000, 15658,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
        fill: true,
        tension: 0.5,
      },
      {
        label: "Sales Reveneue",
        data: [
          200000, 500000, 350000, 300000, 400000, 200000, 500000, 450000,
          300000, 400000, 300000, 400000,
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
        pointHoverBorderWidth: 3,
        fill: true,
        tension: 0.5,
      },
      {
        label: "Rents Reveneue",
        data: [
          300000, 400000, 350000, 400000, 200000, 500000, 200000, 500000,
          450000, 450000, 300000, 400000,
        ],
        borderColor: "rgba(84, 102, 235, 1)",
        pointBackgroundColor: "rgba(84, 102, 235, 1)",
        pointStyle: "circle",
        radius: 2,
        pointHoverRadius: 5,
        pointBorderWidth: 5,
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
        position: "top",
        align: "center",
        // labels: {
        //   usePointStyle: true,
        //   pointStyle: "circle",
        //   boxWidth: 5,
        //   boxHeight: 5,
        //   color: "#fff",
        //   padding: 20,
        //   font: {
        //     size: 14,
        //     family: "'Montserrat Alternates', sans-serif",
        //     weight: "normal",
        //   },
        // },
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
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1,
        },
        ticks: {
          maxTicksLimit: 7,
          callback: function (value) {
            const formattedPrice = convertPrice(value);
            return `PKR ${formattedPrice}`;
          },
          color: "#ffffff",
          font: {
            family: "'Montserrat Alternates', sans-serif",
            size: 12,
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
            family: "'Montserrat Alternates', sans-serif",
            size: 13,
            weight: "500",
            color: "#ffffff",
          },
        },
      },
    },
  };

  const toggleDataset = (datasetIndex) => {
    const chart = chartRef.current;
    const meta = chart.getDatasetMeta(datasetIndex);

    // Toggle dataset visibility
    meta.hidden =
      meta.hidden === null ? !chart.data.datasets[datasetIndex].hidden : null;

    // Trigger the update with animation enabled
    chart.update({
      duration: 1000, // Ensure the update has a duration to animate the change
      easing: "easeInOutQuad", // Smooth easing function for the update
    });
  };

  return (
    <div className="p-[2rem]">
      <div className="min-w-[50rem] w-[55%] bg-theme-blue text-white p-[2rem] rounded-3xl flex flex-col gap-[1rem]">
        <h2 className="text-[1.8rem] font-bold text-white font-montAlter">
          Total Revenue
        </h2>

        {/* Custom Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {data.datasets.map((dataset, index) => (
            <div
              key={index}
              onClick={() => toggleDataset(index)} // Toggle data on click
              style={{
                marginRight: "10px",
                cursor: "pointer",
                color: dataset.borderColor,
              }}
            >
              <span style={{ marginRight: "5px", display: "inline-block" }}>
                ■
              </span>
              {dataset.label}
            </div>
          ))}
        </div>

        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useRef, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const chartRef = useRef(null);
//   const [hiddenDatasets, setHiddenDatasets] = useState([]);

//   const data = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Income",
//         data: [
//           100000, 200000, 350000, 525658, 600000, 400000, 20000, 525658, 300000,
//           100000, 600000, 625658,
//         ],
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         fill: true,
//         tension: 0.5,
//         hidden: hiddenDatasets.includes(0),
//       },
//       {
//         label: "Expense",
//         data: [
//           200000, 500000, 450000, 300000, 400000, 200000, 500000, 450000,
//           300000, 400000, 300000, 400000,
//         ],
//         borderColor: "rgba(54, 162, 235, 1)",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         fill: true,
//         tension: 0.5,
//         hidden: hiddenDatasets.includes(1),
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // Hide the default legend to use a custom one
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `PKR ${context.raw.toLocaleString()}`;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.1)",
//           lineWidth: 1,
//         },
//         ticks: {
//           callback: function (value) {
//             return `PKR ${value.toLocaleString()}`;
//           },
//           font: {
//             family: "Quicksand, sans-serif",
//             size: 12,
//             weight: "600",
//             color: "#ffffff",
//           },
//         },
//       },
//       x: {
//         grid: {
//           lineWidth: 0,
//         },
//         ticks: {
//           font: {
//             family: "Quicksand, sans-serif",
//             size: 14,
//             weight: "600",
//             color: "#ffffff",
//           },
//         },
//       },
//     },
//   };

//   const toggleDatasetVisibility = (datasetIndex) => {
//     const updatedHiddenDatasets = hiddenDatasets.includes(datasetIndex)
//       ? hiddenDatasets.filter((index) => index !== datasetIndex)
//       : [...hiddenDatasets, datasetIndex];

//     setHiddenDatasets(updatedHiddenDatasets);

//     const chart = chartRef.current;
//     chart.update({
//       duration: 5000, // Smooth transition
//       easing: "easeInOutQuad", // Smooth animation
//     });
//   };

//   return (
//     <div className="p-[2rem]">
//       <div className="w-[65%] bg-theme-blue text-white p-[2rem] rounded-3xl">
//         <h2 className="text-[1.8rem] font-bold text-white">Total Revenue</h2>

//         {/* Custom Legend */}
//         <div className="custom-legend">
//           {data.datasets.map((dataset, index) => (
//             <span
//               key={index}
//               style={{
//                 cursor: "pointer",
//                 marginRight: "20px",
//                 color: dataset.borderColor,
//               }}
//               onClick={() => toggleDatasetVisibility(index)}
//             >
//               {dataset.label}
//             </span>
//           ))}
//         </div>

//         {/* Chart */}
//         <Line ref={chartRef} data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// const toggleDatasetVisibility = (datasetIndex) => {
//   const chart = chartRef.current;
//   const meta = chart.getDatasetMeta(datasetIndex);

//   // Toggle dataset visibility
//   meta.hidden =
//     meta.hidden === null ? !chart.data.datasets[datasetIndex].hidden : null;

//   // Trigger the update with animation enabled
//   chart.update({
//     duration: 1000, // Ensure the update has a duration to animate the change
//     easing: "easeInOutQuad", // Smooth easing function for the update
//   });
// };
