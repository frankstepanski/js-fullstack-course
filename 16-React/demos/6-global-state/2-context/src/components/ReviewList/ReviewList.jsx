import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { useRenderCount } from "../../hooks/useRenderCount";
import {
  Section,
  HeaderRow,
  Button,
  ReviewCard,
  Meta,
} from "./ReviewList.styles";

export default function ReviewList() {

  useRenderCount("ReviewList");
  
  const {
    selectedMovieId,
    reviewsByMovieId,
    getAverageRating,
    clearAllReviews,
  } = useContext(MovieContext);

  const reviews = reviewsByMovieId[selectedMovieId] || [];
  const avgRating = getAverageRating(selectedMovieId);

  return (
    <Section>
      <HeaderRow>
        <h3>Reviews</h3>
        <Button onClick={clearAllReviews}>
          Clear All Reviews
        </Button>
      </HeaderRow>

      {avgRating && (
        <p>
          <strong>Average rating:</strong> {avgRating} / 5
        </p>
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet for this movie.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id}>
            <Meta>Rating: {review.rating} / 5</Meta>
            <div>{review.text}</div>
          </ReviewCard>
        ))
      )}
    </Section>
  );
}
