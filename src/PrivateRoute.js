// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  // If the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the children (MyToolsPage)
  return children;
};

export default PrivateRoute;
