import express from "express";

// Import Middleware
import { uploads } from "../helpers/storage.js";
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  uploadPropertyImages,
  createProperty,
  getUserProperty,
  getProperties,
} from "../controllers/property-controller.js";

// Define Property Router
const propertyRouter = express.Router();

//* For Upload Property Images
propertyRouter.post("/uploadPropertyImages", uploads, uploadPropertyImages);

//* For Create a New Property
propertyRouter.post("/createProperty", validateToken, createProperty);

//* For Get User Properties
propertyRouter.get("/getUserProperty/:userId", getUserProperty);

//* For Get Properties
propertyRouter.get("/getProperties", getProperties);

export default propertyRouter;
