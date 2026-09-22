import React from "react";
import HotspotMap from "../components/HotspotMap";
import { hotspots } from "../data/mockdata.js";

function Hotspots() {
  // Keep the hotspot cards in A, B, C, D order
  const orderedHotspots = [...hotspots].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Priority order for Hotspot Summary table
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const priorityHotspots = [...hotspots].sort((a, b) => {
    const priorityDifference =
      priorityOrder[a.priority] - priorityOrder[b.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    // Keep A, B, C, D order within the same priority
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="page-container">

      {/* Header */}
      <div className="page-title">
        <h1>Hotspots & Map</h1>
        <p>
          Geographical concentration of detected litter
        </p>
      </div>

      {/* Actual Hotspot Map */}
      <HotspotMap hotspots={orderedHotspots} />

      {/* Summary Cards */}
      <div className="hotspot-summary">

        <div className="ui-card">
          <span className="analytics-label">
            Active Hotspots
          </span>

          <strong className="analytics-number">
            {orderedHotspots.length}
          </strong>

          <span className="analytics-note">
            Monitoring locations
          </span>
        </div>

        <div className="ui-card">
          <span className="analytics-label">
            Highest Detection
          </span>

          <strong className="analytics-number">
            82
          </strong>

          <span className="analytics-note">
            Monitoring Point A
          </span>
        </div>

        <div className="ui-card">
          <span className="analytics-label">
            High Priority
          </span>

          <strong className="analytics-number">
            2
          </strong>

          <span className="analytics-note">
            Locations requiring attention
          </span>
        </div>

      </div>

      {/* Hotspot Locations */}
      <div className="hotspot-layout">

        <div className="ui-card hotspot-list-card">

          <h2>
            Hotspot Locations
          </h2>

          <p className="ui-card-subtitle">
            Detection activity by location
          </p>

          <div className="hotspot-list">

            {orderedHotspots.map((hotspot) => (

              <div
                className="hotspot-item"
                key={hotspot.id}
              >

                {/* Top Section */}
                <div className="hotspot-top">

                  <div>
                    <h3>
                      {hotspot.name}
                    </h3>

                    <span className="hotspot-time">
                      {hotspot.lastDetected}
                    </span>
                  </div>

                  <span
                    className={`status-pill status-${hotspot.priority.toLowerCase()}`}
                  >
                    {hotspot.priority}
                  </span>

                </div>

                {/* Details */}
                <div className="hotspot-details">

                  <div>
                    <span>
                      Detections
                    </span>

                    <strong>
                      {hotspot.count}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Latitude
                    </span>

                    <strong>
                      {hotspot.latitude}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Longitude
                    </span>

                    <strong>
                      {hotspot.longitude}
                    </strong>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Bottom Table */}
      <div className="ui-card hotspot-table-card">

        <h2>
          Hotspot Summary
        </h2>

        <p className="ui-card-subtitle">
          Monitoring point statistics
        </p>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Location</th>
                <th>Detections</th>
                <th>Priority</th>
                <th>Last Detected</th>
                <th>Coordinates</th>
              </tr>
            </thead>

            <tbody>

              {priorityHotspots.map((hotspot) => (

                <tr key={hotspot.id}>

                  <td>
                    <strong>
                      {hotspot.name}
                    </strong>
                  </td>

                  <td>
                    {hotspot.count}
                  </td>

                  <td>
                    <span
                      className={`status-pill status-${hotspot.priority.toLowerCase()}`}
                    >
                      {hotspot.priority}
                    </span>
                  </td>

                  <td>
                    {hotspot.lastDetected}
                  </td>

                  <td>
                    {hotspot.latitude},{" "}
                    {hotspot.longitude}
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

export default Hotspots;