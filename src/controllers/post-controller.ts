import { Request, Response } from "express";
import { Post } from "../model/postModel";
import { User } from "../model/userModel";

const mongoose = require("mongoose");

export const postPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { content, authorId } = req.body;
    const authorUser = await User.findById(authorId);

    if (!authorUser) return res.status(404).json({ error: "User not found" });

    const post = new Post();
    post.content = content;
    post.author = authorUser;

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await Post.find({})
      .populate("author", "name email -_id")
      .sort({ createdAt: 1 });
    return res.status(201).json(posts);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const getPostId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("author", "name email -_id")
      .sort({ createdAt: 1 });
    return res.status(201).json(post);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
export const putPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) return res.status(400).json({ error: "Content is required" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid id" });

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.content = content;
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.status(201).json({ message: "Post deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
