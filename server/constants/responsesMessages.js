const resMessages = {
  GET_SUCCESS_MESSAGES: "Got Resource Successfully",
  GET_UNSUCCESS_MESSAGES: "No resource found",
  ADD_SUCCESS_MESSAGES: "resource added successfully",
  UPDATE_SUCCESS_MESSAGES: "resource updated successfully",
  DELETED_SUCCESS_MESSAGES: "resource deleted successfully",
  DELETED_UNSUCCESS_MESSAGES: "resource cannot be deleted",
  ADD_UNSUCCESS_MESSAGES: "data already available in DB",
  UPDATE_UNSUCCESS_MESSAGES: "ID not found",
  ERROR_MESSAGES: "Internal Server Error",
  EMAIL_NOT_EXIST: "Email doesn't exists",
  EMAIL_ALREADY_EXISTS: "Email is already in use by another user",
  EMAIL_ALREADY_USE: "This email is already in use for your account.",
  UNCHANGED_EMAIL: "New email is same as current email",
  INTERNAL_ERROR_MESSAGE: "Something went wrong",
  USERNAME_LENGTH: "User name must be 7 to 20 letters long",
  USER_EXISTS: "User already exist",
  USER_NAME_EXISTS: "User name already taken, kindly choose another",
  USER_ALREADY_VERIFIED: "User already verified",
  MISSING_FIELD: "Empty Field",
  MISSING_FIELDS: "All fields are required",
  MISSING_PASSWORDS_FIELDS: "Password and Confirm Password both are required",
  MISSING_REQUIRED_FIELD: "Required field is missing",
  SUCCESS_LOGIN: "User Login Successfull",
  SUCCESS_REGISTRATION: "User Registration Successfull",
  SUCCESS_VERIFICATION: "User Verification Successfull",
  SUCCESS_LOGOUT: "User Logout Successfull",
  SUCCESS_ACCOUNT_DELETED: "User Account Deleted Successfully",
  SUCCESS_SEND_OTP: "OTP has been sent via email, Please Check your Email",
  SUCCESS_RESEND_OTP: "OTP has been resent via email, Please Check your Email",
  SUCCESS_SEND_LINK:
    "Link has been sent to your email, Please check your email inbox",
  SUCCESS_RESET_PASSWORD: "Password has been reset successfully",
  SUCCESS_UPDATE_PROFILE: "Profile has been updated successfully",
  SUCCESS_UPLOAD_IMAGE: "Image has been uploaded successfully",
  SUCCESS_UPLOAD_IMAGES: "Images has been uploaded successfully",
  SUCCESS_ADD_RECOVERY_EMAIL: "Recovery Email has been added successfully",
  SUCCESS_CREATE_PROPERTY: "New Property has been created successfully",
  SUCCESS_DEACTIVATE: "User Deactivation Successfull",
  SUCCESS_ACTIVATE: "User Activation Successfull",
  NO_USER: "User not found",
  UN_AUTHENTIC_USER: "Un-authentic User",
  OTP_EXPIRED: "OTP has been expired. Please request a new OTP",
  OTP_NOT_EXPIRED: "Rejected! Your current OTP is already active",
  INVALID_OTP: "OTP is invalid",
  INVALID_EMAIL: "Email is invalid",
  INVALID_NEW_EMAIL: "Your new email is invalid",
  INVALID_RECOVERY_EMAIL: "Your recovery email is invalid",
  NO_RECOVERY_EMAIL:
    "Your account does not have a recovery email, please set recovery email first",
  WRONG_RECOVERY_EMAIL: "Your recovery email is wrong",
  SUCCESS_REFRESH_TOKEN: "Token Refresh Successfull",
  INVALID_TOKEN: "Failed to authenticate token, token is invalid",
  UN_ACCESS_TOKEN: "Unauthorized User, Token is missing",
  EXPIRED_TOKEN: "Token has been expired",
  UN_AUTHORIZED: "Email or Password is not valid",
  UN_MATCH_PASSWORDS: "Passwords are not match",
  INCORRECT_PASSWORD: "Password is incorrect",
  PASSWORD_CHANGE: "Password change Successfully",
  PASSWORD_FAILED: "Password is same as before",
  PASSWORD_UPDATED: "Password reset Successfully",
  PASSWORD_LENGTH_SHORT: "Password must be at least 8 characters long.",
  MISSING_FIELD_EMAIL: "Email Field is Required",
  SUCCESS_CATEGORY: "Category Added Successful",
  INVITATION_UNSUCCESS:
    "Your Invitation Counts has been exceeded, contact your administrator",
  INVITATION_SUCCESS: "Invitation sent successfully",
  INVITATION_REJECTED: "Invitation rejected successfully",
  INVITATION_LINK_UNSUCCESS: "Invitation link is not correct",
  REQUEST_UNSUCCESS:
    "Your Invitation is already send before, cannot send again",
  UPDATE_REQUEST_SUCCESS: "Invitation request is updated",
  REQUEST_SUCCESS: "Your Invitation is sent, wait for the admin approval",
  DUPLICATE_ERROR: "same data exist in db",
};

export default resMessages;
