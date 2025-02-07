import React, { useEffect } from "react";

const ARView = () => {
  useEffect(() => {
    // This will ensure AR.js is initialized when the component is mounted
    const script1 = document.createElement("script");
    script1.src = "https://aframe.io/releases/1.2.0/aframe.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/ar.js/aframe/build/aframe-ar.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  // Get the model URL from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const modelUrl = urlParams.get("model");

  if (!modelUrl) {
    return <p>No model URL provided for AR view.</p>;
  }

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0 }}>
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-entity
            gltf-model={modelUrl}
            scale="0.5 0.5 0.5"
            position="0 0 0"
            rotation="0 180 0"
          ></a-entity>
        </a-marker>
        <a-camera></a-camera>
      </a-scene>
    </div>
  );
};

export default ARView;
