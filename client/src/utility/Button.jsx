import React from "react";

const Button = ({ children, className }) => {
  return (
    <button
      className={`bg-green-400 text-black border px-3 py-2 hover:border rounded-lg hover:border-green-400 transition-all duration-300 hover:bg-black hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
