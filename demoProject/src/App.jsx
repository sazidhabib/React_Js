import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [logo, setLogo] = useState(null);
  const [position, setPosition] = useState({ x: 100, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const logoRef = useRef(null);
  const tShirtRef = useRef(null);
  const canvasRef = useRef(null);

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

  const handleMouseDown = () => {
    if (!isSubmitted) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isSubmitted) {
      const tShirtRect = tShirtRef.current.getBoundingClientRect();
      const newX = e.clientX - tShirtRect.left - 25;
      const newY = e.clientY - tShirtRect.top - 25;

      setPosition({
        x: newX,
        y: newY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    alert("Logo and t-shirt merged successfully...");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const tShirtImage = tShirtRef.current;
    const img = new Image();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(tShirtImage, 0, 0, canvas.width, canvas.height);

    if (logo) {
      img.src = logo;
      img.onload = () => {
        ctx.drawImage(img, position.x, position.y, 50, 50);
        alert("Logo merged with T-shirt!");
      };
    }
  };

  return (
    <>
      <div className="overflow-hidden text-center mt-4">
        <p className="text-xl  mb-4">
          Here in an input box that allows users to upload a logo design, and
          enable them to position the logo anywhere on the t-shirt image. and
          after click on the "Submit Design" button it will disable the
          positioning of the logo and merge the logo with the t-shirt image.
        </p>
        <div className="flex items-center justify-center p-5 bg-gray-100">
          <p className="top-0 text-center"></p>
          <div
            className="relative"
            ref={tShirtRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <h1 className="text-2xl font-bold mb-4">T-Shirt</h1>
            <img
              src="https://unblast.com/wp-content/uploads/2024/03/Mens-T-shirt-Mockup-PSD.jpg"
              alt="T-shirt"
              className="w-64 h-64"
            />

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
                onMouseDown={handleMouseDown}
              />
            )}
          </div>

          <div className="ml-8 flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
              Submit Design
            </button>

            <canvas
              ref={canvasRef}
              width="256"
              height="256"
              className="hidden"
            ></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
