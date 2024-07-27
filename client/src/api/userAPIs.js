import axios from "axios";
import toastify from "../utils/toastify";
import { UPDATE_PROFILE } from "../constants/apisRoute";
import {
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFailure,
} from "../app/actions/userActions";

// For UPDATE USER_PROFILE
export const updateUserProfile = async (userId, updatedFields, dispatch) => {
  dispatch(updateProfilePending());

  try {
    const response = await axios.post(
      `${UPDATE_PROFILE}/${userId}`,
      updatedFields
    );
    const updatedUser = response?.data?.data;
    dispatch(updateProfileSuccess(updatedUser));
    console.log(updatedUser);

    if (response?.data?.status === "Success")
      toastify(
        "success",
        `${updatedUser.username} ! Your Profile Updated Successfully`,
        "top-right",
        "dark",
        4000
      );
  } catch (error) {
    dispatch(updateProfileFailure());
    throw error;
  }
};
