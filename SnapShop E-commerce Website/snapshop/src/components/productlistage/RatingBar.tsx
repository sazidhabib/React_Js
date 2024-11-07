import React from "react";

// Define the props type for the RatingBar component
interface RatingBarProps {
  rating: number; // rating value from 0 to 5
}

const RatingBar: React.FC<RatingBarProps> = ({ rating }) => {
  // Generate an array to represent each star
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex space-x-1">
      {stars.map((star) => (
        <div
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? "text-yellow-400" // Filled star color
              : rating >= star - 0.5 && rating < star
              ? "text-yellow-200" // Half-filled star color
              : "text-gray-300" // Empty star color
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 .587l3.668 7.429 8.2 1.192-5.935 5.784 1.4 8.165L12 18.896l-7.333 3.861 1.4-8.165L.132 9.208l8.2-1.192L12 .587z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default RatingBar;
