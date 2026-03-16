import styled from "styled-components";
import { MovieProvider } from "./context/MovieContext";
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
 * App.jsx is responsible for composing the application UI.
 *
 * It does NOT manage application state directly.
 * Instead, it wraps the component tree with MovieProvider,
 * which uses React Context to share state across the app.
 *
 * App.jsx does not know what state exists or how it is updated.
 * It simply defines which components participate in the shared state.
 *
 * HOW THIS WOULD WORK WITH ONLY useState (NO CONTEXT)
 * --------------------------------------------------
 * If we were using only useState, all shared state would live here:
 *
 *   const [selectedMovieId, setSelectedMovieId] = useState(...)
 *   const [reviewsByMovieId, setReviewsByMovieId] = useState({})
 *
 * App.jsx would then need to pass state and updater functions
 * down through props to every component that needs them:
 *
 *   <MovieSelector
 *     selectedMovieId={selectedMovieId}
 *     setSelectedMovieId={setSelectedMovieId}
 *   />
 *
 *   <ReviewForm
 *     submitReview={submitReview}
 *   />
 *
 *   <ReviewList
 *     reviews={reviewsByMovieId[selectedMovieId]}
 *   />
 *
 * This approach is called "prop drilling".
 *
 * It works, but:
 * - App.jsx becomes tightly coupled to application state
 * - Components receive props they don’t actually own
 * - Refactoring becomes harder as the app grows
 *
 * HOW THIS APP WORKS WITH CONTEXT
 * -------------------------------
 * In this example, shared state lives inside MovieProvider.
 *
 * MovieProvider:
 * - uses useState internally
 * - owns committed, shared application data
 * - exposes state and actions through Context
 *
 * App.jsx does not pass any state or callbacks as props.
 *
 * Any component wrapped by MovieProvider can:
 * - read shared state using useContext
 * - update shared state by calling context functions
 *
 * IMPORTANT DESIGN DECISION
 * -------------------------
 * The review form is UNCONTROLLED.
 *
 * Draft input state (typing in the textarea) lives in the DOM,
 * not in React state and not in Context.
 *
 * This means:
 * - typing does NOT trigger re-renders
 * - Context updates happen ONLY on submit
 *
 * This separation makes Context behavior easier to observe
 * and reason about.
 *
 *
 * RE-RENDERING BEHAVIOR (INTENTIONAL IN THIS EXAMPLE)
 * --------------------------------------------------
 * When any value inside MovieContext changes:
 *
 * - ALL components that consume the context re-render
 *
 * Example:
 * - Submitting a review updates reviewsByMovieId
 * - MovieSelector re-renders (review count badge updates)
 * - ReviewList re-renders (new review appears, averages recalc)
 *
 * Even components that did not initiate the change re-render.
 *
 * This demonstrates both:
 * - the power of Context (shared state, global sync)
 * - the cost of Context (wide re-render "blast radius")
 *
 */

export default function App() {
  return (
    <MovieProvider>
      <AppWrapper>
        <h1>Movie Reviews</h1>
        <MovieSelector />
        <ReviewForm />
        <ReviewList />
      </AppWrapper>
    </MovieProvider>
  );
}
