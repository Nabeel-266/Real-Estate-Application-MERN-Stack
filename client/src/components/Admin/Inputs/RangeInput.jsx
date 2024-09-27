import { memo } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeInput = ({
  minValue,
  maxValue,
  range,
  setRange,
  labelText,
  spaceBetween,
}) => {
  const handleChange = (newValues) => {
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
