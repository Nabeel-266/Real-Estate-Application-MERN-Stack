import toastify from "../toastify";

const emailPattern =
  /^(?:[^@\s]+@(?:gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|zoho\.com|icloud\.com|protonmail\.com|aol\.com))$/;

const signupClientErrorHandler = (registerFormData, setError) => {
  const { username, email, password, confirmPassword } = registerFormData;

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
    } else if (email.startsWith(" ") || email.endsWith(" ")) {
      setError([
        "Email",
        "Please! enter a valid email address, unknown spaces in your email",
      ]);
      return false;
    } else if (!emailPattern.test(email)) {
      setError([
        "Email",
        "Please! enter a valid email address, your Email is invalid",
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

const signinClientErrorHandler = (loginFormData, setError) => {
  const { email, password } = loginFormData;

  if (email && password) {
    if (!emailPattern.test(email)) {
      setError([
        "Email",
        "Please! enter a valid Email address, your Email is invalid",
      ]);
      return false;
    } else {
      return true;
    }
  } else {
    email === ""
      ? setError(["Email", "Your Email is required!"])
      : password === "" && setError(["Password", "Your Password is required!"]);

    return false;
  }
};

const signinServerErrorHandler = (errorMsg, setError) => {
  if (errorMsg === "Email is invalid") {
    setError([
      "Email",
      "Please! enter a valid Email address, your Email is invalid",
    ]);
  } else if (errorMsg === "Email doesn't exists") {
    setError(["Email", "Your email address doesn't exist"]);
  } else if (errorMsg === "Password is incorrect") {
    setError(["Password", "Your password is incorrect"]);
  } else {
    toastify("error", `${errorMsg}`, "top-right", "dark", 5000);
  }
};

const forgotPasswordErrorHandler = (email, setError) => {
  if (email) {
    if (!emailPattern.test(email)) {
      setError("Please! enter a valid email address, your email is invalid");
      return false;
    } else {
      return true;
    }
  } else {
    setError("Email is required!");
    return false;
  }
};

export {
  signupClientErrorHandler,
  signupServerErrorHandler,
  signinClientErrorHandler,
  signinServerErrorHandler,
  forgotPasswordErrorHandler,
};
