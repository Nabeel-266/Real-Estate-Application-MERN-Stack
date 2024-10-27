import { memo } from "react";

const MinMaxInput = ({
  inputFor,
  inputTag,
  labelText,
  labelStyle,
  inputStyle,
  padMinMax,
  contStyle,
  state,
  setStateHandler,
}) => {
  const handleChange = (e) => {
    setStateHandler(e.target.name, e.target.value);
  };

  return (
    <div className={contStyle}>
      <h6 className={labelStyle}>{labelText}</h6>

      <div className="w-full flex gap-[1rem]">
        <label
          htmlFor={`min${inputFor}`}
          className="w-full relative overflow-hidden"
        >
          <input
            type="number"
            name={`min${inputFor}`}
            id={`min${inputFor}`}
            value={state[`min${inputFor}`] || ""}
            onChange={handleChange}
            className={`${inputStyle} numberInput peer/input`}
            style={{ paddingLeft: padMinMax[0] }}
          />

          <span className="flex items-center absolute top-0 left-0 bottom-0 px-[1.2rem] bg-[#b8b8b8] text-neutral-800 text-[1.4rem] leading-[1.4rem] font-semibold rounded-full peer-focus/input:bg-theme-blue peer-focus/input:text-white transition-all">
            Min {inputTag}
          </span>
        </label>

        <label
          htmlFor={`max${inputFor}`}
          className="w-full relative overflow-hidden"
        >
          <input
            type="number"
            name={`max${inputFor}`}
            id={`max${inputFor}`}
            value={state[`max${inputFor}`] || ""}
            onChange={handleChange}
            className={`${inputStyle} numberInput peer/input`}
            style={{ paddingLeft: padMinMax[1] }}
          />

          <span className="flex items-center absolute top-0 left-0 bottom-0 px-[1.2rem] bg-[#b8b8b8] text-neutral-800 text-[1.4rem] leading-[1.4rem] font-semibold rounded-full peer-focus/input:bg-theme-blue peer-focus/input:text-white transition-all">
            Max {inputTag}
          </span>
        </label>
      </div>
    </div>
  );
};

export default memo(MinMaxInput);
