import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { useAuth } from "./utils/auth.jsx";
import { Navigate } from "react-router-dom";
import "./index.css";

// Import your components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import Plans from "./pages/Plans";
import PlanDetail from "./pages/PlanDetail";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import PlanForm from "./components/PlanForm.jsx";
const NotFound = () => <h1>Page not found</h1>;

const App = () => {
	// const { user, login, logout } = useAuth();
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	// useEffect(() => {
	// 	setIsLoggedIn(!!user); // Update login state based on the presence of the user
	// }, [user]);

	// Function to handle private routes
	// const PrivateRoute = ({ children }) => {
	// 	return isLoggedIn ? children : <Navigate to="/login" replace />;
	// };
	// console.log(isLoggedIn);

	return (
		<Router>
			<NavBar />
			<div className="container mx-auto mt-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/plans" element={<Plans />} />
					<Route path="/plans/:planId" element={<PlanDetail />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/create-plan" element={<PlanForm />} />
					<Route path="*" element={<NotFound />} /> 
				</Routes>
			</div>
		</Router>
	);
};

export default App;
