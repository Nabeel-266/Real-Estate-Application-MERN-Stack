import { useEffect, useState } from "react";
import { cities } from "../../../lib/dummyData";
import { typesOfProperty } from "../../../lib/dummyDataAdmin";

// Import Component
import TypeInput from "../Inputs/TypeInput";
import SearchSelection from "../Selections/SearchSelection";
import SimpleSelection from "../Selections/SimpleSelection";
import MinMaxInput from "../Inputs/MinMaxInput";

const PropertyFilterFields = ({ state, setStateHandler }) => {
  const [propertyTypes, setPropertyTypes] = useState(typesOfProperty);
  const citiesName = [...cities.map((city) => city.name).sort()];

  useEffect(() => {
    if (state.category === "Residential") {
      return setPropertyTypes([
        "House",
        "Appartment",
        "House Portion",
        "Room",
        "Basement",
        "Farm House",
        "Guest House",
        "Hostel",
        "Hotel",
      ]);
    } else if (state.category === "Commercial") {
      return setPropertyTypes([
        "Office",
        "Shop",
        "Restaurant",
        "Warehouse",
        "Hall",
        "Plaza",
        "Gym",
        "Theatre",
        "Factory",
      ]);
    } else if (state.category === "Plot") {
      return setPropertyTypes([
        "Residential Plot",
        "Commercial Plot",
        "Farmhouse Plot",
        "Agricultural Land",
        "Industrial Land",
      ]);
    } else {
      return setPropertyTypes(typesOfProperty);
    }
  }, [state.category]);

  return (
    <>
      {/* Filter by Property ID Code */}
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

      {/* Filter by Property Purpose */}
      <SimpleSelection
        selectFor="purpose"
        labelText="By Property Purpose"
        placeholderText="Select a Property Purpose"
        optionsData={["Sale", "Rent"]}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        bottom={true}
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Property Category */}
      <SimpleSelection
        selectFor="category"
        labelText="By Property Category"
        placeholderText="Select a Property Category"
        optionsData={["Residential", "Commercial", "Plot"]}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        bottom={true}
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Property Type */}
      <SearchSelection
        selectFor={["type", "byType"]}
        labelText="By Property Type"
        placeholderText="Select a Property Type"
        noOptionMessage="No Property-Type Found."
        optionsData={propertyTypes}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        bottom={true}
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Property Demand */}
      <MinMaxInput
        inputFor="Price"
        inputTag="Price"
        labelText="By Property Demand"
        labelStyle="inputLabels"
        inputStyle="inputFields pr-[1rem] focus:border-theme-blue"
        padMinMax={["10rem", "10.4rem"]}
        contStyle="space-y-[0.6rem]"
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Property City */}
      <SearchSelection
        selectFor={["city", "byCity"]}
        labelText="By Property City"
        placeholderText="Select a City"
        noOptionMessage="No City Found."
        optionsData={citiesName}
        labelStyle="inputLabels"
        inputStyle="inputFields"
        contStyle="space-y-[0.6rem]"
        bottom={false}
        state={state}
        setStateHandler={setStateHandler}
      />

      {/* Filter by Property Status */}
      <SimpleSelection
        selectFor="status"
        labelText="By Property Status"
        placeholderText="Select a Property Status"
        optionsData={[
          "Pending",
          "Published",
          "Finalized",
          "Rejected",
          "Removed",
        ]}
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

export default PropertyFilterFields;
