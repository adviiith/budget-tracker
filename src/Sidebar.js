import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/tools">Tools</Link>
      <Link to="/reports">Reports</Link>
    </div>
  );
};

export default Sidebar;
