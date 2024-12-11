import React, { useState } from 'react';
import './AlertPage.css'; // Import custom CSS

const supervisors = ["Supervisor A", "Supervisor B"];

// Main Incident Monitoring Component
const UnauthorizedArea = () => {
  const [incidents, setIncidents] = useState([]);

  // Function to handle unauthorized access
  const handleUnauthorizedEntry = (personName, rfidTag) => {
    const newIncident = {
      id: incidents.length + 1,
      person: personName,
      rfid: rfidTag,
      time: new Date().toLocaleString(),
    };

    // Add incident to the log
    setIncidents([...incidents, newIncident]);

    // Trigger instant alerts to supervisors
    supervisors.forEach((supervisor) =>
      alert(`🚨 Alert to ${supervisor}: Unauthorized entry attempt detected!\nPerson: ${personName}\nRFID Tag: ${rfidTag}`)
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🚨 Unauthorized Entry Monitoring Dashboard</h1>
        <button
          className="trigger-btn"
          onClick={() => handleUnauthorizedEntry("John Doe", "RFID-12345")}
        >
          Simulate Unauthorized Entry
        </button>
      </header>

      <main className="dashboard-main">
        <h2>Incident Log</h2>
        {incidents.length === 0 ? (
          <p className="no-incidents">No incidents recorded.</p>
        ) : (
          <div className="incident-cards">
            {incidents.map((incident) => (
              <div className="incident-card" key={incident.id}>
                <h3>Incident #{incident.id}</h3>
                <p><strong>Person:</strong> {incident.person}</p>
                <p><strong>RFID Tag:</strong> {incident.rfid}</p>
                <p><strong>Time:</strong> {incident.time}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};




export default UnauthorizedArea;