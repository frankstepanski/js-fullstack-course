/*
  StarRating.jsx
  --------------
  Reusable star rating component.

  Used in TWO modes:
  1️⃣ Editable (ReviewForm)
     - User can click stars
     - onChange updates state

  2️⃣ Read-only (ReviewList)
     - Stars are display-only
     - No hover, no click
*/

export default function StarRating({
  value,
  onChange,
  readOnly = false
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: "2px",
        alignItems: "center"
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= value;

        return (
          <span
            key={star}
            style={{
              fontSize: "1rem",
              color: isActive ? "#f59e0b" : "#d1d5db",
              cursor: readOnly ? "default" : "pointer",
              userSelect: "none",
              pointerEvents: readOnly ? "none" : "auto",
              transition: "color 0.15s ease"
            }}
            onClick={() => {
              if (readOnly) return;

              // Clicking the same star again clears rating
              onChange(star === value ? 0 : star);
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
