import { useEffect, useState } from "react";
import { cities } from "../../../lib/dummyData";

// Import Component
import TypeInput from "../Inputs/TypeInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import DateInput from "../Inputs/DateInput";

const UserFilterFields = ({ state, setStateHandler }) => {
  const citiesName = [...cities.map((city) => city.name).sort()];

  return (
    <>
      {/* Filter by User ID Code */}
      <TypeInput
        inputFor={["idCode", "byUserIdCode"]}
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

      {/* Filter by User Name */}
      <TypeInput
        inputFor={["name", "byUserName"]}
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

      {/* Filter by User Email Address */}
      <TypeInput
        inputFor={["email", "byUserEmail"]}
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

      {/* Filter by User Mobile Number */}
      <TypeInput
        inputFor={["mobileNumber", "byUserMobileNumber"]}
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

      {/* Filter by User Live In City */}
      <SearchSelection
        selectFor={["liveInCity", "byUserLiveInCity"]}
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

      {/* Filter by User Status */}
      <SimpleSelection
        selectFor="status"
        labelText="By Status"
        placeholderText="Select a Status"
        optionsData={["Fully Active", "Partially Active", "Inactive"]}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        bottom={false}
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by User Joined On Month */}
      <DateInput
        inputFor={["joinedOn", "byUserJoinedOn"]}
        inputType="month"
        labelText="By Joined On"
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by User Last Login On Month */}
      <DateInput
        inputFor={["lastLoginOn", "byUserLastLoginOn"]}
        inputType="month"
        labelText="By Last Login On"
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by User Join On Month */}
      <DateInput
        inputFor={["lastUpdatedOn", "byUserLastUpdatedOn"]}
        inputType="month"
        labelText="By Last Updated On"
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />
    </>
  );
};

export default UserFilterFields;
