import { PageContainer } from "../components/layout/PageContainer";
import { Grid } from "../components/layout/Grid";
import MovieCard from "../components/movie/MovieCard";

export default function Movies({ movies }) {
  return (
    <PageContainer>
      <Grid>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </PageContainer>
  );
}
