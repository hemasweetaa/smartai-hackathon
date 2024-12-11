import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Group,
  CameraAlt,
  Warning,
  Contactless,
  Map,
  Settings,
} from "@mui/icons-material";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <Home className="icon" />
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/workers">
            <Group className="icon" />
            <span className="link-text">Workers Details</span>
          </Link>
        </li>
        <li>
          <Link to="/cameras">
            <CameraAlt className="icon" />
            <span className="link-text">Manage Cameras</span>
          </Link>
        </li>
        <li>
          <Link to="/unauthorized">
            <Warning className="icon" />
            <span className="link-text">Unauthorized Area Management</span>
          </Link>
        </li>
        <li>
          <Link to="/rfid-management">
            <Contactless className="icon" />
            <span className="link-text">RFID Management</span>
          </Link>
        </li>
        <li>
          <Link to="/heatmap">
            <Map className="icon" />
            <span className="link-text">Heatmap Analysis</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <Settings className="icon" />
            <span className="link-text">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;