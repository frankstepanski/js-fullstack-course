// App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Top-level component. Just renders a tab bar and switches between demos.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import Demo1NoCaching    from './components/Demo1NoCaching.jsx';
import Demo2CacheHit     from './components/Demo2CacheHit.jsx';
import Demo3StaleTime    from './components/Demo3StaleTime.jsx';
import Demo4Invalidation from './components/Demo4Invalidation.jsx';

const TABS = [
  { id: 'demo1', label: '1. No caching',  component: Demo1NoCaching    },
  { id: 'demo2', label: '2. Cache hit',   component: Demo2CacheHit     },
  { id: 'demo3', label: '3. Stale data',  component: Demo3StaleTime    },
  { id: 'demo4', label: '4. Invalidation',component: Demo4Invalidation },
];

export default function App() {
  const [active, setActive] = useState('demo1');

  const ActiveDemo = TABS.find((t) => t.id === active).component;

  return (
    <div className="app">
      <h1 className="app-title">TanStack Query — Caching Demo</h1>
      <p className="app-subtitle">
        Open the browser console to see every API call. The{' '}
        <span className="code">{'花'}</span>
        React Query DevTools panel (bottom-right) shows the live cache.
      </p>

      {/* Tab bar */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${active === tab.id ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active demo */}
      <div className="demo-panel">
        <ActiveDemo />
      </div>
    </div>
  );
}
