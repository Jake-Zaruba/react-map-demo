import { useEffect, useState } from "react";
import "./dashboardCard.css";

export default function DashboardCard({ headerData, selectedCounty, title }) {
  return (
    <div className="card-container">
      <h2
        style={{
          margin: 0,
          color: "#333",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        {title}
      </h2>
      <h3 style={{ color: "#333" }}>{headerData}</h3>
    </div>
  );
}
