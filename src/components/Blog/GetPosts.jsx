import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://backend-zd8i.onrender.com/api/posts");
      setPosts(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`https://backend-zd8i.onrender.com/api/posts/${id}`);
        setPosts(posts.filter((post) => post._id !== id));
        toast.success("Post deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete post.");
      }
    }
  };

  const handleEdit = (id) => navigate(`/edit-post/${id}`);
  const handleView = (id) => navigate(`/view-post/${id}`);

  const generateQRCode = (modelUrl) => {
    const arUrl = `https://unique-sable-445255.netlify.app/ar?model=${encodeURIComponent(modelUrl)}`;
    setQrCodeUrl(arUrl);
    setSelectedModel(modelUrl);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">
        ✨ All Blog Posts
      </h2>

      {loading && <div className="text-center text-gray-200 text-lg">Fetching posts, please wait...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 border border-gray-300/30"
            >
              <div className="w-full h-52 bg-black flex items-center justify-center">
                {post.blogImage.endsWith(".glb") ? (
                  <model-viewer
                    src={post.blogImage}
                    alt="3D Model"
                    auto-rotate
                    camera-controls
                    ar
                    ar-modes="scene-viewer webxr quick-look"
                    className="w-full h-full"
                  />
                ) : (
                  <img src={post.blogImage} alt={post.title} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{post.about.substring(0, 100)}...</p>
                <span className="inline-block mt-3 text-sm font-medium text-yellow-400">
                  📌 Category: {post.category || "Uncategorized"}
                </span>
              </div>

              {post.blogImage.endsWith(".glb") && (
                <div className="p-6">
                  <button
                    onClick={() => generateQRCode(post.blogImage)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    View in Your Room
                  </button>

                  {selectedModel === post.blogImage && qrCodeUrl && (
                    <div className="flex flex-col items-center mt-4">
                      <QRCodeCanvas value={qrCodeUrl} size={150} />
                      <p className="text-gray-300 text-sm mt-2">Scan to view in AR</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between px-6 py-4 bg-black/30 border-t border-gray-500/20">
                <button
                  onClick={() => handleView(post._id)}
                  className="text-green-400 hover:text-green-300 transition flex items-center"
                >
                  <FiEye className="mr-2" /> View
                </button>
                <button
                  onClick={() => handleEdit(post._id)}
                  className="text-blue-400 hover:text-blue-300 transition flex items-center"
                >
                  <FiEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-400 hover:text-red-300 transition flex items-center"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-300">No posts available.</p>
      )}
    </div>
  );
};

export default GetAllPosts;
