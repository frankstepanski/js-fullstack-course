export default function ReviewStatusBadge({ status }) {
  const labels = {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected"
  };

  return (
    <span className={`status-badge ${status}`}>
      {labels[status]}
    </span>
  );
}
