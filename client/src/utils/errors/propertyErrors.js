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
    if (images && images.length < 3) {
      setError(["images", "Please! upload at least 3 Property Images."]);
      return false;
    } else if (contactNumber.split(" ")[1].length !== 10) {
      setError(["contactNumber", "Invalid mobile number"]);
      return false;
    } else if (!username.includes(" ")) {
      setError([
        "name",
        "Please! enter your proper fullname with space separated",
      ]);
      return false;
    } else {
      return true;
    }
  } else {
    toastify("error", "Missing Required Field!", "top-right", "dark", 5000);

    !purpose
      ? setError(["purpose", "Property Purpose is required."])
      : !category
      ? setError(["category", "Property Category is required."])
      : !type
      ? setError(["type", "Property Type is required."])
      : !city
      ? setError(["city", "City is required."])
      : !coordinates
      ? setError(["coordinates", "Location Coordinates is required."])
      : !size
      ? setError(["size", "Property Size is required."])
      : !price
      ? setError(["price", "Property Price is required."])
      : !condition
      ? setError(["condition", "Property Condition is required."])
      : !images
      ? setError(["images", "Property Images is required."])
      : !contactNumber
      ? setError(["contactNumber", "Contact Number is required."])
      : !username && setError(["name", "Your Name is required."]);

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
