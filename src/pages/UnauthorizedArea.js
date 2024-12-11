import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UnauthorizedArea.css";

const UnauthorizedArea = () => {
  const [areas, setAreas] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [editingArea, setEditingArea] = useState(null);

  useEffect(() => {
    fetchCameras();
    fetchUnauthorizedAreas();
  }, []);

  const fetchCameras = () => {
    axios
      .get("http://localhost:5000/api/cameras")
      .then((response) => setCameras(response.data))
      .catch((error) => console.error("Error fetching cameras:", error.message));
  };

  const fetchUnauthorizedAreas = () => {
    axios
      .get("http://localhost:5000/api/unauthorized-areas")
      .then((response) => setAreas(response.data))
      .catch((error) => console.error("Error fetching unauthorized areas:", error.message));
  };

  const handleAddOrUpdateArea = () => {
    if (selectedCamera && coordinates) {
      const coordsArray = coordinates.split(",").map((coord) => parseInt(coord.trim(), 10));
      if (coordsArray.length < 3 || coordsArray.some(isNaN)) {
        alert("Please provide at least three valid integer coordinates.");
        return;
      }
      if (editingArea) {
        axios
          .put(`http://localhost:5000/api/unauthorized-areas/${editingArea.id}`, {
            camera_name: selectedCamera,
            coordinates: coordsArray,
          })
          .then(() => {
            fetchUnauthorizedAreas();
            resetForm();
          })
          .catch((error) => console.error("Error updating area:", error.message));
      } else {
        axios
          .post("http://localhost:5000/api/unauthorized-areas/add", {
            camera_name: selectedCamera,
            coordinates: coordsArray,
          })
          .then((response) => {
            setAreas([...areas, { id: response.data.id, camera: selectedCamera, coordinates: coordsArray }]);
            resetForm();
          })
          .catch((error) => console.error("Error adding area:", error.message));
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteArea = (id) => {
    if (window.confirm("Are you sure you want to delete this area?")) {
      axios
        .delete(`http://localhost:5000/api/unauthorized-areas/${id}`)
        .then(() => setAreas(areas.filter((area) => area.id !== id)))
        .catch((error) => console.error("Error deleting area:", error.message));
    }
  };

  const handleEditArea = (area) => {
    setEditingArea(area);
    setSelectedCamera(area.camera_name);
    setCoordinates(area.coordinates.join(", "));
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingArea(null);
    setSelectedCamera("");
    setCoordinates("");
    setShowForm(false);
  };

  return (
    <div className="unauthorized-area-container">
      <h1>Unauthorized Areas</h1>
      <button onClick={() => setShowForm(true)}>{editingArea ? "Edit Area" : "Add Area"}</button>
      {showForm && (
        <form>
          <select value={selectedCamera} onChange={(e) => setSelectedCamera(e.target.value)}>
            <option value="">Select Camera</option>
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.camera_name}>
                {camera.camera_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Coordinates"
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
          />
          <button type="button" onClick={handleAddOrUpdateArea}>
            {editingArea ? "Update" : "Add"}
          </button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}
      <ul>
        {areas.map((area) => (
          <li key={area.id}>
            <strong>{area.camera_name}:</strong> {area.coordinates.join(", ")}
            <button onClick={() => handleEditArea(area)}>Edit</button>
            <button onClick={() => handleDeleteArea(area.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnauthorizedArea;
