import { memo, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeInput = ({
  inputFor,
  minValue,
  maxValue,
  labelText,
  spaceBetween,
  filterQuery,
  setQueryHanlder,
}) => {
  const [range, setRange] = useState([
    filterQuery[`min${inputFor}`] || minValue,
    filterQuery[`max${inputFor}`] || maxValue,
  ]);

  const handleChange = (newValues) => {
    if (newValues[0] !== range[0] && newValues[0] > minValue) {
      setQueryHanlder(`min${inputFor}`, newValues[0]);
    } else if (newValues[0] === minValue) {
      setQueryHanlder(`min${inputFor}`, "");
    }

    if (newValues[1] !== range[1] && newValues[1] < maxValue) {
      setQueryHanlder(`max${inputFor}`, newValues[1]);
    } else if (newValues[1] === maxValue) {
      setQueryHanlder(`max${inputFor}`, "");
    }

    setRange(newValues);
  };

  return (
    <div className={spaceBetween}>
      <label className="text-[1.6rem] leading-[1.6rem] font-bold text-theme-blue px-[0.5rem]">
        {labelText}: {range[0]} - {range[1]}
      </label>

      <div className="px-[1rem]">
        <Range
          values={range}
          step={1}
          min={minValue}
          max={maxValue}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              key={props.key}
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: range,
                    colors: ["#ccc", "#082835", "#ccc"],
                    min: minValue,
                    max: maxValue,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                style={{
                  ...restProps.style,
                  height: "2rem",
                  width: "2rem",
                  borderRadius: "50%",
                  backgroundColor: "#082835",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 5px 5px #00000015",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    height: "1rem",
                    width: "0.4rem",
                    borderRadius: "10px",
                    backgroundColor: isDragged ? "#fbbf24" : "#fff",
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default memo(RangeInput);
