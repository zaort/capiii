import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from './utils/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';
import PlanDetail from './pages/PlanDetail';
import Profile from './pages/Profile';
import Dashboard from './components/Dashboard';
import SubscriptionList from './components/SubscriptionList';

import NavBar from './components/NavBar';

function App() {
 const { user, login, logout, signup } = useAuthContext();

 useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
   login(JSON.parse(storedUser));
  }
 }, []);

 return (
  <Router>
   <NavBar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/plans" element={<Plans />} />
    <Route path="/plans/:planId" element={<PlanDetail />} />
    <Route
     path="/profile"
     element={user ? <Profile /> : <Navigate to="/login" replace />}
    />
    <Route
     path="/dashboard"
     element={user && user.isProvider ? <Dashboard /> : <Navigate to="/" replace />}
    />
    <Route
     path="/subscriptions"
     element={user ? <SubscriptionList /> : <Navigate to="/login" replace />}
    />
   </Routes>
  </Router>
 );
}

export default App;