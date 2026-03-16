import { useRenderCount } from "../../hooks/useRenderCount";
import { useMovieStore } from "../../store/useMovieStore";
import {
  Section,
  HeaderRow,
  Button,
  ReviewCard,
  Meta,
} from "./ReviewList.styles";

export default function ReviewList() {
  useRenderCount("ReviewList");

  const selectedMovieId = useMovieStore(
    (s) => s.selectedMovieId
  );
  const reviewsByMovieId = useMovieStore(
    (s) => s.reviewsByMovieId
  );
  const getAverageRating = useMovieStore(
    (s) => s.getAverageRating
  );
  const clearAllReviews = useMovieStore(
    (s) => s.clearAllReviews
  );

  const reviews =
    reviewsByMovieId[selectedMovieId] || [];
  const avgRating =
    getAverageRating(selectedMovieId);

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
          <strong>Average rating:</strong>{" "}
          {avgRating} / 5
        </p>
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet for this movie.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id}>
            <Meta>
              Rating: {review.rating} / 5
            </Meta>
            <div>{review.text}</div>
          </ReviewCard>
        ))
      )}
    </Section>
  );
}
