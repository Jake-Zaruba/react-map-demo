import { useEffect, useState } from "react";
import "./dashboardCard.css";

export default function DashboardCard({
  headerData,
  selectedCounty,
  headerName,
}) {
  return (
    <div className="card-container">
      <h1 style={{ margin: 0, color: "#333" }}>{selectedCounty}</h1>
      <h2 style={{ color: "#333" }}>{headerData}</h2>
    </div>
  );
}
