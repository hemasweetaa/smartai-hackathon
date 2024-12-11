import React, { useState, useEffect } from "react";
import './RFIDManagement.css';

const RFIDManagement = () => {
  const [workers, setWorkers] = useState([
    { id: 1, name: "Worker 1", rfid: "RFID-001" },
    { id: 2, name: "Worker 2", rfid: "RFID-002" },
  ]);
  const [newWorker, setNewWorker] = useState({ id: "", name: "", rfid: "" });

  const [areas, setAreas] = useState([
    { id: 1, name: "Area 1", antennas: ["Antenna-001"], cameras: ["Camera-001"] },
    { id: 2, name: "Area 2", antennas: [], cameras: [] },
  ]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [newArea, setNewArea] = useState({ id: "", name: "" });
  const [newAntenna, setNewAntenna] = useState("");
  const [newCamera, setNewCamera] = useState("");

  const handleAddWorker = () => {
    setWorkers([...workers, { ...newWorker }]);
    setNewWorker({ id: "", name: "", rfid: "" });
  };

  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  const handleAddArea = () => {
    setAreas([...areas, { ...newArea, antennas: [], cameras: [] }]);
    setNewArea({ id: "", name: "" });
  };

  const handleDeleteArea = (id) => {
    setAreas(areas.filter((area) => area.id !== id));
  };

  const handleAddAntenna = () => {
    if (selectedArea) {
      const updatedAreas = areas.map((area) =>
        area.id === selectedArea
          ? { ...area, antennas: [...area.antennas, newAntenna] }
          : area
      );
      setAreas(updatedAreas);
      setNewAntenna("");
    }
  };

  const handleAddCamera = () => {
    if (selectedArea) {
      const updatedAreas = areas.map((area) =>
        area.id === selectedArea
          ? { ...area, cameras: [...area.cameras, newCamera] }
          : area
      );
      setAreas(updatedAreas);
      setNewCamera("");
    }
  };

  const handleDeleteAntenna = (antennaId) => {
    if (selectedArea) {
      const updatedAreas = areas.map((area) =>
        area.id === selectedArea
          ? {
              ...area,
              antennas: area.antennas.filter((antenna) => antenna !== antennaId),
            }
          : area
      );
      setAreas(updatedAreas);
    }
  };

  const handleDeleteCamera = (cameraId) => {
    if (selectedArea) {
      const updatedAreas = areas.map((area) =>
        area.id === selectedArea
          ? {
              ...area,
              cameras: area.cameras.filter((camera) => camera !== cameraId),
            }
          : area
      );
      setAreas(updatedAreas);
    }
  };

  return (
    <div className="rfid-management-container">
      <h1>RFID Management</h1>
      <div className="rfid-management-sections">
        {/* Section 1: RFID and Workers */}
        <div className="section">
          <h2>RFID Tags and Workers</h2>
          <table>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Worker Name</th>
                <th>RFID Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.rfid}</td>
                  <td>
                    <button onClick={() => handleDeleteWorker(worker.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Add Worker</h3>
          <input
            type="text"
            placeholder="ID"
            value={newWorker.id}
            onChange={(e) => setNewWorker({ ...newWorker, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            value={newWorker.name}
            onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="RFID Tag"
            value={newWorker.rfid}
            onChange={(e) => setNewWorker({ ...newWorker, rfid: e.target.value })}
          />
          <button onClick={handleAddWorker}>Add</button>
        </div>

        {/* Section 2: Areas */}
        <div className="section">
          <h2>Areas</h2>
          <table>
            <thead>
              <tr>
                <th>Area ID</th>
                <th>Area Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area.id}>
                  <td>{area.id}</td>
                  <td>{area.name}</td>
                  <td>
                    <button onClick={() => handleDeleteArea(area.id)}>Delete</button>
                    <button onClick={() => setSelectedArea(area.id)}>Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Add Area</h3>
          <input
            type="text"
            placeholder="ID"
            value={newArea.id}
            onChange={(e) => setNewArea({ ...newArea, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            value={newArea.name}
            onChange={(e) => setNewArea({ ...newArea, name: e.target.value })}
          />
          <button onClick={handleAddArea}>Add</button>

          {selectedArea && (
            <div className="selected-area-details">
              <h3>Selected Area: {areas.find((area) => area.id === selectedArea)?.name}</h3>
              <h4>Antenna</h4>
              <ul>
                {areas
                  .find((area) => area.id === selectedArea)
                  ?.antennas.map((antenna) => (
                    <li key={antenna}>
                      {antenna}{" "}
                      <button onClick={() => handleDeleteAntenna(antenna)}>Delete</button>
                    </li>
                  ))}
              </ul>
              <input
                type="text"
                placeholder="New Antenna"
                value={newAntenna}
                onChange={(e) => setNewAntenna(e.target.value)}
              />
              <button onClick={handleAddAntenna}>Add Antenna</button>

              <h4>Camera</h4>
              <ul>
                {areas
                  .find((area) => area.id === selectedArea)
                  ?.cameras.map((camera) => (
                    <li key={camera}>
                      {camera}{" "}
                      <button onClick={() => handleDeleteCamera(camera)}>Delete</button>
                    </li>
                  ))}
              </ul>
              <input
                type="text"
                placeholder="New Camera"
                value={newCamera}
                onChange={(e) => setNewCamera(e.target.value)}
              />
              <button onClick={handleAddCamera}>Add Camera</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RFIDManagement;