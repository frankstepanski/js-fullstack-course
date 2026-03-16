// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

/*
  RequireAuth
  -----------
  This component protects routes that require authentication.

  If the user is NOT authenticated:
  - Redirect them to /login
  - Remember where they were trying to go

  If authenticated:
  - Render the protected content
*/

export default function RequireAuth({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}
