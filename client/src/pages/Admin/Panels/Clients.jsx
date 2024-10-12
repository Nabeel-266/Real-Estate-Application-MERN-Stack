// Import React Icons
import { HiUsers } from "react-icons/hi2";
import { PiUserSwitchFill } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

// Example data for cards and table
const clientsStats = [
  {
    title: "Total Clients",
    count: 120,
    icon: <HiUsers />,
  },
  {
    title: "Buyer Clients",
    count: 60,
    icon: <GiTakeMyMoney />,
  },
  {
    title: "Seller Clients",
    count: 15,
    icon: <FaHouseChimneyUser />,
  },
];

const Clients = () => {
  return (
    <div className="w-full flex flex-col gap-[3rem] px-[2rem] pt-[2rem] pb-[4rem]">
      {/* Section Top */}
      <section className="w-full flex justify-between gap-[2rem]">
        {clientsStats.map((stat, index) => (
          <div
            key={index}
            className="w-[32%] min-w-[26rem] max-w-[33rem] relative overflow-hidden bg-theme-blue rounded-xl shadow-[0.4rem_0.4rem_0.8rem_#00000060]"
          >
            <div
              className={`absolute z-[1] top-0 bottom-0 right-[1.5rem] flex items-center justify-center text-[#ffffff30] ${
                stat.title.includes("Total")
                  ? "text-[6.2rem]"
                  : stat.title.includes("Buyer")
                  ? "text-[6rem]"
                  : "text-[5.4rem]"
              }`}
            >
              {stat.icon}
            </div>

            <div className="relative z-10 h-fit flex flex-col items-start gap-[1rem] text-white px-[1.5rem] pt-[1.2rem] pb-[1.2rem]">
              <h2 className="text-[1.6rem] leading-[1.6rem] font-bold whitespace-nowrap">
                {stat.title}
              </h2>

              <p className="flex items-center gap-[1rem] text-[3rem] leading-[2.8rem] font-bold">
                <TbArrowBigRightLinesFilled size="2.2rem" />
                <span className="text-theme-yellow ">{stat.count}</span>
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Clients;
