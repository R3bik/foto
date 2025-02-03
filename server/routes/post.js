import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
// read post
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// update post
router.patch("/:id/like", verifyToken, likePost);

//delete post
router.delete("/:postId", verifyToken, deletePost);

export default router;
