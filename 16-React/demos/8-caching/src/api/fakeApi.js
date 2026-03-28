// api/fakeApi.js
// ─────────────────────────────────────────────────────────────────────────────
// This file pretends to be a real API server.
// In a real app you'd replace these with actual fetch() calls to your backend.
// The 1000ms delay simulates a real network round-trip so you can SEE caching work.
// ─────────────────────────────────────────────────────────────────────────────

const DELAY = 1000; // ms — fake network latency

// Simulated database of users
const USERS = [
  { id: 1, name: 'Alice Lee',   role: 'Engineer', team: 'Platform', joined: 'Mar 2022' },
  { id: 2, name: 'Bob Miller',  role: 'Designer',  team: 'Growth',   joined: 'Nov 2021' },
  { id: 3, name: 'Carol Kim',   role: 'Product',   team: 'Core',     joined: 'Jan 2023' },
];

// Simulated post database — mutable so we can add/delete in the demo
let posts = [
  { id: 1, title: 'Getting started with React',    author: 'Alice', likes: 12 },
  { id: 2, title: 'Why TypeScript matters',         author: 'Bob',   likes: 8  },
  { id: 3, title: 'Cache invalidation is hard',    author: 'Carol', likes: 24 },
];
let nextPostId = 4;

// Helper — wraps a value in a Promise that resolves after DELAY ms
function fakeDelay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY));
}

// ── User endpoints ────────────────────────────────────────────────────────────

/** Fetch all users */
export function fetchUsers() {
  console.log('[API] GET /users');
  return fakeDelay([...USERS]);
}

/** Fetch a single user by id */
export function fetchUser(id) {
  console.log(`[API] GET /users/${id}`);
  const user = USERS.find((u) => u.id === id);
  if (!user) return Promise.reject(new Error('User not found'));
  return fakeDelay({ ...user });
}

// ── Post endpoints ────────────────────────────────────────────────────────────

/** Fetch all posts */
export function fetchPosts() {
  console.log('[API] GET /posts');
  return fakeDelay([...posts]);
}

/** Create a new post — mutates the fake DB */
export function createPost(title) {
  console.log('[API] POST /posts', title);
  const newPost = { id: nextPostId++, title, author: 'You', likes: 0 };
  posts = [...posts, newPost];
  return fakeDelay(newPost);
}

/** Delete a post by id — mutates the fake DB */
export function deletePost(id) {
  console.log(`[API] DELETE /posts/${id}`);
  posts = posts.filter((p) => p.id !== id);
  return fakeDelay({ success: true });
}
