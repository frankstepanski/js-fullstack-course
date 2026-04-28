// src/main.jsx
//
// Entry point for the React app.
// Mounts the App component into the #root div in index.html.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
