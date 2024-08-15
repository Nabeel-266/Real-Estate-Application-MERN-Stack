import express from "express";

// Import Middleware
import { uploads } from "../helpers/storage.js";
import { validateToken } from "../helpers/token.js";

// Import Controllers
import {
  createProperty,
  uploadPropertyImages,
} from "../controllers/property-controller.js";

// Define Property Router
const propertyRouter = express.Router();

//* For Upload Property Images
propertyRouter.post("/uploadPropertyImages", uploads, uploadPropertyImages);

//* For Create a New Property
propertyRouter.post("/createProperty", validateToken, createProperty);

export default propertyRouter;
