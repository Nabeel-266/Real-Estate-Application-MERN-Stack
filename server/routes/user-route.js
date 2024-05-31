import express from "express";

// Import Controllers
import { user } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", user);

export default userRouter;
