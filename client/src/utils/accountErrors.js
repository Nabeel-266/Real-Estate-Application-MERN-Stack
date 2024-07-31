import toastify from "../utils/toastify";

const emailPattern =
  /^(?:[^@\s]+@(?:gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|zoho\.com|icloud\.com|protonmail\.com|aol\.com))$/;

const recoveryEmailClientErrorHandler = (
  recoveryEmailCredentials,
  setError
) => {
  const { recoveryEmail, accountPassword } = recoveryEmailCredentials;

  if (recoveryEmail && accountPassword) {
    if (!emailPattern.test(recoveryEmail)) {
      setError([
        "Email",
        "Please! enter a valid email address, your Email is invalid",
      ]);
      return false;
    } else {
      return true;
    }
  } else {
    !recoveryEmail
      ? setError(["Email", "Recovery Email is required!"])
      : !accountPassword === ""
      ? setError(["Password", "Account Password is required!"])
      : !recoveryEmail &&
        !accountPassword &&
        toastify(
          "error",
          "Empty Fields! all fields are required.",
          "top-right",
          "dark",
          5000
        );

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

export { recoveryEmailClientErrorHandler, recoveryEmailServerErrorHandler };
