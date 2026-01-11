import { useState } from "react";
import { ThemeProvider } from "styled-components";

/* =========================
   DESIGN SYSTEM (Styled Components)
   =========================
   In this app we’re using styled-components to build a small “design system”.

   Why?
   - Instead of many CSS files, we build reusable UI pieces as JavaScript components.
   - We can share colors, spacing, fonts, etc. through a theme.
   - Styles are scoped to components (no global class name collisions).
*/

import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";

/* =========================
   UI COMPONENTS
   =========================
   These components handle rendering UI + user interactions,
   but App.jsx “owns” the data/state so it can update everything consistently.
*/

import MovieList from "./components/MovieList";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";

import moviesData from "./data/movies";

/* =========================
    LAYOUT PRIMITIVES (Styled Components)
   =========================
   PageContainer / Controls are styled-components exported from ./styles.
   Think of these as "building blocks" you reuse everywhere.
*/

import { PageContainer, Controls } from "./styles";

export default function App() {


  const [movies, setMovies] = useState(moviesData);

  /* =========================
     STATE: CATEGORY FILTER
     =========================
     This stores the currently selected categories from the filter UI.

     Example:
     selectedCategories = ["Action", "Comedy"]

     If this array is empty:
     - That means “no filter” → show all movies
  */

  const [selectedCategories, setSelectedCategories] = useState([]);

  /* =========================
     STATE: PAGINATION (Current Page)
     =========================
     We store which page the user is on.

     page = 1 means "show the first chunk of movies"
     page = 2 means "show the next chunk"
  */

  const [page, setPage] = useState(1);

  /* =========================
     CONFIG: MOVIES PER PAGE
     =========================
     This controls how many movies show at a time.
     Change this number to instantly change pagination behavior.
  */

  const MOVIES_PER_PAGE = 3;

  /* =========================
     DERIVED DATA: FILTERED MOVIES
     =========================
     We do NOT modify the original movies array here.
     We create a NEW array based on current filter rules.

     Filter rule:
     - If selectedCategories is empty → return ALL movies
     - Otherwise → keep a movie if it matches ANY selected category
  */
  const filteredMovies = movies.filter((movie) => {
      const noFilter = selectedCategories.length === 0;

      const matchesAtLeastOneCategory = selectedCategories.some((cat) =>
         movie.categories.includes(cat)
      );

      return noFilter || matchesAtLeastOneCategory;
  });

  /* =========================
     DERIVED DATA: PAGINATION
     =========================
     Pagination is just "slice the array".

     Example with MOVIES_PER_PAGE = 3:

     page 1 → start=0, slice(0, 3)
     page 2 → start=3, slice(3, 6)
     page 3 → start=6, slice(6, 9)

     startIndex formula:
     (page - 1) * MOVIES_PER_PAGE
  */
  const start = (page - 1) * MOVIES_PER_PAGE;
  const visibleMovies = filteredMovies.slice(start, start + MOVIES_PER_PAGE);

  /* =========================
     ACTION: ADD REVIEW
     =========================
    Update pattern used here:
     - We map over movies
     - When we find the correct movie:
       - create a NEW movie object
       - create a NEW reviews array with the new review appended

     This is important because:
      - React state should be updated immutably (no direct mutation).
  */
  const addReview = (movieId, review) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === movieId
          ? { ...movie, reviews: [...movie.reviews, review] }
          : movie
      )
    );
  };

  /* =========================
     RENDER
     =========================
     ThemeProvider + GlobalStyles:
     - ThemeProvider injects "theme" into all styled-components
     - GlobalStyles applies global base styling (fonts, background, etc.)

     PageContainer + Controls:
     - These are layout primitives (part of our design system)
     - We reuse them for consistent spacing and structure
  */
 
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <PageContainer>
        <Controls>
          <CategoryFilter
            movies={movies}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </Controls>

        <MovieList movies={visibleMovies} onAddReview={addReview} />

        <Pagination
          page={page}
          total={filteredMovies.length}
          perPage={MOVIES_PER_PAGE}
          onChange={setPage}
        />
      </PageContainer>
    </ThemeProvider>
  );
}
