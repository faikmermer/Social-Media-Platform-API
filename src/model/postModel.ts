import mongoose, { Schema } from "mongoose";
interface PostDoc extends mongoose.Document {
  updatedAt: Date;
}

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
/*
postSchema.set("toJSON", {
  transform: (doc: any, ret: any) => {
    delete ret._id;
    return ret;
  },
});
*/
postSchema.pre("save", function (this: PostDoc, next: any) {
  this.updatedAt = new Date(Date.now());
  next();
});
export const Post = mongoose.model("Post", postSchema);
