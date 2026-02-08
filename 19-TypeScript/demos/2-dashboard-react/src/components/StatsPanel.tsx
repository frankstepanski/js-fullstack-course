import { useState } from "react";

export default function StatsPanel() {
    const [count, setCount] = useState<number>(0);

    return (
        <section>
            <h3>Stats</h3>
            <p>Clicks: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
        </section>
    );
}