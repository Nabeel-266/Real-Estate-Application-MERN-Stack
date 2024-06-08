import axios from "axios";
import { VERIFY_ACCOUNT, SIGN_UP, RESEND_OTP } from "../constants/apisRoute";

// For SIGNUP USER
export const registerUser = async (userCredentials) => {
  try {
    const response = await axios.post(`${SIGN_UP}`, userCredentials);
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// For SIGNIN USER
export const loginUser = async () => {};

// For VERIFY USER
export const verifyUser = async (OTP) => {
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

// For RESEND OTP
export const resendOTP = async (email) => {
  try {
    const response = await axios.post(`${RESEND_OTP}`, { email });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
