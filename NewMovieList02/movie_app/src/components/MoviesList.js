import React from "react";

const MoviesList = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src={movie.img}
            alt={movie.title}
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600">
            Release Date: {movie.releaseDate}
          </p>
          <p className="text-sm text-gray-700 mt-2">{movie.openingText}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
