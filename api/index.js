import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
    process.exit(1);
  }
})();

process.on("SIGINT", async function () {
  console.log("App is terminating");
  process.exit(0);
});
