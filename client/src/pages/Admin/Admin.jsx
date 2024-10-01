import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Import React Icons
import { RiUserAddLine } from "react-icons/ri";

// Import Components
import Sidebar from "../../components/Admin/Sidebar";
import AddAgentModal from "../../components/Admin/Modals/AddAgentModal";

const Admin = () => {
  const routeLocation = useLocation();
  const [panelTitle, setPanelTitle] = useState("Dashboard");
  const [isOpenAddAgentModal, setIsOpenAddAgentModal] = useState(false);

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
        <main className="w-[calc(100%-25rem)] h-full">
          <header className="mx-[1%] h-[6rem] flex items-center justify-between px-[1rem] border-b-[1px] border-neutral-200">
            <h2 className="text-[2.4rem] leading-[2.2rem] font-bold text-neutral-800 flex items-center gap-[0.8rem] mt-[0.8rem]">
              <span>{panelTitle}</span>
            </h2>

            <div className="flex items-center gap-[1.5rem] select-none">
              {panelTitle === "Agents" && (
                <button
                  onClick={() => setIsOpenAddAgentModal(true)}
                  className="text-[1.6rem] leading-[2rem] font-semibold text-theme-blue px-[1rem] py-[0.3rem] flex items-center gap-[0.5rem] rounded-lg border-[0.2rem] border-theme-blue whitespace-nowrap hover:bg-theme-blue hover:text-white transition-all"
                >
                  <RiUserAddLine size="1.8rem" />
                  <span>Add Agent</span>
                </button>
              )}

              <img
                src="/src/assets/user.png"
                alt="Admin"
                className="size-[3.2rem] rounded-full bg-neutral-200 object-cover cursor-pointer"
              />
            </div>
          </header>

          <div className="w-full h-[calc(100dvh-6rem)] overflow-auto scrollbar-panel">
            <Outlet />
          </div>
        </main>

        {/* Modals */}
        {isOpenAddAgentModal && (
          <AddAgentModal setIsOpenModal={setIsOpenAddAgentModal} />
        )}
      </div>
    </div>
  );
};

export default Admin;

// {
//   panelTitle === "Dashboard" ? (
//     <TbLayoutDashboard />
//   ) : panelTitle === "Agents" ? (
//     <MdSupportAgent />
//   ) : panelTitle === "Properties" ? (
//     <MdOutlineMapsHomeWork />
//   ) : panelTitle === "Clients" ? (
//     <FiUsers />
//   ) : panelTitle === "Listing" ? (
//     <LuLayoutList />
//   ) : panelTitle === "Contacts" ? (
//     <MdOutlineContacts />
//   ) : panelTitle === "Reports" ? (
//     <TbReport />
//   ) : (
//     panelTitle === "Settings" && <LuSettings />
//   );
// }
