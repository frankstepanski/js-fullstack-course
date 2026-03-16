import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
/*
  Login.jsx
  ---------
  This page lives in the **PUBLIC layout**.

  Purpose:
  - Simulate a login flow
  - Teach how authentication gates work
  - Redirect users to authenticated routes

  ⚠️ This is NOT real authentication.
  It is intentionally simple for learning.
*/

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // ✅ 1️⃣ IMMEDIATE validation (no delay)
  if (!username || !password) {
    setError("Username and password are required");
    return;
  }

 // ✅ 2️⃣ NOW simulate async login
  setIsLoading(true);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const success = onLogin(username, password);

  setIsLoading(false);

  if (success) {
    navigate("/dashboard", { replace: true });
  } else {
    setError("Invalid username or password");
  }
};


  return (
    <section className="card">
      <h2>🔐 Login</h2>

      <p>
        This page demonstrates how a <strong>public login</strong> can grant
        access to an <strong>authenticated layout</strong>.
      </p>

      <div className="info">
        <p><strong>Demo credentials:</strong></p>
        <p>Username: <code>admin</code></p>
        <p>Password: <code>password</code></p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        {error && (
          <div className="login-error">
            ❌ {error}
          </div>
        )}

        <button type="submit" className="button" disabled={isLoading}>
         {isLoading ? "Logging in…" : "Log In"}
        </button>
      </form>

      <p className="info">
        After logging in, you’ll be redirected to the dashboard, which uses a
        different layout and navigation than the public pages.
      </p>

      <Link to="/" className="button" style={{ background: "#6b7280" }}>
        ← Back to Home
      </Link>
    </section>
  );
}
