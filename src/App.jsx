import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Overview from "./pages/Overview";
import AIDetection from "./pages/AIDetection";
import Analytics from "./pages/Analytics";
import Hotspots from "./pages/Hotspots";
import RouteOptimization from "./pages/RouteOptimization";
import CollectionQueue from "./pages/CollectionQueue";
import System from "./pages/System";

import { CameraProvider } from "./context/CameraContext";

import "./index.css";

function App() {
  return (
    <CameraProvider>
      <BrowserRouter>
        <div className="app">

          <Sidebar />

          <main className="main-content">

            <Routes>

              {/* DASHBOARD / OVERVIEW */}
              <Route
                path="/"
                element={<Overview />}
              />

              {/* AI DETECTION */}
              <Route
                path="/ai-detection"
                element={<AIDetection />}
              />

              {/* ANALYTICS */}
              <Route
                path="/analytics"
                element={<Analytics />}
              />

              {/* OTHER EXISTING PAGES */}
              <Route
                path="/hotspots"
                element={<Hotspots />}
              />

              <Route
                path="/route"
                element={<RouteOptimization />}
              />

              <Route
                path="/queue"
                element={<CollectionQueue />}
              />

              <Route
                path="/system"
                element={<System />}
              />

            </Routes>

          </main>

        </div>
      </BrowserRouter>
    </CameraProvider>
  );
}

export default App;