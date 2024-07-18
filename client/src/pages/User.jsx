import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

// Import React Icons
import { FiUser } from "react-icons/fi";
import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineMapsHomeWork } from "react-icons/md";

const User = () => {
  const location = useLocation();
  const [isActiveTab, setIsActiveTab] = useState(
    location.pathname.split("/")[2]
  );

  useEffect(() => {
    setIsActiveTab(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <div className="userCont w-full h-dvh relative pt-[6rem]">
      <div className="userContWrapper h-full flex items-start">
        <aside className="w-[30rem] h-full flex items-center border-r-[0.2rem] border-neutral-200 pl-[4%]">
          <ul className="w-[100%] h-[calc(100dvh-12rem)] flex flex-col gap-[0.2rem]">
            {[
              [FiUser, "Profile", "profile"],
              [RiAccountBoxLine, "Account", "account"],
              [MdOutlineMapsHomeWork, "My Properties", "properties"],
            ].map(([Icon, title, route], index) => (
              <li
                key={index}
                className={`${
                  isActiveTab === route
                    ? "before:translate-x-[-10%] before:bg-theme-blue"
                    : "before:translate-x-[-100%] hover:before:translate-x-[0%] before:bg-neutral-100"
                } w-[90%] relative overflow-hidden before:content-[''] before:w-full before:h-full before:z-0 before:absolute before:top-0 before:left-0 before:rounded-e-full before:transition before:ease-out before:duration-[0.4s] peer/navItem`}
              >
                <Link
                  to={route}
                  className={`${
                    isActiveTab === route
                      ? "text-white font-medium"
                      : "text-neutral-500 font-semibold"
                  } w-full relative z-10 flex items-center gap-[1rem] px-[1rem] py-[0.8rem]`}
                >
                  <Icon className="text-[2.1rem]" />
                  <span className="text-[1.75rem] leading-[1.8rem]">
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 h-full overflow-auto scrollbar pt-[3rem] pr-[4%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default User;
