// main.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Entry point. We create ONE QueryClient — this is the cache.
// Every component inside QueryClientProvider shares the same cache.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx';
import './index.css';

// QueryClient holds the cache.
// defaultOptions lets you set staleTime for every query in the app at once.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered "fresh" for 10 seconds.
      // During this window, re-mounts won't fire a new network request.
      staleTime: 10_000,

      // Keep unused cache entries in memory for 2 minutes before garbage collecting.
      gcTime: 2 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap everything so every component can use the cache */}
    <QueryClientProvider client={queryClient}>
      <App />

      {/* DevTools panel — shows the cache in real time. Only renders in dev mode. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
