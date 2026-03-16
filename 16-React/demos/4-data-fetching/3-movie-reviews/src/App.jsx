import { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { fetchMovies, updateMovie } from "./api/movies";
import "./App.css";

/*
   App.jsx — Application Root
  ============================

  This application uses TWO servers during development:

  1️⃣ React Dev Server (Frontend)
     - Runs your React app
     - Serves JSX, CSS, images
     - Usually runs on: http://localhost:3000

  2️⃣ json-server (Backend API)
     - Acts as a fake REST API
     - Reads and writes data from db.json
     - Runs on: http://localhost:3001

  ---------------------------------------------------

  Why use json-server?

  ✔ Lets you work with REAL HTTP requests
  ✔ Mimics how a backend API behaves
  ✔ No backend code required
  ✔ Perfect for learning full-stack concepts

  ---------------------------------------------------

  ⚠️ IMPORTANT:
  Because the frontend and backend are separate,
  you MUST run two servers at the same time.

  Example scripts in package.json:

    "scripts": {
      "dev": "vite",
      "server": "json-server --watch src/server/db.json --port 3001"
    }

  You run them in two terminals:

    Terminal 1:
      npm run dev

    Terminal 2:
      npm run server

  ---------------------------------------------------

  🌍 REAL-WORLD COMPARISON

  In production:
  - Frontend might be deployed on Netlify / Vercel
  - Backend might be deployed on AWS / Render / Railway
  - They communicate over HTTP just like this

  json-server helps you PRACTICE that workflow locally.
*/

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  /*
    Load movies ONCE when app mounts
  */
  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch(() => setError("Failed to load movies"));
  }, []);

  /*
    Add a review and persist it to json-server
  */
  const addReview = async (movieId, review) => {
    const movie = movies.find((m) => m.id === movieId);

    const updatedMovie = {
      ...movie,
      reviews: [...movie.reviews, { ...review, id: Date.now() }]
    };

    try {
      await updateMovie(updatedMovie);

      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.id === movieId ? updatedMovie : m
        )
      );
    } catch {
      setError("Failed to save review");
    }
  };

  return (
    <div className="container">
      <Header />
      {error && <p className="error">{error}</p>}
      <MovieList movies={movies} addReview={addReview} />
    </div>
  );
}
