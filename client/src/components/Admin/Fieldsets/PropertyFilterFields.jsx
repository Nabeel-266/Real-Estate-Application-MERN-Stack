import React from "react";

// Import Component
import RangeInput from "../Inputs/RangeInput";
import TypeInput from "../Inputs/TypeInput";
import DateInput from "../Inputs/DateInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import MinMaxInput from "../Inputs/MinMaxInput";

const PropertyFilterFields = ({ state, setStateHandler }) => {
  return (
    <>
      {/* Filter by ID Code */}
      <TypeInput
        inputFor={["idCode", "byIdCode"]}
        inputType="number"
        labelText="By Id Code"
        autoComplete="off"
        placeholder="eg. xxxxx"
        labelStyle="inputLabels"
        inputStyle="inputFields numberInput"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />
    </>
  );
};

export default PropertyFilterFields;
