import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
// import client from './utils/apolloClient'; // Assuming you'll create the client setup
import { useAuth } from './utils/auth';

// Import your components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Plans from './pages/Plans';
import PlanDetail from './pages/PlanDetail';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';

// Optional: Include a component for handling 404 errors (Not Found)
// import NotFound from './components/NotFound';

const App = () => {
 const { user, login, logout } = useAuth();
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  setIsLoggedIn(!!user); // Update login state based on the presence of the user
 }, [user]);

 // Function to handle private routes
 const PrivateRoute = ({ children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
 }

 return (
  <ApolloProvider client={client}>
   <Router>
    <NavBar login={login} logout={logout} isLoggedIn={isLoggedIn} />
    <div className="container mx-auto mt-8">
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protecting the Dashboard route */}
      <Route
       path="/dashboard"
       element={
        <PrivateRoute>
         <Dashboard />
        </PrivateRoute>
       }
      />
      <Route path="/plans" element={<Plans />} />
      <Route path="/plans/:planId" element={<PlanDetail />} />
      <Route
       path="/profile"
       element={
        <PrivateRoute>
         <Profile />
        </PrivateRoute>
       }
      />
      <Route path="*" element={<NotFound />} /> {/* Catch-all for unmatched routes */}
     </Routes>
    </div>
   </Router>
  </ApolloProvider>
 );
};

export default App;