import React from "react";
import { hotspots } from "../data/mockdata.js";

function CollectionQueue() {
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const queue = [...hotspots].sort((a, b) => {
    const priorityDifference =
      (priorityOrder[a.priority] ?? 4) -
      (priorityOrder[b.priority] ?? 4);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return b.count - a.count;
  });

  return (
    <div className="page-container">

      {/* PAGE HEADER */}
      <div className="page-title">
        <h1>Collection Queue</h1>

        <p>
          Prioritized collection tasks generated from
          detected litter hotspots.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="hotspot-summary">

        <div className="ui-card">
          <span className="analytics-label">
            Total Tasks
          </span>

          <strong className="analytics-number">
            {queue.length}
          </strong>

          <span className="analytics-note">
            Collection locations
          </span>
        </div>

        <div className="ui-card">
          <span className="analytics-label">
            High Priority
          </span>

          <strong className="analytics-number">
            {
              queue.filter(
                (item) => item.priority === "High"
              ).length
            }
          </strong>

          <span className="analytics-note">
            Require immediate attention
          </span>
        </div>

        <div className="ui-card">
          <span className="analytics-label">
            Total Detections
          </span>

          <strong className="analytics-number">
            {queue.reduce(
              (total, item) => total + item.count,
              0
            )}
          </strong>

          <span className="analytics-note">
            Detected litter items
          </span>
        </div>

      </div>

      {/* COLLECTION QUEUE */}
      <div className="ui-card hotspot-table-card">

        <h2>Collection Tasks</h2>

        <p className="ui-card-subtitle">
          Locations ordered by priority and detection count
        </p>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Order</th>
                <th>Location</th>
                <th>Detections</th>
                <th>Priority</th>
                <th>Last Detected</th>
                <th>Coordinates</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {queue.map((item, index) => (

                <tr key={item.id}>

                  <td>
                    <strong>
                      {index + 1}
                    </strong>
                  </td>

                  <td>
                    <strong>
                      {item.name}
                    </strong>
                  </td>

                  <td>
                    {item.count}
                  </td>

                  <td>
                    <span
                      className={`status-pill status-${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    {item.lastDetected}
                  </td>

                  <td>
                    {item.latitude},{" "}
                    {item.longitude}
                  </td>

                  <td>
                    <span className="status-pill">
                      Pending
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default CollectionQueue;