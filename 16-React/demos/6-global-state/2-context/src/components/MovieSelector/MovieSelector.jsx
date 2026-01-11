import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { useRenderCount } from "../../hooks/useRenderCount";
import { Section, Label, Select } from "./MovieSelector.styles";

export default function MovieSelector() {

  useRenderCount("MovieSelector");
  
  const {
    movies,
    selectedMovieId,
    setSelectedMovieId,
    reviewsByMovieId,
  } = useContext(MovieContext);

  return (
    <Section>
      <Label>Select a movie</Label>

      <Select
        value={selectedMovieId}
        onChange={(e) => setSelectedMovieId(Number(e.target.value))}
      >
        {movies.map((movie) => {
          const count = reviewsByMovieId[movie.id]?.length || 0;

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
