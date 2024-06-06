import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();

// Import Routes
import userRouter from "./routes/user-route.js";
import authRouter from "./routes/auth-route.js";

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
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// process.on("SIGINT", async function () {
//   console.log("App is terminating");
//   process.exit(0);
// });
