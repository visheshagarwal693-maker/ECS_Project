import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";

import {
  cameras,
  cameraAnalytics,
} from "../data/cameraData";

import { useCamera } from "../context/CameraContext";


function Overview() {

  const navigate = useNavigate();

  const {
    selectedCamera,
    setSelectedCamera,
  } = useCamera();


  // =========================================================
  // SELECTED CAMERA
  // =========================================================

  const selectedCameraData = cameras.find(
    (camera) => camera.id === selectedCamera
  );

  const selectedAnalytics =
    selectedCamera
      ? cameraAnalytics[selectedCamera]
      : null;


  // =========================================================
  // OVERVIEW TOTALS
  // =========================================================

  const totalLitter = cameras.reduce(
    (total, camera) =>
      total + camera.detections,
    0
  );


  const totalHighPriority =
    Object.values(cameraAnalytics).reduce(
      (total, camera) =>
        total + camera.highPriority,
      0
    );


  const camerasOnline =
    cameras.filter(
      (camera) =>
        camera.status === "Online"
    ).length;


  // =========================================================
  // REGION DISTRIBUTION
  // =========================================================

  const regionDistribution =
    cameras.map((camera) => ({
      name: `${camera.name} (${camera.location})`,
      value: camera.detections,
    }));


  // =========================================================
  // DONUT COLOURS
  //
  // A = High Priority = Red
  // B = Medium Priority = Orange
  // C = Medium Priority = Orange
  // D = Low Priority = Green
  // =========================================================

  const pieColors = [
    "#dc2626",
    "#f59e0b",
    "#f59e0b",
    "#16a34a",
  ];


  // =========================================================
  // CAMERA CLICK
  // =========================================================

  const handleCameraClick = (cameraId) => {

    setSelectedCamera(
      selectedCamera === cameraId
        ? null
        : cameraId
    );

  };


  return (

    <div className="command-center">


      {/* =====================================================
          COMMAND CENTER HEADER
          ===================================================== */}

      <div className="command-header">

        <div>

          <h1>
            URBAN LITTER AI
          </h1>

          <p>
            MONITORING COMMAND CENTER
          </p>

        </div>


        <div className="command-live">

          <span className="live-dot"></span>

          <span>
            Live
          </span>

        </div>

      </div>


      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="command-kpi-grid">


        {/* TOTAL LITTER */}

        <div className="command-kpi kpi-litter">

          <div className="command-kpi-icon">
            🗑️
          </div>

          <div>

            <span>
              Total Litter Detected
            </span>

            <strong>
              {totalLitter}
            </strong>

            <small className="kpi-positive">
              ↑ 12.4%
            </small>

            <em>
              vs. previous period
            </em>

          </div>

        </div>


        {/* HIGH PRIORITY */}

        <div className="command-kpi kpi-high">

          <div className="command-kpi-icon">
            ⚠
          </div>

          <div>

            <span>
              High Priority
            </span>

            <strong>
              {totalHighPriority}
            </strong>

            <small className="kpi-negative">
              ↑ 8.7%
            </small>

            <em>
              vs. previous period
            </em>

          </div>

        </div>


        {/* CAMERAS */}

        <div className="command-kpi kpi-cameras">

          <div className="command-kpi-icon">
            📷
          </div>

          <div>

            <span>
              Cameras Online
            </span>

            <strong>
              {camerasOnline} / {cameras.length}
            </strong>

            <small>
              100% operational
            </small>

          </div>

        </div>


        {/* AI CONFIDENCE */}

        <div className="command-kpi kpi-ai">

          <div className="command-kpi-icon">
            🧠
          </div>

          <div>

            <span>
              AI Confidence
            </span>

            <strong>
              87.4%
            </strong>

            <small className="kpi-positive">
              ↑ 3.2%
            </small>

            <em>
              vs. previous period
            </em>

          </div>

        </div>

      </div>


      {/* =====================================================
          CAMERA / REGION + REGION DISTRIBUTION
          ===================================================== */}

      <div className="command-two-column">


        {/* ===================================================
            CAMERA / REGION
            =================================================== */}

        <div className="command-panel">

          <div className="command-panel-heading">

            <div>

              <h2>
                📷 CAMERA / REGION
              </h2>

              <p>
                One camera per region
              </p>

            </div>

          </div>


          <div className="command-camera-list">

            {cameras.map((camera) => (

              <button
                key={camera.id}
                type="button"
                onClick={() =>
                  handleCameraClick(
                    camera.id
                  )
                }
                className={`
                  command-camera
                  camera-priority-${camera.priority.toLowerCase()}
                  ${
                    selectedCamera === camera.id
                      ? "camera-item-selected"
                      : ""
                  }
                `}
              >

                {/* CAMERA LETTER */}

                <div className="command-camera-circle">

                  {camera.id}

                </div>


                {/* CAMERA INFORMATION */}

                <div className="command-camera-info">

                  <strong>
                    {camera.name}
                  </strong>

                  <span>
                    {camera.location}
                  </span>

                </div>


                {/* PRIORITY */}

                <span className="command-priority">

                  {camera.priority}

                </span>


                {/* STATUS */}

                <div className="command-camera-online">

                  <span></span>

                  {camera.status}

                </div>

              </button>

            ))}

          </div>

        </div>


        {/* ===================================================
            REGION DISTRIBUTION
            =================================================== */}

        <div className="command-panel">

          <div className="command-panel-heading">

            <div>

              <h2>
                REGION DISTRIBUTION
              </h2>

              <p>
                Litter detected by camera region
              </p>

            </div>

          </div>


          <div className="region-chart-layout">


            {/* DONUT CHART */}

            <div className="region-donut">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={regionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={110}
                    dataKey="value"
                    paddingAngle={2}
                  >

                    {regionDistribution.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            pieColors[index]
                          }
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>


              {/* DONUT CENTER */}

              <div className="region-donut-center">

                <strong>
                  {totalLitter}
                </strong>

                <span>
                  Total Detections
                </span>

              </div>

            </div>


            {/* REGION LEGEND */}

            <div className="region-legend">

              {cameras.map(
                (camera, index) => (

                  <div
                    key={camera.id}
                    className="region-legend-row"
                  >

                    <div>

                      <span
                        className="region-legend-dot"
                        style={{
                          background:
                            pieColors[index],
                        }}
                      ></span>

                      <span>
                        {camera.name} ({camera.location})
                      </span>

                    </div>

                    <strong>
                      {camera.detections}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          SELECTED CAMERA DATA

          This section appears ABOVE
          Priority Alert and System Health.
          ===================================================== */}

      {selectedCamera &&
        selectedCameraData &&
        selectedAnalytics && (

          <div
            className={`
              selected-camera-command
              selected-camera-${selectedCamera.toLowerCase()}
            `}
          >


            {/* =================================================
                SELECTED CAMERA HEADER
                ================================================= */}

            <div className="selected-camera-header">

              <div>

                <span>
                  SELECTED CAMERA / REGION
                </span>

                <h2>
                  {selectedCameraData.name}
                </h2>

                <p>
                  {selectedCameraData.location}
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setSelectedCamera(null)
                }
                className="close-selected-camera"
                aria-label="Close selected camera"
              >

                ×

              </button>

            </div>


            {/* =================================================
                SELECTED CAMERA DATA BOXES
                ================================================= */}

            <div className="selected-camera-grid">


              {/* REGION */}

              <div className="selected-camera-card">

                <span>
                  SELECTED REGION
                </span>

                <strong>
                  {selectedCameraData.name}
                </strong>

                <small>
                  {selectedCameraData.location}
                </small>

              </div>


              {/* TOTAL LITTER */}

              <div className="selected-camera-card">

                <span>
                  TOTAL LITTER DETECTED
                </span>

                <strong>
                  {selectedAnalytics.totalDetections}
                </strong>

                <small>
                  litter objects
                </small>

              </div>


              {/* AVERAGE CONFIDENCE */}

              <div className="selected-camera-card">

                <span>
                  AVERAGE CONFIDENCE
                </span>

                <strong>
                  {selectedAnalytics.averageConfidence}%
                </strong>

                <small>
                  AI detection confidence
                </small>

              </div>


              {/* HIGH PRIORITY */}

              <div className="selected-camera-card">

                <span>
                  HIGH PRIORITY
                </span>

                <strong>
                  {selectedAnalytics.highPriority}
                </strong>

                <small>
                  requiring attention
                </small>

              </div>


              {/* CAMERA STATUS */}

              <div className="selected-camera-card">

                <span>
                  CAMERA STATUS
                </span>

                <strong className="selected-online">
                  ● {selectedCameraData.status}
                </strong>

                <small>
                  Camera network
                </small>

              </div>


            </div>

          </div>

        )}


      {/* =====================================================
          PRIORITY ALERT + SYSTEM HEALTH
          ===================================================== */}

      <div className="command-two-column">


        {/* ===================================================
            PRIORITY ALERT
            =================================================== */}

        <div className="command-panel priority-alert">

          <div className="command-panel-heading">

            <h2>
              ⚠ PRIORITY ALERT
            </h2>

          </div>


          <div className="alert-box">

            <div className="alert-summary">

              <span className="zone-badge">

                {selectedCamera
                  ? selectedCameraData.location
                  : "Overall"}

              </span>


              <strong>

                {selectedCamera
                  ? selectedAnalytics.highPriority
                  : totalHighPriority}

              </strong>


              <span>
                high priority detections
              </span>

            </div>


            <p>

              {selectedCamera
                ? `${selectedCameraData.name} has detected ${selectedAnalytics.highPriority} high-priority litter objects requiring immediate attention.`
                : `The monitoring system has detected ${totalHighPriority} high-priority litter objects requiring attention.`}

            </p>


            {/* COLLECTION QUEUE LINK */}

            <button
              type="button"
              className="alert-button"
              onClick={() =>
                navigate("/queue")
              }
            >

              ☷

              <span>
                View Collection Queue
              </span>

              →

            </button>

          </div>

        </div>


        {/* ===================================================
            SYSTEM HEALTH
            =================================================== */}

        <div className="command-panel system-health">

          <div className="command-panel-heading">

            <h2>
              🛡 SYSTEM HEALTH
            </h2>

          </div>


          <div className="health-list">


            {/* CAMERAS */}

            <div className="health-row">

              <div>

                <span className="health-status-dot"></span>

                Cameras

              </div>

              <strong>
                {camerasOnline} / {cameras.length} Online
              </strong>

            </div>


            {/* AI DETECTION */}

            <div className="health-row">

              <div>

                <span className="health-status-dot"></span>

                AI Detection

              </div>

              <strong>
                Online
              </strong>

            </div>


            {/* BACKEND API */}

            <div className="health-row">

              <div>

                <span className="health-status-dot"></span>

                Backend API

              </div>

              <strong>
                Online
              </strong>

            </div>


            {/* DATABASE */}

            <div className="health-row">

              <div>

                <span className="health-status-dot"></span>

                Database

              </div>

              <strong>
                Connected
              </strong>

            </div>


          </div>

        </div>

      </div>


    </div>

  );
}


export default Overview;