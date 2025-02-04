import React, { useState, useEffect } from "react";
import UserWidget from "../widgets/UserWidget";
import CreatePost from "../widgets/CreatePost";
import PostsWidgets from "../widgets/PostsWidgets";
import axios from "axios";
import Friends from "../widgets/Friends";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const userId = userInfo._id;

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
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request
        },
      });
      const data = response.data;
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };
  useEffect(() => {
    getUser();
    getPosts();
  }, []);
  console.log;
  const image = user.picturePath;
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
                  userImage={image}
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
