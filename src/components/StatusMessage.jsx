import React from "react";

function StatusMessage({ type = "loading", message }) {
  if (type === "loading") {
    return (
      <div className="status-message loading-message">
        <div className="spinner"></div>
        <p>{message || "Loading data..."}</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="status-message error-message">
        <div className="status-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{message || "Unable to load data."}</p>
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="status-message empty-message">
        <div className="status-icon">📭</div>
        <h3>No data available</h3>
        <p>{message || "There are no records to display."}</p>
      </div>
    );
  }

  return null;
}

export default StatusMessage;