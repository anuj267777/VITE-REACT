import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    blogImage: null, // File object instead of a string
    about: "",
    category: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://backend-zd8i.onrender.com/api/posts/${id}`);
        const { title, about, category } = response.data.data;
        setFormData({ title, blogImage: null, about, category });
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, blogImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("about", formData.about);
      formDataToSubmit.append("category", formData.category);
      if (formData.blogImage) {
        formDataToSubmit.append("blogImage", formData.blogImage);
      }

      await axios.put(`https://backend-zd8i.onrender.com/api/posts/${id}`, formDataToSubmit, {
        "Content-Type": "multipart/form-data",
      });
      navigate("/get-posts"); // Redirect to home after successful edit
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="p-8" style={{ backgroundColor: "#fef2f2" }}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Blog Image</label>
          <input
            type="file"
            name="blogImage"
            onChange={handleFileChange} // Handle file changes
            className="w-full p-2 border border-gray-300 rounded  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded  text-black"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded  text-black"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
