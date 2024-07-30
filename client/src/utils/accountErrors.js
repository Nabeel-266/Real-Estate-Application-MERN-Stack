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
  if (errorMsg === "User name must be 8 to 20 letters long") {
    setError([
      "Username",
      "Please! enter your name between 7 to 20 letters long",
    ]);
  } else if (errorMsg === "Email is invalid") {
    setError([
      "Email",
      "Please! enter a valid email address, your Email is invalid",
    ]);
  } else if (errorMsg === "User already exist") {
    setError(["Email", "Already! account created from this email"]);
  } else if (errorMsg === "Password length is short") {
    setError(["Password", "Password must be minimum 8 characters long!"]);
  } else if (errorMsg === "Passwords are not match") {
    setError(["ConfirmPassword", "Please! Verify your Password, don't match"]);
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
