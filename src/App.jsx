import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { wisconsinMap } from "./toposjon";
import wisconsinCounties from "./us-county-boundaries.json";
import DashboardCard from "./DashboardCard";
import { useState, useEffect } from "react";

export default function MapChart() {
  const [cybersecurityData, setCybersecurityData] = useState(null);
  const [countyCybersecurityData, setCountyCybersecurityData] = useState({
    cybersecurityInvestment: null,
    threatsDetected: null,
    thresholdTriggers: null,
    countyName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const handleSetCybersecurityData = async () => {
      const response = await fetch("dummyData.json")
        .then((res) => res.json())
        .then((data) => setCybersecurityData(data))
        .catch((error) => console.log(error));
    };
    setIsLoading((prev) => !prev);
    handleSetCybersecurityData();
  }, []);

  const countyData = Object.entries(wisconsinCounties)[1][1].map((item) => {
    return [item.properties.geo_point_2d, item.properties.name];
  });

  const countyCoords = [];

  countyData.map((item) => {
    countyCoords.push(item[0]);
  });

  const countyNames = [];

  countyData.map((item) => {
    countyNames.push(item[1]);
  });

  const markers = countyData.map((item) => {
    const handleCountyClick = () => {
      setSelectedCounty(item[1]);
      cybersecurityData.filter((item2) => {
        if (item2.countyName === item[1]) {
          setCountyCybersecurityData((prev) => {
            return {
              cybersecurityInvestment: item2.cybersecurityInvestment,
              threatsDetected: item2.threatsDetected,
              thresholdTriggers: item2.thresholdTriggers,
              countyName: item2.countyName,
            };
          });
        }
      });
    };
    return (
      <Marker
        onClick={handleCountyClick}
        coordinates={[item[0].lon, item[0].lat]}
      >
        <circle r={12} fill="transparent" />
        <text
          x="8"
          textAnchor="end"
          alignmentBaseline="middle"
          fill="black"
          fontSize={5}
          onClick={handleCountyClick}
        >
          {item[1]}
        </text>
      </Marker>
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <ComposableMap
        projectionConfig={{
          scale: 6500,
          rotation: [-11, 0, 0],
          center: [-89.7, 44.5],
        }}
        style={{ width: "70vw", height: "100vh", transform: "skew:(20)" }}
      >
        <ZoomableGroup>
          <Geographies geography={wisconsinMap}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#eee",
                      stroke: "#333",
                      strokeWidth: 0.1,
                    },
                    hover: {
                      fill: "lightblue",
                    },
                    pressed: {
                      fill: "#E42",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {markers}
        </ZoomableGroup>
      </ComposableMap>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          height: "100vh",
          width: "30vw",
        }}
      >
        <DashboardCard
          headerData={countyCybersecurityData.cybersecurityInvestment}
          selectedCounty={selectedCounty}
        ></DashboardCard>
        <DashboardCard
          headerData={countyCybersecurityData.threatsDetected}
          selectedCounty={selectedCounty}
        ></DashboardCard>
        <DashboardCard
          headerData={countyCybersecurityData.thresholdTriggers}
          selectedCounty={selectedCounty}
        ></DashboardCard>
      </div>
    </div>
  );
}
