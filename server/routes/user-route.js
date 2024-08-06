import express from "express";
import { upload } from "../helpers/storage.js";
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  updateProfile,
  uploadProfilePic,
  sendRecoveryEmailOTP,
  verifyRecoveryEmailOTP,
  changeEmailConfirmation,
  changeEmailURL,
  sendChangeEmailOTP,
  verifyChangeEmailOTP,
  changePasswordConfirmation,
  changePasswordURL,
  changePassword,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

//* For Update User Profile
userRouter.patch("/updateProfile/:id", updateProfile);

//* For Upload User Profile Pic
userRouter.post(
  "/uploadProfilePic",
  upload.single("Profile_Pic"),
  uploadProfilePic
);

//* For Send User Recovery Email OTP
userRouter.post("/sendRecoveryEmailOTP", validateToken, sendRecoveryEmailOTP);

//* For Verify Recovery Email OTP & Update User Recovery Email
userRouter.patch("/verifyRecoveryEmailOTP", verifyRecoveryEmailOTP);

//* For Send User Change Email Link
userRouter.post(
  "/changeEmailConfirmation",
  validateToken,
  changeEmailConfirmation
);

//* For Change Email URL
userRouter.get("/change-email/:id/:token", changeEmailURL);

//* For Send User New Email OTP
userRouter.post("/sendChangeEmailOTP", sendChangeEmailOTP);

//* For Verify New Email OTP & Update User Email
userRouter.patch("/verifyChangeEmailOTP/:id/:token", verifyChangeEmailOTP);

//* For Send User Change Password Link
userRouter.post(
  "/changePasswordConfirmation",
  validateToken,
  changePasswordConfirmation
);

//* For Change Password URL
userRouter.get("/change-password/:id/:token", changePasswordURL);

//* For Change User Password
userRouter.patch("/change-password/:id/:token", changePassword);

export default userRouter;
