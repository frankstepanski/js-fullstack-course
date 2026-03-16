import { useContext, useRef } from "react";
import { Section, Label, Textarea, Row, Button } from "./ReviewForm.styles";
import { MovieContext } from "../../context/MovieContext";
import { useRenderCount } from "../../hooks/useRenderCount";

/**
 * ReviewForm
 *
 * This component is intentionally UNCONTROLLED.
 *
 * - Input values live in the DOM (not React state)
 * - Typing does NOT cause re-renders
 * - Context updates happen ONLY on submit
 *
 * This makes Context-wide re-rendering easier to observe and explain.
 */
export default function ReviewForm() {

  useRenderCount("ReviewForm");
  
  /**
   * Only pull what we actually need from Context.
   * This keeps the component focused and avoids unnecessary coupling.
   */
  const { submitReview } = useContext(MovieContext);

  /**
   * Refs give us direct access to DOM values
   * for uncontrolled inputs.
   */
  const reviewRef = useRef(null);
  const ratingRef = useRef(null);

  /**
   * Handle form submission.
   *
   * This is the ONLY moment where Context state updates,
   * which will cause all Context consumers to re-render.
   */
  function handleSubmit() {
    submitReview({
      text: reviewRef.current.value,
      rating: Number(ratingRef.current.value),
    });

    // Reset form fields after submission
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
