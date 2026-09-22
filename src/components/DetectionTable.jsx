import React from "react";

function DetectionTable({ rows = [] }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Litter Type</th>
            <th>Count</th>
            <th>Confidence</th>
            <th>Footfall</th>
            <th>Priority Score</th>
            <th>Collection Time</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.litter_type}</td>

              <td>
                {row.detection_count}
              </td>

              <td>
                {(row.confidence * 100).toFixed(1)}%
              </td>

              <td>
                {row.footfall}
              </td>

              <td>
                {row.priority_score}
              </td>

              <td>
                {row.collection_time} min
              </td>

              <td>
                {new Date(row.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetectionTable;