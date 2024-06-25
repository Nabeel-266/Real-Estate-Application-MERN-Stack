import express from "express";

// Import Middlewares
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  signupVerification,
  signup,
  signin,
  verifyAccount,
  resendOTP,
  refreshToken,
} from "../controllers/auth-controller.js";

const authRouter = express.Router();

// For Signup Account Verification
authRouter.post("/signupVerification", signupVerification);

// For Signup
authRouter.post("/signup", signup);

// For Signin
authRouter.post("/signin", signin);

// For Verify Account
authRouter.post("/verifyAccount", validateToken, verifyAccount);

// For Resend OTP
authRouter.post("/resendOTP", resendOTP);

// For Refresh Token
authRouter.get("/checkToken", validateToken, refreshToken);

export default authRouter;
