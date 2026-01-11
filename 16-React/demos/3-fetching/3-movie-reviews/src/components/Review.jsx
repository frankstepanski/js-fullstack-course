/*
  Review.jsx
  ----------
  Displays a single review
*/

import StarRating from "./StarRating";

export default function Review({ review }) {
  return (
    <div className="reviewContainer">
      <p className="reviewUser">{review.user}</p>
      <p className="review">{review.review}</p>

      <StarRating
        stars={review.rating}
        disabled={true}
      />
    </div>
  );
}
