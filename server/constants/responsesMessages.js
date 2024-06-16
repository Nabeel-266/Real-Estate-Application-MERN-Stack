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
  INTERNAL_ERROR_MESSAGE: "Something went wrong",
  USERNAME_LENGTH: "User name must be 7 to 20 letters long",
  USER_EXISTS: "User already exist",
  USER_NAME_EXISTS: "User name already taken, kindly choose another",
  USER_ALREADY_VERIFIED: "User already verified",
  MISSING_FIELDS: "All Fields are required",
  SUCCESS_LOGIN: "User Login Successfull",
  SUCCESS_REGISTRATION: "User Registration Successfull",
  SUCCESS_VERIFICATION: "User Verification Successfull",
  SUCCESS_RESEND_OTP: "OTP has been resent successfully",
  SUCCESS_DEACTIVATE: "User Deactivation Successfull",
  SUCCESS_ACTIVATE: "User Activation Successfull",
  NO_USER: "User not found",
  OTP_EXPIRED: "OTP has been expired. Please request a new OTP",
  OTP_NOT_EXPIRED: "Rejected! Your current OTP is already active",
  INVALID_OTP: "OTP is invalid",
  INVALID_EMAIL: "Email is invalid",
  INVALID_TOKEN: "Failed to authenticate token, token is invalid",
  UN_ACCESS_TOKEN: "Unauthorized User, Token is missing",
  TOKEN_EXPIRED: "Token has been expired",
  SUCCESS_REFRESH_TOKEN: "Token Refresh Successfull",
  UN_AUTHORIZED: "Email or Password is not valid",
  UN_MATCH_PASSWORDS: "Passwords are not match",
  INCORRECT_PASSWORD: "Password is incorrect",
  PASSWORD_CHANGE: "Password change Successfully",
  PASSWORD_FAILED: "Password is same as before",
  PASSWORD_UPDATED: "Password reset Successfully",
  PASSWORD_LENGTH_SHORT: "Password length is short",
  RESET_LINK_SUCCESS: "Reset Email Send... Please Check your Email",
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
