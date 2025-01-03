import React from "react";
import "./LandingPage.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

const LandingPage = () => {

  return (
    <div className="landing-container">
        <div id="navbar"><Navbar /></div>
     <div className="landing-header">
        <h1>Welcome to BudgetFlo</h1>
        <p>Manage your finances with ease and efficiency!</p>
      </div>
      <div><Link to="/signup"><button className="getstarted-button">Get Started</button></Link></div>
    </div>
  );
};

export default LandingPage;
