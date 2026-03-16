import MovieCard from "./MovieCard";

export default function MovieList({ movies, onAddReview }) {
  return movies.map(movie => (
    <MovieCard
      key={movie.id}
      movie={movie}
      onAddReview={onAddReview}
    />
  ));
}
