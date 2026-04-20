import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GlobalStyles } from "./styles.js";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* future flags opt in to React Router v7 behaviour early, silencing deprecation warnings */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartProvider>
        <GlobalStyles />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
