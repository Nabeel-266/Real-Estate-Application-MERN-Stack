import User from "../Models/user-schema.js";
import { StatusCodes } from "http-status-codes";
import { sendError, sendSuccess } from "../utils/responses.js";
import resMessages from "../constants/responsesMessages.js";

//* --> For Update User Profile <--
//? @route --> POST --> /api/auth/updateProfile
//  @access --> PRIVATE
export const updateProfile = async (req, res, next) => {
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
