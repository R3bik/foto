import React, { useState } from "react";
import Inputbox from "../utility/Inputbox";
import { IoIosArrowDropdown, IoIosSearch } from "react-icons/io";
import { RiNotification4Line } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    dispatch(setLogout());
    window.location.reload();
  };

  return (
    <div className="p-4 sm:px-10 sm:py-4 shadow-lg bg-black">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className=" font-pacifico text-green-500 text-3xl">Foto</h1>
        </div>

        <div className="relative sm:flex items-center hidden gap-3">
          <Inputbox className="min-w-[390px]" holder="Search for posts...." />
          <IoIosSearch className="text-2xl absolute right-1" />
        </div>
        <div className="flex items-center gap-3">
          <IoIosSearch className="sm:hidden text-3xl" />
          <AiOutlineMessage className="text-2xl hover:text-green-500 transition-all duration-200 cursor-pointer" />
          <RiNotification4Line className="text-2xl  hover:text-green-500 transition-all duration-200 cursor-pointer " />
          <div className="relative flex gap-2 items-center">
            <CgProfile
              className="text-2xl  hover:text-green-500 transition-all duration-200 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />

            {isOpen && (
              <div className="absolute bg-black border rounded-lg p-3 right-0 top-7 z-50 min-w-[140px] flex flex-col items-center justify-center min-h-[120px] space-y-3 cursor-pointer ">
                <h3 className="border-b-2  w-full text-center p-1">
                  {user ? user.firstName : "Loading..."}{" "}
                  {/* Check user before using */}
                </h3>
                <div className="flex flex-col items-start gap-2 p-2">
                  <span className="hover:text-green-500 transition-all duration-200 flex items-center gap-1">
                    <IoPerson />
                    Profile
                  </span>
                  <span
                    className="hover:text-red-500 transition-all duration-200 flex items-center gap-1"
                    onClick={handleLogOut}
                  >
                    <MdLogout />
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
