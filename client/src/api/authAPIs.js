import axios from "axios";
import { VERIFY_ACCOUNT, SIGN_UP } from "../constants/apisRoute";

// For SIGNUP
export const registerUser = async (formData) => {
  const { username, email, password, confirmPassword } = formData;

  const userFullname = username?.trim()?.split(" ");

  const firstname =
    userFullname[0]?.charAt(0).toLocaleUpperCase() +
    userFullname[0]?.slice(1).toLocaleLowerCase();

  const lastname =
    userFullname[1]?.charAt(0).toLocaleUpperCase() +
    userFullname[1]?.slice(1).toLocaleLowerCase();

  const userCredentials = {
    username: `${firstname} ${lastname}`,
    email: email,
    password,
    confirmPassword,
  };

  try {
    const response = await axios.post(`${SIGN_UP}`, userCredentials);
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// For SIGNIN
export const loginUser = async () => {};

// For VERIFY USER
export const verifyUser = async (OTP) => {
  console.log("verify user Func");
  try {
    const response = await axios.post(
      `${VERIFY_ACCOUNT}`,
      { OTP },
      { withCredentials: true }
    );
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
