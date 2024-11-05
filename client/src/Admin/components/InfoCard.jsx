import React from "react";

const InfoCard = ({ title, text, width }) => {
  return (
    <div
      style={{ width: width ? width : "auto" }}
      className="space-y-[0.8rem] px-[1rem] pt-[0.8rem] pb-[0.6rem] bg-neutral-100 rounded-xl text-[1.6rem] leading-[1.6rem] border-[0.2rem] border-neutral-300 border-dashed"
    >
      <h5 className="text-theme-blue font-bold">{title}</h5>
      <p className="text-neutral-700 font-semibold">{text}</p>
    </div>
  );
};

export default InfoCard;
