import React from "react";

const WatchedMovies = () => {
  const watchedMovies = JSON.parse(localStorage.getItem("watched")) || [];

  if (watchedMovies.length === 0) {
    return <p className="text-center text-gray-600">No watched movies yet!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Watched Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchedMovies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 shadow-lg rounded-lg">
            <img
              src={movie.img}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedMovies;
