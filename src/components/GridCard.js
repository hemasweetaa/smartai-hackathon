import React from "react";

const GridCard = ({ title, value, bgColor }) => {
  return (
    <div style={{ backgroundColor: bgColor, color: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default GridCard;
