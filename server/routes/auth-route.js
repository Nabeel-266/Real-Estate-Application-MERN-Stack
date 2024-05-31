import express from "express";

// Import Controllers
import { signup, signin } from "../controllers/auth-controller.js";

const authRouter = express.Router();

// For Signup
authRouter.post("/register", signup);

// For Signin
authRouter.post("/login", signin);

export default authRouter;
