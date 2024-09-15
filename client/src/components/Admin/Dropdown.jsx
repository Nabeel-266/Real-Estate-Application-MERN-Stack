import React from "react";

const Dropdown = () => {
  return (
    <div className="w-full bg-[#082835d0] backdrop-blur-[20px] absolute top-[100%] left-0 rounded-md shadow-lg shadow-[#082835d0] py-[0.5rem]">
      <ul className="text-[1.4rem] leading-[1.4rem] text-white font-semibold *:px-[1.2rem] *:py-[0.6rem]">
        {[2022, 2023, 2024].map((year, index) => (
          <li key={index} className="hover:bg-theme-blue cursor-pointer">
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
