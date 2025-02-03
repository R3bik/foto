import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import PostsWidgets from "../widgets/PostsWidgets";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const token = localStorage.getItem("authToken");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/${userId}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    getPosts();
  }, []);

  const fullname = `${user.firstName} ${user.lastName}`;
  const image = user.picturePath;

  const handledelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-10 w-full p-8">
      {/* Profile Card */}
      <div className="w-[40%] bg-black p-8 shadow-lg rounded-lg flex items-center gap-8">
        <img
          src={`http://localhost:3001/${image}`}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover"
        />
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">{fullname}</span>
            <MdEdit className="text-gray-400 cursor-pointer" />
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <span>{posts?.length} posts</span>
            <span>{user ? user.friends.length : 0} friends</span>
          </div>
          <div className="flex flex-col text-gray-400 text-sm">
            <span>Occupation</span>
            <span>Location</span>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="w-[40%] flex flex-col items-center space-y-6">
        <h2 className="text-lg font-semibold text-white">POSTS</h2>
        <div className="space-y-6 w-full">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostsWidgets
                key={post._id}
                postId={post._id} // Pass postId correctly
                fullname={`${post.firstName} ${post.lastName}`}
                description={post.description}
                location={post.location}
                postuserId={post.userId}
                image={post.picturePath}
                userImage={post.userPicturePath}
                handledelete={handledelete} // Pass function
              />
            ))
          ) : (
            <p className="text-gray-400 text-center">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
