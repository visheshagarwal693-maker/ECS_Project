import React from "react";

function System() {
  const litterClasses = [
    "Plastic Container",
    "Wrapper",
    "Can",
    "Plastic Bag",
    "Paper",
    "Other",
  ];

  return (
    <div className="page-container">

      <div className="page-title">
        <h1>System / AI Model</h1>

        <p>
          AI model status and waste detection configuration.
        </p>
      </div>

      {/* MODEL STATUS */}
      <div className="hotspot-summary">

        <div className="ui-card">
          <span className="analytics-label">
            AI Model
          </span>

          <strong className="analytics-number">
            YOLO11
          </strong>

          <span className="analytics-note">
            Waste detection model
          </span>
        </div>

        <div className="ui-card">
          <span className="analytics-label">
            Model Status
          </span>

          <strong className="analytics-number">
            Active
          </strong>

          <span className="analytics-note">
            Detection system enabled
          </span>
        </div>

        <div className="ui-card">
          <span className="analytics-label">
            Camera
          </span>

          <strong className="analytics-number">
            Connected
          </strong>

          <span className="analytics-note">
            Fixed monitoring camera
          </span>
        </div>

      </div>

      {/* AI PIPELINE */}
      <div className="ui-card">

        <h2>AI Detection Pipeline</h2>

        <p className="ui-card-subtitle">
          Waste monitoring workflow
        </p>

        <div style={{ marginTop: "25px" }}>

          <p>📷 Fixed Camera</p>

          <p>↓</p>

          <p>🖼️ Frame Capture</p>

          <p>↓</p>

          <p>🤖 YOLO11 Inference</p>

          <p>↓</p>

          <p>🔍 Meaningful Change Check</p>

          <p>↓</p>

          <p>📊 Detection JSON</p>

          <p>↓</p>

          <p>🗺️ Hotspot & Priority Analysis</p>

          <p>↓</p>

          <p>🚛 Collection Route</p>

        </div>

      </div>

      {/* WASTE CLASSES */}
      <div className="ui-card">

        <h2>Detected Waste Classes</h2>

        <p className="ui-card-subtitle">
          Litter categories supported by the AI model
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >

          {litterClasses.map((item, index) => (

            <div
              key={item}
              className="ui-card"
              style={{
                margin: 0,
                padding: "20px",
              }}
            >

              <strong>
                {index + 1}. {item}
              </strong>

            </div>

          ))}

        </div>

      </div>

      {/* SYSTEM CONFIGURATION */}
      <div className="ui-card">

        <h2>System Configuration</h2>

        <p className="ui-card-subtitle">
          Current monitoring configuration
        </p>

        <div className="table-container">

          <table>

            <tbody>

              <tr>
                <td>
                  <strong>AI Model</strong>
                </td>

                <td>
                  YOLO11
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Frame Capture</strong>
                </td>

                <td>
                  Approximately every 10 seconds
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Detection</strong>
                </td>

                <td>
                  Object detection
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Image Storage</strong>
                </td>

                <td>
                  Not used in MVP
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Location</strong>
                </td>

                <td>
                  Simulated / configured coordinates
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Frontend</strong>
                </td>

                <td>
                  React + Vite
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Backend</strong>
                </td>

                <td>
                  FastAPI
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default System;