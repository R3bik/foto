import React, { useState } from "react";
import Inputbox from "../utility/Inputbox";
import Button from "../utility/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [picturePath, setPicturePath] = useState(null); // Store file, not path
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !password || !email) {
      toast.error("Please fill in required fields!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      if (picturePath) {
        formData.append("picture", picturePath); // Send file here
      }

      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData, // Send FormData as the request body
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure this header is set for file upload
          },
        }
      );

      toast.success("Account created successfully!");
      setfirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
      setPicturePath(null);
      navigate("/");
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message || "User already exists");
      } else {
        console.error("Error creating account", err);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen overflow-hidden"
    >
      <div className="flex flex-col items-center space-y-6 justify-center sm:border px-4  min-w-[290px] py-6 shadow-lg ">
        <div className="pb-4 flex flex-col items-center justify-center border-b">
          <Link
            to="/"
            className="text-4xl font-bold font-pacifico text-green-400 cursor-pointer"
          >
            Foto
          </Link>
          <p className="text-gray-300 font-semibold">Create your account.</p>
        </div>
        <div className="space-y-4 flex flex-col items-center mt-4 min-w-[300px]">
          <div className="w-full flex gap-2">
            <div>
              <label htmlFor="firstname">First name</label>
              <Inputbox
                id="firstname"
                type="text"
                holder="Enter your first name"
                onChange={(e) => setfirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last name</label>
              <Inputbox
                id="lastname"
                type="text"
                holder="Enter your last name"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <Inputbox
              id="email"
              type="text"
              holder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Inputbox
                id="password"
                type={visible ? "text" : "password"}
                holder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setVisible(!visible)}
                className="absolute right-2 top-3 transform text-lg cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {visible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="picturepath">Profile picture</label>
            <Inputbox
              id="profile"
              type="file"
              onChange={(e) => {
                setPicturePath(e.target.files[0]); // Store the file object, not path
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Button>Signup!</Button>
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-green-500 hover:text-green-400 cursor-pointer"
            >
              Login.
            </Link>
          </p>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </form>
  );
};

export default SignupPage;
