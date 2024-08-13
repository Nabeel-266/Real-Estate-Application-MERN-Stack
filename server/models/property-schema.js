import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    condition: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bedroom: {
      type: String,
    },
    bathroom: {
      type: String,
    },
    features: {
      type: [String],
    },
    description: {
      type: String,
    },
    availability: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", propertySchema);

export default User;
