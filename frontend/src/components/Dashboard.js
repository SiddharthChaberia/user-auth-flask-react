import React from "react";
import "../styles.css";

const Dashboard = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="container">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
