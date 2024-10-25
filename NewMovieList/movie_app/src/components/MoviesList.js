import React from "react";
import { Link } from "react-router-dom";

const MoviesList = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-4 shadow-lg rounded-lg">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={movie.img}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {movie.title}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
