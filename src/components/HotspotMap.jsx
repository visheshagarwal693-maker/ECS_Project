import React, { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";


// --------------------------------------------------
// Custom Hotspot Marker
// --------------------------------------------------

function createHotspotIcon(priority, count) {

  const priorityName =
    String(priority || "Pending").toLowerCase();

  let markerColor = "#2563eb";

  if (priorityName === "high") {
    markerColor = "#dc2626";
  }

  if (priorityName === "medium") {
    markerColor = "#f59e0b";
  }

  if (priorityName === "low") {
    markerColor = "#16a34a";
  }

  return L.divIcon({

    className: "custom-hotspot-marker",

    html: `
      <div
        style="
          position: relative;
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >

        <!-- Glow -->
        <div
          style="
            position: absolute;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background: ${markerColor};
            opacity: 0.18;
            animation: hotspotPulse 2s infinite;
          "
        ></div>

        <!-- Outer ring -->
        <div
          style="
            position: absolute;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 3px solid ${markerColor};
            background: rgba(255,255,255,0.95);
            box-shadow:
              0 0 12px ${markerColor},
              0 4px 12px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >

          <!-- Detection count -->
          <div
            style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: ${markerColor};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              font-weight: 700;
              box-shadow:
                inset 0 0 0 2px rgba(255,255,255,0.35);
            "
          >
            ${count}
          </div>

        </div>

      </div>
    `,

    iconSize: [58, 58],

    iconAnchor: [29, 29],

    popupAnchor: [0, -30],

  });
}


// --------------------------------------------------
// Automatically show ALL hotspots
// --------------------------------------------------

function FitHotspots({ hotspots }) {

  const map = useMap();

  useEffect(() => {

    if (!hotspots || hotspots.length === 0) {
      return;
    }

    const coordinates = hotspots
      .map((hotspot) => {

        const latitude =
          hotspot.latitude ??
          hotspot.lat;

        const longitude =
          hotspot.longitude ??
          hotspot.lng ??
          hotspot.lon;

        if (
          latitude === undefined ||
          longitude === undefined
        ) {
          return null;
        }

        return [
          Number(latitude),
          Number(longitude),
        ];

      })
      .filter(Boolean);


    if (coordinates.length === 0) {
      return;
    }


    // One hotspot
    if (coordinates.length === 1) {

      map.setView(
        coordinates[0],
        13
      );

      return;
    }


    // Multiple hotspots
    const bounds =
      L.latLngBounds(coordinates);


    map.fitBounds(
      bounds,
      {
        padding: [70, 70],

        // Prevent the map from becoming too zoomed out
        maxZoom: 12,

      }
    );

  }, [hotspots, map]);


  return null;
}


// --------------------------------------------------
// Hotspot Map
// --------------------------------------------------

function HotspotMap({ hotspots = [] }) {

  const defaultCenter = [
    17.3850,
    78.4867,
  ];


  return (

    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    >

      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{
          width: "100%",
          height: "100%",
        }}
      >

        {/* Map Tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* Automatically fit all hotspots */}
        <FitHotspots
          hotspots={hotspots}
        />


        {/* Hotspot Markers */}
        {hotspots.map((hotspot, index) => {

          const latitude =
            hotspot.latitude ??
            hotspot.lat;

          const longitude =
            hotspot.longitude ??
            hotspot.lng ??
            hotspot.lon;


          if (
            latitude === undefined ||
            longitude === undefined
          ) {
            return null;
          }


          const count =
            hotspot.detection_count ??
            hotspot.count ??
            0;


          const priority =
            hotspot.priority ??
            "Pending";


          const hotspotName =
            hotspot.location ??
            hotspot.name ??
            `Hotspot ${index + 1}`;


          return (

            <Marker
              key={hotspot.id ?? index}
              position={[
                Number(latitude),
                Number(longitude),
              ]}
              icon={createHotspotIcon(
                priority,
                count
              )}
            >

              <Popup>

                <div
                  style={{
                    minWidth: "180px",
                    padding: "4px",
                  }}
                >

                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginBottom: "10px",
                      color: "#172033",
                    }}
                  >
                    {hotspotName}
                  </div>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
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
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span>
                      Priority
                    </span>

                    <strong>
                      {priority}
                    </strong>
                  </div>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                    }}
                  >
                    <span>
                      Location
                    </span>

                    <strong>
                      {Number(latitude).toFixed(4)},
                      {" "}
                      {Number(longitude).toFixed(4)}
                    </strong>
                  </div>

                </div>

              </Popup>

            </Marker>

          );

        })}

      </MapContainer>


      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "15px",
          zIndex: 1000,

          background: "rgba(255,255,255,0.96)",

          borderRadius: "10px",

          padding: "10px 14px",

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
          Hotspot Priority
        </div>


        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >

          {/* High */}
          <span>

            <span
              style={{
                display: "inline-block",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#dc2626",
                marginRight: "5px",
              }}
            ></span>

            High

          </span>


          {/* Medium */}
          <span>

            <span
              style={{
                display: "inline-block",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#f59e0b",
                marginRight: "5px",
              }}
            ></span>

            Medium

          </span>


          {/* Low */}
          <span>

            <span
              style={{
                display: "inline-block",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#16a34a",
                marginRight: "5px",
              }}
            ></span>

            Low

          </span>

        </div>

      </div>


      {/* Marker Animation */}
      <style>
        {`
          @keyframes hotspotPulse {

            0% {
              transform: scale(0.8);
              opacity: 0.25;
            }

            50% {
              transform: scale(1.25);
              opacity: 0.08;
            }

            100% {
              transform: scale(0.8);
              opacity: 0.25;
            }

          }

          .custom-hotspot-marker {
            background: transparent !important;
            border: none !important;
          }
        `}
      </style>

    </div>

  );
}


export default HotspotMap;