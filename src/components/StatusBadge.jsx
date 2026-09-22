function StatusBadge({ status }) {
  const normalized = status.toLowerCase();

  return (
    <span className={`status-badge ${normalized}`}>
      <span className="status-dot"></span>
      {status}
    </span>
  );
}

export default StatusBadge;