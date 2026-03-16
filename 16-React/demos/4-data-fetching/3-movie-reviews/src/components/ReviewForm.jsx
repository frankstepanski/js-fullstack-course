/*
  ReviewForm.jsx
  --------------
  Controlled form
  Sends new review data UP to App
*/

import { useState } from "react";
import StarRating from "./StarRating";

export default function ReviewForm({ movieID, addReview }) {
  const [user, setUser] = useState("");
  const [review, setReview] = useState("");

  /*
    Handle controlled input changes
  */
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  /*
    Submit form and send data up to App
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    const rating = e.target.rating.value;

    addReview(movieID, {
      user,
      review,
      rating: Number(rating),
    });

    // Reset form
    setUser("");
    setReview("");
  };

  return (
    <fieldset className="reviewFormContainer">
      <legend>Add a Review</legend>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            value={user}
            onChange={handleUserChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Review</label>
          <textarea
            rows="4"
            value={review}
            onChange={handleReviewChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <StarRating disabled={false} stars={0} />
        </div>

        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>
    </fieldset>
  );
}
