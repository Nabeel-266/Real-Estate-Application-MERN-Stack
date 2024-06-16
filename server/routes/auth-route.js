import express from "express";

// Import Middlewares
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  signup,
  signin,
  verifyAccount,
  resendOTP,
  refreshToken,
} from "../controllers/auth-controller.js";

const authRouter = express.Router();

// For Signup
authRouter.post("/register", signup);

// For Signin
authRouter.post("/login", signin);

// For Verify Account
authRouter.post("/verifyAccount", validateToken, verifyAccount);

// For Resend OTP
authRouter.post("/resendOTP", resendOTP);

// For Refresh Token
authRouter.get("/checkToken", validateToken, refreshToken);

export default authRouter;
