import React from "react";

const UserPost = ({ fullname, description, location, image, postuserId }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col justify-start bg-black p-6 shadow-lg rounded-lg w-[360px] space-y-4">
        <div className="flex items-center justify-between border-b-[1px] pb-4 border-gray-500">
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:3001/${image}`}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-col flex">
              <span className="text-lg font-semibold">
                {userInfo
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : "Loading..."}
              </span>
              <span className="text-gray-600 text-sm">
                {userInfo ? userInfo.friends.length : 0} friends
              </span>
            </div>
          </div>
          <Link to="/profilepage">
            <MdOutlinePersonPin className="text-2xl cursor-pointer hover:text-green-500 transition-all duration-200" />
          </Link>
        </div>

        <div className="border-b-[1px] pb-4 border-gray-500 space-y-2">
          <div className="flex items-center gap-3">
            <FaLocationDot />
            <span className="text-sm text-gray-500">
              {userInfo?.location || "No location"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineWork />
            <span className="text-sm text-gray-500">
              {userInfo?.occupation || "No occupation"}
            </span>
          </div>
        </div>

        <div className="border-b-[1px] pb-4 border-gray-500">
          <div className="flex justify-between items-center text-sm">
            <span className="text-sm text-gray-500">Views on your profile</span>
            <span className="text-sm">{userInfo?.viewedProfile}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Impressions</span>
            <span className="text-sm">{userInfo?.impressions}</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3>Socials</h3>
          <div className="flex items-center gap-2">
            <FaSquareXTwitter className="w-10 h-10" />
            <div className="flex flex-col">
              <span>X.com</span>
              <span className="text-sm text-gray-500">Social Network</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaLinkedin className="w-10 h-10" />
            <div className="flex flex-col">
              <span>LinkedIn</span>
              <span className="text-sm text-gray-500">Networking platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
