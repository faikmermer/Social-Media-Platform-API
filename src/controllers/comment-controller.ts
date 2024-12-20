import { Request, Response } from "express";
import { Post } from "../model/postModel";
import { Comment } from "../model/commentModel";
import { User } from "../model/userModel";

export const postComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { text, authorId } = req.body;

    const authorUser = await User.findById(authorId);
    const post: any = await Post.findById(id);

    if (!authorUser) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment: any = new Comment();
    comment.text = text;
    comment.author = authorUser;
    comment.post = post.content;

    post.comments.push(comment._id);

    await comment.save();
    await post.save();
    return res
      .status(201)
      .json({ message: "Comment created", text: comment.text });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .select("content")
      .populate({
        path: "comments",
        select: "text",
        populate: { path: "author", select: "name" },
      });
    return res.status(201).json(post);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const putComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { text, authorId } = req.body;
    const comment = await Comment.findById(id);

    if (authorId !== comment?.author?.toString())
      return res
        .status(400)
        .json({ error: "You are not the author of this comment" });

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    comment.text = text;
    await comment.save();
    return res
      .status(201)
      .json({ message: "Comment updated", text: comment.text });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    return res.status(201).json({ message: "Comment deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
