import React from "react";

import {
  useCamera,
} from "../context/CameraContext";

import {
  cameraAnalytics,
} from "../data/cameraData";


const detectionDataByCamera = {

  A: {
    class: "Plastic Container",
    confidence: 91.7,
    timestamp: "10:42:30",
    objectCount: 1,
  },

  B: {
    class: "Aluminium Can",
    confidence: 94.2,
    timestamp: "10:41:18",
    objectCount: 1,
  },

  C: {
    class: "Plastic Bag",
    confidence: 89.6,
    timestamp: "10:40:05",
    objectCount: 2,
  },

  D: {
    class: "Paper",
    confidence: 96.1,
    timestamp: "10:38:47",
    objectCount: 1,
  },

};


const detectionHistoryByCamera = {

  A: [
    {
      time: "10:42:30",
      type: "Plastic Container",
      confidence: 91.7,
      count: 1,
    },
    {
      time: "10:41:18",
      type: "Wrapper",
      confidence: 87.4,
      count: 1,
    },
    {
      time: "10:40:05",
      type: "Aluminium Can",
      confidence: 94.2,
      count: 1,
    },
    {
      time: "10:38:47",
      type: "Plastic Bag",
      confidence: 89.6,
      count: 2,
    },
    {
      time: "10:37:21",
      type: "Paper",
      confidence: 96.1,
      count: 1,
    },
  ],

  B: [
    {
      time: "10:41:18",
      type: "Aluminium Can",
      confidence: 94.2,
      count: 1,
    },
    {
      time: "10:40:05",
      type: "Plastic Container",
      confidence: 88.5,
      count: 1,
    },
    {
      time: "10:38:47",
      type: "Wrapper",
      confidence: 86.9,
      count: 1,
    },
    {
      time: "10:37:21",
      type: "Paper",
      confidence: 92.4,
      count: 1,
    },
    {
      time: "10:35:54",
      type: "Plastic Bag",
      confidence: 84.7,
      count: 2,
    },
  ],

  C: [
    {
      time: "10:40:05",
      type: "Plastic Bag",
      confidence: 89.6,
      count: 2,
    },
    {
      time: "10:38:47",
      type: "Paper",
      confidence: 93.1,
      count: 1,
    },
    {
      time: "10:37:21",
      type: "Wrapper",
      confidence: 85.8,
      count: 1,
    },
    {
      time: "10:35:54",
      type: "Plastic Container",
      confidence: 90.4,
      count: 1,
    },
    {
      time: "10:34:16",
      type: "Aluminium Can",
      confidence: 88.2,
      count: 1,
    },
  ],

  D: [
    {
      time: "10:38:47",
      type: "Paper",
      confidence: 96.1,
      count: 1,
    },
    {
      time: "10:37:21",
      type: "Plastic Bag",
      confidence: 87.3,
      count: 1,
    },
    {
      time: "10:35:54",
      type: "Wrapper",
      confidence: 83.9,
      count: 1,
    },
    {
      time: "10:34:16",
      type: "Plastic Container",
      confidence: 91.2,
      count: 1,
    },
    {
      time: "10:32:48",
      type: "Paper",
      confidence: 94.6,
      count: 1,
    },
  ],

};


function AIDetection() {

  const {
    selectedCamera,
  } = useCamera();


  /* =========================================================
     NO CAMERA SELECTED
     ========================================================= */

  if (!selectedCamera) {

    return (

      <div className="ai-detection-page">

        <div className="page-header">

          <h1>
            AI Detection
          </h1>

          <p>
            YOLO-based litter detection and object recognition
          </p>

        </div>


        <div className="panel">

          <div className="panel-header">

            <div>

              <h2>
                No Camera Selected
              </h2>

              <p>
                Please select Camera A, B, C, or D from the Dashboard Overview.
              </p>

            </div>

          </div>

        </div>

      </div>

    );

  }


  /* =========================================================
     CAMERA DATA
     ========================================================= */

  const detectionData =
    detectionDataByCamera[selectedCamera];

  const detectionHistory =
    detectionHistoryByCamera[selectedCamera];

  const analytics =
    cameraAnalytics[selectedCamera];


  return (

    <div className="ai-detection-page">


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="page-header">

        <h1>
          AI Detection
        </h1>

        <p>
          YOLO-based litter detection and object recognition
        </p>

      </div>


      {/* =====================================================
          SELECTED CAMERA
          ===================================================== */}

      <div
        className="panel"
        style={{
          marginBottom: "18px",
        }}
      >

        <div className="panel-header">

          <div>

            <h2>
              Camera {selectedCamera}
            </h2>

            <p>
              AI detection data for the selected monitoring region
            </p>

          </div>


          <span className="status-badge">
            Camera {selectedCamera} Active
          </span>

        </div>

      </div>


      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="detection-kpis">


        <div className="detection-card">

          <span className="card-label">
            Litter Type
          </span>

          <strong>
            {detectionData.class}
          </strong>

        </div>


        <div className="detection-card">

          <span className="card-label">
            Confidence
          </span>

          <strong>
            {detectionData.confidence}%
          </strong>

        </div>


        <div className="detection-card">

          <span className="card-label">
            Object Count (Latest)
          </span>

          <strong>
            {detectionData.objectCount}
          </strong>

        </div>


        <div className="detection-card">

          <span className="card-label">
            Timestamp
          </span>

          <strong>
            {detectionData.timestamp}
          </strong>

        </div>


      </div>


      {/* =====================================================
          CAMERA SUMMARY
          ===================================================== */}

      <div
        className="detection-kpis"
        style={{
          marginTop: "18px",
        }}
      >


        <div className="detection-card">

          <span className="card-label">
            Total Camera Detections
          </span>

          <strong>
            {analytics.totalDetections}
          </strong>

        </div>


        <div className="detection-card">

          <span className="card-label">
            Average Confidence
          </span>

          <strong>
            {analytics.averageConfidence}%
          </strong>

        </div>


        <div className="detection-card">

          <span className="card-label">
            High Priority
          </span>

          <strong>
            {analytics.highPriority}
          </strong>

        </div>


        <div className="detection-card">

          <span className="card-label">
            Region
          </span>

          <strong>
            Zone {selectedCamera}
          </strong>

        </div>


      </div>


      {/* =====================================================
          DETECTION HISTORY
          ===================================================== */}

      <div className="panel history-panel">

        <div className="panel-header">

          <div>

            <h2>
              Detection History
            </h2>

            <p>
              Recent litter detections — Camera {selectedCamera}
            </p>

          </div>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  Time
                </th>

                <th>
                  Litter Type
                </th>

                <th>
                  Confidence
                </th>

                <th>
                  Object Count
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {detectionHistory.map(
                (item, index) => (

                  <tr key={index}>

                    <td>
                      {item.time}
                    </td>


                    <td>
                      <strong>
                        {item.type}
                      </strong>
                    </td>


                    <td>

                      <span className="confidence">
                        {item.confidence}%
                      </span>

                    </td>


                    <td>
                      {item.count}
                    </td>


                    <td>

                      <span className="status-badge small">
                        Detected
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


    </div>

  );

}

export default AIDetection;