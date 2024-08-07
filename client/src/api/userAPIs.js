import axios from "axios";
import toastify from "../utils/toastify";
import {
  DELETE_ACCOUNT,
  SEND_CHANGE_EMAIL_LINK,
  SEND_CHANGE_PASSWORD_LINK,
  SEND_RECOVERY_EMAIL_OTP,
  UPDATE_PROFILE,
  UPLOAD_PROFILE_PIC,
  VERIFY_RECOVERY_EMAIL_OTP,
} from "../constants/apisRoute";
import {
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFailure,
  addRecoveryEmailSuccess,
  deleteAccountSuccess,
} from "../app/actions/userActions";

// For UPDATE USER_PROFILE
export const updateUserProfile = async (userId, updatedFields, dispatch) => {
  dispatch(updateProfilePending());

  try {
    let response;

    if (updatedFields.hasOwnProperty("profilePicture")) {
      const formData = new FormData();
      formData.append("Profile_Pic", updatedFields.profilePicture);

      const uploadImageResponse = await axios.post(
        `${UPLOAD_PROFILE_PIC}`,
        formData
      );

      // If Upload Image is successfull then update profile
      if (uploadImageResponse?.data?.status === "Success") {
        const uploadImageURL = uploadImageResponse?.data?.result;

        response = await axios.patch(`${UPDATE_PROFILE}/${userId}`, {
          ...updatedFields,
          profilePicture: uploadImageURL,
        });
      }
    } else {
      response = await axios.patch(
        `${UPDATE_PROFILE}/${userId}`,
        updatedFields
      );
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

// For SEND USER_RECOVERY_EMAIL OTP
export const sendUserRecoveryEmailOTP = async (credentials) => {
  try {
    const response = await axios.post(
      `${SEND_RECOVERY_EMAIL_OTP}`,
      credentials
    );
    const responseData = response?.data;
    console.log(responseData);

    if (responseData?.status === "Success") {
      return responseData.result;
    }
  } catch (error) {
    console.log(error, "==> error in Add User Recovery Email");
    throw error;
  }
};

// For VERIFY OTP & UPDATE USER_RECOVERY_EMAIL
export const verifyUserRecoveryEmailOTP = async (credentials, dispatch) => {
  try {
    const response = await axios.patch(
      `${VERIFY_RECOVERY_EMAIL_OTP}`,
      credentials
    );
    const responseData = response?.data;
    console.log(responseData);

    if (responseData?.status === "Success") {
      dispatch(addRecoveryEmailSuccess(responseData.result));

      toastify(
        "success",
        `Dear ${responseData.result.username}, \nYour Recovery Email added successfully in your account`,
        "top-right",
        "dark",
        4000
      );
    }
  } catch (error) {
    console.log(error, "==> error in Verify User Recovery Email");
    throw error;
  }
};

// For SEND USER_CHANGE_EMAIL_LINK
export const sendChangeEmailLink = async (credentials) => {
  try {
    const response = await axios.post(`${SEND_CHANGE_EMAIL_LINK}`, credentials);
    const responseData = response?.data;
    console.log(responseData);

    if (responseData?.status === "Success") {
      toastify(
        "success",
        `Dear ${responseData.result.username}, ${responseData.message}`,
        "top-right",
        "dark",
        4000
      );

      return responseData.result;
    }
  } catch (error) {
    console.log(error, "==> error in Add User Recovery Email");
    throw error;
  }
};

// For SEND USER_CHANGE_PASSWORD_LINK
export const sendChangePasswordLink = async (email) => {
  try {
    const response = await axios.post(`${SEND_CHANGE_PASSWORD_LINK}`, {
      email,
    });
    const responseData = response?.data;
    console.log(responseData);

    if (responseData?.status === "Success") {
      toastify("success", `${responseData.message}`, "top-right", "dark", 4000);

      return responseData.result;
    }
  } catch (error) {
    console.log(error, "==> error in Add User Recovery Email");
    throw error;
  }
};

// For DELETE USER_ACCOUNT
export const deleteAccount = async (userId, email, password, dispatch) => {
  try {
    const response = await axios.delete(`${DELETE_ACCOUNT}/${userId}`, {
      headers: {
        email,
        password,
      },
    });
    const responseData = response?.data;

    if (responseData?.status === "Success") {
      toastify(
        "success",
        `Dear ${responseData.result.username}! Your Account deleted Successfully`,
        "top-right",
        "dark",
        3000
      );

      dispatch(deleteAccountSuccess());
    }
  } catch (error) {
    console.log(error, "==> error in Delete User Account");
    throw error;
  }
};
