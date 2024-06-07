import User from "../Models/user-schema.js";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sendEmailOTP } from "../utils/nodemailer.js";
import { emailRegex } from "../utils/emailRegex.js";
import { StatusCodes } from "http-status-codes";
import resMessages from "../constants/responsesMessages.js";
import { sendError, sendSuccess } from "../utils/responses.js";
import { generateToken } from "../helpers/token.js";

//* --> For Signup <--
//? @route --> POST --> api/auth/register
// @access --> PUBLIC
export const signup = async (req, res, next) => {
  console.log("Signup Controller");
  console.log(req.body);

  try {
    const { username, email, password, confirmPassword } = req.body;

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

    // If USER not exist
    if (!isUserExist) {
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

      let user_Doc;

      // Hashed Password
      const hashedPassword = bcryptjs.hashSync(password, 10);

      // Create New User in Database
      user_Doc = new User({ username, email, password: hashedPassword });

      // Create OTP
      const otp = uuidv4().slice(0, 8);
      console.log(otp);

      // Set OTP and OTP Expiry in USER_Document
      user_Doc.otp = otp;
      user_Doc.otpExpiry = Date.now() + 60000; // 1 minute

      // New User Saved in Db
      const newUser = await user_Doc.save();
      newUser.password = undefined;

      // Generate Token for User
      const token = generateToken({ data: newUser });

      // send OTP to User Email
      const emailResponse = await sendEmailOTP(username, email, otp);
      console.log(emailResponse);

      res.cookie("token", token, { httpOnly: true });
      res.status(StatusCodes.CREATED).send(
        sendSuccess({
          message: resMessages.SUCCESS_REGISTRATION,
          data: user_Doc,
        })
      );
    } else {
      // If USER exist
      return res.status(StatusCodes.CONFLICT).send(
        sendError({
          statusCode: StatusCodes.CONFLICT,
          message: resMessages.USER_EXISTS,
        })
      );
    }
  } catch (error) {
    console.log(error.message, "==> error in registeration");
    next(error);
  }
};

//* --> For Signin <--
//? @route --> POST --> api/auth/login
// @access --> PUBLIC
export const signin = (req, res) => {
  res.json({
    message: "user signin",
  });
};

//* --> For Verify Account <--
//? @route --> POST --> api/auth/verifyAccount
// @access --> PRIVATE
export const verifyAccount = async (req, res, next) => {
  console.log("Verify Account Controller");
  console.log(req.body, "==> Request Body");
  console.log(req.user, "==> Request User");

  try {
    const { OTP } = req.body;

    // If OTP not found
    if (!OTP) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Find User with OTP and Req.User.ID
    const user = await User.findOne({ otp: OTP, _id: req.user._id });

    // If User not found
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.INVALID_OTP,
        })
      );
    }

    console.log(user, "==> Find USer with OTP and ID");

    // If OTP Expired
    if (user.otpExpiry < Date.now()) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).send(
        sendError({
          statusCode: StatusCodes.NOT_ACCEPTABLE,
          message: "OTP has expired. Please request a new OTP",
        })
      );
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Update User after Verification
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    // Generate Token for User
    const token = generateToken({ data: newUser });

    res.cookie("token", token, { httpOnly: true });
    res.status(StatusCodes.ACCEPTED).send(
      sendSuccess({
        message: resMessages.SUCCESS_VERIFICATION,
        data: updatedUser,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in user verfication");
    next(error);
  }
};

//* --> For Resend OTP <--
//? @route --> POST --> api/auth/resendOTP
// @access --> PRIVATE
export const resendOTP = async (req, res, next) => {
  console.log("Verify Account Controller");
  console.log(req.body, "==> Request User");

  try {
    // Find User with Req.User.ID
    const user = await User.findOne({ email: req.body.email });
    console.log(user, "==> Find USer with ID");

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    if (user.isVerified) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.USER_ALREADY_VERIFIED,
        })
      );
    }

    // Create OTP
    const otp = uuidv4().slice(0, 8);
    console.log(otp);

    // Set OTP and OTP Expiry in USER_Document
    user.otp = otp;
    user.otpExpiry = Date.now() + 60000; // 1 minute

    // Update User after Verification
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    // send OTP to User Email
    const emailResponse = await sendEmailOTP(user.username, user.email, otp);
    console.log(emailResponse);

    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_RESEND_OTP,
        data: updatedUser,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in user verfication");
    next(error);
  }
};
