import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Annotation,
} from "react-simple-maps";
import "./stateMap.css";
import { wisconsinMap } from "./toposjon";
import wisconsinCounties from "./us-county-boundaries.json";
import DashboardCard from "./DashboardCard";
import { useState } from "react";
import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import ClaudeWidget from "./ClaudeWidget";

export async function loader() {
  const response = await fetch("dummyData.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return response;
}

export default function StateMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cybersecurityData = useLoaderData();
  const [countyCybersecurityData, setCountyCybersecurityData] = useState({
    cybersecurityInvestment: null,
    threatsDetected: null,
    thresholdTriggers: null,
    countyName: "",
  });
  const [selectedCounty, setSelectedCounty] = useState("");

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
      setSearchParams(
        (prev) => {
          prev.set("county", item[1]);
          return prev;
        },
        { replace: true }
      );
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
      <>
        <Annotation
          subject={[-87.805486607, 43.0224568883]}
          dx={-17}
          dy={0}
          connectorProps={{
            stroke: "#88bbcc",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        ></Annotation>
        <Annotation
          subject={[-87.767659612, 43.3656487303]}
          dx={-17}
          dy={0}
          connectorProps={{
            stroke: "#88bbcc",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        ></Annotation>
        <Marker
          onClick={handleCountyClick}
          coordinates={[item[0].lon, item[0].lat]}
          cursor="pointer"
        >
          <circle r={12} fill="transparent" />
          <text
            x="8"
            textAnchor="end"
            alignmentBaseline="middle"
            fill={
              item[1] === "Milwaukee" || item[1] === "Ozaukee"
                ? "white"
                : "black"
            }
            fontSize={4.6}
            onClick={handleCountyClick}
            cursor="pointer"
            style={{ transform: "skew(-23deg, -3deg) rotate(3deg)" }}
          >
            {item[1]}
          </text>
        </Marker>
      </>
    );
  });

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ClaudeWidget />

      <ComposableMap
        projectionConfig={{
          scale: 6500,
          rotation: [-11, 0, 0],
          center: [-89.9, 44.6],
        }}
        style={{
          width: "70vw",
          height: "calc(100vh - 4rem)",
          transform: "skew(23deg, 3deg) rotate(-3.1deg)",
          overflow: "visible",
          zIndex: 1,
        }}
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
          backgroundColor: "#eee",
          height: "calc(100vh - 4rem)",
          width: "30vw",
          zIndex: 2,
          borderLeft: "2px solid #444",
        }}
      >
        <div
          style={{
            width: "100%",
            // borderTop: "2px solid #333",
            margin: "0rem 0rem 3rem 0rem",
            textAlign: "center",
            padding: "1rem",
            boxShadow: "0px 2px 12px -6px #333",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#333",
              fontWeight: "500",
            }}
          >
            {selectedCounty === "" ? "Summary" : selectedCounty + " County"}
          </h1>
        </div>

        <DashboardCard
          headerData={countyCybersecurityData.cybersecurityInvestment}
          title="Cybersecurity Investment"
        ></DashboardCard>
        <DashboardCard
          headerData={countyCybersecurityData.threatsDetected}
          title="Threats Detected"
        ></DashboardCard>
        <DashboardCard
          headerData={countyCybersecurityData.thresholdTriggers}
          title="Threshold Triggers"
        ></DashboardCard>
        <Link to={`/county/${selectedCounty}`} className="metrics-btn">
          Full overview {<KeyboardDoubleArrowRightOutlinedIcon />}
        </Link>
      </div>
    </div>
  );
}
