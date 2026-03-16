import ReviewStatusBadge from "./ReviewStatusBadge";

export default function ReviewItem({ review, dispatch }) {
  return (
    <div className={`review-item ${review.status}`}>
      <div className="review-header">
        <strong>{review.author}</strong>
        <ReviewStatusBadge status={review.status} />
      </div>

      <p>{review.text}</p>

      {review.status === "pending" && (
        <div className="review-actions">
          <button
            onClick={() =>
              dispatch({ type: "APPROVE_REVIEW", id: review.id })
            }
          >
            Approve
          </button>

          <button
            onClick={() =>
              dispatch({ type: "REJECT_REVIEW", id: review.id })
            }
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
