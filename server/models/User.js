import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    avatarUrl: {
      type: String,
    },
    savedImages: {
        type: [String],
      },

  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
