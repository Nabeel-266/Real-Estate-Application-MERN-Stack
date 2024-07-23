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
} from "../constants/apisRoute";

// Import Actions
import {
  signinFailure,
  signinPending,
  signinSuccess,
  signupFailure,
  signupPending,
  signupSuccess,
  verificationCodeSuccess,
  checkTokenSuccess,
  resendOTPSuccess,
  googleAuthSuccess,
} from "../app/actions/userActions";

// For SIGNUP USER_CREDENTIALS
export const registerUser = async (userCredentials, dispatch, navigate) => {
  try {
    const response = await axios.post(`${SIGN_UP}`, userCredentials);
    const userDoc = response?.data;

    // If User Doc updated with an OTP
    if (userDoc.status === "Success") {
      dispatch(verificationCodeSuccess(userDoc.data));

      toastify("success", `${userDoc.message}`, "top-right", "dark", 4000);

      // Navigate to the verification page
      navigate("/account/verification");
    } else {
      toastify("error", `${userDoc.message}`, "top-right", "dark", 4000);
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
    const newUser = response?.data?.data;

    if (response.data.status === "Success") {
      dispatch(signupSuccess(newUser));

      toastify(
        "success",
        `${newUser.username}! Your Account Created Successfully`,
        "top-right",
        "dark",
        4000
      );
    } else {
      toastify("error", `${response.data.message}`, "top-right", "dark", 4000);
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
    const loggedInUser = response?.data?.data;
    dispatch(signinSuccess(loggedInUser));

    toastify(
      "success",
      `${loggedInUser.username} ! You Login Successfully`,
      "top-right",
      "dark",
      4000
    );
  } catch (error) {
    dispatch(signinFailure());
    throw error;
  }
};

// For GOOGLE AUTHENTIC USER
export const googleAuth = async (userCredentials, dispatch) => {
  try {
    const response = await axios.post(`${GOOGLE_AUTH}`, userCredentials);
    const authenticUser = response?.data?.data;
    dispatch(googleAuthSuccess(authenticUser));

    toastify(
      "success",
      `${authenticUser.username} ! You Login Successfully`,
      "top-right",
      "dark",
      4000
    );
  } catch (error) {
    dispatch(signinFailure());
    throw error;
  }
};

// For RESEND OTP to USER
export const resendOTPtoUser = async (userDoc, dispatch) => {
  console.log(userDoc);
  try {
    const response = await axios.post(`${RESEND_OTP}`, userDoc);
    const updatedOTPUser = response?.data;

    if (updatedOTPUser.status === "Success") {
      dispatch(resendOTPSuccess(updatedOTPUser.data));

      toastify(
        "success",
        "OTP has been resent successfully, Please! check your email",
        "top-right",
        "dark",
        6000
      );
    } else {
      toastify("error", `${updatedOTPUser.message}`, "top-right", "dark", 4000);
    }
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
