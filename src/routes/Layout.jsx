import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav style={{ zIndex: 300, position: "sticky" }}>
        <NavLink
          style={({ isActive }) => {
            return isActive
              ? { color: "#88bbcc", textDecoration: "none" }
              : { color: "#eee", textDecoration: "none" };
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive
              ? { color: "#88bbcc", textDecoration: "none" }
              : { color: "#eee", textDecoration: "none" };
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="/map"
        >
          State Architecture
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
