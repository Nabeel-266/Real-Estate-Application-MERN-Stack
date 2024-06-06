import User from "../Models/user-schema.js";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sendEmailOTP } from "../utils/nodemailer.js";
import { emailRegex } from "../utils/emailRegex.js";
import { StatusCodes } from "http-status-codes";
import resMessages from "../constants/responsesMessages.js";
import { sendError, sendSuccess } from "../utils/responses.js";
import { generateToken } from "../helpers/token.js";

// For Signup
// @route --> POST --> api/auth/register
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
            message: resMessages.PASSWORD_AND_CONFIRM_PASSWORD_NO_MATCH,
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

// For Signin
// @route --> POST --> api/auth/login
// @access --> PUBLIC
export const signin = (req, res) => {
  res.json({
    message: "user signin",
  });
};

// For Verify Account
// @route --> POST --> api/auth/verifyAccount
// @access --> PRIVATE
export const verifyAccount = async (req, res) => {
  console.log("Verify Account Controller");
  console.log(req.body);
  console.log(req.user);
};
