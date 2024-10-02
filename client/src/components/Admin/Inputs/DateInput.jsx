import { memo } from "react";

const DateInput = ({
  inputFor,
  inputType,
  labelText,
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
        className={inputStyle}
        value={state[inputFor[0]] || ""}
        onInput={handleChange}
      />
    </div>
  );
};

export default memo(DateInput);
