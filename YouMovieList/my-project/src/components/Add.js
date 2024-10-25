import React, { useState } from "react";

const Add = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://movies-api14.p.rapidapi.com/movies",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "f763d779e0mshf17c58e06e03995p10a109jsnd27ec419a469",
          },
        }
      );
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
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChangeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
