import React from "react";
import { useNavigate } from "react-router-dom";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
  const navigate = useNavigate();
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
      <p className="text-sm text-gray-700 mt-2">{movie.openingText}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 my-3 rounded">
        watched
      </button>
      <MovieControls movies={movie} type={type} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          navigate(`/details/${movie.id}`);
        }}
      >
        Details
      </button>
    </div>
  );
};

export default MovieCard;
