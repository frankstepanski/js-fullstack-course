import { create } from "zustand";
import { movies } from "../data/movies";

/**
 *
 * WHAT IS THIS FILE?
 * -----------------
 * This file defines a Zustand store.
 *
 * A Zustand store:
 * - holds shared application state
 * - exposes actions to update that state
 * - allows components to subscribe to specific state slices
 *
 * This file replaces:
 * - Context
 * - Provider components
 * - useReducer / useState used for global state
 *
 * HOW A ZUSTAND STORE WORKS
 * ------------------------
 * - The store exists outside of React’s render tree
 * - Components subscribe to the store using a hook
 * - When subscribed state changes, ONLY those components re-render
 *
 * There is no Provider and no wrapping of the app.
 *
 * KEY DIFFERENCE VS CONTEXT
 * ------------------------
 * Context:
 * - broadcasts updates to all consumers
 * - re-renders every component using the context
 *
 * Zustand:
 * - components subscribe to specific slices of state
 * - only components using the changed slice re-render
 *
 * This eliminates the "blast radius" problem of Context.
 *
 *
 * KEY DIFFERENCE VS useState
 * -------------------------
 * useState:
 * - state is local to a component
 * - sharing requires prop drilling or Context
 *
 * Zustand:
 * - state is global and shared by default
 * - no props are required to access or update it
 */

export const useMovieStore = create((set, get) => ({
  /* ---------- STATE ---------- */
  selectedMovieId: movies[0].id,
  reviewsByMovieId: {},

  /* ---------- ACTIONS ---------- */
  selectMovie: (movieId) =>
    set({ selectedMovieId: movieId }),

  submitReview: ({ text, rating }) => {
    const { selectedMovieId, reviewsByMovieId } = get();

    const newReview = {
      id: Date.now(),
      text,
      rating,
      createdAt: new Date().toISOString(),
    };

    set({
      reviewsByMovieId: {
        ...reviewsByMovieId,
        [selectedMovieId]: [
          ...(reviewsByMovieId[selectedMovieId] || []),
          newReview,
        ],
      },
    });
  },

  clearAllReviews: () =>
    set({ reviewsByMovieId: {} }),

  /* ---------- DERIVED HELPERS ---------- */
  getAverageRating: (movieId) => {
    const reviews =
      get().reviewsByMovieId[movieId] || [];

    if (reviews.length === 0) return null;

    const total = reviews.reduce(
      (sum, r) => sum + r.rating,
      0
    );

    return (total / reviews.length).toFixed(1);
  },
}));
