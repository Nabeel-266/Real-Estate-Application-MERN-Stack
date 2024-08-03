import User from "../Models/user-schema.js";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { emailRegex } from "../utils/emailRegex.js";
import resMessages from "../constants/responsesMessages.js";
import { sendError, sendSuccess } from "../utils/responses.js";
import { sendEmailLink, sendEmailOTP } from "../helpers/nodemailer.js";
import { generateCode, generatePassword } from "../helpers/password.js";
import { compare, encrypted } from "../helpers/crypted.js";
import {
  generateToken,
  generateTokenForLink,
  verifyToken,
} from "../helpers/token.js";
dotenv.config();

//* --> For Signup <--
//? @route --> POST --> api/auth/signup
//  @access --> PUBLIC
export const signup = async (req, res, next) => {
  console.log("Signup Verifiaction Controller");
  console.log(req.body);

  try {
    let user_Credentials = req.body;
    const { username, email, password, confirmPassword } = user_Credentials;

    // All Fields Required Verification
    if (!username || !email || !password || !confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }
    // Check Usename Length
    if (username.length < 7 || username.length > 20) {
      return res.status(StatusCodes.LENGTH_REQUIRED).send(
        sendError({
          statusCode: StatusCodes.LENGTH_REQUIRED,
          message: resMessages.USERNAME_LENGTH,
        })
      );
    }
    // Verify Email Address Typography
    if (!emailRegex.test(email)) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INVALID_EMAIL,
        })
      );
    }

    // Check User is Exist in DB
    const isUserExist = await User.findOne({ email });

    // If USER exist
    if (isUserExist) {
      return res.status(StatusCodes.CONFLICT).send(
        sendError({
          statusCode: StatusCodes.CONFLICT,
          message: resMessages.USER_EXISTS,
        })
      );
    }
    // Password Lenght Verification
    if (password.length < 8) {
      return res.status(StatusCodes.LENGTH_REQUIRED).send(
        sendError({
          statusCode: StatusCodes.LENGTH_REQUIRED,
          message: resMessages.PASSWORD_LENGTH_SHORT,
        })
      );
    }
    // Password Match Verification
    if (password !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.UN_MATCH_PASSWORDS,
        })
      );
    }

    // Create OTP
    const otp = generateCode(8);

    // Hashed OTP
    const hashedOTP = encrypted(otp, 10);

    // Set OTP and OTP Expiry in USER_Credentials
    user_Credentials.otp = hashedOTP;
    user_Credentials.otpExpiry = Date.now() + 90000; // 1.5 minutes

    // send OTP to User Email
    const emailResponse = await sendEmailOTP(username, email, otp);
    console.log(emailResponse);

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_SEND_OTP,
        data: user_Credentials,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in registeration");
    next(error);
  }
};

//* --> For Signup Verification <--
//? @route --> POST --> api/auth/signupVerification
//  @access --> PRIVATE
export const signupVerification = async (req, res, next) => {
  console.log("Signup Controller");
  console.log(req.body);

  try {
    const { enteredOTP, user } = req.body;

    // If OTP not found
    if (!enteredOTP) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELD,
        })
      );
    }

    // If User not found
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // Check OTP is Correct
    const isOtpValid = compare(enteredOTP, user.otp);

    // If OTP invalid
    if (!isOtpValid) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INVALID_OTP,
        })
      );
    }

    // If OTP Expired
    if (user.otpExpiry < Date.now()) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.OTP_EXPIRED,
        })
      );
    }

    const { username, email, password } = user;

    // Hashed Password
    const hashedPassword = encrypted(password, 10);

    // Create New User in Database
    const user_Doc = new User({ username, email, password: hashedPassword });

    // New User Saved in Db
    const newUser = await user_Doc.save();

    // Remove password from User_Document for give response
    newUser.password = undefined;

    // Generate Token for User
    const token = generateToken({ userId: newUser._id });

    res
      .cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
      .status(StatusCodes.CREATED)
      .send(
        sendSuccess({
          message: resMessages.SUCCESS_REGISTRATION,
          data: newUser,
        })
      );
  } catch (error) {
    console.log(error.message, "==> error in registeration");
    next(error);
  }
};

