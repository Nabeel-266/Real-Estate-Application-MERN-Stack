import toastify from "../utils/toastify";

const signupClientErrorHandler = (registerFormData, setError) => {
  const { username, email, password, confirmPassword } = registerFormData;
  const emailPattern =
    /^(?:[^@\s]+@(?:gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|zoho\.com|icloud\.com|protonmail\.com|aol\.com))$/;

  if (username && email && password && confirmPassword) {
    if (!username.includes(" ")) {
      setError([
        "Username",
        "Please! enter your proper fullname with space separated",
      ]);
      return false;
    } else if (username.length < 7 || username.length > 20) {
      setError([
        "Username",
        "Please! enter your name between 7 to 20 characters long",
      ]);
      return false;
    } else if (!emailPattern.test(email)) {
      setError([
        "Email",
        "Please! enter a valid Email address, your Email is invalid",
      ]);
      return false;
    } else if (password.length < 8) {
      setError(["Password", "Password must be minimum 8 characters long!"]);
      return false;
    } else if (password !== confirmPassword) {
      setError([
        "ConfirmPassword",
        "Please! Verify your Password, don't match",
      ]);
      return false;
    } else {
      return true;
    }
  } else {
    username === ""
      ? setError(["Username", "Your Fullname is required!"])
      : email === ""
      ? setError(["Email", "Your Email is required!"])
      : password === ""
      ? setError(["Password", "Your Password is required!"])
      : confirmPassword === "" &&
        setError(["ConfirmPassword", "Confirm Password is required!"]);

    return false;
  }
};

const signupServerErrorHandler = (errorMsg, setError) => {
  if (errorMsg === "User name must be 8 to 20 letters long") {
    setError([
      "Username",
      "Please! enter your name between 7 to 20 letters long",
    ]);
  } else if (errorMsg === "Email is invalid") {
    setError([
      "Email",
      "Please! enter a valid Email address, your Email is invalid",
    ]);
    return false;
  } else if (errorMsg === "User already exist") {
    setError(["Email", "Already! account created from this email"]);
  } else if (errorMsg === "Password length is short") {
    setError(["Password", "Password must be minimum 8 characters long!"]);
  } else if (errorMsg === "Passwords are not match") {
    setError(["ConfirmPassword", "Please! Verify your Password, don't match"]);
  } else {
    toastify("error", `${errorMsg}`, "top-right", "dark", 5000);
  }
};

export { signupClientErrorHandler, signupServerErrorHandler };
