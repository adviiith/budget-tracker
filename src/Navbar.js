import React from 'react';
import { Link } from 'react-router-dom';
import './Nb.css';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">BudgetFlo</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
