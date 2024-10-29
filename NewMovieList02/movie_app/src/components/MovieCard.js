import React from "react";

import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
  const limitText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <div key={movie.id} className="bg-white p-4 shadow-lg rounded-lg">
      <img
        src={movie.img}
        alt={movie.title}
        className="w-full h-auto mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {movie.title}
      </h3>
      <p className="text-sm text-gray-600">Release Date: {movie.releaseDate}</p>
      <p className="text-sm text-gray-700 mt-2">
        {limitText(movie.openingText, 100)}
      </p>

      <MovieControls movies={movie} type={type} />
    </div>
  );
};

export default MovieCard;
