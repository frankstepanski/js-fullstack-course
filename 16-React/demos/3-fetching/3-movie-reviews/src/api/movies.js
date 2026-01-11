const BASE_URL = "http://localhost:3001/movies";

/*
  Fetch ALL movies
*/
export const fetchMovies = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

/*
  Update ONE movie (used when adding reviews)
*/
export const updateMovie = async (movie) => {
  const response = await fetch(`${BASE_URL}/${movie.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  });

  if (!response.ok) {
    throw new Error("Failed to update movie");
  }

  return response.json();
};
