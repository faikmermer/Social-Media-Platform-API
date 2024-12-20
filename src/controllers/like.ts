import { Request, Response } from "express";
import { Post } from "../model/postModel";

export const likePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postid } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postid);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.likes.find((p: any) => p.toString() === userId)) {
      return res.status(400).json({ error: "You already liked this post" });
    }

    post.likes.push(userId);
    await post.save();

    return res.status(201).json({
      content: post.content,
      likesCount: post.likes.length,
      author: post.author,
      likes: post.likes,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const unlikePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postid } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postid);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!post.likes.find((p: any) => p.toString() === userId)) {
      return res.status(400).json({ error: "You have not liked this post" });
    }

    post.likes = post.likes.filter((p: any) => p.toString() !== userId);
    await post.save();

    return res.status(201).json({
      content: post.content,
      likesCount: post.likes.length,
      author: post.author,
      likes: post.likes,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
