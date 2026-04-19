import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    desc: String
  },
  {
    timestamps: true
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;