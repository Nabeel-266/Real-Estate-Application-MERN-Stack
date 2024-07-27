import express from "express";

// Import Controllers
import { updateProfile } from "../controllers/user-controller.js";

const userRouter = express.Router();

// For Update User Profile
userRouter.post("/updateProfile/:id", updateProfile);

export default userRouter;
