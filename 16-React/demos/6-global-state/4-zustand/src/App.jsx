import styled from "styled-components";
import MovieSelector from "./components/MovieSelector/MovieSelector";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import ReviewList from "./components/ReviewList/ReviewList";

const AppWrapper = styled.div`
  max-width: 720px;
  margin: 48px auto;
  padding: 32px;
  font-family: system-ui, sans-serif;
  background: white;
`;

/**
 * HOW THIS WOULD WORK WITH ONLY HOOKS (useState)
 * ----------------------------------------------
 * If we used only useState, shared state would live here:
 *
 *   const [selectedMovieId, setSelectedMovieId] = useState(...)
 *   const [reviewsByMovieId, setReviewsByMovieId] = useState({})
 *
 * App.jsx would then need to pass that state down as props:
 *
 *   <MovieSelector
 *     selectedMovieId={selectedMovieId}
 *     setSelectedMovieId={setSelectedMovieId}
 *   />
 *
 *   <ReviewForm submitReview={submitReview} />
 *
 *   <ReviewList reviews={reviewsByMovieId[selectedMovieId]} />
 *
 * This approach works, but leads to:
 * - prop drilling
 * - tight coupling to App.jsx
 * - harder refactoring as the app grows
 */

/**
 * HOW THIS WOULD WORK WITH CONTEXT
 * -------------------------------
 * With Context, App.jsx would wrap the tree:
 *
 *   <MovieProvider>
 *     <App />
 *   </MovieProvider>
 *
 * Context removes prop drilling, but introduces a tradeoff:
 *
 * - Any change to the Context value causes ALL consumers to re-render
 * - This creates a large re-render "blast radius"
 *
 * Context works best for:
 * - low-frequency global state (theme, auth, locale)
 * - simple sharing, not frequent updates
 *
 * HOW THIS APP WORKS WITH ZUSTAND
 * -------------------------------
 * Zustand removes both prop drilling AND Providers.
 *
 * - There is no Context
 * - There is no Provider
 * - App.jsx does not participate in state management at all
 *
 * Each component subscribes to exactly the state it needs.
 * When that slice of state changes, only that component re-renders.
 *
 * ADVANTAGES OF ZUSTAND
 * --------------------
 * - No Provider nesting
 * - No prop drilling
 * - Fine-grained re-render control
 * - Simple mental model (state + actions)
 * - Better performance for shared, frequently-updating state
 *
 * DISADVANTAGES OF ZUSTAND
 * -----------------------
 * - External dependency
 * - Less "React-pure" than hooks/context
 * - Requires discipline to keep stores well-organized
 *
 * Zustand is best used when:
 * - multiple components depend on shared state
 * - updates happen frequently
 * - render performance matters
 *
 */

export default function App() {
  return (
    <AppWrapper>
      <h1>Movie Reviews</h1>
      <MovieSelector />
      <ReviewForm />
      <ReviewList />
    </AppWrapper>
  );
}
