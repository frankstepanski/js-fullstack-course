// Demo2CacheHit.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Shows the cache hit: navigate to a user, go back, click them again.
// The second visit is INSTANT — no spinner, no network request.
//
// The key idea: queryKey: ['user', id]
//   Each user gets their own cache slot. User 1 and User 2 are cached separately.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchUsers } from '../api/fakeApi.js';

export default function Demo2CacheHit() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <div className="callout callout-info">
        <strong>What to notice:</strong> Click a user — it loads (1s fetch). Hit "← Back",
        click the same user again. <em>Instant.</em> No spinner. No network request.
        The cache key is <code>['user', id]</code> so each user has their own slot.
        Check the console — the second visit logs nothing.
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
  // useQuery handles the fetch, loading state, error state, AND caching.
  // Cache key: ['users'] — shared by any component that uses this key.
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    // staleTime is set globally in main.jsx (10s),
    // but you can override it per-query like this:
    // staleTime: 30_000,
  });

  if (isLoading) return <div className="loading">Fetching users… <span className="spinner" /></div>;
  if (error)     return <div className="error">Error: {error.message}</div>;

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
  // Cache key includes the id: ['user', 1], ['user', 2], etc.
  // Each user is stored separately. Switching users never overwrites another's cache.
  const { data: user, isLoading, isFetching } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back</button>

      {/* Show a subtle indicator if a background refetch is happening */}
      {isFetching && !isLoading && (
        <div className="background-fetch-badge">Refreshing in background…</div>
      )}

      {isLoading ? (
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
