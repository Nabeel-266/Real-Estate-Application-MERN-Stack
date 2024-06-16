import User from "../Models/user-schema.js";
import pkg from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sendEmailOTP } from "../utils/nodemailer.js";
import { emailRegex } from "../utils/emailRegex.js";
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import { generateToken } from "../helpers/token.js";
import resMessages from "../constants/responsesMessages.js";
const { compareSync, hashSync, genSaltSync } = pkg;

//* --> For Signup <--
//? @route --> POST --> api/auth/register
//  @access --> PUBLIC
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

    let user_Doc;

    // Hashed Password
    const passwordSalt = genSaltSync(10);
    const hashedPassword = hashSync(password, passwordSalt);

    // Create New User in Database
    user_Doc = new User({ username, email, password: hashedPassword });

    // Create OTP
    const otp = uuidv4().slice(0, 8);
    console.log(otp);

    // Set OTP and OTP Expiry in USER_Document
    user_Doc.otp = otp;
    user_Doc.otpExpiry = Date.now() + 90000; // 1.5 minutes

    // New User Saved in Db
    const newUser = await user_Doc.save();
    newUser.password = undefined;

    // send OTP to User Email
    const emailResponse = await sendEmailOTP(username, email, otp);
    console.log(emailResponse);

    // Generate Token for User
    const token = generateToken({ data: newUser._id });

    res.cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
    res.status(StatusCodes.CREATED).send(
      sendSuccess({
        message: resMessages.SUCCESS_REGISTRATION,
        data: user_Doc,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in registeration");
    next(error);
  }
};

//* --> For Signin <--
//? @route --> POST --> api/auth/login
//  @access --> PUBLIC
export const signin = async (req, res, next) => {
  console.log("Signup Controller");
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
    console.log(user);

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
    const isPasswordCorrect = compareSync(password, user.password);

    // If Password is not correct
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).send(
        sendError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: resMessages.INCORRECT_PASSWORD,
        })
      );
    }

    let updatedUser;

    if (!user.isVerified) {
      // Create OTP
      const otp = uuidv4().slice(0, 8);
      console.log(otp);

      // Set OTP and OTP Expiry in USER_Document
      user.otp = otp;
      user.otpExpiry = Date.now() + 90000; // 1.5 minutes

      // Update User after create new OTP
      updatedUser = await user.save();
      updatedUser.password = undefined;

      // send OTP to User Email
      const emailResponse = await sendEmailOTP(user.username, user.email, otp);
      console.log(emailResponse);
    } else {
      updatedUser = user;
      updatedUser.password = undefined;
    }

    // Generate Token for User
    const token = generateToken({ data: updatedUser._id });

    res.cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
    res.status(StatusCodes.OK).send(
      sendSuccess({
        message: resMessages.SUCCESS_LOGIN,
        data: updatedUser,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in login");
    next(error);
  }
};

//* --> For Verify Account <--
//? @route --> POST --> api/auth/verifyAccount
//  @access --> PRIVATE
export const verifyAccount = async (req, res, next) => {
  console.log("Verify Account Controller");
  console.log(req.body, "==> Request Body");
  console.log(req.user, "==> Request User ID");

  try {
    const { otp } = req.body;

    // If OTP not found
    if (!otp) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

    // Find User with OTP and Req.User.ID
    const user = await User.findOne({ otp: otp, _id: req.user });

    // If User not found
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send(
        sendError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: resMessages.INVALID_OTP,
        })
      );
    }

    console.log(user, "==> Find USer with OTP and ID");

    // If OTP Expired
    if (user.otpExpiry < Date.now()) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.OTP_EXPIRED,
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
    const token = generateToken({ data: updatedUser._id });

    res.cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
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
//  @access --> PRIVATE
export const resendOTP = async (req, res, next) => {
  console.log("Resend OTP Controller");
  console.log(req.body, "==> Request User");

  try {
    // Find User with Req.User.ID
    const user = await User.findOne({ email: req.body.email });
    console.log(user, "==> Find User with ID");

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

    if (user.otpExpiry > Date.now()) {
      return res.status(StatusCodes.FORBIDDEN).send(
        sendError({
          statusCode: StatusCodes.FORBIDDEN,
          message: resMessages.OTP_NOT_EXPIRED,
        })
      );
    }

    // Create OTP
    const otp = uuidv4().slice(0, 8);
    console.log(otp);

    // Set OTP and OTP Expiry in USER_Document
    user.otp = otp;
    user.otpExpiry = Date.now() + 60000; // 1 minute

    // Update User after create new OTP
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
    console.log(error.message, "==> error in resend Otp");
    next(error);
  }
};

//* --> For Refresh Token <--
//? @route --> GET --> api/auth/refreshToken
//  @access --> PUBLIC
export const refreshToken = async (req, res, next) => {
  console.log("Refresh Token Controller");
  console.log(req.user, "==> Request User");
  console.log(req.tokenExp, "==> Request Token Expiry");

  try {
    const user = await User.findById({ _id: req.user });
    console.log(user, "==> Find User with ID");

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.NO_USER,
        })
      );
    }

    // User Password Remove for giving Response
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
    const token = generateToken({ data: user._id });

    res.cookie("token", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
    res.status(StatusCodes.OK).send(
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
