import React from "react";
import UserWidget from "../widgets/UserWidget";
import CreatePost from "../widgets/CreatePost";

const HomePage = () => {
  return (
    <div className=" items-center  flex justify-center mx-10 py-8">
      <div className="flex justify-between  w-full">
        {/* left panel */}
        <div className="w-[33.33%] ">
          <UserWidget />
        </div>
        {/* middle panel */}
        <div className="w-[33.33%]">
          <CreatePost />
        </div>
        {/* right panel */}
        <div className="w-[33.33%]">friends</div>
      </div>
    </div>
  );
};

export default HomePage;
