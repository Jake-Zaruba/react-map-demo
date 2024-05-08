import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink
          style={({ isActive }) => {
            return isActive
              ? { color: "#88bbcc", textDecoration: "none" }
              : { color: "#333", textDecoration: "none" };
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
              : { color: "#333", textDecoration: "none" };
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
