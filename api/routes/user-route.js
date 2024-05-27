import express from "express";

// Import Controllers
import { user } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.get("/", user);

export default userRouter;
