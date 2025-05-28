import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String
    },
    imgUrl: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema);
