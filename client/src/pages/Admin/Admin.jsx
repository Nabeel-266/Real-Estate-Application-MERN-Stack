import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Import React Icons
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { PiUsersBold } from "react-icons/pi";
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineContacts } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";

// Import Components
import Sidebar from "../../components/Admin/Sidebar";

const Admin = () => {
  const routeLocation = useLocation();
  const [panelTitle, setPanelTitle] = useState("Dashboard");

  useEffect(() => {
    const panelName = routeLocation.pathname.split("/")[2];
    const currentPanelTitle =
      panelName.charAt(0).toUpperCase() + panelName.slice(1).toLowerCase();

    setPanelTitle(currentPanelTitle);
  }, [routeLocation]);

  return (
    <div className="w-full h-dvh px-[0.6rem] pt-[0.7rem] pb-0 bg-theme-blue">
      <div className="w-full h-full bg-white rounded-t-3xl flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Panel */}
        <main className="flex-1 h-full">
          <header className="mx-[1%] h-[6rem] flex items-center justify-between px-[1rem] border-b-[1px] border-neutral-200">
            <h2 className="text-[2.4rem] leading-[2.2rem] font-bold text-neutral-800 flex items-center gap-[0.8rem] mt-[0.2rem]">
              {panelTitle === "Dashboard" ? (
                <TbLayoutDashboard />
              ) : panelTitle === "Agents" ? (
                <PiUsersBold />
              ) : panelTitle === "Properties" ? (
                <MdOutlineMapsHomeWork />
              ) : panelTitle === "Clients" ? (
                <FiUsers />
              ) : panelTitle === "Listing" ? (
                <LuLayoutList />
              ) : panelTitle === "Contacts" ? (
                <MdOutlineContacts />
              ) : panelTitle === "Reports" ? (
                <TbReport />
              ) : (
                panelTitle === "Settings" && <LuSettings />
              )}
              <span>{panelTitle}</span>
            </h2>

            <div className="flex items-center gap-[1rem] select-none">
              <img
                src="/src/assets/user.png"
                alt="Admin"
                className="size-[3.2rem] rounded-full bg-neutral-200 object-cover cursor-pointer"
              />
            </div>
          </header>

          <div className="w-full h-[calc(100dvh-6rem)] p-[2rem] overflow-auto scrollbar-panel">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
