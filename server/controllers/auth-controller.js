import User from "../Models/user-schema.js";
import bcryptjs from "bcryptjs";
import { sendError, sendSuccess } from "../utils/responses.js";
import { StatusCodes } from "http-status-codes";
import resMessages from "../constants/responsesMessages.js";

// For Signup
export const signup = async (req, res, next) => {
  console.log("Signup Controller");
  console.log(req.body);

  try {
    const { username, email, password } = req.body;

    // All Fields Required Verification
    if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_FIELDS,
        })
      );
    }

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

      // Hashed Password
      const hashedPassword = bcryptjs.hashSync(password, 10);
      // Create New User in Database
      const user_Doc = new User({ username, email, password: hashedPassword });
      // New User Saved in Db
      const newUser = await user_Doc.save();

      return res.status(StatusCodes.CREATED).send(
        sendSuccess({
          message: resMessages.SUCCESS_REGISTRATION,
          data: newUser,
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
export const signin = (req, res) => {
  res.json({
    message: "user signin",
  });
};
