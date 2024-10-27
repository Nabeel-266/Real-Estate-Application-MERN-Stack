import { memo } from "react";

const TypeInput = ({
  inputFor,
  inputType,
  labelText,
  autoComplete,
  placeholder,
  labelStyle,
  inputStyle,
  contStyle,
  state,
  setStateHandler,
}) => {
  // Handle input change event and update the query state
  const handleChange = (e) => {
    setStateHandler(e.target.name, e.target.value);
  };

  return (
    <div className={contStyle}>
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
        value={state[inputFor[0]] || ""}
        onChange={handleChange}
      />
      <p className="formInputErrors hidden">Error Message is here</p>
    </div>
  );
};

export default memo(TypeInput);
