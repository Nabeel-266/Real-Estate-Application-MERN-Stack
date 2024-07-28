import express from "express";
import { upload } from "../helpers/storage.js";

// Import Controllers
import {
  updateProfile,
  uploadProfilePic,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

// For Update User Profile
userRouter.post("/updateProfile/:id", updateProfile);

// For Upload User Profile Pic
userRouter.post(
  "/uploadProfilePic",
  upload.single("Profile_Pic"),
  uploadProfilePic
);

export default userRouter;
