import { setLoading, setError, setUser } from "../slices/userSlice.js";

//* For Signup User Actions
export const signupPending = () => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
};

export const signupSuccess = (user) => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setUser(user));
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
  dispatch(setUser(user));
};

export const signinFailure = () => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setError(true));
};

//* For Verify User Account Action
export const verifyAccountSuccess = (user) => (dispatch) => {
  dispatch(setUser(user));
};

//* For Check User Token Action
export const checkTokenSuccess = (user) => (dispatch) => {
  dispatch(setUser(user));
};

// export const logout = () => (dispatch) => {
//   dispatch(resetUser());
// };

// export const updateSuccess = (user) => (dispatch) => {
//   dispatch(setLoading(false));
//   dispatch(setUser(user));
// };

// export const uploadImgSuccess = (imgUrl) => (dispatch) => {
//   dispatch(setLoading(false));
//   dispatch(updateUserProfileImg(imgUrl));
// };

// export const updatePasswordSuccess = (user) => (dispatch) => {
//   dispatch(setLoading(false));
//   dispatch(setUser(user));
// };
