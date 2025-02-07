import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiList, FiBox } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sidebar */}
      <div className="w-1/4 bg-white/10 backdrop-blur-lg shadow-xl border-r border-gray-300/30 flex flex-col p-6 text-white">
        <h2 className="text-2xl font-extrabold mb-8 text-center tracking-wide">
          🚀 Blog Dashboard
        </h2>

        <button
          className="flex items-center gap-3 mb-4 py-3 px-4 w-full bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          onClick={() => navigate("/create-post")}
        >
          <FiPlusCircle size={20} /> Create Blog Post
        </button>

        <button
          className="flex items-center gap-3 mb-4 py-3 px-4 w-full bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
          onClick={() => navigate("/get-posts")}
        >
          <FiList size={20} /> View All Posts
        </button>

        <button
          className="flex items-center gap-3 py-3 px-4 w-full bg-green-600 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          onClick={() => window.location.href = "https://ar-webstore-7g2z.vercel.app/"}
        >
          <FiBox size={20} /> View 3D Products
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-white text-center p-8">
        <h2 className="text-4xl font-bold mb-4">✨ Welcome to Your Blog Dashboard</h2>
        <p className="text-lg text-gray-300">
          Use the sidebar to manage your blog posts and 3D products.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
