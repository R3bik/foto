import React from "react";

const Inputbox = ({ holder, type, id, className, onChange }) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        className={`w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-400 hover:border-green-400 shadow-sm focus:shadow ${className}`}
        placeholder={holder}
        onChange={onChange}
      />
    </div>
  );
};

export default Inputbox;
