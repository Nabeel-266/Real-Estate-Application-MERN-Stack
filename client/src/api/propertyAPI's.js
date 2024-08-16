import axios from "axios";
import toastify from "../utils/toastify";

// Import Routes
import {
  CREATE_PROPERTY,
  UPLOAD_PROPERTY_IMAGES,
} from "../constants/apisRoute";

// Import Actions
import { updateUserDocSuccess } from "../app/actions/userActions";

// For CREATE a PROPERTY
export const createProperty = async (propertyDoc, dispatch) => {
  try {
    // Add images to form data for uploading
    const formData = new FormData();
    propertyDoc.images.forEach((image) => {
      formData.append("files", image);
    });

    // Upload images response to the server
    const uploadImagesResponse = await axios.post(
      `${UPLOAD_PROPERTY_IMAGES}`,
      formData
    );

    // If upload images are successful then get the uploaded image URLs
    const uploadImageURLs = uploadImagesResponse?.data?.result;

    if (uploadImagesResponse?.data?.status === "Success") {
      // Update property document with the uploaded image URLs
      const updatePropertyDoc = { ...propertyDoc, images: uploadImageURLs };

      // Create a new property
      const response = await axios.post(
        `${CREATE_PROPERTY}`,
        updatePropertyDoc
      );

      // Get the response data
      const responseData = response?.data;

      if (responseData?.status === "Success") {
        dispatch(updateUserDocSuccess(responseData.result));

        toastify(
          "success",
          `${responseData.result.username} ! Your Property created successfully`,
          "top-right",
          "dark",
          4000
        );
      }
    }
  } catch (error) {
    throw error;
  }
};