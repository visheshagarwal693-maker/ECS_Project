import React, { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { hotspots } from "../data/mockdata.js";


// ==================================================
// COLLECTION DEPOT
// ==================================================

const depot = {
  id: "depot",
  name: "Collection Depot",
  latitude: 17.385,
  longitude: 78.4867,
};


// ==================================================
// PRIORITY ORDER
// ==================================================

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};


// ==================================================
// PRIORITY COLOR
// ==================================================

function getPriorityColor(priority) {

  if (priority === "High") {
    return "#dc2626";
  }

  if (priority === "Medium") {
    return "#f59e0b";
  }

  if (priority === "Low") {
    return "#16a34a";
  }

  return "#2563eb";
}


// ==================================================
// PRIORITY VALUE
// ==================================================

function getPriorityValue(priority) {
  return priorityOrder[priority] ?? 4;
}


// ==================================================
// DISTANCE CALCULATION
// ==================================================

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}


// ==================================================
// CREATE DEPOT ICON
// ==================================================

function createDepotIcon() {

  return L.divIcon({

    className: "route-depot-marker",

    html: `
      <div
        style="
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #172033;
          border: 4px solid white;
          box-shadow:
            0 0 0 4px rgba(23,32,51,0.25),
            0 5px 14px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 25px;
        "
      >
        🏁
      </div>
    `,

    iconSize: [58, 58],

    iconAnchor: [29, 29],

    popupAnchor: [0, -30],

  });
}


// ==================================================
// CREATE ROUTE STOP ICON
// ==================================================

function createRouteIcon(
  priority,
  stopNumber,
  count
) {

  const color =
    getPriorityColor(priority);

  return L.divIcon({

    className: "route-stop-marker",

    html: `
      <div
        style="
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >

        <!-- Glow -->
        <div
          style="
            position: absolute;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: ${color};
            opacity: 0.15;
          "
        ></div>


        <!-- Main marker -->
        <div
          style="
            position: absolute;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: white;
            border: 3px solid ${color};
            box-shadow:
              0 0 10px ${color},
              0 4px 12px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >

          <!-- Stop number -->
          <div
            style="
              width: 34px;
              height: 34px;
              border-radius: 50%;
              background: ${color};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: 800;
            "
          >
            ${stopNumber}
          </div>

        </div>


        <!-- Detection count -->
        <div
          style="
            position: absolute;
            top: -5px;
            right: -8px;
            min-width: 24px;
            height: 24px;
            padding: 0 5px;
            border-radius: 12px;
            background: #172033;
            color: white;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 700;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          "
        >
          ${count}
        </div>

      </div>
    `,

    iconSize: [64, 64],

    iconAnchor: [32, 32],

    popupAnchor: [0, -34],

  });
}


// ==================================================
// FIT MAP TO ROUTE
// ==================================================

function FitRoute({ routePoints }) {

  const map = useMap();

  useEffect(() => {

    if (!routePoints || routePoints.length === 0) {
      return;
    }

    const coordinates =
      routePoints.map((point) => [
        Number(point.latitude),
        Number(point.longitude),
      ]);

    if (coordinates.length === 1) {

      map.setView(
        coordinates[0],
        13
      );

      return;
    }

    const bounds =
      L.latLngBounds(coordinates);

    map.fitBounds(
      bounds,
      {
        padding: [80, 80],
        maxZoom: 12,
      }
    );

  }, [routePoints, map]);

  return null;
}


// ==================================================
// ROUTE OPTIMIZATION
// ==================================================

