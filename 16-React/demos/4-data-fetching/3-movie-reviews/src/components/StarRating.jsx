import { useState } from "react";
import { FaStar } from "react-icons/fa";

/*
  StarRating.jsx
  --------------
  Reusable star rating component.

  Behavior:
  - Display-only when disabled === true
  - Interactive when disabled === false
  - Clicking the SAME star twice clears the rating
*/

export default function StarRating({ stars = 0, disabled }) {
  /*
    ⭐ LOCAL STATE
    -------------
    Stores the current selected rating.
    Starts from the value passed via props.
  */
  const [rating, setRating] = useState(stars);

  /*
    🧠 HANDLE STAR CLICK
    -------------------
    If the same star is clicked again,
    reset rating back to 0.
  */
  const handleStarClick = (starValue) => {
    if (disabled) return;

    if (rating === starValue) {
      setRating(0); // 🔄 toggle OFF
    } else {
      setRating(starValue); // ⭐ set rating
    }
  };

  return (
    <div className="starRating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <label key={starValue}>
            {/* 
              Hidden radio input
              - Needed for form submission
              - Disabled when not interactive
            */}
            <input
              type="radio"
              name="rating"
              value={starValue}
              disabled={disabled}
              checked={rating === starValue}
              readOnly
            />

            {/* 
              ⭐ Star Icon
              - Clickable ONLY in ReviewForm
              - Clicking same star clears rating
            */}
            <FaStar
              className="star-icon"
              size={16}
              color={starValue <= rating ? "#FFA500" : "#e4e5e9"}
              style={{
                cursor: disabled ? "default" : "pointer",
              }}
              onClick={() => handleStarClick(starValue)}
            />
          </label>
        );
      })}
    </div>
  );
}
