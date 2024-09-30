import { memo } from "react";

const DateInput = ({
  inputFor,
  inputType,
  labelText,
  labelStyle,
  inputStyle,
  spaceBetween,
  filterQuery,
  setQueryHanlder,
}) => {
  // Handle input change event and update the query state
  const handleChange = (e) => {
    setQueryHanlder(e.target.name, e.target.value);
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
        className={inputStyle}
        value={filterQuery[inputFor]}
        onInput={handleChange}
      />
    </div>
  );
};

export default memo(DateInput);
