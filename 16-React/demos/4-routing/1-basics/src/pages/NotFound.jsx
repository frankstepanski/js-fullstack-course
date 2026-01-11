/*
  NotFound.jsx
  ------------
  This page renders when:
  - The URL does NOT match any defined route

  Example:
  /abc
  /random
  /does-not-exist
*/

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Sorry, that page does not exist.</p>

      {/* Link lets users navigate without reloading */}
      <Link to="/">Go back home</Link>
    </section>
  );
}
