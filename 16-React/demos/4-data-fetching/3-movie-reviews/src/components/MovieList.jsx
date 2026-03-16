/*
  MovieList.jsx
  -------------
  - Receives movies from App
  - Loops over movies
  - Renders Movie components
*/

import Movie from "./Movie";

export default function MovieList({ movies, addReview }) {
  return (
    <section>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          movie={movie}
          addReview={addReview}
        />
      ))}
    </section>
  );
}
