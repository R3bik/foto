import React, { useState } from "react";
import login from "../assets/login-cover.jpg";
import Inputbox from "../utility/Inputbox";
import Button from "../utility/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      toast.error("Please fill in all the fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login-user",
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      localStorage.setItem("authToken", token, response.data);
      console.log(response.data.user.role);

      toast.success(response.data.message || "Logged in successfully!");
      navigate("/");
    } catch (err) {
      if (err.response) {
        // If the server responded with an error
        if (err.response.status === 401) {
          toast.error(err.response.data.message || "User does not exist!");
        } else {
          toast.error(err.response.data.message || "An error occurred!");
        }
      } else if (err.request) {
        // If the request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // If an unknown error occurred
        console.error("Error logging in:", err);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex items-center justify-between ">
        <div className=" hidden md:flex  min-h-screen ">
          <img src={login} alt="" className=" object-fit w-full min-h-screen" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center "
        >
          <div className="flex flex-col items-center space-y-6 justify-center    sm:min-w-[420px] px-6 py-6 shadow-lg">
            <div className="pb-4 flex flex-col items-center justify-center border-b">
              <Link
                to="/"
                className="text-4xl font-bold text-green-400 font-pacifico cursor-pointer"
              >
                Foto
              </Link>
              <p className="text-gray-300 font-semibold">
                Login into your account.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center mt-4 min-w-[300px]">
              <div className="w-full ">
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
                    onClick={() => {
                      setVisible(!visible);
                    }}
                    className="absolute right-2 top-3 transform text-lg cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 ">
              <Button className="w-full">Log in</Button>
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-green-500 hover:text-green-400 cursor-pointer"
                >
                  Signup.
                </Link>
              </p>
            </div>
            <ToastContainer position="top-center" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
