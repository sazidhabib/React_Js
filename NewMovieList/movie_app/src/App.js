import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar.js";
import MovieDetail from "./components/MoiveDetail.js";
import MoviesList from "./components/MoviesList";
import WatchedMovies from "./components/WatchedMoives.js";
import WatchLaterMovies from "./components/WatchLaterMovies";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watched" element={<WatchedMovies />} />
            <Route path="/watch-later" element={<WatchLaterMovies />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
