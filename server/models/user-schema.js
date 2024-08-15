import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    liveInCity: {
      type: String,
      default: "",
    },
    properties: {
      drafted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
      published: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
      pending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
      rejected: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
      removed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
