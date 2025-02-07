import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import QRCode from "qrcode";

const ViewPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`https://backend-zd8i.onrender.com/api/posts/${id}`);
      const postData = response.data.data;
      postData.blogImage = postData.blogImage.replace(/\\/g, "/");
      setPost(postData);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const generateQRCode = () => {
    const pageUrl = window.location.origin + location.pathname;
    QRCode.toDataURL(pageUrl, { width: 256 }, (err, url) => {
      if (!err) {
        setQrCodeUrl(url);
        setIsQRCodeGenerated(true);
      }
    });
  };

  useEffect(() => {
    if (post && post.blogImage && !isMobile && canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
      renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.5);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      camera.position.set(0, 1, 5);
      scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(2, 2, 2);
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(post.blogImage, (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        scene.add(model);

        const animate = () => {
          requestAnimationFrame(animate);
          model.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        animate();
      });
    }
  }, [post, isMobile]);

  if (!post) return <p>Loading post details...</p>;

  return (
    <div className="flex flex-col items-center py-12 bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 shadow-2xl rounded-lg space-y-8">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6 text-center">{post.title}</h2>

        {/* Render 3D Model on Desktop using THREE.js */}
        <div className="relative w-full flex justify-center mb-6">
          {!isMobile && <canvas ref={canvasRef} className="rounded-xl shadow-lg border-2" />}
          
          {/* Floating AR Icon on Model */}
          {!isMobile && (
            <button
              onClick={generateQRCode}
              className="absolute top-4 right-4 bg-white shadow-lg p-3 rounded-full border border-gray-300"
            >
              🕶️ Open on Mobile
            </button>
          )}
        </div>

        {/* Render 3D Model on Mobile using model-viewer */}
        {isMobile && (
          <div className="w-full flex flex-col items-center mb-6">
            <model-viewer
              id="modelViewer"
              src={post.blogImage}
              alt="3D model"
              auto-rotate
              camera-controls
              ar
              ar-modes="scene-viewer quick-look webxr"
              className="w-full h-96 rounded-xl"
            />
            {/* AR View Button */}
            <a
              href="#"
              onClick={() => {
                const modelViewer = document.getElementById('modelViewer');
                modelViewer.showAR();
              }}
              className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg text-center shadow-xl hover:bg-blue-700 transition duration-300"
            >
              View in AR
            </a>
          </div>
        )}

        <div className="text-gray-700 leading-relaxed text-lg mb-4" dangerouslySetInnerHTML={{ __html: post.about }} />
        <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{post.category}</span></p>

        {/* Display QR Code for opening the same page on mobile */}
        {isQRCodeGenerated && !isMobile && (
          <div className="text-center mt-8 space-y-4">
            <img
              src={qrCodeUrl}
              alt="QR Code for opening same page on mobile"
              width="220"
              className="shadow-xl rounded-md border-2 border-gray-300"
            />
            <p className="text-gray-600 text-lg">Scan to open this page on mobile</p>
          </div>
        )}

        {/* Desktop "View in Your Room" Button */}
        {!isMobile && (
          <button
            onClick={generateQRCode}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mt-6"
          >
            Open on Mobile
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
