import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./App.css";

/*
  main.jsx
  ========
  This is the TRUE entry point of the React app.

  Responsibilities:
  1️⃣ Find the root DOM element in index.h, sorry.tml
  2️⃣ Create a React root
  3️⃣ Wrap the app in BrowserRouter (enables routing)
  4️⃣ Render <App />

  Nothing else should live here.
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
