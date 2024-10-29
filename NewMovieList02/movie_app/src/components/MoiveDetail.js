import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";

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
          `https://movies-api14.p.rapidapi.com/movie/${id}`,
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
        console.log("data", data);

        setMovie(data.movie);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchMovieDetail();
  }, [id]);

  return (
    <Fragment>
      <Navbar />
      {movie && (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className=" rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={movie.poster_path}
                    alt={movie.title}
                  />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {movie.title}
                </h2>

                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Release Date:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      {movie.release_date}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Genres:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      {movie.genres}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Movie Description:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetail;