//* --> For Signin <--
//? @route --> POST --> api/auth/signin
//  @access --> PUBLIC
export const signin = async (req, res, next) => {
  console.log("Signin Controller");
  console.log(req.body);

  try {
    const { email, password } = req.body;

    // All Fields Required Verification
    if (!email && !password) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Verify Email Address Typography
    if (!emailRegex.test(email)) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INVALID_EMAIL,
        })
      );
    }

    // Find User to Email
    const user = await User.findOne({ email });

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.EMAIL_NOT_EXIST,
        })
      );
    }

    // Check Password is Correct
    const isPasswordCorrect = compare(password, user.password);

    // If Password is not correct
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INCORRECT_PASSWORD,
        })
      );
    }

    // Remove password from User_Document for give response
    user.password = undefined;

    // Generate Token for User
    const token = generateToken({ userId: user._id });

    res
      .cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
      .status(StatusCodes.OK)
      .send(
        sendSuccess({
          message: resMessages.SUCCESS_LOGIN,
          data: user,
        })
      );
  } catch (error) {
    console.log(error.message, "==> error in login");
    next(error);
  }
};

//* --> For Sign with Google OAuth <--
//? @route --> POST --> api/auth/signGoogleOAuth
//  @access --> PUBLIC
export const signGoogleOAuth = async (req, res, next) => {
  try {
    const userCredentials = req.body;
    const user = await User.findOne({ email: userCredentials.email });

    if (user) {
      // Removed Password From User Document
      const { password, ...restUser } = user._doc;

      // Generate Token for User
      const token = generateToken({ userId: user._id });

      // Give Response
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 12 * 60 * 60 * 1000,
        })
        .status(StatusCodes.OK)
        .send(
          sendSuccess({
            message: resMessages.SUCCESS_LOGIN,
            data: restUser,
          })
        );
    } else {
      // Generate a Random Password
      const randomPassword = generatePassword(
        process.env.RANDOM_PASSWORD_LENGTH
      );

      // Hashed Password
      const hashedPassword = encrypted(randomPassword, 10);

      // Create New User in Database
      const user_Doc = new User({
        ...userCredentials,
        password: hashedPassword,
      });

      // New User Saved in Db
      const newUser = await user_Doc.save();

      // Removed Password From New User Document
      const { password, ...restUser } = newUser._doc;

      // Generate Token for User
      const token = generateToken({ userId: newUser._id });

      res
        .cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
        .status(StatusCodes.CREATED)
        .send(
          sendSuccess({
            message: resMessages.SUCCESS_REGISTRATION,
            data: restUser,
          })
        );
    }
  } catch (error) {
    console.log(error.message, "==> error in GoogleOAuth");
    next(error);
  }
};

//* --> For Resend OTP <--
//? @route --> POST --> api/auth/resendOTP
//  @access --> PRIVATE
export const resendOTP = async (req, res, next) => {
  console.log("Resend OTP Controller");
  console.log(req.body, "==> Request User");

  try {
    let userDoc = req.body;

    // If User not found
    if (!userDoc) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // If OTP not expired
    if (userDoc.otpExpiry > Date.now()) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.OTP_NOT_EXPIRED,
        })
      );
    }

    // Create OTP
    const otp = generateCode(8);

    // Hashed OTP
    const hashedOTP = encrypted(otp, 10);

    // Set OTP and OTP Expiry in USER_Document
    userDoc.otp = hashedOTP;
    userDoc.otpExpiry = Date.now() + 60000; // 1 minute

    // send OTP to User Email
    const emailResponse = await sendEmailOTP(
      userDoc.username,
      userDoc.email,
      otp
    );

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_RESEND_OTP,
        data: userDoc,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in resend Otp");
    next(error);
  }
};

