import User from "../Models/user-schema.js";
import dotenv from "dotenv";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import resMessages from "../constants/responsesMessages.js";
import { compare, encrypted } from "../helpers/crypted.js";
import { generateCode } from "../helpers/password.js";
import { sendEmailLink, sendEmailOTP } from "../helpers/nodemailer.js";
import { generateTokenForLink, verifyToken } from "../helpers/token.js";
import { emailRegex } from "../utils/emailRegex.js";
dotenv.config();

//* --> For Update User Profile <--
//? @route --> POST --> /api/auth/updateProfile
//  @access --> PRIVATE
export const updateProfile = async (req, res, next) => {
  console.log("Update Profile Controller");
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const user = await User.findOne({ _id: id });
    console.log(user);

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    const { username, mobileNumber } = updateProfile;

    // Check Username given properly
    if (username && !username.includes(" ")) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: "Please! enter your proper fullname with space separated",
        })
      );
    }

    // Check Mobile Number given properly
    if (
      mobileNumber &&
      !mobileNumber.includes(" ") &&
      mobileNumber.split(" ")[1].length !== 10
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message:
            "Invalid mobile number, please enter a valid mobile number like +92 or any Country Calling Code and after 10 digit number",
        })
      );
    }

    // Update USER in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: updatedFields },
      { returnDocument: "after" }
    );

    // Remove updated user password for given response
    updatedUser.password = undefined;

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_UPDATE_PROFILE,
        data: updatedUser,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in update profile");
    next(error);
  }
};

//* --> For Upload User Profile Pic <--
//? @route --> POST --> /api/auth/uploadProfilePic
//  @access --> PRIVATE
export const uploadProfilePic = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
      folder: "NAB Estate/User",
    });

    // Delete the file from uploads folder after uploading to Cloudinary
    fs.unlinkSync(filePath);

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_UPLOAD_IMAGE,
        data: cloudinaryResult.secure_url,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in uploading profile pic");
    next(error);
  }
};

//* --> For Send User Recovery Email OTP <--
//? @route --> POST --> /api/auth/sendRecoveryEmailOTP
//  @access --> PUBLIC
export const sendRecoveryEmailOTP = async (req, res, next) => {
  console.log(req.body);
  console.log(req.userId, "==> Request User ID");

  try {
    const userId = req.userId;
    const { recoveryEmail, accountPassword } = req.body;

    // All Fields Required Verification
    if (!recoveryEmail || !accountPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Verify Email Address Typography
    if (!emailRegex.test(recoveryEmail)) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INVALID_RECOVERY_EMAIL,
        })
      );
    }

    // Find User in Database
    const user = await User.findOne({ _id: userId });

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // Check User Recovery Email already have in User Account
    if (
      user?.email === recoveryEmail ||
      user?.recoveryEmail === recoveryEmail
    ) {
      return res.status(StatusCodes.CONFLICT).send(
        sendError({
          statusCode: StatusCodes.CONFLICT,
          message: resMessages.EMAIL_ALREADY_USE,
        })
      );
    }

    // Check Password is Correct
    const isPasswordCorrect = compare(accountPassword, user.password);

    // If Password is not correct
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INCORRECT_PASSWORD,
        })
      );
    }

    // Generate OTP
    const otp = generateCode(6);

    // Hashed OTP
    const hashedOTP = encrypted(otp, 10);

    // send OTP to verify User Recovery Email
    const emailResponse = await sendEmailOTP(
      user.username,
      recoveryEmail,
      otp,
      "Recovery Email"
    );
    console.log(emailResponse);

    // Create a response data
    const responseData = {
      userId: user._id,
      recoveryEmail,
      otp: hashedOTP,
      otpExpiry: Date.now() + 120000,
    };

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_SEND_OTP,
        data: responseData,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in add recovery email");
    next(error);
  }
};

