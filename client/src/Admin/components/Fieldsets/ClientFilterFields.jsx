import { useEffect, useState } from "react";
import { cities } from "../../../lib/dummyData";

// Import Component
import TypeInput from "../Inputs/TypeInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import MinMaxInput from "../Inputs/MinMaxInput";

const ClientFilterFields = ({ state, setStateHandler }) => {
  const citiesName = [...cities.map((city) => city.name).sort()];

  return (
    <>
      {/* Filter by Client ID Code */}
      <TypeInput
        inputFor={["idCode", "byClientIdCode"]}
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

      {/* Filter by Client Name */}
      <TypeInput
        inputFor={["name", "byClientName"]}
        inputType="text"
        labelText="By Name"
        autoComplete="off"
        placeholder="eg. Ahmed Bilal"
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Client Email Address */}
      <TypeInput
        inputFor={["email", "byClientEmail"]}
        inputType="text"
        labelText="By Email Address"
        autoComplete="off"
        placeholder="eg. abc@example.com"
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Client Mobile Number */}
      <TypeInput
        inputFor={["mobileNumber", "byClientMobileNumber"]}
        inputType="number"
        labelText="By Mobile Number"
        autoComplete="off"
        placeholder="eg. 03xxxxxxxxx"
        labelStyle="inputLabels"
        inputStyle="inputFields numberInput"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Client Live In City */}
      <SearchSelection
        selectFor={["liveInCity", "byClientLiveInCity"]}
        labelText="By City"
        placeholderText="Select a City"
        noOptionMessage="No City Found."
        optionsData={citiesName}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Client Role */}
      <SimpleSelection
        selectFor="role"
        labelText="By Role"
        placeholderText="Select a Role"
        optionsData={["Buyer", "Seller", "B-S Both"]}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        bottom={false}
        state={state}
        setStateHandler={setStateHandler}
      />
    </>
  );
};

export default ClientFilterFields;
