// src/components/DiscountForm.jsx
//
// A form that lets the user enter a discount code.
// Shows a success message when a valid code is entered,
// and an error message when an invalid code is entered.
//
// Valid codes for this demo:
//   SAVE10  →  10% off
//   SAVE20  →  20% off
//
// Props:
//   onApply — function called with the discount percentage when a valid code is entered

import { useState } from "react";

// The valid discount codes for this demo app
const DISCOUNT_CODES = {
  SAVE10: 10,
  SAVE20: 20,
};

export function DiscountForm({ onApply }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedCode = code.trim().toUpperCase();
    const discountPercent = DISCOUNT_CODES[trimmedCode];

    if (discountPercent) {
      // Valid code — clear any error, call the parent, mark as applied
      setError("");
      setApplied(true);
      onApply(discountPercent);
    } else {
      // Invalid code — show an error message
      setError("Invalid discount code. Try SAVE10 or SAVE20.");
      setApplied(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="discount-form">
      <label htmlFor="discount-code">Discount Code</label>

      <input
        id="discount-code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
        // Disable the input after a valid code is applied
        disabled={applied}
      />

      <button type="submit" disabled={applied}>
        Apply
      </button>

      {/* Error message — shown when an invalid code is entered */}
      {error && (
        <p role="alert" className="discount-error">
          {error}
        </p>
      )}

      {/* Success message — shown when a valid code is applied */}
      {applied && (
        <p role="status" className="discount-success">
          Discount applied!
        </p>
      )}
    </form>
  );
}
