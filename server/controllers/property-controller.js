import Property from "../models/property-schema.js";
import User from "../Models/user-schema.js";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import resMessages from "../constants/responsesMessages.js";
import { v2 as cloudinary } from "cloudinary";
import { sendError, sendSuccess } from "../utils/responses.js";

//* --> For Upload Property Images <--
//? @route --> POST --> /api/property/uploadPropertyImages
//  @access --> PRIVATE
export const uploadPropertyImages = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(files.length);

    if (files.length) {
      const uploadPromises = files?.map(async (file) => {
        return cloudinary.uploader
          .upload(file.path, { folder: "NAB_Estate/Properties" })
          .then((result) => {
            // Delete the file from local disk storage after upload completes
            fs.unlinkSync(file.path);
            return result.secure_url; // Return the Cloudinary URL
          });
      });

      const uploadedImageURLs = await Promise.all(uploadPromises);
      console.log(uploadedImageURLs);

      res.status(StatusCodes.OK).send(
        sendSuccess({
          message: resMessages.SUCCESS_UPLOAD_IMAGES,
          data: uploadedImageURLs,
        })
      );
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: "No Files!",
        })
      );
    }
  } catch (error) {
    console.log(error.message, "==> error in uploading profile pic");
    next(error);
  }
};

//* --> For Create a New Property <--
//? @route --> POST --> /api/property/createProperty
//  @access --> PUBLIC
export const createProperty = async (req, res, next) => {
  console.log("Create Property Controller");
  console.log(req.body, "=> Property Details");
  console.log(req.userId, "=> UserId");

  try {
    const userId = req.userId;
    const propertyDoc = req.body;

    const user = await User.findOne({ _id: userId });

    // If USER not exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(
        sendError({
          statusCode: StatusCodes.NOT_FOUND,
          message: resMessages.UN_AUTHENTIC_USER,
        })
      );
    }

    const {
      purpose,
      category,
      type,
      city,
      coordinates,
      size,
      price,
      condition,
      images,
      username,
      contactNumber,
      status,
    } = propertyDoc;

    console.log(propertyDoc);

    if (
      !purpose ||
      !category ||
      !type ||
      !city ||
      !coordinates.lat ||
      !coordinates.lng ||
      !size ||
      !price.label ||
      !price.value ||
      !condition ||
      !images.length ||
      !username ||
      !contactNumber ||
      !status
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        sendError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: resMessages.MISSING_REQUIRED_FIELD,
        })
      );
    }

    // Create & Save a New Property Document
    const newProperty_Doc = new Property({
      ...propertyDoc,
      userId: user._id,
    });
    const newProperty = await newProperty_Doc.save();

    // Update USER in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { [`properties.${status}`]: newProperty._id } },
      { returnDocument: "after" }
    );

    // Remove sensitive data from the updated user
    updatedUser.password = undefined;

    res.status(StatusCodes.CREATED).send(
      sendSuccess({
        message: resMessages.SUCCESS_CREATE_PROPERTY,
        data: updatedUser,
      })
    );
  } catch (error) {
    console.log(error.message, "==> error in create property");
    next(error);
  }
};
