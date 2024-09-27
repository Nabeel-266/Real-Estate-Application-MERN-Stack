import { memo } from "react";

const TypeInput = ({
  inputFor,
  inputType,
  labelText,
  autoComplete,
  placeholder,
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
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputStyle}
      />
    </div>
  );
};

export default memo(TypeInput);
