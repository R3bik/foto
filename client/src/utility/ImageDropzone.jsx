import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ImageDropzone = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onUpload && onUpload(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer transition ${
        dragging
          ? "border-blue-500 bg-gray-800"
          : "border-gray-700 hover:bg-gray-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {image ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <FaEdit />
            </button>
            <button
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500"
              onClick={removeImage}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <span className="text-gray-400">
            Drag & drop an image here or click to upload
          </span>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageDropzone;
