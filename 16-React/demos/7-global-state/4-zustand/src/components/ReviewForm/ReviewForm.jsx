import { useRef } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import { useRenderCount } from "../../hooks/useRenderCount";
import {
  Section,
  Label,
  Textarea,
  Row,
  Button,
} from "./ReviewForm.styles";

export default function ReviewForm() {
  useRenderCount("ReviewForm");

  const submitReview = useMovieStore(
    (s) => s.submitReview
  );

  const reviewRef = useRef(null);
  const ratingRef = useRef(null);

  function handleSubmit() {
    submitReview({
      text: reviewRef.current.value,
      rating: Number(ratingRef.current.value),
    });

    reviewRef.current.value = "";
    ratingRef.current.value = 3;
  }

  return (
    <Section>
      <Label>Your review</Label>

      <Textarea
        ref={reviewRef}
        placeholder="Write your thoughts..."
      />

      <Row>
        <Label>Rating</Label>
        <input
          ref={ratingRef}
          type="number"
          min="1"
          max="5"
          defaultValue={3}
        />
      </Row>

      <Button onClick={handleSubmit}>
        Submit Review
      </Button>
    </Section>
  );
}
