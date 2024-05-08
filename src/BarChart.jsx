import React from "react";
import { useOutletContext } from "react-router-dom";

export default function BarChart() {
  const [county, data] = useOutletContext();
  const [filteredData] = data.filter((item) => {
    return item.countyName === county;
  });
  console.log(filteredData);
  return (
    <div>
      <h2>Name: {filteredData.countyName}</h2>
      <h2>Threats Detected: {filteredData.threatsDetected}</h2>
    </div>
  );
}
