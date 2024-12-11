import React, { useState } from "react";
import "./Settings.css";

function SettingsPage() {
  const [userData, setUserData] = useState({
    firstName: "Anna",
    lastName: "Gasperlin",
    email: "sdfghj@gmail.com",
    phoneNumber: "800-883-1105 ext. 2",
    useTwoFactor: true,
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({
        ...userData,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", userData);
  };

  return (
    <form className="settings-page" onSubmit={handleSubmit}>
      <div className="settings-container">
        <div className="profile-section">
          <img
            src={userData.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <div className="personal-info-section">
          <h2>Personal Information</h2>
          <div className="info-item">
            <label>First Name:</label>
            <input
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="info-item">
            <label>Last Name:</label>
            <input
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="info-item">
            <label>Email:</label>
            <input name="email" value={userData.email} onChange={handleChange} />
          </div>
          <div className="info-item">
            <label>Phone Number:</label>
            <input
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="info-item toggle-item">
            <label>
              <input
                type="checkbox"
                name="useTwoFactor"
                checked={userData.useTwoFactor}
                onChange={handleChange}
              />
              Use Two-Factor Authentication
            </label>
          </div>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default SettingsPage;