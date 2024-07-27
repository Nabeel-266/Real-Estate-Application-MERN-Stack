import {
  setLoading,
  setError,
  setAuthUser,
  setUnAuthUser,
} from "../slices/userSlice.js";

//* For Signup User Actions
export const signupPending = () => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
};

export const signupSuccess = (user) => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setAuthUser(user));
  dispatch(setUnAuthUser(null));
};

export const signupFailure = () => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setError(true));
};

//* For Signin User Actions
export const signinPending = () => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
};

export const signinSuccess = (user) => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setAuthUser(user));
};

export const signinFailure = () => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setError(true));
};

// //* For Google Auth User Action
export const googleAuthSuccess = (user) => (dispatch) => {
  dispatch(setAuthUser(user));
};

//* For User Verification Code Action
export const verificationCodeSuccess = (user) => (dispatch) => {
  dispatch(setUnAuthUser(user));
};

//* For Resend OTP to User Action
export const resendOTPSuccess = (user) => (dispatch) => {
  dispatch(setUnAuthUser(user));
};

//* For Check User Token Action
export const checkTokenSuccess = (user) => (dispatch) => {
  dispatch(setAuthUser(user));
};

//* For Update User Profile Actions
export const updateProfilePending = () => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
};

export const updateProfileSuccess = (user) => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setAuthUser(user));
};

export const updateProfileFailure = () => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setError(true));
};

// export const logout = () => (dispatch) => {
//   dispatch(resetAuthUser());
// };

// export const updateSuccess = (user) => (dispatch) => {
//   dispatch(setLoading(false));
//   dispatch(setAuthUser(user));
// };

// export const uploadImgSuccess = (imgUrl) => (dispatch) => {
//   dispatch(setLoading(false));
//   dispatch(updateUserProfileImg(imgUrl));
// };

// export const updatePasswordSuccess = (user) => (dispatch) => {
//   dispatch(setLoading(false));
//   dispatch(setAuthUser(user));
// };
