function Header({ title, description }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="live-indicator">
        <span></span> Live Dashboard
      </div>
    </header>
  );
}

export default Header;