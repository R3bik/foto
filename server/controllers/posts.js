import Post from "../models/Post.js";
import User from "../models/User.js";

// Creating posts
export const createPosts = async (req, res) => {
  try {
    const { userId, picturePath, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
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
    const post = await Post.findById({ userId });
    res.status(200).json(post);
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
