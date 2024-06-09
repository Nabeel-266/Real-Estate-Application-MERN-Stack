import axios from "axios";
import {
  SIGN_IN,
  SIGN_UP,
  VERIFY_ACCOUNT,
  RESEND_OTP,
} from "../constants/apisRoute";

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
export const loginUser = async (userCredentials) => {
  try {
    const response = await axios.post(`${SIGN_IN}`, userCredentials);
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// For VERIFY USER
export const verifyUser = async (OTP) => {
  try {
    const response = await axios.post(
      `${VERIFY_ACCOUNT}`,
      { otp: OTP },
      { withCredentials: true }
    );
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// For RESEND OTP to User
export const resendOTPtoUser = async (email) => {
  try {
    const response = await axios.post(`${RESEND_OTP}`, { email });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
