import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 

import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      const response = await axios.post("https://backend-zd8i.onrender.com/api/register", data);
      toast.success("Registration Successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page after 2 seconds
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-400"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-400"
            />
          </div>

          {/* Photo Input */}
          <div>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold focus:outline-none ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} transition duration-300`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* Additional Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500 font-medium">{message}</p>
        )}
        
        {/* Optional: Add some footer with a link */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
