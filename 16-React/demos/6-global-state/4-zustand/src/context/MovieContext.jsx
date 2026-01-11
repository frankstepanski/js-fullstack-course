import { createContext, useReducer } from "react";
import { movies } from "../data/movies";

/**
 * MovieContext
 *
 * Shared application state + actions.
 * Uses useReducer for predictable state transitions.
 */
export const MovieContext = createContext();

/**
 * Initial reducer state
 */
const initialState = {
  selectedMovieId: movies[0].id,
  reviewsByMovieId: {},
};

/**
 * Reducer function
 *
 * Describes ALL allowed state transitions.
 * This replaces multiple useState calls.
 */
function movieReducer(state, action) {
  switch (action.type) {
    case "SELECT_MOVIE":
      return {
        ...state,
        selectedMovieId: action.payload,
      };

    case "SUBMIT_REVIEW": {
      const { movieId, text, rating } = action.payload;

      const newReview = {
        id: Date.now(),
        text,
        rating,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        reviewsByMovieId: {
          ...state.reviewsByMovieId,
          [movieId]: [
            ...(state.reviewsByMovieId[movieId] || []),
            newReview,
          ],
        },
      };
    }

    case "CLEAR_ALL_REVIEWS":
      return {
        ...state,
        reviewsByMovieId: {},
      };

    default:
      return state;
  }
}

/**
 * MovieProvider
 *
 * Wraps the app and exposes:
 * - shared state
 * - explicit action functions
 */
export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(
    movieReducer,
    initialState
  );

  /* ---------- ACTION HELPERS ---------- */

  function selectMovie(movieId) {
    dispatch({
      type: "SELECT_MOVIE",
      payload: movieId,
    });
  }

  function submitReview({ text, rating }) {
    dispatch({
      type: "SUBMIT_REVIEW",
      payload: {
        movieId: state.selectedMovieId,
        text,
        rating,
      },
    });
  }

  function clearAllReviews() {
    dispatch({ type: "CLEAR_ALL_REVIEWS" });
  }

  /* ---------- DERIVED DATA ---------- */

  const selectedMovie = movies.find(
    (movie) => movie.id === state.selectedMovieId
  );

  function getAverageRating(movieId) {
    const reviews =
      state.reviewsByMovieId[movieId] || [];

    if (reviews.length === 0) return null;

    const total = reviews.reduce(
      (sum, r) => sum + r.rating,
      0
    );

    return (total / reviews.length).toFixed(1);
  }

  const value = {
    movies,
    selectedMovieId: state.selectedMovieId,
    reviewsByMovieId: state.reviewsByMovieId,
    selectedMovie,

    selectMovie,
    submitReview,
    clearAllReviews,
    getAverageRating,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}
