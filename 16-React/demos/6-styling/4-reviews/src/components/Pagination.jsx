export default function Pagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div style={{ marginTop: "1rem" }}>
      Page:
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          style={{
            marginLeft: "0.25rem",
            fontWeight: page === i + 1 ? "bold" : "normal"
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
