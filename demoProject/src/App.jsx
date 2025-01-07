import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [logo, setLogo] = useState(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const logoRef = useRef(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.width / 2,
      y: e.clientY - rect.height / 2,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">T-Shirt Logo Designer</h1>

        <div className="relative">
          {/* T-Shirt Image */}
          <img
            src="https://unblast.com/wp-content/uploads/2024/03/Mens-T-shirt-Mockup-PSD.jpg"
            alt="T-shirt"
            className="w-64 h-64"
          />

          {/* Draggable Logo */}
          {logo && (
            <img
              src={logo}
              alt="Uploaded Logo"
              ref={logoRef}
              className="absolute cursor-move"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: "50px",
                height: "50px",
              }}
              onMouseDown={(e) => e.preventDefault()}
              onDrag={(e) => handleDrag(e)}
              draggable
            />
          )}
        </div>

        {/* Upload Logo Button */}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="mt-4"
        />
      </div>
    </>
  );
}

export default App;
