// src/components/ProductList.jsx
//
// Fetches a list of products from /api/products and displays them.
// This is the key component for integration testing — it makes a real
// network request (intercepted by MSW in tests).
//
// States this component can be in:
//   1. Loading  — while the fetch is in progress
//   2. Error    — if the fetch fails
//   3. Empty    — if the API returns an empty array
//   4. Loaded   — displays the product list
//
// Each state is tested separately in the integration tests.

import { useState, useEffect } from "react";
import { formatCurrency } from "../utils/cart.js";

export function ProductList({ onAddToCart }) {
  const [products, setProducts]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    // Fetch products when the component first mounts
    fetch("/api/products")
      .then((res) => {
        // If the server returned an error status, throw so we hit the catch
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
      });
  }, []);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return <p className="loading">Loading products...</p>;
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      // role="alert" makes this findable in tests via getByRole("alert")
      // and also announces it to screen readers immediately
      <p role="alert" className="error">
        {error}
      </p>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (products.length === 0) {
    return <p className="empty">No products available.</p>;
  }

  // ── Loaded state ───────────────────────────────────────────────────────────
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <div className="product-info">
            <h3>{product.name}</h3>
            <span className="product-price">{formatCurrency(product.price)}</span>
            {/* Show an out of stock badge when inStock is false */}
            {!product.inStock && (
              <span className="out-of-stock">Out of stock</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            // Disable the button for out-of-stock items
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </li>
      ))}
    </ul>
  );
}
