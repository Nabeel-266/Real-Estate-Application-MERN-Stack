import axios from "axios";
import toastify from "../utils/toastify";
import {
  SIGN_IN,
  SIGN_UP,
  VERIFY_ACCOUNT,
  RESEND_OTP,
  CHECK_TOKEN,
  SIGN_UP_VERIFICATION,
} from "../constants/apisRoute";
import {
  checkTokenSuccess,
  resendOTPSuccess,
  signinFailure,
  signinPending,
  signinSuccess,
  signupFailure,
  signupPending,
  signupSuccess,
  verifyAccountSuccess,
} from "../app/actions/userActions";

// For SIGNUP_USER VERIFICATION
export const registerUserVerification = async (userCredentials) => {
  try {
    const response = await axios.post(
      `${SIGN_UP_VERIFICATION}`,
      userCredentials
    );
    const userDoc = response?.data;

    toastify("success", `${userDoc.message}`, "top-right", "dark", 4000);

    return userDoc;
  } catch (error) {
    throw error;
  }
};

// For SIGNUP VERIFY_USER
export const registerVerifyUser = async (userDoc, OTP, dispatch) => {
  dispatch(signupPending());

  try {
    const response = await axios.post(`${SIGN_UP}`, {
      enteredOTP: OTP,
      user: userDoc,
    });
    const newUser = response?.data?.data;
    console.log(newUser);
    dispatch(signupSuccess(newUser));

    toastify(
      "success",
      `${newUser.username}! Your Account Created Successfully`,
      "top-right",
      "dark",
      4000
    );
  } catch (error) {
    dispatch(signupFailure());
    throw error;
  }
};

// For SIGNIN USER
export const loginUser = async (userCredentials, dispatch, navigate) => {
  dispatch(signinPending());

  try {
    const response = await axios.post(`${SIGN_IN}`, userCredentials);
    const loggedInUser = response?.data?.data;
    // console.log(loggedInUser);
    dispatch(signinSuccess(loggedInUser));

    toastify(
      "success",
      `${loggedInUser.username} ! You Login Successfully`,
      "top-right",
      "dark",
      4000
    );

    if (!loggedInUser.isVerified) {
      navigate("/account/verification");
    } else {
      navigate("/");
    }
  } catch (error) {
    dispatch(signinFailure());
    throw error;
  }
};

// For VERIFY USER
export const verifyUser = async (OTP, dispatch, navigate) => {
  try {
    const response = await axios.post(
      `${VERIFY_ACCOUNT}`,
      { otp: OTP },
      { withCredentials: true }
    );
    const verifiedUser = response?.data?.data;
    // console.log(verifiedUser);
    dispatch(verifyAccountSuccess(verifiedUser));

    toastify(
      "success",
      `${verifiedUser.username} ! Your Verification Successfully`,
      "top-center",
      "dark",
      3000
    );

    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (error) {
    throw error;
  }
};

// For RESEND OTP to USER
export const resendOTPtoUser = async (userDoc) => {
  console.log(userDoc);
  try {
    const response = await axios.post(`${RESEND_OTP}`, { userDoc });
    const updatedOTPUser = response?.data?.data;
    console.log(updatedOTPUser);

    toastify(
      "success",
      "OTP has been resent successfully, Please! check your email",
      "top-right",
      "dark",
      6000
    );

    return updatedOTPUser;
  } catch (error) {
    throw error;
  }
};

// For CHECK USER Token
export const checkToken = async (dispatch) => {
  try {
    const response = await axios.get(`${CHECK_TOKEN}`);
    const refreshUser = response.data.data;
    // console.log(refreshUser);

    if (response.data.status === "Success") {
      dispatch(checkTokenSuccess(refreshUser));
    } else {
      dispatch(checkTokenSuccess(null));
    }
  } catch (error) {
    dispatch(checkTokenSuccess(null));
  }
};
