import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import React Icons
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiHomeModern } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { PiUsersBold } from "react-icons/pi";
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineContacts } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const location = useLocation();
  const [isActiveTab, setIsActiveTab] = useState(
    location.pathname.split("/")[2]
  );

  useEffect(() => {
    setIsActiveTab(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <aside className="w-[25rem] my-[1.6rem] border-r-[1px] border-neutral-200 flex flex-col gap-[2rem]">
      {/* Header */}
      <header className="w-full flex flex-col gap-[0.8rem] px-[2rem]">
        <img
          src="/src/assets/logo-dark.png"
          alt="logo"
          className="w-[16.5rem]"
        />
        <h3 className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue">
          ADMIN
        </h3>
      </header>

      {/* Navigations */}
      <ul className="w-full flex flex-col gap-[0.6rem]">
        {[
          [TbLayoutDashboard, "Dashboard", "/admin/dashboard"],
          [PiUsersBold, "Agents", "/admin/agents"],
          [MdOutlineMapsHomeWork, "Properties", "/admin/properties"],
          [FiUsers, "Clients", "/admin/clients"],
          [LuLayoutList, "Listing", "/admin/listing"],
          [MdOutlineContacts, "Contacts", "/admin/contacts"],
          [TbReport, "Reports", "/admin/reports"],
          [LuSettings, "Settings", "/admin/settings"],
        ].map(([Icon, title, route], index) => (
          <li
            key={index}
            className={`w-[95%] relative overflow-hidden before:content-[''] before:w-full before:h-full before:z-0 before:absolute before:top-0 before:left-0 before:rounded-e-full before:transition before:ease-out before:duration-[0.3s] ${
              isActiveTab === route.split("/")[2]
                ? "before:translate-x-[-5%] before:bg-theme-blue"
                : "before:translate-x-[-100%] hover:before:translate-x-[0%] before:bg-neutral-100"
            }`}
          >
            <Link
              to={route}
              className={`w-full relative z-10 flex items-center gap-[1rem] pl-[1.8rem] py-[0.8rem] font-bold ${
                isActiveTab === route.split("/")[2]
                  ? "text-white"
                  : "text-neutral-600 hover:text-theme-blue"
              }`}
            >
              <Icon className="text-[2rem]" />
              <span className="text-[1.7rem] leading-[1.8rem]">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
