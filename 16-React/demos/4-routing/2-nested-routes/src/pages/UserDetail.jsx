import { useParams, useNavigate } from "react-router-dom";

/*
  UserDetail.jsx
  --------------
  This page demonstrates:
  - URL Params (useParams)
  - Programmatic navigation (useNavigate)
*/

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section>
      <h2>User Details</h2>

      <p>
        <strong>User ID:</strong> {id}
      </p>

      {/* 
        🔙 BACK BUTTON
        --------------
        navigate("/users") sends the user back
        to the Users list page.
      */}
      <button
        onClick={() => navigate("/users")}
      >
        ← Back to Users
      </button>
    </section>
  );
}
