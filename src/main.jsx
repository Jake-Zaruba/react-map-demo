import React from "react";
import ReactDOM from "react-dom/client";
import StateMap, { loader as cybersecurityDataLoader } from "./StateMap";
import Home from "./Home";
import Error from "./routes/Error";
import NotFound from "./routes/NotFound";
import Layout from "./routes/Layout";
import CountySummaryLayout, {
  loader as countyDataLoader,
} from "./CountySummaryLayout";
import CountyDashboard from "./CountyDashboard";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="map"
        element={<StateMap />}
        loader={cybersecurityDataLoader}
        errorElement={<Error />}
      />
      <Route
        path="county/:countyName"
        element={<CountySummaryLayout />}
        loader={countyDataLoader}
        errorElement={<Error />}
      >
        <Route index element={<CountyDashboard />} />
        <Route path="investment" element={<PieChart />} />
        <Route path="threats" element={<BarChart />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
