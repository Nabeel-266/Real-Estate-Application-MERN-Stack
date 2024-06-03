const registrationErrorHandler = (registerFormData, setError, errorMsg) => {
  const { username, email, password, confirmPassword } = registerFormData;
  const emailPattern =
    /^(?:[^@\s]+@(?:gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|zoho\.com|icloud\.com|protonmail\.com|aol\.com))$/;

  if (username && email && password && confirmPassword) {
    if (!username.includes(" ")) {
      setError([
        "Username",
        "Please! enter your proper Fullname with space separated",
      ]);
      return false;
    } else if (username.length > 20) {
      setError(["Username", "Your name must be 20 characters or fewer"]);
      return false;
    } else if (!emailPattern.test(email) || errorMsg === "Email is invalid") {
      setError([
        "Email",
        "Please! enter a valid Email address, your Email is invalid",
      ]);
      return false;
    } else if (errorMsg === "User already exist") {
      setError(["Email", "This email address is already in use!"]);
      return false;
    } else if (password.length < 8 || errorMsg === "Password length is short") {
      setError(["Password", "Password must be minimum 8 characters long!"]);
      return false;
    } else if (
      password !== confirmPassword ||
      errorMsg === "Passwords are not match"
    ) {
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
      ? setError(["Password", "Your Email is required!"])
      : confirmPassword === "" &&
        setError(["ConfirmPassword", "Your Email is required!"]);

    return false;
  }
};

export default registrationErrorHandler;
