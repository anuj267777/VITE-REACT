
import React from "react";
import { FaTrash , FaEye , FaEdit } from "react-icons/fa";

const BlogCard = ({ title, blogImage, about, category ,  onEdit , onDelete , onView }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <img src={blogImage} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
    <h3 className="text-xl   text-gray-600 font-bold mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">
      {about.length > 100 ? `${about.substring(0, 100)}...` : about} 
    </p>
    <p className="text-sm text-gray-500 mt-2">Category: {category}</p>

    <div className="mt-3 flex space-x-10">
      <button
        onClick={onEdit}
        className="text-gray-500 hover:text-blue-700 flex items-center"
      >
         <FaEdit size={16} className="mr-1" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 flex items-center"
      >
        <FaTrash size={16} className="mr-1" /> Delete
      </button>
      <button
      onClick={onView}
      className="text-green-800 hover:text-green-900 flex items-center">
        <FaEye size={20} className="mr-1" /> View
      </button>
    </div>
  </div>
);

export default BlogCard;