//* --> For Verify User Recovery Email OTP <--
//? @route --> POST --> /api/auth/verifyRecoveryEmailOTP
//  @access --> PRIVATE
export const verifyRecoveryEmailOTP = async (req, res, next) => {
  console.log(req.body);

  try {
    const { userId, recoveryEmail, otp, otpExpiry, enteredOTP } = req.body;

    // Check is any field missing
    if (!userId || !recoveryEmail || !otp || !otpExpiry || !enteredOTP) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Check OTP is Correct
    const isOtpValid = compare(enteredOTP, otp);

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
    if (otpExpiry < Date.now()) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.OTP_EXPIRED,
        })
      );
    }

    // Update USER in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { recoveryEmail } },
      { returnDocument: "after" }
    );

    // Remove updated user password for given response
    updatedUser.password = undefined;

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_ADD_RECOVERY_EMAIL,
        data: updatedUser,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in verify recovery email");
    next(error);
  }
};

//* --> For Send Change User Email Link <--
//? @route --> POST --> /api/auth/changeEmailConfirmation
//  @access --> PUBLIC
export const changeEmailConfirmation = async (req, res, next) => {
  console.log("Send Confirmation Controller");

  try {
    const userId = req.userId;
    const { recoveryEmail, accountPassword } = req.body;

    // Find User in Database
    const user = await User.findOne({ _id: userId });

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // All Fields Required Verification
    if (!recoveryEmail || !accountPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Verify Recovery Email Address Typography
    if (!emailRegex.test(recoveryEmail)) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INVALID_RECOVERY_EMAIL,
        })
      );
    }

    // Check Recovery Email is present in USER_DOC
    if (!user.recoveryEmail) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.NO_RECOVERY_EMAIL,
        })
      );
    }

    // Check Recovery Email is same as USER_DOC recovery email
    if (user.recoveryEmail !== recoveryEmail) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.WRONG_RECOVERY_EMAIL,
        })
      );
    }

    // Check Password is Correct
    const isPasswordCorrect = compare(accountPassword, user.password);

    // If Password is not correct
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INCORRECT_PASSWORD,
        })
      );
    }

    if (!req.session.changeEmailToken) {
      // Generate Token for User Change Email URL
      const token = generateTokenForLink({ userId: user._id });

      // Set Cookies to store in Session for given duration
      req.session.changeEmailToken = true;
      req.session.changeEmailSuccess = false;

      const link = `${process.env.SERVER_URL}/api/user/change-email/${user._id}/${token}`;

      // Send Reset Password Link to User Email
      const emailResponse = await sendEmailLink(
        user.username,
        user.recoveryEmail,
        link,
        "Confirmation Email"
      );
      console.log(emailResponse);

      // Remove Password from User_Doc for give response
      user.password = undefined;

      res.status(StatusCodes.OK).send(
        sendSuccess({
          message: resMessages.SUCCESS_SEND_CHANGE_EMAIL_LINK,
          data: user,
        })
      );
    } else {
      // Remove Password from User_Doc for give response
      user.password = undefined;

      res.status(StatusCodes.OK).send(
        sendSuccess({
          message: `Already sent a Change Email Link to your recovery email, Please check your email inbox`,
          data: user,
        })
      );
    }
  } catch (error) {
    console.log(error.message, "==> error in change password confirmation");
    next(error);
  }
};

//* --> For Change Email URL <--
//? @route --> GET --> /api/auth/change-email/:id/:token
//  @access --> PRIVATE
export const changeEmailURL = async (req, res) => {
  console.log("Change Email URL Controller");
  const { id, token } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("UnAuthenticated User! user not found");
    }

    const verifyURLToken = verifyToken(token);

    if (verifyURLToken.result !== user._id.toString()) {
      throw new Error("Authentication Failed");
    }

    if (req.session.changeEmailSuccess) {
      res.status(StatusCodes.OK).render("page/success", {
        username: user.username,
        title: "Change Email",
        message: "Your account email has been changed successfully! ✔",
        guidance: "You can go to NAB state again. Thankyou!",
      });
    } else {
      res.status(StatusCodes.OK).render("page/change-email", {
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
        reason: "Your Change Email URL has been expired.",
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
        reason: "Your Change Email URL has been invalid.",
      });
    }

    // Else Server error
    else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("page/error", {
        statusCode: "500",
        statusText: "Internal Server Error",
        message: "Something went wrong!",
        reason:
          "An error occurred while changing your email, Please try again later or contact support if the issue persists.",
      });
    }
  }
};

