import User from "../Models/user-schema.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import resMessages from "../constants/responsesMessages.js";
import { compare, encrypted } from "../helpers/crypted.js";
import { generateCode } from "../helpers/password.js";
import { sendEmailOTP } from "../helpers/nodemailer.js";

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
  console.log(req.file);

  try {
    const filePath = req.file.path;
    const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
      folder: "NAB Estate/User",
    });

    console.log(cloudinaryResult, "==> Upload Image In To Cloudinary Result");

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

  try {
    const { userId, userEmail, recoveryEmail, accountPassword } = req.body;

    // All Fields Required Verification
    if (!userId || !userEmail || !recoveryEmail || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Find User in Database
    const user = await User.findOne({ _id: userId, email: userEmail });

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
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

    // Generate OTP
    const otp = generateCode(8);

    // Hashed OTP
    const hashedOTP = encrypted(otp, 10);

    // send OTP to User Recovery Email
    const emailResponse = await sendEmailOTP(user.username, recoveryEmail, otp);
    console.log(emailResponse);

    // Create a response data
    const responseData = {
      recoveryEmail,
      otp: hashedOTP,
      otpExpiry: Date.now() + 90000,
    };

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_SEND_OTP_EMAIL,
        data: responseData,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in add recovery email");
    next(error);
  }
};