//* --> For Forgot Password <--
//? @route --> POST --> api/auth/forgotPassword
//  @access --> PUBLIC
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.EMAIL_NOT_EXIST,
        })
      );
    }

    if (!req.session.resetPasswordToken) {
      // Generate Token for User Reset Password URL
      const token = generateTokenForLink({ userId: user._id });

      // Set Cookies to store in Session for given durations
      req.session.resetPasswordToken = true;
      req.session.resetPasswordSuccess = false;

      const link = `${process.env.SERVER_URL}/api/auth/reset-password/${user._id}/${token}`;

      // Send Reset Password Link to User Email
      const emailResponse = await sendEmailLink(
        user.username,
        user.email,
        link
      );
      console.log(emailResponse);

      // Remove Password from User_Doc for give response
      user.password = undefined;

      res.status(StatusCodes.OK).send(
        sendSuccess({
          message: resMessages.SUCCESS_SEND_RESET_PASSWORD_LINK,
          data: user,
        })
      );
    } else {
      res.status(StatusCodes.OK).send(
        sendSuccess({
          message: `Already sent a Reset Password Link via email, Please check your email`,
          data: user,
        })
      );
    }
  } catch (error) {
    console.log(error.message, "==> error in forgot password");
    next(error);
  }
};

//* --> For Reset Password URL <--
//? @route --> GET --> /api/auth/reset-password/:id/:token
//  @access --> PRIVATE
export const resetPasswordURL = async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("UnAuthenticated User! user not found");
    }

    // Verify Reset Password URL Token
    const verifyURLToken = verifyToken(token);

    if (verifyURLToken.result !== user._id.toString()) {
      throw new Error("Authentication Failed");
    }

    if (req.session.resetPasswordSuccess) {
      res.status(StatusCodes.OK).render("page/success", {
        username: user.username,
        title: "Reset Password",
        message: "Your password has been reset successfully! ✔",
        guidance:
          "Lets go back to the NAB Estate and Login to your account again.",
      });
    } else {
      res.status(StatusCodes.OK).render("page/reset-password", {
        name: user.username,
        email: user.email,
        id,
        token,
      });
    }
  } catch (error) {
    console.log(error.message, "==> error in reset password URL");

    // If JWT TOKEN expired error
    if (error.message === "jwt expired") {
      res.status(StatusCodes.UNAUTHORIZED).render("page/error", {
        statusCode: "401",
        statusText: "Un-Authorized User",
        message: "Access denied!",
        reason: "Your Reset Password URL has been expired",
      });
    }

    // ElseIf Params Id and Token invalid error
    else if (
      error.message.includes("Cast to ObjectId failed") ||
      error.message === "invalid token" ||
      error.message === "Authentication Failed"
    ) {
      res.status(StatusCodes.BAD_REQUEST).render("page/error", {
        statusCode: "400",
        statusText: "Un-Authentic User",
        message: "Access denied!",
        reason: "Your Reset Password URL has been invalid.",
      });
    }

    // Else Server error
    else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("page/error", {
        statusCode: "500",
        statusText: "Internal Server Error",
        message: "Something went wrong!",
        reason:
          "An error occurred while resetting your password, Please try again later or contact support if the issue persists.",
      });
    }
  }
};

//* --> For Reset Password <--
//? @route --> POST --> /api/auth/reset-password/:id/:token
//  @access --> PRIVATE
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    // If User not found
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // Verify Reset Password URL Token
    verifyToken(token);

    // Check Is Password and Confirm Password given
    if (!password || !confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Password Lenght Verification
    if (password.length < 8) {
      return res.status(StatusCodes.LENGTH_REQUIRED).send(
        sendError({
          statusCode: StatusCodes.LENGTH_REQUIRED,
          message: resMessages.PASSWORD_LENGTH_SHORT,
        })
      );
    }

    // Password Match Verification
    if (password !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.UN_MATCH_PASSWORDS,
        })
      );
    }

    // Hashed Password
    const hashedPassword = encrypted(password, 10);

    // Update Password in User_Doc and Save to DB
    await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });

    // If user reset password successfully then session making true
    // because the user didn't send a reset password request again under same page
    req.session.resetPasswordSuccess = true;
    res.status(StatusCodes.OK).render("page/success", {
      username: user.username,
      title: "Reset Password",
      message: "Your password has been reset successfully! ✔",
      guidance:
        "Lets go back to the NAB Estate and Login to your account again.",
    });
  } catch (error) {
    console.log(error.message, "==> error in reset password");

    // If JWT TOKEN expired error
    if (error.message === "jwt expired") {
      res.status(StatusCodes.UNAUTHORIZED).render("page/error", {
        statusCode: "401",
        statusText: "Un-Authorized User",
        message: "Access denied!",
        reason: "Your Reset Password URL has been expired",
      });
    }

    // Else Server error
    else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("page/error", {
        statusCode: "500",
        statusText: "Internal Server Error",
        message: "Something went wrong!",
        reason:
          "An error occurred while resetting your password, Please try again later or contact support if the issue persists.",
      });
    }
  }
};

