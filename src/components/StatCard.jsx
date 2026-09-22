function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-number">{value}</div>
      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
    </div>
  );
}

export default StatCard;