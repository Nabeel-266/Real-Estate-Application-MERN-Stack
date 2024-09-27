import { memo, useState } from "react";

const TypeInput = ({
  inputFor,
  inputType,
  labelText,
  autoComplete,
  placeholder,
  labelStyle,
  inputStyle,
  spaceBetween,
  setQueryHanlder,
}) => {
  const [value, setValue] = useState("");

  // Handle input change event and update the query state
  const handleChange = (e) => {
    setValue(e.target.value);
    setQueryHanlder(e.target.name, e.target.value || "");
  };

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
        value={value}
        onInput={handleChange}
      />
    </div>
  );
};

export default memo(TypeInput);
