export default function StarRating({
  value,
  onChange,
  readOnly = false
}) {
  return (
    <div style={{ display: "inline-flex" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= value;

        return (
          <span
            key={star}
            style={{
              color: isFilled ? "#f59e0b" : "#d1d5db",
              fontSize: "0.9rem",
              marginRight: "2px",
              cursor: readOnly ? "default" : "pointer",
              userSelect: "none",
              pointerEvents: readOnly ? "none" : "auto"
            }}
            onClick={() => {
              if (readOnly) return;
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


