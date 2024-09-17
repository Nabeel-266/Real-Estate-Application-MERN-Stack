import React, { useState } from "react";

// Import React Icons
import { MdSupportAgent } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";

// Import Components
import ButtonDropdown from "../../../components/Admin/ButtonDropdown";

const Agents = () => {
  return (
    <div className="w-full flex flex-col gap-[3rem]">
      {/* Section Top */}
      <section className="w-full flex gap-[2rem]">
        {/* Total Agents */}
        <div className="w-fit h-fit flex items-center gap-[3rem] bg-theme-blue px-[1.5rem] py-[1.2rem] rounded-xl shadow-[0.4rem_0.4rem_1rem_#08283580] *:text-white">
          <div className="space-y-[1rem] select-none">
            <h2 className="text-[1.7rem] leading-[2rem] font-bold whitespace-nowrap">
              Total Agents
            </h2>

            <p className="text-[3rem] leading-[3.2rem] ml-[0.5rem] font-bold text-theme-yellow">
              125
            </p>
          </div>

          <div className="flex items-center justify-center">
            <MdSupportAgent size="5rem" />
          </div>
        </div>

        {/* Active Agents */}
        <div className="w-fit h-fit flex items-center gap-[3rem] bg-theme-blue px-[1.5rem] py-[1.2rem] rounded-xl shadow-[0.4rem_0.4rem_1rem_#08283580] *:text-white">
          <div className="space-y-[1rem] select-none">
            <h2 className="text-[1.7rem] leading-[2rem] font-bold whitespace-nowrap">
              Active Agents
            </h2>

            <p className="text-[3rem] leading-[3.2rem] ml-[0.5rem] font-bold text-theme-yellow">
              75
            </p>
          </div>

          <div className="flex items-center justify-center">
            <FaUserTie size="3.8rem" />
          </div>
        </div>

        {/* Senior Agents */}
        <div className="w-fit h-fit flex items-center gap-[3rem] bg-theme-blue px-[1.5rem] py-[1.2rem] rounded-xl shadow-[0.4rem_0.4rem_1rem_#08283580] *:text-white">
          <div className="space-y-[1rem] select-none">
            <h2 className="text-[1.7rem] leading-[2rem] font-bold whitespace-nowrap">
              Senior Agents
            </h2>

            <p className="text-[3rem] leading-[3.2rem] ml-[0.5rem] font-bold text-theme-yellow">
              25
            </p>
          </div>

          <div className="flex items-center justify-center">
            <FaUserShield size="4.4rem" />
          </div>
        </div>
      </section>

      {/* Section Bottom */}
      <section className="w-full">
        <div className="w-full bg-neutral-100 px-[1.2rem] rounded-xl">
          {/* Top Side */}
          <div className="w-full flex items-center justify-between  py-[1rem] rounded-t-xl">
            <h2 className="text-[2.2rem] font-bold text-theme-blue">
              Agents Record
            </h2>

            {/* Display Data Options */}
            <div className="flex items-center gap-[1rem]">
              <ButtonDropdown to="Sort By" />
              <ButtonDropdown to="Filter By" />
              <ButtonDropdown to="Columns" />
            </div>
          </div>

          <table className="w-full table-auto text-left">
            <thead>
              <tr className="*:text-[1.55rem] *:leading-[1.6rem] *:font-bold *:text-theme-blue *:px-[1.2rem] *:py-[1.2rem] border-b-[2px] border-neutral-500">
                <th className="relative group">Hello World</th>
                <th>Sales | Rental Deals</th>
                <th>Sales Rvn</th>
                <th>Rental Rvn</th>
                <th>Total Rvn</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr
                  key={index}
                  className="border-t-[1px] border-neutral-400 *:text-[1.5rem] *:leading-[1.5rem] *:font-semibold *:text-neutral-700 *:px-[1.2rem] *:py-[1.4rem]"
                >
                  <td>Hello World</td>
                  <td>Deals</td>
                  <td>PKR 12345</td>
                  <td>PKR 12345</td>
                  <td>PKR 12345</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Agents;
