import React from "react";
import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";

export async function loader() {
  const response = await fetch("dummyData.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return response;
}

export default function CountySummary() {
  const data = useLoaderData();
  const params = useParams();
  const county = params.countyName;

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          height: "calc(100vh - 4rem)",
          width: "15rem",
          backgroundColor: "#eee",
          borderTop: "2px solid #333",
        }}
      >
        <NavLink
          to=""
          style={({ isActive }) => {
            return isActive
              ? { color: "#88bbcc", textDecoration: "none" }
              : { color: "#333", textDecoration: "none" };
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Summary
        </NavLink>
        <NavLink
          to="investment"
          style={({ isActive }) => {
            return isActive
              ? { color: "#88bbcc", textDecoration: "none" }
              : { color: "#333", textDecoration: "none" };
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Investment
        </NavLink>
        <NavLink
          to="threats"
          style={({ isActive }) => {
            return isActive
              ? { color: "#88bbcc", textDecoration: "none" }
              : { color: "#333", textDecoration: "none" };
          }}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Threats
        </NavLink>
      </nav>
      <Outlet context={[county, data]} />
    </div>
  );
}