//* --> For Send User New Email OTP <--
//? @route --> POST --> /api/auth/sendChangeEmailOTP
//  @access --> PRIVATE
export const sendChangeEmailOTP = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Find User in Database
    const user = await User.findOne({ _id: userId });

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
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

    // If User new Email is same as current Email
    if (user.email === email) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.UNCHANGED_EMAIL,
        })
      );
    }

    // Check User is Exist in DB
    const isUserExistFromGivenEmail = await User.findOne({ email });

    // If Email is present in USER_DOC
    if (isUserExistFromGivenEmail) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.EMAIL_ALREADY_EXISTS,
        })
      );
    }

    // Generate OTP
    const otp = generateCode(6);

    // Hashed OTP
    const hashedOTP = encrypted(otp, 10);

    // send OTP to verify User New Email
    const emailResponse = await sendEmailOTP(
      user.username,
      email,
      otp,
      "Change Email"
    );
    console.log(emailResponse);

    // Create a response data
    const responseData = {
      otp: hashedOTP,
      otpExpiry: Date.now() + 120000,
    };

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_SEND_OTP,
        data: responseData,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in send change email otp");
    next(error);
  }
};

//* --> For Verify User New Email OTP <--
//? @route --> POST --> /api/auth/verifyChangeEmailOTP/:id/:token
//  @access --> PRIVATE
export const verifyChangeEmailOTP = async (req, res) => {
  const { id, token } = req.params;
  const { newEmail, otp, otpExpiry, enteredOTP } = req.body;

  try {
    // Find User in Database
    const user = await User.findOne({ _id: id });

    // If USER not exist
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

    // Check is any field missing
    if (!newEmail || !otp || !otpExpiry || !enteredOTP) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELD,
        })
      );
    }

    // Verify Email Address Typography
    if (!emailRegex.test(newEmail)) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.INVALID_EMAIL,
        })
      );
    }

    // If User new Email is same as current Email
    if (user.email === newEmail) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.UNCHANGED_EMAIL,
        })
      );
    }

    // Check User is Exist in DB
    const isUserExistFromGivenEmail = await User.findOne({ email: newEmail });

    // If Email is present in USER_DOC
    if (isUserExistFromGivenEmail) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.EMAIL_ALREADY_EXISTS,
        })
      );
    }

    // Check OTP is Correct
    const isOtpValid = compare(enteredOTP, otp);

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
    if (otpExpiry < Date.now()) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.OTP_EXPIRED,
        })
      );
    }

    // Update USER in the database
    await User.findOneAndUpdate({ _id: id }, { $set: { email: newEmail } });

    req.session.changeEmailSuccess = true;
    res.status(StatusCodes.OK).render("page/success", {
      username: user.username,
      title: "Change Email",
      message: "Your account email has been changed successfully! ✔",
      guidance: "You can go to NAB state again. Thankyou!",
    });
  } catch (error) {
    console.log(error.message, "==> error in verify recovery email");

    // If JWT TOKEN expired error
    if (error.message === "jwt expired") {
      res.status(StatusCodes.UNAUTHORIZED).render("page/error", {
        statusCode: "401",
        statusText: "Un-Authorized User",
        message: "Access denied!",
        reason: "Your Change Email URL has been expired.",
      });
    }

    // Else Server error
    else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("page/error", {
        statusCode: "500",
        statusText: "Internal Server Error",
        message: "Something went wrong!",
        reason:
          "An error occurred while changing your email, Please try again later or contact support if the issue persists.",
      });
    }
  }
};
