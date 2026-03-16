import { useState } from "react";
import StarRating from "./StarRating";

import {
  ReviewFormWrapper,
  Input,
  Textarea,
  SubmitButton
} from "../styles/ReviewForm";

export default function ReviewForm({ onSubmit }) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !comment || !stars) return;

    onSubmit({
      user,
      comment,
      stars,
      date: new Date().toISOString().slice(0,10)
    });

    setUser("");
    setComment("");
    setStars(0);
  };

  return (
    <ReviewFormWrapper onSubmit={handleSubmit}>
      <Input
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <Textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <StarRating value={stars} onChange={setStars} />

      <SubmitButton type="submit">
        Post a Review
      </SubmitButton>
    </ReviewFormWrapper>
  );
}
