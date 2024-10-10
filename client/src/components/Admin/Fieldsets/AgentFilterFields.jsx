import React from "react";
import { cities } from "../../../lib/dummyData";

// Import Component
import RangeInput from "../Inputs/RangeInput";
import TypeInput from "../Inputs/TypeInput";
import DateInput from "../Inputs/DateInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import MinMaxInput from "../Inputs/MinMaxInput";

const AgentFilterFields = ({ state, setStateHandler }) => {
  const citiesName = [...cities.map((city) => city.name).sort()];

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

      {/* Filter by Name */}
      <TypeInput
        inputFor={["name", "byName"]}
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

      {/* Filter by Email Address */}
      <TypeInput
        inputFor={["email", "byEmail"]}
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

      {/* Filter by Phone Number */}
      <TypeInput
        inputFor={["mobileNumber", "byMobileNumber"]}
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

      {/* Filter by CNIC Number */}
      <TypeInput
        inputFor={["cnicNumber", "byCNICNumber"]}
        inputType="number"
        labelText="By CNIC Number"
        autoComplete="off"
        placeholder="eg. 42101xxxxxxxx"
        labelStyle="inputLabels"
        inputStyle="inputFields numberInput"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Age */}
      <RangeInput
        inputFor="Age"
        minValue={20}
        maxValue={60}
        labelText="By Age"
        contStyle="space-y-[0.3rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Joining Date */}
      <DateInput
        inputFor={["joiningDate", "byJoiningDate"]}
        inputType="month"
        labelText="By Joining Month"
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Operting City */}
      <SearchSelection
        selectFor={["operatingCity", "byOperatingCity"]}
        labelText="By Operating City"
        placeholderText="Select a City"
        noOptionMessage="No City Found."
        optionsData={citiesName}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* By Experience Badge */}
      <SimpleSelection
        selectFor="experienceBadge"
        labelText="By Experience Badge"
        placeholderText="Select a Badge"
        optionsData={["Junior", "Mid-Level", "Senior", "Expert"]}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHanlder={setStateHandler}
      />

      {/* By Status */}
      <SimpleSelection
        selectFor="status"
        labelText="By Status"
        placeholderText="Select a Status"
        optionsData={["Active", "Not Active"]}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHanlder={setStateHandler}
      />

      {/* By Success Deals */}
      <MinMaxInput
        inputFor="SuccessDeals"
        inputTag="Deal"
        labelText="By Success Deals"
        labelStyle="inputLabels"
        inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
        padMinMax={["10rem", "10.4rem"]}
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* By Total Earned */}
      <MinMaxInput
        inputFor="TotalEarn"
        inputTag="PKR"
        labelText="By Total Earned"
        labelStyle="inputLabels"
        inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
        padMinMax={["9.6rem", "10rem"]}
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* By Highest Earned */}
      <MinMaxInput
        inputFor="HighestEarn"
        inputTag="PKR"
        labelText="By Highest Earned"
        labelStyle="inputLabels"
        inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
        padMinMax={["9.6rem", "10rem"]}
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />
    </>
  );
};

export default AgentFilterFields;
