import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const gridItems = [
    {
      title: "No of Workers Working Now",
      value: "32",
      bgColor: "linear-gradient(135deg, #ff7043, #ff5722)",
      onClick: () => navigate("/workers-now"),
    },
    {
      title: "Today's Entries & Exits",
      value: "120 / 115",
      bgColor: "linear-gradient(135deg, #42a5f5, #1e88e5)",
      onClick: () => navigate("/rfid-dashboard"),
    },
    {
      title: "Workforce Requirements",
      value: "Area A: 5, Area B: 8",
      bgColor: "linear-gradient(135deg, #66bb6a, #43a047)",
      onClick: () => navigate("/workforce-requirements"),
    },
    {
      title: "Efficiency Graph",
      value: null, // Will be replaced by the chart
      bgColor: "linear-gradient(135deg, #ab47bc, #8e24aa)",
    },
    {
      title: "Unauthorized Entry Alerts",
      value: "3",
      bgColor: "linear-gradient(135deg, #ef5350, #d32f2f)",
      onClick: () => navigate("/alertpage"),
    },
    {
      title: "Insights",
      value: "Peak: 10 AM, Least: 3 PM",
      bgColor: "linear-gradient(135deg, #ffa726, #fb8c00)",
    },
  ];

  const efficiencyData = [
    { name: "Yesterday's Efficiency", value: 67, color: "#4caf50" },
    { name: "Today's Efficiency", value: 72, color: "#ff9800" },
    { name: "Tasks Completed", value: 25, color: "#2196f3" },
    { name: "Workers", value: 8, color: "#00bcd4" },
  ];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "32px",
        backgroundColor: "#000",
        background: `radial-gradient(circle at 20% 30%, #342643, #1e1e38, #0a081f)`,
        minHeight: "100vh",
        color: "#fff",
        overflowY: "scroll",
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "5px 5px, 3px 3px, 1px 1px",
          animation: "twinkle 3s infinite, moveStars 15s infinite",
          pointerEvents: "none",
        }}
      ></div>

      {/* Grid Items */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {gridItems.map((item) => (
          <div
            key={item.title}
            style={{
              background: item.bgColor,
              borderRadius: "20px",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "400px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: item.onClick ? "pointer" : "default",
              textAlign: "center",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.5)";
            }}
            onClick={item.onClick}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "2.5em",
                fontWeight: "600",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              {item.title}
            </h2>
            {item.title === "Efficiency Graph" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PieChart width={250} height={250}>
                  <Pie
                    data={efficiencyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    startAngle={90}
                    endAngle={450}
                    fill="#8884d8"
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            ) : (
              <p style={{ fontSize: "2em", fontWeight: "300" }}>{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
