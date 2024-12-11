import React, { useState } from "react";

const RFIDDashboard = () => {
  // Sample RFID tracking data with date-based entries and exits
  const [workersData] = useState([
    {
      workerId: "W001",
      name: "John Doe",
      rfid: "RFID-001",
      entryTime: "08:00 AM",
      exitTime: "05:00 PM",
      entryGate: "Gate 1",
      exitGate: "Gate 1",
      date: "2024-11-29",
    },
    {
      workerId: "W002",
      name: "Jane Smith",
      rfid: "RFID-002",
      entryTime: "08:30 AM",
      exitTime: "05:30 PM",
      entryGate: "Gate 2",
      exitGate: "Gate 2",
      date: "2024-11-29",
    },
    {
      workerId: "W003",
      name: "Alice Johnson",
      rfid: "RFID-003",
      entryTime: "09:00 AM",
      exitTime: "06:00 PM",
      entryGate: "Gate 1",
      exitGate: "Gate 3",
      date: "2024-11-30",
    },
  ]);

  // State to manage selected date and filtered data
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredWorkers, setFilteredWorkers] = useState(workersData);

  // Handle date change and filter workers by selected date
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    const filteredData = workersData.filter((worker) => worker.date === selected);
    setFilteredWorkers(filteredData);
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>
        RFID Tracking Dashboard - Entries and Exits
      </h1>

      {/* Date Picker */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "80%",
            maxWidth: "300px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      {/* Worker List */}
      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#42a5f5", color: "#fff" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Worker ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Worker Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>RFID Tag ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Entry Time</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Entry Gate</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Exit Time</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Exit Gate</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No records found for the selected date.
                </td>
              </tr>
            ) : (
              filteredWorkers.map((worker, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.workerId}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.name}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.rfid}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.entryTime}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.entryGate}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.exitTime}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{worker.exitGate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RFIDDashboard;