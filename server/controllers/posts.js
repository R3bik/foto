import Post from "../models/Post.js";
import User from "../models/User.js";

// Creating posts
export const createPosts = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const imageUrl = req.file ? `assets/${req.file.filename}` : null;
    // Fetch user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: imageUrl,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};

// reading posts

// getting all post
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
// geeting post of specific user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
// updating likes
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    // checking if that particular user liked our post
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // removing like by that user
      post.likes.delete(userId);
    } else {
      // adding that user to likes list
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// deleting post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
