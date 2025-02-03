import React from "react";

import { IoMdPersonAdd } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { BiCommentDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const PostsWidgets = ({
  postId,
  fullname,
  description,
  location,
  image,
  postuserId,
  userImage,
  className,
  handledelete,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  return (
    <div className="w-full">
      <div className={`bg-black px-6 py-4 rounded-lg shadow-lg ${className}`}>
        <div className="flex items-center justify-between  pb-4 ">
          <div className="flex items-center gap-8">
            <img
              src={`http://localhost:3001/${userImage}`}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-col flex">
              <span className="text-lg font-semibold">{fullname}</span>
              <span className="text-gray-600 text-sm">{location}</span>
            </div>
          </div>
          {userId !== postuserId ? (
            <IoMdPersonAdd className="text-2xl cursor-pointer hover:text-green-500 transition-all duration-200" />
          ) : (
            <MdDelete
              className="text-2xl cursor-pointer hover:text-red-500 transition-all duration-200"
              onClick={() => handledelete(postId)}
            />
          )}
        </div>
        <div className="space-y-2">
          <span>{description}</span>
          <img
            src={`http://localhost:3001/${image}`}
            alt=""
            className="h-[400px] w-full object-cover"
          />
        </div>
        <div className="flex items-center pt-4 gap-4">
          <CiHeart className="text-2xl" />
          <BiCommentDetail className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default PostsWidgets;
{
}
