import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Annotation,
} from "react-simple-maps";

import { wisconsinMap } from "./toposjon";

export default function MapChart() {
  return (
    <>
      <ComposableMap
        projectionConfig={{
          scale: 3200,
          rotation: [-11, 0, 0],
          center: [-85, 43],
        }}
        style={{ width: "100vw", height: "100vh", transform: "skew:(20)" }}
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
                      fill: "#F53",
                    },
                    pressed: {
                      fill: "#E42",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[-88.4637, 44.4016]}>
            <circle r={5} fill="#7EA1FF" />
          </Marker>
          <Annotation
            subject={[-88.4637, 44.4016]}
            dx={90}
            dy={50}
            connectorProps={{
              stroke: "#7EA1FF",
              strokeWidth: 2,
              strokeLinecap: "round",
            }}
          >
            <text
              x="85"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#7EA1FF"
            >
              {"Outagamie"}
            </text>
          </Annotation>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}
