import toastify from "../toastify";

const addPropertyClientErrorHandler = (propertyDetails, setError) => {
  const {
    purpose,
    category,
    type,
    city,
    coordinates,
    size,
    price,
    condition,
    images,
    contactNumber,
    username,
    description,
    bedroom,
    bathroom,
    features,
    availability,
  } = propertyDetails;

  if (
    purpose &&
    category &&
    type &&
    city &&
    coordinates &&
    size &&
    price &&
    condition &&
    images &&
    username &&
    contactNumber
  ) {
    return true;
  } else {
    toastify("error", "Missing Required Field!", "top-right", "dark", 5000);

    if (!purpose) {
      setError(["purpose", "Property Purpose is required."]);
    } else if (!category) {
      setError(["category", "Property Category is required."]);
    } else if (!type) {
      setError(["type", "Property Type is required."]);
    } else if (!city) {
      setError(["city", "City is required."]);
    } else if (!coordinates) {
      setError(["coordinates", "Location Coordinates is required."]);
    } else if (!size) {
      setError(["size", "Property Size is required."]);
    } else if (!price) {
      setError(["price", "Property Price is required."]);
    } else if (!condition) {
      setError(["condition", "Property Condition is required."]);
    } else if (!images) {
      setError(["images", "Property Images is required."]);
    } else if (!contactNumber) {
      setError(["contactNumber", "Contact Number is required."]);
    } else if (!username) {
      setError(["name", "Your Name is required."]);
    } else {
      true;
    }

    return false;
  }
};

const recoveryEmailServerErrorHandler = (errorMsg, setError) => {
  if (errorMsg === "Password is incorrect") {
    setError(["Password", "Password is incorrect"]);
  } else if (errorMsg === "OTP is invalid") {
    setError(["OTP", "OTP Code is invalid"]);
  } else {
    toastify(
      "error",
      `Your request has failed due to a server error. Please try again in a few minutes.`,
      "top-right",
      "dark",
      5000
    );
  }
};

export { addPropertyClientErrorHandler, recoveryEmailServerErrorHandler };
