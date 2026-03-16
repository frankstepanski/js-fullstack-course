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
 * WHY useReducer INSTEAD OF useState?
 * ---------------------------------------
 *
 * Using useReducer does NOT change how Context re-renders.
 * Context still re-renders all consumers whenever its value changes.
 *
 * What useReducer changes is HOW state updates are modeled and managed.
 *
 * With useState:
 * - State updates are scattered across multiple setter functions
 * - Update logic often lives close to UI components
 * - It’s harder to see all the ways state can change in one place
 *
 * With useReducer:
 * - All state transitions are centralized in a single reducer function
 * - Each state change is described by an explicit "action"
 * - State updates become predictable and intentional
 *
 * Instead of asking:
 *   "How did this piece of state change?"
 *
 * We can ask:
 *   "Which action caused this state change?"
 *
 * This makes the app easier to:
 * - reason about as it grows
 * - debug and log state changes
 * - refactor without breaking behavior
 * - extend with new features
 *
 * IMPORTANT:
 * ----------
 * useReducer improves STRUCTURE and PREDICTABILITY,
 * not PERFORMANCE.
 *
 * It does NOT:
 * - reduce re-renders
 * - shrink Context’s blast radius
 * - optimize rendering behavior
 *
 * Context decides WHO re-renders.
 * useReducer decides HOW state changes.
 *
 * This pattern mirrors how larger state management tools
 * (like Redux) work, while staying inside React.
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
