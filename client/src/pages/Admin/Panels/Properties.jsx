// Import React Icons
import { FaHourglassHalf } from "react-icons/fa";
import { BsBuildingFillCheck } from "react-icons/bs";
import { MdAddHomeWork } from "react-icons/md";

// Example data for cards and table
const propertyStats = [
  {
    title: "Dealt Properties",
    count: 120,
    icon: <BsBuildingFillCheck />,
  },
  {
    title: "Active Properties",
    count: 60,
    icon: <MdAddHomeWork />,
  },
  {
    title: "Pending Properties",
    count: 15,
    icon: <FaHourglassHalf />,
  },
];

const Properties = () => {
  const properties = [
    {
      id: "PROP001",
      type: "Residential",
      location: "Karachi",
      price: "1.5 Crore",
      status: "Sold",
    },
    {
      id: "PROP002",
      type: "Commercial",
      location: "Lahore",
      price: "2 Crore",
      status: "Active",
    },
    {
      id: "PROP003",
      type: "Residential",
      location: "Islamabad",
      price: "1.2 Crore",
      status: "Pending",
    },
    // Add more property data as needed
  ];

  return (
    <div className="w-full flex flex-col gap-[2.5rem] p-[2rem]">
      {/* Section Top */}
      <section className="w-full flex gap-[2rem]">
        {propertyStats.map((stat, index) => (
          <div className="min-w-[25rem] w-[28%] max-w-[28rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]">
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Active")
                  ? "text-[6.4rem]"
                  : stat.title.includes("Pending")
                  ? "text-[5.1rem]"
                  : "text-[5.5rem]"
              }`}
            >
              {stat.icon}
            </div>

            <div className="relative z-10 h-fit flex flex-col items-start gap-[1rem] text-white px-[1.5rem] pt-[1.2rem] pb-[1.2rem]">
              <h2 className="text-[1.6rem] leading-[1.6rem] font-bold whitespace-nowrap">
                {stat.title}
              </h2>

              <p className="text-[2.8rem] leading-[2.8rem] font-bold text-theme-yellow">
                {stat.count}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Properties;
