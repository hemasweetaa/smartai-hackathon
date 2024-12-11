import React from "react";

const WorkforceRequirements = () => {
  // Dummy workforce data
  const workforceData = [
    { id: 1, location: "Factory A", demand: 15 },
    { id: 2, location: "Warehouse B", demand: 8 },
    { id: 3, location: "Construction Site C", demand: 20 },
    { id: 4, location: "Office D", demand: 5 },
    { id: 5, location: "Retail Store E", demand: 10 },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Workforce Requirements</h1>
      <div style={styles.grid}>
        {workforceData.map((item) => (
          <div key={item.id} style={styles.card}>
            <h2 style={styles.cardTitle}>{item.location}</h2>
            <p style={styles.cardDemand}>
              <span style={styles.demandLabel}>Demand:</span> {item.demand} workers
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#343a40",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTitle: {
    fontSize: "1.5rem",
    margin: "10px 0",
    color: "#007bff",
  },
  cardDemand: {
    fontSize: "1rem",
    color: "#6c757d",
  },
  demandLabel: {
    fontWeight: "bold",
    color: "#495057",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
};

export default WorkforceRequirements;