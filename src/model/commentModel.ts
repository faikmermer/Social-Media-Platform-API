import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  authorID: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model("Comment", commentSchema);
