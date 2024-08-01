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
} from "../controllers/user-controller.js";
import { validateToken } from "../helpers/token.js";

const userRouter = express.Router();

// For Update User Profile
userRouter.post("/updateProfile/:id", updateProfile);

// For Upload User Profile Pic
userRouter.post(
  "/uploadProfilePic",
  upload.single("Profile_Pic"),
  uploadProfilePic
);

// For Send User Recovery Email OTP
userRouter.post("/sendRecoveryEmailOTP", validateToken, sendRecoveryEmailOTP);

// For Verify User Recovery Email OTP & Add User Recovery Email
userRouter.post("/verifyRecoveryEmailOTP", verifyRecoveryEmailOTP);

// For Send Change User Email Confirmation Mail
userRouter.post(
  "/changeEmailConfirmation",
  validateToken,
  changeEmailConfirmation
);

// For Change User Email URL
userRouter.get("/change-email/:id/:token", changeEmailURL);

export default userRouter;
