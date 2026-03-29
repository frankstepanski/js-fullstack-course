// src/App.jsx
//
// The main application component for the integration testing demo.
// Renders the CartPage which combines the product list and cart sidebar.
//
// Run "npm run dev" to open the app in your browser and see it working.
// The API calls in CartPage are real fetch() calls — in the browser they
// will fail unless you have a backend running. The tests use MSW to
// intercept those calls and return fake data instead.

import { CartPage } from "./components/CartPage.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Shopping Cart Demo</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        This app demonstrates the components tested in <code>src/__tests__/</code>.
        The integration tests use MSW to intercept API calls — no real backend needed.
      </p>
      <CartPage />
    </div>
  );
}
