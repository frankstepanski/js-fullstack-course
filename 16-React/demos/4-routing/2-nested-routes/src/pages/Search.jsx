
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <>
      <h2>Search</h2>
      <input
        value={query}
        onChange={(e) => setParams({ q: e.target.value })}
        placeholder="Type to update ?q="
      />
      <p>Search param q: {query}</p>
    </>
  );
}
