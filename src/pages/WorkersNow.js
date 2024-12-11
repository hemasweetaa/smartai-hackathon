import React, { useState } from "react";

const WorkersNow = () => {
  // Sample data for workers
  const workers = [
    { workerId: "W001", name: "John Doe", area: "Area A", workingTime: "3 hours" },
    { workerId: "W002", name: "Jane Smith", area: "Area B", workingTime: "2 hours" },
    { workerId: "W003", name: "Mike Johnson", area: "Area A", workingTime: "4 hours" },
    { workerId: "W004", name: "Emily Davis", area: "Area C", workingTime: "1 hour" },
    { workerId: "W005", name: "Robert Brown", area: "Area B", workingTime: "2.5 hours" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // Filter workers based on the search query
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Workers Currently Working</h1>
      
      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search by Worker ID, Name, or Area..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "300px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      {/* Tabular Column */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#42a5f5", color: "#6581b8" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>Worker ID</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Area</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Working Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <tr key={worker.workerId}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{worker.workerId}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{worker.name}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{worker.area}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>{worker.workingTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", padding: "20px", color: "#888" }}
              >
                No workers found matching the search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkersNow;