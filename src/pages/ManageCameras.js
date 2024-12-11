import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageCameras.css";

const ManageCameras = () => {
  const [cameras, setCameras] = useState([]);
  const [cameraName, setCameraName] = useState("");
  const [cameraLink, setCameraLink] = useState("");
  const [editCamera, setEditCamera] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(false);

  // Fetch Cameras from Database
  useEffect(() => {
    axios.get("http://localhost:5000/api/cameras").then((response) => {
      setCameras(response.data);
    });
  }, []);

  // Add Camera
  const addCamera = () => {
    axios
      .post("http://localhost:5000/api/cameras/add", {
        camera_name: cameraName,
        camera_url: cameraLink,
      })
      .then((response) => {
        setCameras([
          ...cameras,
          { id: response.data.id, camera_name: cameraName, camera_url: cameraLink },
        ]);
        setCameraName("");
        setCameraLink("");
        setShowAddForm(false);
      });
  };

  // Delete Camera
  const deleteCamera = (id) => {
    axios
      .delete("http://localhost:5000/api/cameras/delete", { data: { id } })
      .then(() => {
        setCameras(cameras.filter((camera) => camera.id !== id));
      });
  };

  // Edit Camera
  const editCameraDetails = (camera) => {
    setEditCamera(camera);
    setCameraName(camera.camera_name);
    setCameraLink(camera.camera_url);
    setShowAddForm(true);
  };

  // Update Camera
  const updateCamera = () => {
    axios
      .put("http://localhost:5000/api/cameras/edit", {
        id: editCamera.id,
        camera_name: cameraName,
        camera_url: cameraLink,
      })
      .then(() => {
        setCameras(
          cameras.map((camera) =>
            camera.id === editCamera.id
              ? { ...camera, camera_name: cameraName, camera_url: cameraLink }
              : camera
          )
        );
        setEditCamera(null);
        setCameraName("");
        setCameraLink("");
        setShowAddForm(false);
      });
  };

  return (
    <div className="manage-cameras">
      <div className="buttons">
        <button onClick={() => setShowAddForm(true)}>Add Camera</button>
        <button onClick={() => setShowDeleteList(true)}>Delete Camera</button>
      </div>

      {showAddForm && (
        <div className="form-popup">
          <h3>{editCamera ? "Edit Camera" : "Add Camera"}</h3>
          <label>Camera Name:</label>
          <input
            type="text"
            value={cameraName}
            onChange={(e) => setCameraName(e.target.value)}
          />
          <label>Camera Link (IP):</label>
          <input
            type="text"
            value={cameraLink}
            onChange={(e) => setCameraLink(e.target.value)}
          />
          <button onClick={editCamera ? updateCamera : addCamera}>
            {editCamera ? "Update" : "Submit"}
          </button>
          <button onClick={() => setShowAddForm(false)}>Close</button>
        </div>
      )}

      {showDeleteList && (
        <div className="form-popup">
          <h3>Select Camera to Delete</h3>
          <ul>
            {cameras.map((camera) => (
              <li key={camera.id}>
                {camera.camera_name}
                <button onClick={() => deleteCamera(camera.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowDeleteList(false)}>Close</button>
        </div>
      )}

      <div className="camera-list">
        <h2>Added Cameras</h2>
        <ul>
          {cameras.map((camera) => (
            <li key={camera.id}>
              <span>{camera.camera_name}</span>
              <button onClick={() => editCameraDetails(camera)}>Edit Camera</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCameras;
