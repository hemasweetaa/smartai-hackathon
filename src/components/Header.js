import React from "react";
import "./Header.css"; // Import styles for the header

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Worker Management System</h1>
      </div>
      <div className="header-right">
        <p>by_underScore</p>
      </div>
    </header>
  );
};

export default Header;
