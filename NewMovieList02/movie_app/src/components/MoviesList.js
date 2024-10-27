import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MoviesList = ({ movies }) => {

  const [watched,setWatched]= useState([])
  

 const navigate= useNavigate()

 console.log("WATCHED", watched)


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
          <button onClick={()=> {
            const arr= [...watched]

            const currentIndex = arr.findIndex(
              (c) => c.id === movie.id
            );
           
        
            if (currentIndex === -1) {
              arr.push(movie);
            } else {
              arr.splice(currentIndex, 1);
            }
        
           
            setWatched(arr)

          }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 my-3 rounded">
            watched
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            watched later
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> {
            navigate(`/details/${movie.id}`)
          }}>
            Details
          </button>
          

        </div>
      ))}
    </div>
  );
};

export default MoviesList;
