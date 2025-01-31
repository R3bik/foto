import React from "react";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <HomePage />
    </div>
  );
};

export default Home;
