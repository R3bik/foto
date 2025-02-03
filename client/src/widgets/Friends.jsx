import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlinePersonPin } from "react-icons/md";
import { HiUserRemove } from "react-icons/hi";

const Friends = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col justify-start bg-black p-6 shadow-lg rounded-lg w-[360px] space-y-4">
        <h2>Friend list</h2>
        <div className="flex items-center justify-between  pb-4 ">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHx8Mg%3D%3D"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-col flex">
              <span className="text-lg font-semibold">name</span>
              <span className="text-gray-600 text-sm">Occupation</span>
            </div>
          </div>
          <HiUserRemove className="text-2xl cursor-pointer hover:text-red-500 transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Friends;
