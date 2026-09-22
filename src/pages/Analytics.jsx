import React from "react";

import { useCamera } from "../context/CameraContext";
import { cameraAnalytics } from "../data/cameraData";

function Analytics() {
  const { selectedCamera } = useCamera();

  /*
   * =========================================================
   * DASHBOARD OVERVIEW DATA
   * =========================================================
   *
   * These values are kept consistent with the Overview page.
   *
   * Camera totals:
   * A = 42
   * B = 31
   * C = 28
   * D = 25
   *
   * Total = 126
   */

  const overviewData = {
    totalDetections: 126,
    highPriority: 23,
    camerasOnline: 4,
    totalCameras: 4,
    aiConfidence: 87.4,
  };


  /*
   * =========================================================
   * SELECTED CAMERA
   * =========================================================
   */

  const selectedAnalytics = selectedCamera
    ? cameraAnalytics[selectedCamera]
    : null;


  /*
   * =========================================================
   * SUMMARY DATA
   * =========================================================
   */

  const totalDetections = selectedAnalytics
    ? selectedAnalytics.totalDetections
    : overviewData.totalDetections;


  const averageConfidence = selectedAnalytics
    ? selectedAnalytics.averageConfidence
    : overviewData.aiConfidence;


  /*
   * For the overall Analytics page, use the same
   * High Priority number shown on the Dashboard Overview.
   *
   * When a camera is selected, use that camera's
   * high-priority value.
   */

  const highPriority = selectedAnalytics
    ? selectedAnalytics.highPriority
    : overviewData.highPriority;


  /*
   * =========================================================
   * DETECTION TREND DATA
   * =========================================================
   *
   * Selected camera:
   * Uses the corresponding camera's trend.
   *
   * No camera:
   * Uses a trend based on the Overview total of 126.
   */

  const overviewDetectionTrend = [
    {
      time: "08:00",
      detections: 18,
    },
    {
      time: "09:00",
      detections: 24,
    },
    {
      time: "10:00",
      detections: 21,
    },
    {
      time: "11:00",
      detections: 25,
    },
    {
      time: "12:00",
      detections: 20,
    },
    {
      time: "13:00",
      detections: 18,
    },
  ];


  const currentDetectionTrend = selectedAnalytics
    ? selectedAnalytics.detectionTrend
    : overviewDetectionTrend;


  /*
   * =========================================================
   * CLASS DISTRIBUTION
   * =========================================================
   */

  const overviewClassDistribution = [
    {
      name: "Plastic",
      count: 34,
    },
    {
      name: "Paper",
      count: 22,
    },
    {
      name: "Glass",
      count: 17,
    },
    {
      name: "Metal",
      count: 20,
    },
    {
      name: "Organic",
      count: 18,
    },
    {
      name: "Other",
      count: 15,
    },
  ];


  const currentClassDistribution = selectedAnalytics
    ? selectedAnalytics.classDistribution
    : overviewClassDistribution;


  /*
   * =========================================================
   * CONFIDENCE DISTRIBUTION
   * =========================================================
   */

  const overviewConfidenceDistribution = [
    {
      range: "90–100%",
      count: 48,
    },
    {
      range: "80–89%",
      count: 43,
    },
    {
      range: "70–79%",
      count: 24,
    },
    {
      range: "Below 70%",
      count: 11,
    },
  ];


  const currentConfidenceDistribution = selectedAnalytics
    ? selectedAnalytics.confidenceDistribution
    : overviewConfidenceDistribution;


  /*
   * =========================================================
   * PRIORITY DISTRIBUTION
   * =========================================================
   *
   * Overall values add up to the Overview total:
   *
   * High   = 23
   * Medium = 58
   * Low    = 45
   *
   * Total  = 126
   */

  const overviewPriorityDistribution = [
    {
      name: "High",
      count: 23,
    },
    {
      name: "Medium",
      count: 58,
    },
    {
      name: "Low",
      count: 45,
    },
  ];


  const currentPriorityDistribution = selectedAnalytics
    ? [
        {
          name: "High",
          count: selectedAnalytics.highPriority,
        },
        {
          name: "Medium",
          count: Math.max(
            selectedAnalytics.totalDetections -
              selectedAnalytics.highPriority -
              10,
            0
          ),
        },
        {
          name: "Low",
          count: Math.min(
            10,
            selectedAnalytics.totalDetections
          ),
        },
      ]
    : overviewPriorityDistribution;


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="page-container">


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="page-title">

        <h1>
          Analytics
        </h1>

        <p>
          {selectedCamera
            ? `Detection trends and litter distribution insights — Camera ${selectedCamera}`
            : "Detection trends and litter distribution insights"}
        </p>

      </div>


      {/* =====================================================
          SELECTED CAMERA INDICATOR
          ===================================================== */}

      {selectedCamera && (

        <div
          className="ui-card"
          style={{
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >

            <div>

              <h2
                style={{
                  marginBottom: "6px",
                }}
              >
                Camera {selectedCamera}
              </h2>

              <p
                style={{
                  margin: 0,
                }}
              >
                Analytics for the selected monitoring region
              </p>

            </div>


            <span className="status-badge">
              Camera {selectedCamera} Active
            </span>

          </div>

        </div>

      )}


      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="analytics-summary">


        {/* TOTAL DETECTIONS */}

        <div className="ui-card">

          <span className="analytics-label">
            Total Detections
          </span>

          <strong className="analytics-number">
            {totalDetections}
          </strong>

          <span className="analytics-note">
            {selectedCamera
              ? `Camera ${selectedCamera}`
              : "All monitoring cameras"}
          </span>

        </div>


        {/* AI CONFIDENCE */}

        <div className="ui-card">

          <span className="analytics-label">
            Average Confidence
          </span>

          <strong className="analytics-number">
            {averageConfidence}%
          </strong>

          <span className="analytics-note">
            Across detected objects
          </span>

        </div>


        {/* HIGH PRIORITY */}

        <div className="ui-card">

          <span className="analytics-label">
            High Priority
          </span>

          <strong className="analytics-number">
            {highPriority}
          </strong>

          <span className="analytics-note">
            Requiring attention
          </span>

        </div>


        {/* LITTER CLASSES */}

        <div className="ui-card">

          <span className="analytics-label">
            Litter Classes
          </span>

          <strong className="analytics-number">
            6
          </strong>

          <span className="analytics-note">
            Supported classes
          </span>

        </div>


      </div>


      {/* =====================================================
          DETECTION TREND
          ===================================================== */}

      <div className="ui-card analytics-section">

        <div className="analytics-section-header">

          <div>

            <h2>
              Detection Trend
            </h2>

            <p>
              {selectedCamera
                ? `Number of detected litter objects over time — Camera ${selectedCamera}`
                : "Number of detected litter objects over time"}
            </p>

          </div>

        </div>


        {/* ===================================================
            BAR CHART
            =================================================== */}

        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            gap: "20px",
            padding: "20px 10px",
            borderBottom: "1px solid #e2e8f0",
            overflowX: "auto",
            boxSizing: "border-box",
          }}
        >

          {currentDetectionTrend.map((item) => (

            <div
              key={item.time}
              style={{
                height: "100%",
                minWidth: "60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                flexShrink: 0,
                gap: "8px",
              }}
            >

              {/* DETECTION NUMBER */}

              <div
                style={{
                  color: "#334155",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {item.detections}
              </div>


              {/* BAR */}

              <div
                style={{
                  width: "45px",

                  /*
                   * Normal Analytics:
                   * detections × 5
                   *
                   * Selected Camera:
                   * detections × 12
                   *
                   * This makes only the selected-camera
                   * bars taller.
                   */

                  height: `${Math.min(
                    item.detections *
                      (selectedCamera ? 12 : 5),
                    selectedCamera ? 260 : 220
                  )}px`,

                  minHeight: "15px",

                  background:
                    "linear-gradient(to top, #2563eb, #60a5fa)",

                  borderRadius:
                    "7px 7px 0 0",

                  display: "block",

                  flexShrink: 0,
                }}
              ></div>


              {/* TIME LABEL */}

              <div
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.time}
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          DISTRIBUTION GRID
          ===================================================== */}

      <div className="analytics-grid">


        {/* ===================================================
            LITTER CLASS DISTRIBUTION
            =================================================== */}

        <div className="ui-card">

          <h2>
            Litter Class Distribution
          </h2>

          <p className="ui-card-subtitle">
            {selectedCamera
              ? `Detected litter by class — Camera ${selectedCamera}`
              : "Detected litter by class"}
          </p>


          <div className="distribution-list">

            {currentClassDistribution.map((item) => (

              <div
                className="distribution-item"
                key={item.name}
              >

                <div className="distribution-header">

                  <span>
                    {item.name}
                  </span>

                  <strong>
                    {item.count}
                  </strong>

                </div>


                <div className="progress-track">

                  <div
                    className="progress-fill blue"
                    style={{
                      width: `${Math.min(
                        (item.count /
                          Math.max(
                            ...currentClassDistribution.map(
                              (classItem) =>
                                classItem.count
                            )
                          )) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ===================================================
            CONFIDENCE DISTRIBUTION
            =================================================== */}

        <div className="ui-card">

          <h2>
            Confidence Distribution
          </h2>

          <p className="ui-card-subtitle">
            {selectedCamera
              ? `AI detection confidence ranges — Camera ${selectedCamera}`
              : "AI detection confidence ranges"}
          </p>


          <div className="distribution-list">

            {currentConfidenceDistribution.map((item) => (

              <div
                className="distribution-item"
                key={item.range}
              >

                <div className="distribution-header">

                  <span>
                    {item.range}
                  </span>

                  <strong>
                    {item.count}
                  </strong>

                </div>


                <div className="progress-track">

                  <div
                    className="progress-fill green"
                    style={{
                      width: `${Math.min(
                        (item.count /
                          Math.max(
                            ...currentConfidenceDistribution.map(
                              (confidenceItem) =>
                                confidenceItem.count
                            )
                          )) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          PRIORITY DISTRIBUTION
          ===================================================== */}

      <div className="ui-card analytics-section">

        <h2>
          Priority Distribution
        </h2>

        <p className="ui-card-subtitle">
          {selectedCamera
            ? `Detection priority levels — Camera ${selectedCamera}`
            : "Detection priority levels"}
        </p>


        <div className="priority-grid">

          {currentPriorityDistribution.map((item) => (

            <div
              className={`priority-card priority-${item.name.toLowerCase()}`}
              key={item.name}
            >

              <span>
                {item.name}
              </span>

              <strong>
                {item.count}
              </strong>

              <small>
                detections
              </small>

            </div>

          ))}

        </div>

      </div>


    </div>
  );
}

export default Analytics;