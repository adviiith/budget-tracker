import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1>Welcome to BudgetFlo</h1>
        <p>Manage your finances with ease and efficiency!</p>
      </div>
      <div className="auth-options">
        <button className="auth-btn login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="auth-btn signup-btn" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
