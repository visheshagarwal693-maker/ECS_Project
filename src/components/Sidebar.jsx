import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="logo">

        <div className="logo-icon">
          ♻
        </div>

        {!collapsed && (
          <div className="logo-text">
            <h2>SMART WASTE AI</h2>
            <span>Municipal Intelligence</span>
          </div>
        )}

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav>

        <NavLink to="/" end>
          <span className="nav-icon">
            🏠
          </span>

          {!collapsed && (
            <span className="nav-text">
              Overview
            </span>
          )}
        </NavLink>


        <NavLink to="/ai-detection">
          <span className="nav-icon">
            🤖
          </span>

          {!collapsed && (
            <span className="nav-text">
              AI Detection
            </span>
          )}
        </NavLink>


        <NavLink to="/analytics">
          <span className="nav-icon">
            📊
          </span>

          {!collapsed && (
            <span className="nav-text">
              Analytics
            </span>
          )}
        </NavLink>


        <NavLink to="/hotspots">
          <span className="nav-icon">
            🗺️
          </span>

          {!collapsed && (
            <span className="nav-text">
              Hotspots & Map
            </span>
          )}
        </NavLink>


        <NavLink to="/route">
          <span className="nav-icon">
            🚛
          </span>

          {!collapsed && (
            <span className="nav-text">
              Route Optimization
            </span>
          )}
        </NavLink>


        <NavLink to="/queue">
          <span className="nav-icon">
            🎯
          </span>

          {!collapsed && (
            <span className="nav-text">
              Collection Queue
            </span>
          )}
        </NavLink>


        <NavLink to="/system">
          <span className="nav-icon">
            ⚙️
          </span>

          {!collapsed && (
            <span className="nav-text">
              System / AI Model
            </span>
          )}
        </NavLink>

      </nav>


      {/* =====================================================
          COLLAPSE / EXPAND BUTTON
      ===================================================== */}

      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
        title={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
      >
        {collapsed ? "▶" : "◀"}
      </button>

    </aside>
  );
}

export default Sidebar;