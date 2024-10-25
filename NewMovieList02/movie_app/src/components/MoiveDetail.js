import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviesList from "./components/MoviesList";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://movies-api14.p.rapidapi.com/movies/_${id}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "f763d779e0mshf17c58e06e03995p10a109jsnd27ec419a469",
            },
          }
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const transformedMovies = data.movies.map((movieData) => {
          return {
            id: movieData._id,
            img: movieData.poster_path,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.overview,
          };
        });
        setMovie(transformedMovies);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchMovieDetail();
  }, [id]);

  let content = <p className="text-center text-gray-600">Found no movies...</p>;

  if (movie.length > 0) {
    content = <MoviesList movies={movie} />;
  }

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return (content = <p className="text-center text-red-600">{error}</p>);
  if (!movie)
    return (content = (
      <p className="text-center text-gray-600">No movie found!</p>
    ));

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        {movie.title}
      </h2>
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-auto mb-6 rounded-lg"
      />
      <p className="text-gray-700 mb-4">{movie.overview}</p>
      <p className="text-gray-600">Release Date: {movie.release_date}</p>
    </div>
  );
};

export default MovieDetail;
