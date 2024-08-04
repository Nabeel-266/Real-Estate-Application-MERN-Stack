import express from "express";
import { upload } from "../helpers/storage.js";

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
} from "../controllers/user-controller.js";
import { validateToken } from "../helpers/token.js";

const userRouter = express.Router();

//* For Update User Profile
userRouter.post("/updateProfile/:id", updateProfile);

//* For Upload User Profile Pic
userRouter.post(
  "/uploadProfilePic",
  upload.single("Profile_Pic"),
  uploadProfilePic
);

//* For Send User Recovery Email OTP
userRouter.post("/sendRecoveryEmailOTP", validateToken, sendRecoveryEmailOTP);

//* For Verify User Recovery Email OTP
userRouter.post("/verifyRecoveryEmailOTP", verifyRecoveryEmailOTP);

//* For Send Change User Email Link
userRouter.post(
  "/changeEmailConfirmation",
  validateToken,
  changeEmailConfirmation
);

//* For Change User Email URL
userRouter.get("/change-email/:id/:token", changeEmailURL);

//* For Send User New Email OTP
userRouter.post("/sendChangeEmailOTP", sendChangeEmailOTP);

//* For Verify User New Email OTP
userRouter.post("/verifyChangeEmailOTP/:id/:token", verifyChangeEmailOTP);

export default userRouter;
