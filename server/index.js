import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

// Import Routes
import userRouter from "./routes/user-route.js";
import authRouter from "./routes/auth-route.js";
import propertyRouter from "./routes/property-route.js";

// Configuration
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

// Connect Database and Run the Server
(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("You successfully connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running successfully on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error + " ==> Connection Problem");
    // process.exit(1);
  }
})();

// Set dirname for ES Module Scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000 },
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).send({
    statusCode,
    status: "Failed",
    message,
  });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);

// process.on("SIGINT", async function () {
//   console.log("App is terminating");
//   process.exit(0);
// });