//* --> For Refresh Token <--
//? @route --> GET --> api/auth/refreshToken
//  @access --> PROTECTED
export const refreshToken = async (req, res, next) => {
  console.log("Refresh Token Controller");
  console.log(req.userId, "==> Request User ID");
  console.log(req.tokenExp, "==> Request Token Expiry");

  try {
    const user = await User.findById({ _id: req.userId });
    console.log(user, "==> Find User with ID");

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // Remove password from User_Document for give response
    user.password = undefined;

    const tokenExpiry = req.tokenExp;
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    const checktokenExpiryIsGreaterThan3Hours =
      tokenExpiry > currentTime + 3 * 60 * 60;

    if (checktokenExpiryIsGreaterThan3Hours) {
      return res.status(StatusCodes.OK).send(
        sendSuccess({
          message: "Current Token is Fine",
          data: user,
        })
      );
    }

    // Generate Token for User
    const token = generateToken({ userId: user._id });

    res
      .cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
      .status(StatusCodes.OK)
      .send(
        sendSuccess({
          message: resMessages.SUCCESS_REFRESH_TOKEN,
          data: user,
        })
      );
  } catch (error) {
    console.log(error.message, "==> error in refresh token");
    next(error);
  }
};

//* --> For Signout <--
//? @route --> GET --> api/auth/signout
//  @access --> PUBLIC
export const signout = (req, res, next) => {
  try {
    // Get Token
    const token = req.cookies?.token;

    if (token) {
      res
        .cookie("token", "", { httpOnly: true, maxAge: 0 })
        .status(StatusCodes.OK)
        .send(
          sendSuccess({
            message: resMessages.SUCCESS_LOGOUT,
            data: null,
          })
        );
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: "Un-Authorized User",
        })
      );
    }
  } catch (error) {
    console.log(error.message, "==> error in signout");
    next(error);
  }
};

// // --> For Verify Account <--
// // @route --> POST --> api/auth/verifyAccount
// //  @access --> PRIVATE
// export const verifyAccount = async (req, res, next) => {
//   console.log("Verify Account Controller");
//   console.log(req.body, "==> Request Body");
//   console.log(req.user, "==> Request User ID");

//   try {
//     const { otp } = req.body;

//     // If OTP not found
//     if (!otp) {
//       return res.status(StatusCodes.BAD_REQUEST).send(
//         sendError({
//           statusCode: StatusCodes.BAD_REQUEST,
//           message: resMessages.MISSING_FIELDS,
//         })
//       );
//     }

//     // Find User with OTP and Req.User.ID
//     const user = await User.findOne({ otp: otp, _id: req.user });

//     // If User not found
//     if (!user) {
//       return res.status(StatusCodes.UNAUTHORIZED).send(
//         sendError({
//           statusCode: StatusCodes.UNAUTHORIZED,
//           message: resMessages.INVALID_OTP,
//         })
//       );
//     }

//     console.log(user, "==> Find USer with OTP and ID");

//     // If OTP Expired
//     if (user.otpExpiry < Date.now()) {
//       return res.status(StatusCodes.FORBIDDEN).send(
//         sendError({
//           statusCode: StatusCodes.FORBIDDEN,
//           message: resMessages.OTP_EXPIRED,
//         })
//       );
//     }

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     // Update User after Verification
//     const updatedUser = await user.save();
//     updatedUser.password = undefined;

//     // Generate Token for User
//     const token = generateToken({ userId: updatedUser._id });

//     res.cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
//     res.status(StatusCodes.ACCEPTED).send(
//       sendSuccess({
//         message: resMessages.SUCCESS_VERIFICATION,
//         data: updatedUser,
//       })
//     );
//   } catch (error) {
//     console.log(error.message, "==> error in user verfication");
//     next(error);
//   }
// };
