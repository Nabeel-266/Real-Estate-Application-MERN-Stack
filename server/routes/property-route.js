import express from "express";

// Import Middleware
import { upload } from "../helpers/storage.js";
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  uploadPropertyImages,
  createProperty,
  getUserProperty,
  getProperties,
  getProperty,
} from "../controllers/property-controller.js";

// Define Property Router
const propertyRouter = express.Router();

//* For Get Multiple Properties
propertyRouter.get("/all", getProperties);

//* For Get a Single Property
propertyRouter.get("/:propertyId", getProperty);

//* For Get Specific User Properties
propertyRouter.get("/user/:userId", getUserProperty);

//* For Upload Property Images
propertyRouter.post(
  "/uploadPropertyImages",
  upload.array("files", 12),
  uploadPropertyImages
);

//* For Create a New Property
propertyRouter.post("/createProperty", validateToken, createProperty);

export default propertyRouter;
