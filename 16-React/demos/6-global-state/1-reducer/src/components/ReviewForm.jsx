import { useState } from "react";
import StarRating from "./StarRating";

import {
  Form,
  Field,
  Label,
  Input,
  Textarea,
  Hint,
  Button
} from "../styles/ReviewForm.styles";

/*
  ReviewForm
  ----------
  Controlled form using component-scoped styles.
*/

export default function ReviewForm({ onSubmit }) {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !text || stars === 0) return;

    onSubmit({
      id: crypto.randomUUID(),
      user,
      text,
      stars,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
    });

    setUser("");
    setText("");
    setStars(0);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Your Name</Label>
        <Input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Jane Doe"
        />
      </Field>

      <Field>
        <Label>Your Rating</Label>
        <StarRating value={stars} onChange={setStars} />
        <Hint>Click a star to rate (click again to clear)</Hint>
      </Field>

      <Field>
        <Label>Your Review</Label>
        <Textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you think?"
        />
      </Field>

      <Button disabled={!user || !text || stars === 0}>
        Post Review
      </Button>
    </Form>
  );
}
