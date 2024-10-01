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
  state,
  setState,
}) => {
  // Handle input change event and update the query state
  const handleChange = (e) => {
    setState(e.target.name, e.target.value);
  };

  return (
    <div className={spaceBetween}>
      <label htmlFor={inputFor[1]} className={labelStyle}>
        {labelText}
      </label>
      <input
        type={inputType}
        name={inputFor[0]}
        id={inputFor[1]}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputStyle}
        value={state[inputFor] || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default memo(TypeInput);
