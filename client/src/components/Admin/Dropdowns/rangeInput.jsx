import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeSlider = ({ minAge, maxAge, range, setRange }) => {
  const handleChange = (newValues) => {
    setRange(newValues);
  };

  return (
    <Range
      values={range}
      step={1}
      min={minAge}
      max={maxAge}
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
                min: minAge,
                max: maxAge,
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
              boxShadow: "0px 12px 6px #00000020",
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
  );
};

export default RangeSlider;
