import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { GlobalStyles } from "./styles/GlobalStyles";

import { useReducer, useEffect } from "react";
import { reviewsReducer, initialState } from "./reducers/reviewsReducer";
import { initialReviews } from "./data/reviews";

import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

import "./App.css";



export default function App() {

  /* =============================== */
  /* CENTRALIZED STATE (useReducer) */
  /* =============================== */

  /*
    useReducer replaces multiple useState hooks.

    Instead of:
      const [reviews, setReviews] = useState([])
      const [draft, setDraft] = useState({})
      const [status, setStatus] = useState(...)

    We use ONE state object + ONE reducer function.

    - `state` = the current app state
    - `dispatch` = the ONLY way to update that state

    To update state, we call `dispatch` with an action object:
      dispatch({ type: "ACTION_TYPE", payload: ... })

    The `reviewsReducer` function looks at the action type
    and decides HOW to update the state based on that action.

    This keeps all state logic in one place, making it easier
    to manage complex state interactions.

    Learn more about useReducer here:
    https://react.dev/learn/scaling-up-with-reducer-and-context#using-usereducer


  */

  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  /* Load sample data ONCE */
  useEffect(() => {
    dispatch({
      type: "SET_INITIAL_REVIEWS",
      payload: initialReviews
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <main className="app">
          <header className="app-header">
            <h1>🛠️ Review Moderation</h1>
            <p>Manage user-submitted reviews before they go live.</p>
          </header>

          {/* ➕ Add Review */}
          <section className="card">
            <h2>✍️ Write a Review</h2>
            <ReviewForm
                onSubmit={(review) =>
                  dispatch({
                    type: "ADD_REVIEW",
                    payload: review
                  })
                }
              />
          </section>

          {/* 📋 Reviews */}
          <section className="card">
            <h2>📋 Submitted Reviews</h2>
            <ReviewList
              reviews={state.reviews}
              onApprove={(id) =>
                dispatch({ type: "APPROVE_REVIEW", payload: id })
              }
              onReject={(id) =>
                dispatch({ type: "REJECT_REVIEW", payload: id })
              }
            />
          </section>
        </main>
    </ThemeProvider>
  );
}
