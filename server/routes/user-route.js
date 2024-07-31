import express from "express";
import { upload } from "../helpers/storage.js";

// Import Controllers
import {
  updateProfile,
  uploadProfilePic,
  sendRecoveryEmailOTP,
  verifyRecoveryEmailOTP,
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

// For Add User Recovery Email
userRouter.post("/sendRecoveryEmailOTP", validateToken, sendRecoveryEmailOTP);

userRouter.post("/verifyRecoveryEmailOTP", verifyRecoveryEmailOTP);

export default userRouter;
