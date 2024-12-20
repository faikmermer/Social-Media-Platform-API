import { User } from "../model/userModel";
import { Request, Response } from "express";
export const postFollowers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const followerId = req.params.id;
    const { followingId } = req.body;

    const follower = await User.findById(followerId);

    if (!follower) return res.status(404).json({ error: "User not found" });

    if (follower.following.find((f: any) => f === followingId)) {
      return res
        .status(400)
        .json({ error: "You are already following this user" });
    }

    follower.following.push(followingId);
    await follower.save();

    const following = await User.findById(followingId);
    if (!following) return res.status(404).json({ error: "User not found" });

    if (following.followers.find((f: any) => f.toString() === followerId)) {
      return res
        .status(400)
        .json({ error: "You are already following this user" });
    }

    following.followers.push(followerId);
    await following.save();

    return res.status(201).json(follower);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const postUnFollow = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const followerId = req.params.id;
    const { followingId } = req.body;

    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower) return res.status(404).json({ error: "User not found" });

    if (!following) return res.status(404).json({ error: "User not found" });

    follower.following = follower.following.filter(
      (f: any) => f.toString() !== followingId
    );
    following.followers = following.followers.filter(
      (f: any) => f.toString() !== followerId
    );

    console.log(follower.following);
    console.log(following.followers);

    await follower.save();
    await following.save();

    return res.status(200).json(follower);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
