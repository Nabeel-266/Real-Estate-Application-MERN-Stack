import { memo } from "react";

const DateInput = ({
  inputFor,
  inputType,
  labelText,
  labelStyle,
  inputStyle,
  spaceBetween,
}) => {
  return (
    <div className={spaceBetween}>
      <label htmlFor={inputFor} className={labelStyle}>
        {labelText}
      </label>
      <input
        type={inputType}
        name={inputFor}
        id={inputFor}
        className={inputStyle}
      />
    </div>
  );
};

export default memo(DateInput);
