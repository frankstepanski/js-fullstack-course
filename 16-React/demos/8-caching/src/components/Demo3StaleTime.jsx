// Demo3StaleTime.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Shows staleTime in action.
//
// staleTime: 8000 means data is "fresh" for 8 seconds.
// During that window: re-mounts, tab switches, component re-renders → NO refetch.
// After 8s: data goes "stale". React Query shows the old data immediately but
// fires a background refetch to update it. The user never sees a blank screen.
//
// Try: fetch the posts, wait 8 seconds, then tab away and come back.
// Watch the "background refresh" indicator appear briefly at the top.
// ─────────────────────────────────────────────────────────────────────────────

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/fakeApi.js';

export default function Demo3StaleTime() {
  // staleTime: 8 seconds — overrides the 10s default set in main.jsx
  // so you don't have to wait as long to see the stale behaviour.
  const {
    data: posts,
    isLoading,
    isFetching,   // true during ANY fetch, including background refetches
    dataUpdatedAt, // timestamp of the last successful fetch
  } = useQuery({
    queryKey: ['posts-stale-demo'],
    queryFn: fetchPosts,
    staleTime: 8_000,  // data is fresh for 8 seconds
    refetchOnWindowFocus: true, // refetch when you tab back (default: true)
  });

  // How old is the data right now?
  const ageSeconds = dataUpdatedAt
    ? ((Date.now() - dataUpdatedAt) / 1000).toFixed(1)
    : null;

  return (
    <div>
      <div className="callout callout-info">
        <strong>What to notice:</strong> After fetching, wait 8 seconds then tab away
        and come back. The data shows <em>instantly</em> (served from cache), but a
        background refetch quietly updates it. You can also watch the "data age" counter below.
      </div>

      {/* Background refetch indicator — only shows when silently refreshing */}
      {isFetching && !isLoading && (
        <div className="background-fetch-badge">
          Background refresh happening… (you still see the old data)
        </div>
      )}

      {/* Data age — shows how "stale" the current data is */}
      {dataUpdatedAt && (
        <div className="meta-row">
          <span className="meta-label">Data age:</span>
          <span className={parseFloat(ageSeconds) > 8 ? 'stale-text' : 'fresh-text'}>
            {ageSeconds}s {parseFloat(ageSeconds) > 8 ? '(stale — will refetch on next focus)' : '(fresh)'}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Fetching posts… <span className="spinner" /></div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="card post-card">
              <div className="post-title">{post.title}</div>
              <div className="post-meta">by {post.author} · {post.likes} likes</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
