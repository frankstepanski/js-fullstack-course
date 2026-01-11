export default function CategoryFilter({ movies, selected, onChange }) {
  const categories = [...new Set(movies.flatMap(m => m.categories))];

  const toggle = (cat) => {
    onChange(
      selected.includes(cat)
        ? selected.filter(c => c !== cat)
        : [...selected, cat]
    );
  };

  return (
    <>
      Filter by:
      {categories.map(cat => (
        <label key={cat} style={{ marginLeft: "0.5rem" }}>
          <input
            type="checkbox"
            checked={selected.includes(cat)}
            onChange={() => toggle(cat)}
          />
          {cat}
        </label>
      ))}
    </>
  );
}
