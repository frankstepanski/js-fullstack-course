import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { FaStar } from "react-icons/fa";

/* ========================= */
/* 🌐 API + DATA HELPERS */
/* ========================= */
import getNowPlaying from "./services";
import parseNowPlaying from "./utils";

/* ========================= */
/* 🎨 STYLED COMPONENTS */
/* ========================= */
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

/* Layout */
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

/* UI Components */
import {
  PageContainer,
  Grid,
  Card,
  CardLink,
  Poster,
  Meta,
  Rating,
  Title,
  Muted,
  Controls,
  Select,
  Range
} from "./styles";

/*
  🧭 App.jsx — Architecture & Design Overview
  ============================================

  👉 Component Design Library with Styled Components

  Most visual elements in this app (layout, cards, grids, controls)
  are built using **styled-components**, not traditional CSS files.

  Examples:
    - PageContainer
    - Grid
    - Card
    - Poster
    - Controls
    - Theme

  These live inside the `/styles` folder and are imported like
  normal JavaScript modules.

  ------------------------------------------------------------
  🤔 WHY STYLED COMPONENTS?
  ------------------------------------------------------------

  Styled Components allow us to:

  ✅ Treat styles as FIRST-CLASS components
  ✅ Keep styling close to the UI it belongs to
  ✅ Avoid global CSS conflicts
  ✅ Remove the need for class naming conventions
  ✅ Dynamically style components using props and theme values
  ✅ Build reusable, composable UI primitives

  Instead of writing:
    - styles.css
    - card.css
    - grid.css
    - header.css

  We create reusable components like:
    <PageContainer />
    <Grid />
    <Card />

  This mirrors how **design systems** are built in real products.

  ------------------------------------------------------------
  📦 WHY ARE STYLES `.js` FILES?
  ------------------------------------------------------------

  Styled Components MUST live in JavaScript files because:

  - They use JavaScript syntax
  - They can access props
  - They can access theme values
  - They can respond to component state

  Example:
    const Card = styled.div`
      background: ${({ theme }) => theme.colors.surface};
      border-radius: ${({ theme }) => theme.radius.lg};
    `;

  This is NOT possible with plain CSS files.

  ------------------------------------------------------------
  🧱 COMPONENT DESIGN LIBRARY MENTAL MODEL
  ------------------------------------------------------------

  Think of `/styles` as a **mini UI library**:

    styles/
      ├─ Theme.js        → design tokens (colors, spacing, fonts)
      ├─ GlobalStyles.js → base styles (reset, body styles)
      ├─ Grid.js         → layout primitives
      ├─ PageContainer.js→ page-level layout wrapper
      ├─ MovieCard.js    → domain-specific UI
      └─ index.js        → public API for all styled components

  Pages and components import styles from ONE place instead
  of managing dozens of CSS files.

  ------------------------------------------------------------
  🚀 ADVANTAGES OF THIS APPROACH
  ------------------------------------------------------------

  ✔ Scales well as the app grows
  ✔ Easier to refactor UI globally
  ✔ Encourages reusable design patterns
  ✔ Reduces CSS complexity
  ✔ Matches how modern frontend teams work
  ✔ Prepares you for real-world React codebases

  ------------------------------------------------------------
  🧠 BIG PICTURE 
  ------------------------------------------------------------

  This app is not just "a movie list".

  It demonstrates:
    - Separation of concerns
    - Component-driven UI architecture
    - A real design system mindset
    - Styling at scale using JavaScript

  This is how professional React applications are structured.
*/

export default function App() {
 /* ========================= */
  /* 🎬 DATA STATE */
  /* ========================= */
  const [movies, setMovies] = useState([]);

  /* ========================= */
  /* 🧭 UI STATE */
  /* ========================= */
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("release-desc");
  const [minRating, setMinRating] = useState(0);


  /* ========================= */
  /* 🌐 FETCH DATA */
  /* ========================= */
  useEffect(() => {
    getNowPlaying()
      .then((data) => {
        console.log("unformatted data:",  data);
        const formattedMovies = parseNowPlaying(data);
        setMovies(formattedMovies);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movies");
      });
  }, []);


  /* ========================= */
  /* 🔃 SORT + FILTER LOGIC */
  /* ========================= */
  const visibleMovies = movies
    .filter((movie) => movie.rating >= minRating)
    .sort((a, b) => {
      if (sortOption === "release-desc") {
        return new Date(b.release) - new Date(a.release);
      }
      if (sortOption === "release-asc") {
        return new Date(a.release) - new Date(b.release);
      }
      if (sortOption === "rating-desc") {
        return b.rating - a.rating;
      }
      return 0;
    });


  return (
      <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <PageContainer>
            {/* ========================= */}
            {/* 🎛 CONTROLS */}
            {/* ========================= */}
            <Controls>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="release-desc">Newest Releases</option>
                <option value="release-asc">Oldest Releases</option>
                <option value="rating-desc">Highest Rated</option>
              </Select>

              <Range>
                <label>Minimum Rating: {minRating}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
              </Range>
            </Controls>
            <Grid>
              {visibleMovies.map((movie) => (
                <CardLink
                  key={movie.id}
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <Poster src={movie.poster} alt={movie.title} />
                    <Meta>
                      <Rating>
                        <FaStar size={14} />
                        <span>{movie.rating}</span>
                        <Muted>{movie.release}</Muted>
                      </Rating>
                      <Title>{movie.title}</Title>
                    </Meta>
                  </Card>
                </CardLink>
              ))}
            </Grid>
          </PageContainer>
          <Footer />
        </ThemeProvider>
  );
}
