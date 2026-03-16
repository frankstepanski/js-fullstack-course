const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/*
  getNowPlaying
  --------------
  Fetches "Now Playing" movies from The Movie Database API.

  Why this function exists:
  - Keeps API logic OUT of React components
  - Makes data fetching reusable
  - Centralizes error handling
*/

export default async function getNowPlaying() {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await fetch(url);

    /*
      ⚠️ fetch() does NOT throw on HTTP errors!
      We must check response.ok manually.
    */
    if (!response.ok) {
      throw new Error(
        `TMDB request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    /*
      Optional: validate expected shape
      Helps catch API changes early
    */
    if (!data || !Array.isArray(data.results)) {
      throw new Error("Invalid TMDB response format");
    }

    return data;
  } catch (error) {
    /*
      ❗ IMPORTANT:
      We re-throw the error so the UI layer
      can decide how to handle it.
    */
    console.error("getNowPlaying error:", error);
    throw error;
  }
}
