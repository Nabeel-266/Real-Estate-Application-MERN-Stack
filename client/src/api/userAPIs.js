import axios from "axios";
import toastify from "../utils/toastify";
import { UPDATE_PROFILE, UPLOAD_PROFILE_PIC } from "../constants/apisRoute";
import {
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFailure,
} from "../app/actions/userActions";

// For UPDATE USER_PROFILE
export const updateUserProfile = async (userId, updatedFields, dispatch) => {
  // dispatch(updateProfilePending());

  try {
    let response;

    if (updatedFields.hasOwnProperty("profilePicture")) {
      const formData = new FormData();
      formData.append("Profile_Pic", updatedFields.profilePicture);

      const uploadImageResponse = await axios.post(
        `${UPLOAD_PROFILE_PIC}`,
        formData
      );
      console.log(uploadImageResponse);

      // If Upload Image is successfull then update profile
      if (uploadImageResponse?.data?.status === "Success") {
        const uploadImageURL = uploadImageResponse?.data?.result;

        response = await axios.post(`${UPDATE_PROFILE}/${userId}`, {
          ...updatedFields,
          profilePicture: uploadImageURL,
        });
      }
    } else {
      response = await axios.post(`${UPDATE_PROFILE}/${userId}`, updatedFields);
    }

    const responseData = response?.data;

    if (responseData?.status === "Success") {
      dispatch(updateProfileSuccess(responseData.result));

      toastify(
        "success",
        `${responseData.result.username} ! Your Profile Updated Successfully`,
        "top-right",
        "dark",
        4000
      );
    }
  } catch (error) {
    dispatch(updateProfileFailure());
    throw error;
  }
};
