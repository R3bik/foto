import React, { useState, useEffect } from "react";
import UserWidget from "../widgets/UserWidget";
import CreatePost from "../widgets/CreatePost";
import PostsWidgets from "../widgets/PostsWidgets";
import axios from "axios";
import Friends from "../widgets/Friends";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("authToken");

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request
        },
      });
      setPosts(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex justify-center items-center mx-10 py-8">
      <div className="flex justify-between w-full">
        {/* Left panel */}
        <div className="w-[33.33%]">
          <UserWidget />
        </div>

        {/* Middle panel */}
        <div className="w-[33.33%] space-y-8">
          <CreatePost />
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostsWidgets
                  key={post._id}
                  fullname={`${post.firstName} ${post.lastName}`}
                  description={post.description}
                  location={post.location}
                  postuserId={post.userId}
                  image={post.picturePath}
                />
              ))
            ) : (
              <p className="text-gray-400">No posts available.</p>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[33.33%]">
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
