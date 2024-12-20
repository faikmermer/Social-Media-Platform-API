import { Request, Response } from "express";
import { User } from "model/userModel";

export const postUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, bio } = req.body;

    const exitingUser = await User.findOne({ email: email });

    if (exitingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.bio = bio;

    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find({});

    const result: any = [];

    users.forEach((user: any) => {
      result.push({
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        followers: user.followers.length,
        following: user.following.length,
      });
    });
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
export const getUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const putUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    user.email = email;
    user.bio = bio;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "Unknown error" });
  }
};
