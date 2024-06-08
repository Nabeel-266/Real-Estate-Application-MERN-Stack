import { setLoading, setError, setUser } from "../slices/userSlice.js";

//* For Signup Actions
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

//* For Signin Actions
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