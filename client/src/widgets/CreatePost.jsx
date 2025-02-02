import React, { useState } from "react";
import Inputbox from "../utility/Inputbox";
import Button from "../utility/Button";
import { BiImageAdd } from "react-icons/bi";
import { GiAlligatorClip } from "react-icons/gi";
import { FiPaperclip } from "react-icons/fi";
import { MdVideocam } from "react-icons/md";
import ImageDropzone from "../utility/ImageDropzone";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CreatePost = () => {
  const [activeImage, setActiveImage] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const userId = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  const [description, setDescription] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const handlesubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/posts",
        {
          userId,
          description,
          picturePath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request
          },
        }
      );
      toast.success("Posted!");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-black p-6 rounded-lg shadow-lg ">
        <div className="flex flex-col border-b border-gray-500 pb-4 space-y-4">
          <div className="flex gap-4 items-center ">
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=500&auto=format&fit=crop&q=60"
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <Inputbox
                className="rounded-full"
                type="text"
                holder="Something on your mind"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          {activeImage && (
            <div className="border ">
              <div className="p-3">
                {/* <ImageDropzone /> */}
                <Inputbox
                  type="file"
                  onChange={(e) => {
                    setPicturePath(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="pt-4 flex items-center justify-between">
          <div
            className="flex gap-1 items-center cursor-pointer rounded-lg hover:bg-[#222222] p-2"
            onClick={() => {
              setActiveImage(!activeImage);
            }}
          >
            <BiImageAdd className="text-2xl" />
            <span className="text-sm">Image</span>
          </div>
          <div className="flex gap-1 items-center cursor-pointer  rounded-lg hover:bg-[#222222] p-2">
            <MdVideocam className="text-2xl" />
            <span className="text-sm">Video</span>
          </div>
          <div className="flex gap-1 items-center cursor-pointer rounded-lg hover:bg-[#222222] p-2">
            <FiPaperclip className="text-2xl" />
            <span className="text-sm">Attachment</span>
          </div>

          <div onClick={handlesubmit}>
            <Button className=" rounded-full hover:border hover:border-white px-4">
              post
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default CreatePost;
