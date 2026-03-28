// Demo1NoCaching.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Shows what happens WITHOUT caching.
// Every time you navigate back to a user and click them again, a new fetch fires.
// This is the problem TanStack Query solves.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { fetchUser, fetchUsers } from '../api/fakeApi.js';

export default function Demo1NoCaching() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <div className="callout callout-warn">
        <strong>What to notice:</strong> Click a user, then hit "← Back", then click
        the same user again. Watch the loading spinner flash every time — and check
        the console. A new network request fires on every single click, even though
        the data hasn't changed.
      </div>

      {selectedId === null ? (
        <UserList onSelect={setSelectedId} />
      ) : (
        <UserDetail id={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </div>
  );
}

// ── UserList ──────────────────────────────────────────────────────────────────

function UserList({ onSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Plain useEffect fetch — no caching at all.
  // Every time this component mounts, it hits the API.
  useEffect(() => {
    setLoading(true);
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []); // empty deps = runs on every mount

  if (loading) return <div className="loading">Fetching users… <span className="spinner" /></div>;

  return (
    <div className="card">
      <h2 className="card-title">Users</h2>
      {users.map((u) => (
        <button key={u.id} className="user-row" onClick={() => onSelect(u.id)}>
          <div className="avatar">{initials(u.name)}</div>
          <div>
            <div className="user-name">{u.name}</div>
            <div className="user-sub">{u.role}</div>
          </div>
          <span className="arrow">›</span>
        </button>
      ))}
    </div>
  );
}

// ── UserDetail ────────────────────────────────────────────────────────────────

function UserDetail({ id, onBack }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Same pattern — fires every single time this component mounts.
  // No memory of previous fetches.
  useEffect(() => {
    setLoading(true);
    setUser(null); // wipe previous data — causes the loading flash
    fetchUser(id).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back</button>
      {loading ? (
        <div className="loading">Fetching user {id}… <span className="spinner" /></div>
      ) : (
        <div className="card">
          <div className="profile-header">
            <div className="avatar avatar-lg">{initials(user.name)}</div>
            <div>
              <div className="user-name" style={{ fontSize: 18 }}>{user.name}</div>
              <div className="user-sub">{user.role} · {user.team}</div>
            </div>
          </div>
          <div className="field-row"><span className="field-label">Joined</span><span>{user.joined}</span></div>
          <div className="field-row"><span className="field-label">Team</span><span>{user.team}</span></div>
        </div>
      )}
    </div>
  );
}

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('');
}
