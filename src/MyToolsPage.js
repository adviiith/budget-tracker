import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./MyToolsPage.css";
const MyToolsPage = ({ onLogout }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Logout and redirect to landing page
      navigate("/"); // Redirect to landing page after logout
    } else {
      console.error("onLogout function is not available");
    }
  };

  return (
    <div className="tools-page">
      <h1>My Tools</h1>
      <p>Select a tool to get started:</p>
      <div className="tools-grid">
        <button onClick={() => navigate('/budgetflo')} className="tool-button">
          BudgetFlo
        </button>
        <button className="tool-button" disabled>
          Coming Soon!
        </button>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default MyToolsPage;
