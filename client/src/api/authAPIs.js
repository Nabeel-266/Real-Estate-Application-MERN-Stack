import axios from "axios";
import toastify from "../utils/toastify";

// Import Routes
import {
  SIGN_UP,
  SIGN_UP_VERIFICATION,
  SIGN_IN,
  GOOGLE_AUTH,
  RESEND_OTP,
  CHECK_TOKEN,
  FORGOT_PASSWORD,
  LOGOUT,
} from "../constants/apisRoute";

// Import Actions
import {
  signupVerifyOtpSendSuccess,
  signupFailure,
  signupPending,
  signupSuccess,
  signinFailure,
  signinPending,
  signinSuccess,
  checkTokenSuccess,
  resendOTPSuccess,
  googleAuthSuccess,
  signoutSuccess,
} from "../app/actions/userActions";

// For SIGNUP USER_CREDENTIALS
export const registerUser = async (userCredentials, dispatch, navigate) => {
  try {
    const response = await axios.post(`${SIGN_UP}`, userCredentials);
    const responseData = response?.data;

    if (responseData.status === "Success") {
      dispatch(signupVerifyOtpSendSuccess(responseData.result));

      toastify("success", responseData.message, "top-right", "dark", 4000);

      // Navigate to the verification page
      navigate("/account/verification");
    }
  } catch (error) {
    throw error;
  }
};

// For SIGNUP USER_VERIFICATION
export const registerUserVerification = async (userDoc, OTP, dispatch) => {
  dispatch(signupPending());

  try {
    const response = await axios.post(`${SIGN_UP_VERIFICATION}`, {
      enteredOTP: OTP,
      user: userDoc,
    });
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      dispatch(signupSuccess(responseData.result));

      toastify(
        "success",
        `${responseData.result.username}! Your Account Created Successfully`,
        "top-right",
        "dark",
        4000
      );
    }
  } catch (error) {
    dispatch(signupFailure());
    throw error;
  }
};

// For SIGNIN USER
export const loginUser = async (userCredentials, dispatch) => {
  dispatch(signinPending());

  try {
    const response = await axios.post(`${SIGN_IN}`, userCredentials);
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      dispatch(signinSuccess(responseData.result));

      toastify(
        "success",
        `${responseData.result.username} ! You Login Successfully`,
        "top-right",
        "dark",
        4000
      );
    }
  } catch (error) {
    dispatch(signinFailure());
    throw error;
  }
};

// For GOOGLE AUTHENTIC USER
export const googleAuth = async (userCredentials, dispatch) => {
  try {
    const response = await axios.post(`${GOOGLE_AUTH}`, userCredentials);
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      dispatch(googleAuthSuccess(responseData.result));

      toastify(
        "success",
        `${responseData.result.username} ! You Login Successfully`,
        "top-right",
        "dark",
        4000
      );
    }
  } catch (error) {
    dispatch(signinFailure());
    throw error;
  }
};

// For RESEND OTP to USER
export const resendOTPtoUser = async (userDoc, dispatch) => {
  try {
    const response = await axios.post(`${RESEND_OTP}`, userDoc);
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      dispatch(resendOTPSuccess(responseData.result));

      toastify("success", responseData.message, "top-right", "dark", 6000);
    } else {
      toastify("error", `${updatedOTPUser.message}`, "top-right", "dark", 4000);
    }
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${FORGOT_PASSWORD}`, { email });
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      toastify("success", responseData.message, "top-right", "dark", 6000);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

// For CHECK USER Token
export const checkToken = async (dispatch) => {
  try {
    const response = await axios.get(`${CHECK_TOKEN}`);
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      dispatch(checkTokenSuccess(responseData.result));
    } else {
      dispatch(checkTokenSuccess(null));
    }
  } catch (error) {
    dispatch(checkTokenSuccess(null));
  }
};

// For LOGOUT USER
export const logoutUser = async (dispatch) => {
  try {
    const response = await axios.post(`${LOGOUT}`);
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      setTimeout(() => {
        dispatch(signoutSuccess());
      }, 1000);
    } else {
      throw new Error("Failed to Logout");
    }
  } catch (error) {
    throw error;
  }
};

// For VERIFY USER
// export const verifyUser = async (OTP, dispatch, navigate) => {
//   try {
//     const response = await axios.post(
//       `${VERIFY_ACCOUNT}`,
//       { otp: OTP },
//       { withCredentials: true }
//     );
//     const verifiedUser = response?.data?.data;
//     // console.log(verifiedUser);
//     dispatch(verifyAccountSuccess(verifiedUser));

//     toastify(
//       "success",
//       `${verifiedUser.username} ! Your Verification Successfully`,
//       "top-center",
//       "dark",
//       3000
//     );

//     setTimeout(() => {
//       navigate("/");
//     }, 2000);
//   } catch (error) {
//     throw error;
//   }
// };
