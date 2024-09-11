import { Outlet } from "react-router-dom";

// Import React Icons
import { PiHandWavingFill } from "react-icons/pi";
import { HiHomeModern } from "react-icons/hi2";

// Import Components
import Sidebar from "../../components/Admin/Sidebar";

const Admin = () => {
  return (
    <div className="w-full h-dvh px-[0.6rem] pt-[0.7rem] pb-0 bg-theme-blue">
      <div className="w-full h-full bg-white rounded-t-3xl flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Panel */}
        <main className="flex-1 h-full">
          <header className="mx-[1%] h-[6rem] flex items-center justify-between px-[1rem] border-b-[1px] border-neutral-200">
            <h2 className="text-[2.4rem] leading-[2.2rem] font-bold text-neutral-800 flex items-center gap-[0.8rem] mt-[0.2rem]">
              <span>Dashboard</span>
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
