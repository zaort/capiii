import React, { createContext, useState, useEffect, useContext } from "react";
import decode from "jwt-decode";
import axios from "axios"; // Or your preferred HTTP library
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isProviderState, setIsProviderState] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("id_token");
		if (token && !isTokenExpired(token)) {
			const decodedToken = decode(token);
			console.log("use state in auth file was executed");
			setUser({
				email: decodedToken.data.email,
				username: decodedToken.data.username,
				_id: decodedToken.data._id,
				isProvider: decodedToken.data.isProvider,
			});
			setIsProviderState(decodedToken.data.isProvider);
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const isTokenExpired = token => {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	};

	const login = async token => {
		try {
			localStorage.setItem("id_token", token);
			setIsLoggedIn(true);
			const decodedToken = decode(token); 
			setIsProviderState(decodedToken.data.isProvider);
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	//isProviderState is false until the user refreshes the page
	useEffect(() => {
		console.log("isLoggedIn:", isLoggedIn);
		console.log("isProviderState:", isProviderState);
	}, [isLoggedIn, isProviderState]);

	const logout = () => {
		localStorage.removeItem("id_token");
		setUser(null);
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ user, isLoggedIn, login, logout, isProviderState }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
