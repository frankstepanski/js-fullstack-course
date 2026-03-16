import { useRenderCount } from "../../hooks/useRenderCount";
import { useMovieStore } from "../../store/useMovieStore";
import { Section, Label, Select } from "./MovieSelector.styles";
import { movies } from "../../data/movies";

export default function MovieSelector() {
  useRenderCount("MovieSelector");

  const selectedMovieId = useMovieStore(
    (s) => s.selectedMovieId
  );
  const selectMovie = useMovieStore(
    (s) => s.selectMovie
  );
  const reviewsByMovieId = useMovieStore(
    (s) => s.reviewsByMovieId
  );

  return (
    <Section>
      <Label>Select a movie</Label>

      <Select
        value={selectedMovieId}
        onChange={(e) =>
          selectMovie(Number(e.target.value))
        }
      >
        {movies.map((movie) => {
          const count =
            reviewsByMovieId[movie.id]?.length || 0;

          return (
            <option key={movie.id} value={movie.id}>
              {movie.title} ({movie.year}) • {count} review
              {count !== 1 && "s"}
            </option>
          );
        })}
      </Select>
    </Section>
  );
}
