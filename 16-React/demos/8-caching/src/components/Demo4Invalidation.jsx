// Demo4Invalidation.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Shows cache invalidation with useMutation.
//
// The flow:
//   1. User clicks "Add Post" or "Delete"
//   2. useMutation fires the API call
//   3. onSuccess → invalidateQueries(['posts'])
//   4. React Query marks the cache entry as stale and immediately refetches
//   5. Every component subscribed to ['posts'] updates automatically
//
// This is the standard pattern for any create / update / delete action.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, deletePost } from '../api/fakeApi.js';

export default function Demo4Invalidation() {
  const [newTitle, setNewTitle] = useState('');

  // useQueryClient gives us access to the shared cache
  const queryClient = useQueryClient();

  // ── Fetch posts ────────────────────────────────────────────────────────────
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // ── Create post mutation ───────────────────────────────────────────────────
  const createMutation = useMutation({
    // The actual API call
    mutationFn: (title) => createPost(title),

    // Runs after the API call succeeds
    onSuccess: () => {
      // Tell React Query: the ['posts'] cache is now out of date.
      // It will immediately refetch so the list shows the new post.
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      // Clear the input
      setNewTitle('');
    },
  });

  // ── Delete post mutation ───────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),

    onSuccess: () => {
      // Same pattern — invalidate after deleting so the list refreshes
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Are either mutations in-flight?
  const isMutating = createMutation.isPending || deleteMutation.isPending;

  return (
    <div>
      <div className="callout callout-info">
        <strong>What to notice:</strong> Add or delete a post. The mutation fires,
        then <code>invalidateQueries(['posts'])</code> tells the cache the list is stale.
        React Query refetches automatically — the list updates everywhere at once.
      </div>

      {/* Add post form */}
      <div className="add-form">
        <input
          className="text-input"
          type="text"
          placeholder="New post title…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            // Allow pressing Enter to submit
            if (e.key === 'Enter' && newTitle.trim()) {
              createMutation.mutate(newTitle.trim());
            }
          }}
          disabled={isMutating}
        />
        <button
          className="btn btn-primary"
          disabled={!newTitle.trim() || isMutating}
          onClick={() => createMutation.mutate(newTitle.trim())}
        >
          {createMutation.isPending ? 'Adding…' : '+ Add Post'}
        </button>
      </div>

      {/* Status messages */}
      {createMutation.isPending && (
        <div className="background-fetch-badge">
          Saving post… then invalidating cache and refetching list…
        </div>
      )}
      {deleteMutation.isPending && (
        <div className="background-fetch-badge">
          Deleting post… then invalidating cache and refetching list…
        </div>
      )}

      {/* Post list */}
      {isLoading ? (
        <div className="loading">Fetching posts… <span className="spinner" /></div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="card post-card post-card-row">
              <div>
                <div className="post-title">{post.title}</div>
                <div className="post-meta">by {post.author} · {post.likes} likes</div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={isMutating}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
