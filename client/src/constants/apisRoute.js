//* AUTHENTICATION API's End Points
export const SIGN_UP = "/api/auth/signup";
export const SIGN_UP_VERIFICATION = "/api/auth/signupVerification";
export const SIGN_IN = "/api/auth/signin";
export const GOOGLE_AUTH = "/api/auth/signGoogleOAuth";
export const FORGOT_PASSWORD = "/api/auth/forgotPassword";
export const RESEND_OTP = "/api/auth/resendOTP";
export const CHECK_TOKEN = "/api/auth/checkToken";
export const LOGOUT = "/api/auth/signout";
// export const VERIFY_ACCOUNT = "/api/auth/verifyAccount";

//* USER API's End Points
export const UPDATE_PROFILE = "/api/user/updateProfile";
export const UPLOAD_PROFILE_PIC = "/api/user/uploadProfilePic";
export const SEND_RECOVERY_EMAIL_OTP = "/api/user/sendRecoveryEmailOTP";
export const VERIFY_RECOVERY_EMAIL_OTP = "/api/user/verifyRecoveryEmailOTP";
export const SEND_CHANGE_EMAIL_LINK = "/api/user/changeEmailConfirmation";
export const SEND_CHANGE_PASSWORD_LINK = "/api/user/changePasswordConfirmation";
export const DELETE_ACCOUNT = "/api/user/deleteAccount";

//* PROPERTY API's End Points
export const UPLOAD_PROPERTY_IMAGES = "/api/property/uploadPropertyImages";
export const CREATE_PROPERTY = "/api/property/createProperty";
export const GET_USER_PROPERTIES = "/api/property/user";
export const GET_ALL_PROPERTIES = "/api/property/all";
export const GET_SINGLE_PROPERTY = "/api/property";
