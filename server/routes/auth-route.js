import express from "express";

// Import Middleware
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  signupVerification,
  signup,
  signin,
  signGoogleOAuth,
  resendOTP,
  refreshToken,
  forgotPassword,
  resetPasswordURL,
  resetPassword,
  signout,
  // verifyAccount,
} from "../controllers/auth-controller.js";

// Define Auth Router
const authRouter = express.Router();

//* For Signup
authRouter.post("/signup", signup);

//* For Signup Account Verification
authRouter.post("/signupVerification", signupVerification);

//* For Signin
authRouter.post("/signin", signin);

//* For Signin with Google Account
authRouter.post("/signGoogleOAuth", signGoogleOAuth);

//* For Resend OTP
authRouter.post("/resendOTP", resendOTP);

//* For Forgot Password
authRouter.post("/forgotPassword", forgotPassword);

//* For Reset Password URL
authRouter.get("/reset-password/:id/:token", resetPasswordURL);

//* For Reset Password
authRouter.post("/reset-password/:id/:token", resetPassword);

//* For Refresh Token
authRouter.get("/checkToken", validateToken, refreshToken);

//* For Signout
authRouter.post("/signout", signout);

// For Verify Account
// authRouter.post("/verifyAccount", validateToken, verifyAccount);

export default authRouter;
