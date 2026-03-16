import StarRating from "./StarRating";

import {
  ReviewListWrapper,
  ReviewCard,
  ReviewHeader,
  ReviewerName,
  StatusBadge,
  ReviewText,
  ReviewFooter,
  ModerationActions,
  ActionButton
} from "../styles/ReviewList.styles";

/*
  ReviewList
  ----------
  - Displays all reviews
  - Allows moderation (approve / reject)
  - Does NOT manage state itself
*/

export default function ReviewList({
  reviews,
  onApprove,
  onReject
}) {
return (
    <ReviewListWrapper>
      {reviews.map((review) => (
        <ReviewCard key={review.id} $status={review.status}>
          <ReviewHeader>
            <ReviewerName>{review.user}</ReviewerName>

            <StatusBadge $status={review.status}>
              {review.status.toUpperCase()}
            </StatusBadge>
          </ReviewHeader>

          <StarRating value={review.stars} readOnly />

          <ReviewText>{review.text}</ReviewText>

          {/* 🔐 Moderation buttons */}
          {review.status === "pending" && (
            <ModerationActions>
              <ActionButton
                $variant="approve"
                onClick={() => onApprove(review.id)}
              >
                ✅ Approve
              </ActionButton>

              <ActionButton
                $variant="reject"
                onClick={() => onReject(review.id)}
              >
                ❌ Reject
              </ActionButton>
            </ModerationActions>
          )}

          <ReviewFooter>
            <span>{review.date}</span>
            <span>ID: {review.id}</span>
          </ReviewFooter>
        </ReviewCard>
      ))}
    </ReviewListWrapper>
  );
}
