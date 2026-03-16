import StarRating from "./StarRating";
import {
  Review,
  Reviewer,
  Comment
} from "../styles";

export default function ReviewList({ reviews }) {
  return reviews.map((review, index) => (
    <Review key={index}>
      <Reviewer>
        {review.user} ({review.date})
      </Reviewer>

      <StarRating value={review.stars} readOnly  />

      <Comment>{review.comment}</Comment>
    </Review>
  ));
}
