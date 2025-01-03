import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "./MyToolsPage.css";
import { Navigate } from 'react-router-dom';
const MyToolsPage = ({ onLogout }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    if (onLogout) {
        onLogout(); 
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
      <Link to="/" onClick={handleLogout}><button className="logout-button">Logout</button></Link>
    </div>
  );
};

export default MyToolsPage;
