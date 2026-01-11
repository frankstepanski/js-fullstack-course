
import { Link } from "react-router-dom";

const USERS = ["alice", "bob", "charlie"];

export default function Users() {
  return (
    <>
      <h2>Users</h2>
      <ul>
        {USERS.map((u) => (
          <li key={u}>
            <Link to={`/users/${u}`}>{u}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
