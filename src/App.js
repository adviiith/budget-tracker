// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';
import MyToolsPage from './MyToolsPage';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { auth } from './firebase'; // Import Firebase auth
import BT from './BT';


const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const onLogin = () => {
    // Set the logged-in user (can be a Firebase user object)
    setUser(true);
  };

  const onLogout = () => {
    // Add your logout functionality here, for example, Firebase logout:
    auth.signOut();
    setUser(null);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user to Firebase user object or null if not logged in
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Don't render anything until the authentication state is determined
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Pass onLogout to MyToolsPage */}
        <Route
          path="/tools"
          element={
            <PrivateRoute user={user}>
              <MyToolsPage onLogout={onLogout} />
            </PrivateRoute>
          }
        />
        <Route path="/budgetflo" element={<BT />} />
      </Routes>
    </Router>
  );
};

export default App;
