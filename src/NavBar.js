import React from "react";
import logo from "./logo.png";
import "./NavBar.css"; 

const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-logo">
        <img src={logo} alt="TrackEXP Logo" className="logo-img" />
        BudgetFlow
        </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
