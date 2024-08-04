import toastify from "../utils/toastify";

const emailPattern =
  /^(?:[^@\s]+@(?:gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|zoho\.com|icloud\.com|protonmail\.com|aol\.com))$/;

const recoveryEmailClientErrorHandler = (
  Credentials,
  currentUser,
  setError
) => {
  const { recoveryEmail, accountPassword } = Credentials;

  if (recoveryEmail && accountPassword) {
    if (!emailPattern.test(recoveryEmail)) {
      setError(["Email", "Please! enter a valid email, your email is invalid"]);
      return false;
    } else if (
      currentUser?.email === recoveryEmail ||
      currentUser?.recoveryEmail === recoveryEmail
    ) {
      setError([
        "Email",
        "This recovery email is already in use for your account.",
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

const changeEmailClientErrorHandler = (Credentials, currentUser, setError) => {
  const { recoveryEmail, accountPassword } = Credentials;

  if (recoveryEmail && accountPassword) {
    if (!emailPattern.test(recoveryEmail)) {
      setError(["Email", "Please! enter a valid email, your email is invalid"]);
      return false;
    } else if (
      !currentUser.hasOwnProperty("recoveryEmail") ||
      currentUser.recoveryEmail !== recoveryEmail
    ) {
      setError(["Email", "Your recovery email is wrong."]);
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

const changeEmailServerErrorHandler = (errorMsg, setError) => {
  if (errorMsg === "Your recovery email is invalid") {
    setError(["Email", "Please! enter a valid email, your email is invalid"]);
  } else if (errorMsg === "Your recovery email is wrong") {
    setError(["Email", errorMsg]);
  } else if (errorMsg.includes("set recovery email first")) {
    setError(["Email", errorMsg]);
  } else if (errorMsg === "Password is incorrect") {
    setError(["Password", errorMsg]);
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

export {
  recoveryEmailClientErrorHandler,
  recoveryEmailServerErrorHandler,
  changeEmailClientErrorHandler,
  changeEmailServerErrorHandler,
};
