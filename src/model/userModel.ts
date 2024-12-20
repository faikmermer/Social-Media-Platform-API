import { Schema } from "mongoose";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      required: true,
    },
    bio: { type: String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  { versionKey: false }
);

userSchema.set("toJson", {
  transform: (doc: any, ret: any) => {
    delete ret._id;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
