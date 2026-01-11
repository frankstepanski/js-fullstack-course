/*
  parseNowPlaying.js
  ------------------
  This function transforms raw API data into a clean,
  app-friendly data structure.

  WHY this function exists:
  - APIs return LOTS of extra data
  - UI components only need a small, consistent shape
  - Centralizing data formatting keeps components simple

  Think of this as:
  👉 "Translate API data into UI data"
*/


export default function parseNowPlaying(data) {
  return data.results
    .map((item) => {
      return {
        id: item.id,
        title: item.title,
        release: item.release_date,
        rating: item.vote_average,
        poster: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
      };
    })
    .sort((a, b) => new Date(b.release) - new Date(a.release));
}