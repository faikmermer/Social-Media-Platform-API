import express from "express";
import { postUser } from "controllers/user-controller";
import { getUserId, getUser } from "controllers/user-controller";
import { putUser, deleteUser } from "controllers/user-controller";
import { postFollowers } from "controllers/un-follow-controller";
import { postUnFollow } from "controllers/un-follow-controller";
import { deletePost, postPost } from "controllers/post-controller";
import { getPosts, getPostId } from "controllers/post-controller";
import { putPost } from "controllers/post-controller";
import { likePost, unlikePost } from "controllers/like";
import { postComment, getComments } from "controllers/comment-controller";
import { putComment, deleteComment } from "controllers/comment-controller";

const router = express.Router();

router.post("/user", postUser);
router.get("/user", getUser);
router.get("/user/:id", getUserId);
router.put("/user/:id", putUser);
router.delete("/user/:id", deleteUser);

router.post("/user/:id/followers", postFollowers);
router.post("/user/:id/unfollow", postUnFollow);

router.post("/posts", postPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostId);
router.put("/posts/:id", putPost);
router.delete("/posts/:id", deletePost);

router.post("/posts/:postid/like", likePost);
router.post("/posts/:postid/unlike", unlikePost);

router.post("/posts/:id/comments", postComment);
router.get("/posts/:id/comments", getComments);
router.put("/comments/:id", putComment);
router.delete("/comments/:id", deleteComment);

export default router;
