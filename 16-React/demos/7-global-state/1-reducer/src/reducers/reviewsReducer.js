/*
  reviewsReducer
  --------------
  This reducer manages ALL review-related state.

  It is responsible for:
  - Adding reviews
  - Approving reviews
  - Rejecting reviews
  - Loading initial data

  IMPORTANT RULES:
  - Never mutate state directly
  - Always return a NEW state object
  - One action = one clear state change
*/

export const initialState = {
  draft: {
    author: "",
    text: ""
  },
  reviews: []
};

export function reviewsReducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_REVIEWS":
      return {
        ...state,
        reviews: action.payload
      };

    case "UPDATE_DRAFT":
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.field]: action.value
        }
      };

    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [
          ...state.reviews,
          {
            id: Date.now(),
            ...action.payload,
            status: "pending"
          }
        ],
        draft: { author: "", text: "" }
      };

      case "APPROVE_REVIEW":
        return {
          ...state,
          reviews: state.reviews.map((r) =>
            r.id === action.payload
              ? { ...r, status: "approved" }
              : r
          )
        };

      case "REJECT_REVIEW":
        return {
          ...state,
          reviews: state.reviews.map((r) =>
            r.id === action.payload
              ? { ...r, status: "rejected" }
              : r
          )
        };

    default:
      return state;
  }
}