function RouteOptimization() {

  // ------------------------------------------------
  // Sort hotspots by priority and detections
  // ------------------------------------------------

  const orderedHotspots =
    [...hotspots].sort((a, b) => {

      const priorityDifference =
        getPriorityValue(a.priority) -
        getPriorityValue(b.priority);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (
        Number(b.count ?? 0) -
        Number(a.count ?? 0)
      );

    });


  // ------------------------------------------------
  // Route points
  // ------------------------------------------------

  const routePoints = [
    depot,
    ...orderedHotspots,
  ];


  // ------------------------------------------------
  // Map coordinates
  // ------------------------------------------------

  const routeCoordinates =
    routePoints.map((point) => [
      Number(point.latitude),
      Number(point.longitude),
    ]);


  // ------------------------------------------------
  // High priority stops
  // ------------------------------------------------

  const highPriorityStops =
    orderedHotspots.filter(
      (point) =>
        point.priority === "High"
    ).length;


  // ------------------------------------------------
  // Total detections
  // ------------------------------------------------

  const totalDetections =
    orderedHotspots.reduce(
      (total, point) =>
        total +
        Number(point.count ?? 0),
      0
    );


  // ------------------------------------------------
  // Distance
  // ------------------------------------------------

  let totalDistance = 0;

  for (
    let i = 0;
    i < routePoints.length - 1;
    i++
  ) {

    totalDistance +=
      calculateDistance(
        routePoints[i].latitude,
        routePoints[i].longitude,
        routePoints[i + 1].latitude,
        routePoints[i + 1].longitude
      );

  }


  // ------------------------------------------------
  // Estimated collection time
  // ------------------------------------------------

  const estimatedTravelMinutes =
    (totalDistance / 30) * 60;

  const estimatedCollectionMinutes =
    orderedHotspots.length * 12;

  const totalEstimatedMinutes =
    Math.round(
      estimatedTravelMinutes +
      estimatedCollectionMinutes
    );


  const formattedDistance =
    totalDistance.toFixed(1);


  // ------------------------------------------------
  // Format time
  // ------------------------------------------------

  const hours =
    Math.floor(
      totalEstimatedMinutes / 60
    );

  const minutes =
    totalEstimatedMinutes % 60;


  const formattedTime =
    hours > 0
      ? `${hours}h ${minutes}m`
      : `${minutes} min`;


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="page-container">

      {/* ============================================
          PAGE HEADER
      ============================================ */}

      <div className="page-title">

        <h1>
          Route Optimization
        </h1>

        <p>
          AI-prioritized collection route based on
          hotspot severity and detection activity.
        </p>

      </div>


      {/* ============================================
          ROUTE STATUS
      ============================================ */}

      <div
        className="ui-card"
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        <div>

          <span
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
              background: "#dcfce7",
              color: "#166534",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            ● ROUTE READY
          </span>

          <h2
            style={{
              margin: 0,
              fontSize: "20px",
            }}
          >
            Optimized Collection Plan
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            {orderedHotspots.length} monitoring locations
            prioritized for collection.
          </p>

        </div>


        <button
          style={{
            border: "none",
            background: "#2563eb",
            color: "white",
            padding: "11px 18px",
            borderRadius: "9px",
            fontWeight: "700",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        >
          ↻ Generate Route
        </button>

      </div>


      {/* ============================================
          SUMMARY CARDS
      ============================================ */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "18px",
          marginBottom: "24px",
        }}
      >

        {/* Stops */}
        <div className="ui-card">

          <span className="analytics-label">
            Collection Stops
          </span>

          <strong className="analytics-number">
            {orderedHotspots.length}
          </strong>

          <span className="analytics-note">
            Priority-based stops
          </span>

        </div>


        {/* Distance */}
        <div className="ui-card">

          <span className="analytics-label">
            Estimated Distance
          </span>

          <strong className="analytics-number">
            {formattedDistance}
            {" "}
            <span
              style={{
                fontSize: "16px",
              }}
            >
              km
            </span>
          </strong>

          <span className="analytics-note">
            Between monitoring points
          </span>

        </div>


        {/* Detections */}
        <div className="ui-card">

          <span className="analytics-label">
            Litter to Collect
          </span>

          <strong className="analytics-number">
            {totalDetections}
          </strong>

          <span className="analytics-note">
            Total detected objects
          </span>

        </div>


        {/* High Priority */}
        <div className="ui-card">

          <span className="analytics-label">
            High Priority
          </span>

          <strong
            className="analytics-number"
            style={{
              color: "#dc2626",
            }}
          >
            {highPriorityStops}
          </strong>

          <span className="analytics-note">
            Immediate attention
          </span>

        </div>


        {/* Time */}
        <div className="ui-card">

          <span className="analytics-label">
            Estimated Time
          </span>

          <strong className="analytics-number">
            {formattedTime}
          </strong>

          <span className="analytics-note">
            Travel + collection
          </span>

        </div>

      </div>


      {/* ============================================
          MAP
      ============================================ */}

      <div
        className="ui-card"
        style={{
          marginBottom: "24px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <div>

            <h2>
              Optimized Collection Route
            </h2>

            <p className="ui-card-subtitle">
              Route begins at the collection depot and
              visits prioritized hotspots.
            </p>

          </div>


          <span
            style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              padding: "7px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            LIVE ROUTE
          </span>

        </div>


        <div
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "12px",
            overflow: "hidden",
            marginTop: "20px",
            position: "relative",
          }}
        >

          <MapContainer
            center={[
              depot.latitude,
              depot.longitude,
            ]}
            zoom={6}
            style={{
              width: "100%",
              height: "100%",
            }}
          >

            {/* Map */}
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* Automatically show entire route */}
            <FitRoute
              routePoints={routePoints}
            />


            {/* Route line */}
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: "#2563eb",
                weight: 5,
                opacity: 0.8,
                dashArray: "10 8",
              }}
            />


            {/* Depot */}
            <Marker
              position={[
                depot.latitude,
                depot.longitude,
              ]}
              icon={createDepotIcon()}
            >

              <Popup>

                <strong>
                  🏁 Collection Depot
                </strong>

                <br />

                Route Starting Point

                <br />

                Coordinates:{" "}
                {depot.latitude.toFixed(4)},
                {" "}
                {depot.longitude.toFixed(4)}

              </Popup>

            </Marker>


            {/* Hotspots */}
            {orderedHotspots.map(
              (point, index) => {

                const count =
                  Number(point.count ?? 0);

                return (

                  <Marker
                    key={point.id ?? index}
                    position={[
                      Number(point.latitude),
                      Number(point.longitude),
                    ]}
                    icon={createRouteIcon(
                      point.priority,
                      index + 1,
                      count
                    )}
                  >

                    <Popup>

                      <div
                        style={{
                          minWidth: "190px",
                        }}
                      >

                        <div
                          style={{
                            fontSize: "17px",
                            fontWeight: "700",
                            marginBottom: "10px",
                            color: "#172033",
                          }}
                        >
                          Stop {index + 1}:{" "}
                          {point.name}
                        </div>


                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            marginBottom: "6px",
                          }}
                        >

                          <span>
                            Priority
                          </span>

                          <strong
                            style={{
                              color:
                                getPriorityColor(
                                  point.priority
                                ),
                            }}
                          >
                            {point.priority}
                          </strong>

                        </div>


                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            marginBottom: "6px",
                          }}
                        >

                          <span>
                            Detections
                          </span>

                          <strong>
                            {count}
                          </strong>

                        </div>


                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                          }}
                        >

                          <span>
                            Coordinates
                          </span>

                          <strong>
                            {Number(
                              point.latitude
                            ).toFixed(4)}
                            ,
                            {" "}
                            {Number(
                              point.longitude
                            ).toFixed(4)}
                          </strong>

                        </div>

                      </div>

                    </Popup>

                  </Marker>

                );

              }
            )}

          </MapContainer>


          {/* Map Legend */}
          <div
            style={{
              position: "absolute",
              left: "15px",
              bottom: "15px",
              zIndex: 1000,
              background:
                "rgba(255,255,255,0.96)",
              padding: "12px 15px",
              borderRadius: "10px",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.18)",
              fontSize: "12px",
            }}
          >

            <div
              style={{
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Route Legend
            </div>


            <div
              style={{
                display: "flex",
                gap: "13px",
                flexWrap: "wrap",
              }}
            >

              <span>
                🏁 Depot
              </span>

              <span>
                <span
                  style={{
                    color: "#dc2626",
                    fontWeight: "700",
                  }}
                >
                  ●
                </span>
                {" "}
                High
              </span>

              <span>
                <span
                  style={{
                    color: "#f59e0b",
                    fontWeight: "700",
                  }}
                >
                  ●
                </span>
                {" "}
                Medium
              </span>

              <span>
                <span
                  style={{
                    color: "#16a34a",
                    fontWeight: "700",
                  }}
                >
                  ●
                </span>
                {" "}
                Low
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ============================================
          STOP ORDER + ROUTE DETAILS
      ============================================ */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.5fr) minmax(280px, 1fr)",
          gap: "24px",
          marginBottom: "24px",
        }}
      >

        {/* Stop Order */}
        <div className="ui-card">

          <h2>
            Suggested Stop Order
          </h2>

          <p className="ui-card-subtitle">
            Collection sequence based on hotspot
            priority and detection activity.
          </p>


          <div
            style={{
              marginTop: "20px",
            }}
          >

            {/* Depot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px",
                background: "#f8fafc",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >

              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#172033",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                🏁
              </div>

              <div>

                <strong>
                  Collection Depot
                </strong>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "3px",
                  }}
                >
                  Starting point
                </div>

              </div>

            </div>


            {/* Stops */}
            {orderedHotspots.map(
              (point, index) => {

                const color =
                  getPriorityColor(
                    point.priority
                  );

                return (

                  <div
                    key={point.id ?? index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px",
                      borderBottom:
                        "1px solid #e2e8f0",
                    }}
                  >

                    {/* Number */}
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: color,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "800",
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </div>


                    {/* Name */}
                    <div
                      style={{
                        flex: 1,
                      }}
                    >

                      <strong>
                        {point.name}
                      </strong>

                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginTop: "3px",
                        }}
                      >
                        {point.count} detections
                      </div>

                    </div>


                    {/* Priority */}
                    <span
                      style={{
                        padding: "5px 9px",
                        borderRadius: "20px",
                        background:
                          point.priority === "High"
                            ? "#fee2e2"
                            : point.priority ===
                              "Medium"
                            ? "#fef3c7"
                            : "#dcfce7",
                        color: color,
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {point.priority}
                    </span>

                  </div>

                );

              }
            )}

          </div>

        </div>


        {/* Route Details */}
        <div className="ui-card">

          <h2>
            Route Details
          </h2>

          <p className="ui-card-subtitle">
            Collection operation overview
          </p>


          <div
            style={{
              marginTop: "20px",
            }}
          >

            <div
              style={{
                padding: "15px",
                background: "#f8fafc",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >

              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Start
              </span>

              <strong>
                🏁 Collection Depot
              </strong>

            </div>


            <div
              style={{
                padding: "15px",
                background: "#f8fafc",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >

              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Route Strategy
              </span>

              <strong>
                Priority → Detection Count
              </strong>

            </div>


            <div
              style={{
                padding: "15px",
                background: "#f8fafc",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >

              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Collection Capacity
              </span>

              <strong>
                {totalDetections} detected objects
              </strong>

            </div>


            <div
              style={{
                padding: "15px",
                background: "#eff6ff",
                borderRadius: "10px",
              }}
            >

              <span
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Route Status
              </span>

              <strong
                style={{
                  color: "#2563eb",
                }}
              >
                Ready for Collection
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* ============================================
          ROUTE TABLE
      ============================================ */}

      <div className="ui-card">

        <h2>
          Route Summary
        </h2>

        <p className="ui-card-subtitle">
          Ordered monitoring point statistics
        </p>


        <div
          style={{
            overflowX: "auto",
            marginTop: "20px",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                  }}
                >
                  Stop
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                  }}
                >
                  Location
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                  }}
                >
                  Priority
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                  }}
                >
                  Detections
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                  }}
                >
                  Coordinates
                </th>

              </tr>

            </thead>


            <tbody>

              {orderedHotspots.map(
                (point, index) => (

                  <tr
                    key={point.id ?? index}
                  >

                    <td
                      style={{
                        padding: "12px",
                        fontWeight: "700",
                      }}
                    >
                      {index + 1}
                    </td>


                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {point.name}
                    </td>


                    <td
                      style={{
                        padding: "12px",
                      }}
                    >

                      <span
                        style={{
                          color:
                            getPriorityColor(
                              point.priority
                            ),
                          fontWeight: "700",
                        }}
                      >
                        {point.priority}
                      </span>

                    </td>


                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {point.count}
                    </td>


                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {Number(
                        point.latitude
                      ).toFixed(4)}
                      ,
                      {" "}
                      {Number(
                        point.longitude
                      ).toFixed(4)}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ============================================
          MARKER CSS
      ============================================ */}

      <style>
        {`

          .route-stop-marker {
            background: transparent !important;
            border: none !important;
          }

          .route-depot-marker {
            background: transparent !important;
            border: none !important;
          }

          .leaflet-popup-content-wrapper {
            border-radius: 12px;
          }

          .leaflet-popup-content {
            margin: 14px 16px;
          }

          @media (max-width: 800px) {

            .route-mobile-grid {
              grid-template-columns: 1fr;
            }

          }

        `}
      </style>

    </div>

  );
}


export default RouteOptimization;