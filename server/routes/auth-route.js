import express from "express";

// Import Middlewares
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  signup,
  signin,
  verifyAccount,
} from "../controllers/auth-controller.js";

const authRouter = express.Router();

// For Signup
authRouter.post("/register", signup);

// For Signin
authRouter.post("/login", signin);

// For Verify Account
authRouter.post("/verifyAccount", validateToken, verifyAccount);

export default authRouter;
