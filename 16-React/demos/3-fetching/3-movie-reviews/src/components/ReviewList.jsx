/*
  ReviewList.jsx
  --------------
  - Receives an array of reviews
  - Renders Review components
*/

import Review from "./Review";

export default function ReviewList({ reviews }) {
  return (
    <fieldset className="reviewsContainer">
      <legend>Reviews</legend>

      {reviews.length === 0 && (
        <p>No reviews yet</p>
      )}

      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </fieldset>
  );
}
