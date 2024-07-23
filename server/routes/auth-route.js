import express from "express";

// Import Middlewares
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  signupVerification,
  signup,
  signin,
  signGoogleOAuth,
  verifyAccount,
  resendOTP,
  refreshToken,
  forgotPassword,
  resetPasswordURL,
} from "../controllers/auth-controller.js";

const authRouter = express.Router();

// For Signup
authRouter.post("/signup", signup);

// For Signup Account Verification
authRouter.post("/signupVerification", signupVerification);

// For Signin
authRouter.post("/signin", signin);

// For Signin
authRouter.post("/signGoogleOAuth", signGoogleOAuth);

// For Verify Account
authRouter.post("/verifyAccount", validateToken, verifyAccount);

// For Resend OTP
authRouter.post("/resendOTP", resendOTP);

// For Refresh Token
authRouter.get("/checkToken", validateToken, refreshToken);

// For Forgot Password
authRouter.post("/forgotPassword", forgotPassword);

// For Reset Password URL
authRouter.get("/reset-password/:id/:token", resetPasswordURL);

export default authRouter;
