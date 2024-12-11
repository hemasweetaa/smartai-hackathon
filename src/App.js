import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import WorkersNow from "./pages/WorkersNow";
import ManageCameras from "./pages/ManageCameras";
import WorkersDetails from "./pages/WorkersDetails";
import RFIDManagement from "./pages/RFIDManagement";
import UnauthorizedArea from "./pages/UnauthorizedArea";
import HeatmapAnalysis from "./pages/HeatmapAnalysis";
import ActivityLogs from "./pages/ActivityLogs";
import AlertPage from "./pages/AlertPage";
import RFIDDashboard from "./pages/RFIDDashboard";
import WorkforceRequirements from "./pages/WorkforceRequirements";
import SettingsPage from "./pages/Settings";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const routes = {
  dashboard: "/dashboard",
  workersNow: "/workers-now",
  workers: "/workers",
  cameras: "/cameras",
  unauthorized: "/unauthorized",
  rfid: "/rfid-management",
  heatmap: "/heatmap",
  activityLogs: "/activity-logs",
  alertPage: "/alertpage",
  rfidDashboard: "/rfid-dashboard",
  workforceRequirements: "/workforce-requirements",
  settings: "/settings",
};

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Fixed Header */}
        <Header />

        <div className="main-container">
          {/* Sidebar */}
          <Sidebar />

          <div className="content-container">
            <Routes>
              <Route path="/" element={<Navigate to={routes.dashboard} replace />} />
              <Route path={routes.dashboard} element={<Dashboard />} />
              <Route path={routes.workersNow} element={<WorkersNow />} />
              <Route path={routes.workers} element={<WorkersDetails />} />
              <Route path={routes.cameras} element={<ManageCameras />} />
              <Route path={routes.unauthorized} element={<UnauthorizedArea />} />
              <Route path={routes.rfid} element={<RFIDManagement />} />
              <Route path={routes.heatmap} element={<HeatmapAnalysis />} />
              <Route path={routes.activityLogs} element={<ActivityLogs />} />
              <Route path={routes.alertPage} element={<AlertPage />} />
              <Route path={routes.rfidDashboard} element={<RFIDDashboard />} />
              <Route path={routes.workforceRequirements} element={<WorkforceRequirements />} />
              <Route path={routes.settings} element={<SettingsPage />} />

              {/* Catch-all route for unmatched paths */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: "center", padding: "50px" }}>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for doesn't exist.</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;