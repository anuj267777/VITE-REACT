import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const CreatePost = ({ fetchPosts }) => {
  const [data, setData] = useState({
    title: "",
    blogImage: null,
    about: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle file changes (upload .glb file)
  const handleFileChange = (e) => {
    setData({ ...data, blogImage: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.blogImage) {
      toast.error("Please select a 3D model file (.glb) to upload.");
      return;
    }

    const allowedExtensions = /(.glb)$/i;
    if (!allowedExtensions.exec(data.blogImage.name)) {
      toast.error("Please upload a valid .glb file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("about", data.about);
    formData.append("category", data.category);
    formData.append("blogImage", data.blogImage);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://backend-zd8i.onrender.com/api/posts", // Ensure this matches your backend URL
        formData
      );

      if (response.status === 201) {
        toast.success("Post created successfully! 🎉");
        fetchPosts(); // Update the list of posts
        setShowModal(true); // Show modal after success
        setTimeout(() => {
          navigate("/get-posts"); // Redirect to posts list after a short delay
        }, 2000);
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
      // toast.error(error?.response?.data?.message || "Error creating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Close the success modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-black"
              required
            />
          </div>

          {/* GLB File Upload */}
          <div className="mb-6">
            <label htmlFor="blogImage" className="block text-gray-700 font-medium mb-2">
              Upload GLB File
            </label>
            <input
              type="file"
              id="blogImage"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              onChange={handleFileChange}
              accept=".glb"
              required
            />
          </div>

          {/* About */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">About</label>
            <textarea
              name="about"
              value={data.about}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-black"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-black"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-2xl font-bold text-green-500 text-center mb-4">
              Success!
            </h3>
            <p className="text-center text-gray-700 mb-4">
              Your post has been created successfully.
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
