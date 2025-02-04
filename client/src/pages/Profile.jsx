import React, { useEffect, useState } from "react";
import { MdEdit, MdOutlineWork } from "react-icons/md";
import axios from "axios";
import PostsWidgets from "../widgets/PostsWidgets";
import Inputbox from "../utility/Inputbox";
import { toast, ToastContainer } from "react-toastify";
import Button from "../utility/Button";
import { IoMdClose } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const token = localStorage.getItem("authToken");
  const [posts, setPosts] = useState([]);
  const [isopen, setIsOpen] = useState(false);
  const [picturePath, setPicturePath] = useState(null);
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [userInfo, setUserInfo] = useState("");
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
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request
        },
      });
      const data = response.data;
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const fullname = `${user.firstName} ${user.lastName}`;

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
  const updateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("location", location);
      formData.append("occupation", occupation);
      if (picturePath) {
        formData.append("picture", picturePath);
      }

      const response = await axios.patch(
        `http://localhost:3001/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");

      setLocation("");
      setOccupation("");
      setPicturePath("");
      setIsOpen(false);
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update profile.");
    }
  };

  const image = userInfo.picturePath;

  return (
    <div className="relative flex flex-col items-center space-y-10 w-full p-8">
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
            <MdEdit
              className="text-gray-400 cursor-pointer hover:text-green-500 transition-all duration-200 text-2xl "
              onClick={() => {
                setIsOpen(!isopen);
              }}
            />
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <span>{posts?.length} posts</span>
            <span>{user ? user.friends.length : 0} friends</span>
          </div>
          <div className="flex flex-col text-gray-400 text-sm gap-1">
            <span className="flex gap-2 items-center">
              {" "}
              <FaLocationDot />
              {userInfo?.location || ""}
            </span>
            <span className="flex gap-2 items-center">
              {" "}
              <MdOutlineWork /> {userInfo?.occupation || ""}
            </span>
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
                userImage={image}
                handledelete={handledelete} // Pass function
              />
            ))
          ) : (
            <p className="text-gray-400 text-center">No posts available.</p>
          )}
        </div>
      </div>
      {/* edit page */}
      {isopen && (
        <div className="absolute ">
          <form className="bg-black sm:border shadow-lg">
            <div className="w-full items-end flex justify-end p-4 ">
              <IoMdClose
                className=" text-2xl hover:text-red-500 transition-all duration-500 cursor-pointer"
                onClick={() => {
                  setIsOpen(!isopen);
                }}
              />
            </div>
            <div className="flex flex-col items-center space-y-6 justify-center  px-6  min-w-[290px] py-6  ">
              <div className="pb-4 flex flex-col items-center justify-center border-b">
                <span className="text-4xl font-bold font-pacifico text-green-400 cursor-pointer">
                  Edit your profile
                </span>
              </div>
              <div className="space-y-4 flex flex-col items-center mt-4 min-w-[300px]">
                <div className="w-full">
                  <label htmlFor="location">Location</label>
                  <Inputbox
                    id="email"
                    type="text"
                    holder="Enter your location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="w-full ">
                  <label htmlFor="occupation">Occupation</label>

                  <Inputbox
                    id="password"
                    type="text"
                    holder="Enter your Occupation"
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="picturepath">Profile picture</label>
                  <Inputbox
                    id="profile"
                    type="file"
                    onChange={(e) => {
                      setPicturePath(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-center space-y-2"
                onClick={updateUser}
              >
                <Button>Save</Button>
              </div>
            </div>
          </form>
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Profile;
